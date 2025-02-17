import { NextResponse } from "next/server"
import { prisma } from "@/prisma"
import { SubscriptionTier, SubscriptionStatus } from "@prisma/client"
import { SUBSCRIPTION_CREDITS, CREDIT_RESET_INTERVALS } from "@/lib/stripe"

export const runtime = "edge"
export const dynamic = "force-dynamic"

export async function GET(req: Request) {
  try {
    // Verify cron secret
    const authHeader = req.headers.get("authorization")
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Get users who need credit reset
    const users = await prisma.user.findMany({
      where: {
        OR: [
          // Free tier users who haven't had credits reset in 7 days
          {
            subscriptionTier: SubscriptionTier.FREE,
            lastCreditReset: {
              lt: new Date(Date.now() - CREDIT_RESET_INTERVALS.FREE)
            }
          },
          // Premium users who haven't had credits reset in 30 days
          {
            subscriptionTier: SubscriptionTier.PREMIUM,
            subscriptionStatus: SubscriptionStatus.ACTIVE,
            lastCreditReset: {
              lt: new Date(Date.now() - CREDIT_RESET_INTERVALS.PREMIUM)
            }
          }
        ]
      }
    })

    // Reset credits for each user
    const updates = users.map(user => {
      const credits = user.subscriptionTier === SubscriptionTier.FREE
        ? SUBSCRIPTION_CREDITS.FREE
        : user.subscriptionTier === SubscriptionTier.PREMIUM
          ? SUBSCRIPTION_CREDITS.PREMIUM
          : SUBSCRIPTION_CREDITS.YEARLY

      return prisma.user.update({
        where: { id: user.id },
        data: {
          remainingCredits: credits,
          lastCreditReset: new Date()
        }
      })
    })

    await prisma.$transaction(updates)

    // Create audit logs
    const auditLogs = users.map(user => ({
      userId: user.id,
      action: "CREDITS_RESET" as const,
      details: {
        oldCredits: user.remainingCredits,
        newCredits: user.subscriptionTier === SubscriptionTier.FREE
          ? SUBSCRIPTION_CREDITS.FREE
          : SUBSCRIPTION_CREDITS.PREMIUM
      }
    }))

    await prisma.auditLog.createMany({
      data: auditLogs
    })

    return new NextResponse(JSON.stringify({
      success: true,
      usersUpdated: users.length
    }))
  } catch (error) {
    console.error("Error resetting credits:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
