import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/prisma"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    })

    if (!user || user.role !== "ADMIN") {
      return new NextResponse("Forbidden", { status: 403 })
    }

    // // Get all subscription plans with stats
    // const plans = await prisma.subscriptionPlan.findMany({
    //   include: {
    //     _count: {
    //       select: {
    //         _all: true
    //       }
    //     }
    //   }
    // })

    // // Get subscription metrics
    // const metrics = await prisma.user.groupBy({
    //   by: ["subscriptionTier"],
    //   _count: {
    //     _all: true
    //   },
    //   _sum: {
    //     remainingCredits: true
    //   }
    // })

    return NextResponse.json({ })
  } catch (error) {
    console.error("[ADMIN_SUBSCRIPTIONS_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function POST() {
  try {
    const session = await auth()
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    })

    if (!user || user.role !== "ADMIN") {
      return new NextResponse("Forbidden", { status: 403 })
    }

    // const body = await req.json()
    // const { 
    //   tier,
    //   name,
    //   description,
    //   price,
    //   interval,
    //   credits,
    //   features
    // } = body

    // // Create Stripe product and price
    // const product = await stripe.products.create({
    //   name,
    //   description,
    //   metadata: {
    //     tier
    //   }
    // })

    // const stripePrice = await stripe.prices.create({
    //   product: product.id,
    //   unit_amount: Math.round(price * 100),
    //   currency: "usd",
    //   recurring: interval === "lifetime" ? undefined : {
    //     interval: interval === "yearly" ? "year" : "month"
    //   }
    // })

    // // Create subscription plan
    // const plan = await prisma.subscriptionPlan.create({
    //   data: {
    //     tier,
    //     name,
    //     description,
    //     price,
    //     interval,
    //     credits,
    //     features,
    //     stripePriceId: stripePrice.id
    //   }
    // })

    return NextResponse.json({})
  } catch (error) {
    console.error("[ADMIN_SUBSCRIPTIONS_POST]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await auth()
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    })

    if (!user || user.role !== "ADMIN") {
      return new NextResponse("Forbidden", { status: 403 })
    }

    const body = await req.json()
    const { id, isActive, name, description, features } = body

    const plan = await prisma.subscriptionPlan.update({
      where: { id },
      data: {
        isActive,
        name,
        description,
        features
      }
    })

    // if (name || description) {
    //   const product = await stripe.products.update(
    //     plan.stripePriceId.split("_")[0],
    //     {
    //       name: name || undefined,
    //       description: description || undefined
    //     }
    //   )
    // }

    return NextResponse.json(plan)
  } catch (error) {
    console.error("[ADMIN_SUBSCRIPTIONS_PATCH]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
