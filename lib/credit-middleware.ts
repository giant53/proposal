import { NextRequest } from "next/server"
import { prisma } from "@/prisma"
import { SubscriptionTier } from "@prisma/client"

export async function checkUserCredits(req: NextRequest, userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        subscriptionTier: true,
        remainingCredits: true,
        currentPeriodEnd: true,
        lastCreditReset: true
      }
    })

    if (!user) {
      return { allowed: false, reason: "User not found" }
    }

    // Credit reset logic for different tiers
    const now = new Date()
    const shouldResetCredits = 
      !user.currentPeriodEnd || 
      now > user.currentPeriodEnd

    if (shouldResetCredits) {
      const creditsToReset = 
        user.subscriptionTier === SubscriptionTier.FREE ? 1 :
        user.subscriptionTier === SubscriptionTier.PREMIUM ? 7 : 7

      await prisma.user.update({
        where: { id: userId },
        data: {
          remainingCredits: creditsToReset,
          lastCreditReset: now,
          currentPeriodEnd: new Date(now.setMonth(now.getMonth() + 1))
        }
      })

      user.remainingCredits = creditsToReset
    }

    // Check if user has credits
    if (user.remainingCredits <= 0) {
      return { 
        allowed: false, 
        reason: "No credits remaining",
        suggestUpgrade: true 
      }
    }

    return { 
      allowed: true, 
      remainingCredits: user.remainingCredits 
    }
  } catch (error) {
    console.error("Credit check error:", error)
    return { allowed: false, reason: "Internal error" }
  }
}

export async function consumeCredit(userId: string, creditCost: number = 1) {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        remainingCredits: {
          decrement: creditCost
        }
      }
    })

    return { 
      success: true, 
      remainingCredits: user.remainingCredits 
    }
  } catch (error) {
    console.error("Credit consumption error:", error)
    return { success: false, error: "Failed to consume credit" }
  }
}
