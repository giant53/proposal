/* eslint-disable @typescript-eslint/no-unused-vars */
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { prisma } from "@/prisma"

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: Request) {
  const body = await req.text()
  const signature = (await headers()).get("Stripe-Signature") as string

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    )
  } catch (error) {
    console.error("Webhook signature verification failed")
    return new NextResponse("Webhook Error", { status: 400 })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const session = event.data.object as any

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const subscription = await stripe.subscriptions.retrieve(session.subscription)
        const userId = session.metadata.userId
        const planId = session.metadata.planId

        const plan = await prisma.subscriptionPlan.findUnique({
          where: { id: planId }
        })

        if (!plan) {
          throw new Error("Plan not found")
        }

        // Update user subscription
        await prisma.user.update({
          where: { id: userId },
          data: {
            subscriptionTier: plan.tier,
            subscriptionStatus: "ACTIVE",
            subscriptionId: session.subscription,
            currentPeriodStart: new Date(subscription.current_period_start * 1000),
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            remainingCredits: plan.credits,
            lastCreditReset: new Date()
          }
        })

        // Create transaction record
        await prisma.transaction.create({
          data: {
            userId,
            amount: session.amount_total / 100,
            currency: session.currency,
            status: "success",
            paymentMethod: session.payment_method_types[0],
            paymentIntentId: session.payment_intent,
            tier: plan.tier,
            metadata: {
              checkoutSessionId: session.id
            }
          }
        })

        // Create audit log
        await prisma.auditLog.create({
          data: {
            userId,
            action: "SUBSCRIPTION_CREATED",
            details: {
              tier: plan.tier,
              amount: session.amount_total / 100
            }
          }
        })

        break
      }

      case "invoice.payment_succeeded": {
        const subscription = await stripe.subscriptions.retrieve(session.subscription)
        const userId = subscription.metadata.userId

        const plan = await prisma.subscriptionPlan.findFirst({
          where: { stripePriceId: session.lines.data[0].price.id }
        })

        if (!plan) {
          throw new Error("Plan not found")
        }

        // Reset credits and update period
        await prisma.user.update({
          where: { id: userId },
          data: {
            remainingCredits: plan.credits,
            lastCreditReset: new Date(),
            currentPeriodStart: new Date(subscription.current_period_start * 1000),
            currentPeriodEnd: new Date(subscription.current_period_end * 1000)
          }
        })

        // Create audit log
        await prisma.auditLog.create({
          data: {
            userId,
            action: "CREDITS_RESET",
            details: {
              credits: plan.credits,
              tier: plan.tier
            }
          }
        })

        break
      }

      case "customer.subscription.deleted": {
        const userId = session.metadata.userId

        await prisma.user.update({
          where: { id: userId },
          data: {
            subscriptionStatus: "CANCELLED",
            subscriptionId: null,
            currentPeriodStart: null,
            currentPeriodEnd: null,
            subscriptionTier: "FREE",
            remainingCredits: 1
          }
        })

        // Create audit log
        await prisma.auditLog.create({
          data: {
            userId,
            action: "SUBSCRIPTION_CANCELLED",
            details: {
              canceledAt: new Date()
            }
          }
        })

        break
      }
    }

    return new NextResponse(null, { status: 200 })
  } catch (error) {
    console.error("Webhook handler failed:", error)
    return new NextResponse("Webhook Error", { status: 400 })
  }
}
