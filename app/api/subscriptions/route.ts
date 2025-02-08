import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/prisma"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const plans = await prisma.subscriptionPlan.findMany({
      where: { isActive: true },
      orderBy: { price: "asc" }
    })

    return NextResponse.json({ plans })
  } catch (error) {
    console.error("[SUBSCRIPTIONS_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { planId } = body

    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    })

    if (!user) {
      return new NextResponse("User not found", { status: 404 })
    }

    const plan = await prisma.subscriptionPlan.findUnique({
      where: { id: planId }
    })

    if (!plan) {
      return new NextResponse("Plan not found", { status: 404 })
    }

    // Create or retrieve Stripe customer
    // let customerId = user.customerId
    // if (!customerId) {
    //   const customer = await stripe.customers.create({
    //     email: user.email,
    //     name: user.name,
    //     metadata: {
    //       userId: user.id
    //     }
    //   })
    //   customerId = customer.id

    //   await prisma.user.update({
    //     where: { id: user.id },
    //     data: { customerId }
    //   })
    // }

    // // Create Stripe checkout session
    // const checkoutSession = await stripe.checkout.sessions.create({
    //   customer: customerId,
    //   line_items: [
    //     {
    //       price: plan.stripePriceId,
    //       quantity: 1
    //     }
    //   ],
    //   mode: plan.tier === SubscriptionTier.YEARLY ? "payment" : "subscription",
    //   success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
    //   cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
    //   metadata: {
    //     userId: user.id,
    //     planId: plan.id
    //   }
    // })

    return NextResponse.json({ url: '' })
  } catch (error) {
    console.error("[SUBSCRIPTIONS_POST]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
