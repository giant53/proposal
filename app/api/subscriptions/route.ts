/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest } from "next/server"
import { auth } from "@/auth"
import { stripe, SUBSCRIPTION_PRICES } from "@/lib/stripe"
import { errorResponse, successResponse } from "@/lib/api-response"
import { prisma } from "@/prisma"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return errorResponse("Unauthorized", 401)
    }

    const plans = await prisma.subscriptionPlan.findMany({
      where: { isActive: true },
      orderBy: { price: "asc" }
    })

    return successResponse({ plans })
  } catch (error) {
    console.error("[SUBSCRIPTIONS_GET]", error)
    return errorResponse("Internal Error", 500)
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return errorResponse("Unauthorized", 401)
    }

    const { priceId, interval } = await req.json()

    // Validate price ID
    if (!priceId || !Object.values(SUBSCRIPTION_PRICES).includes(priceId)) {
      return errorResponse("Invalid price ID")
    }

    // Get or create Stripe customer
    let customerId = session.user.customerId

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: session.user.email,
        name: session.user.name,
        metadata: {
          userId: session.user.id
        }
      })
      customerId = customer.id

      await prisma.user.update({
        where: { id: session.user.id },
        data: { customerId }
      })
    }

    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
      subscription_data: {
        metadata: {
          userId: session.user.id
        }
      }
    })

    return successResponse({ 
      url: checkoutSession.url 
    })
  } catch (error) {
    console.error("Error creating subscription:", error)
    return errorResponse("Failed to create subscription", 500)
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return errorResponse("Unauthorized", 401)
    }

    const subscriptionId = session.user.subscriptionId
    if (!subscriptionId) {
      return errorResponse("No active subscription")
    }

    // Cancel subscription at period end
    await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true
    })

    await prisma.user.update({
      where: { id: session.user.id },
      data: { cancelAtPeriodEnd: true }
    })

    return successResponse({ 
      message: "Subscription will be canceled at the end of the billing period" 
    })
  } catch (error) {
    console.error("Error canceling subscription:", error)
    return errorResponse("Failed to cancel subscription", 500)
  }
}
