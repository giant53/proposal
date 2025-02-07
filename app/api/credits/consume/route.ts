/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { checkUserCredits, consumeCredit } from "@/lib/credit-middleware"

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { creditCost = 1 } = body

    // Check user credits before consumption
    const creditCheck = await checkUserCredits(req as any, session.user.id)
    
    if (!creditCheck.allowed) {
      return NextResponse.json({
        success: false,
        reason: creditCheck.reason,
        suggestUpgrade: creditCheck.suggestUpgrade
      }, { status: 400 })
    }

    // Consume credit
    const result = await consumeCredit(session.user.id, creditCost)

    if (!result.success) {
      return NextResponse.json({
        success: false,
        reason: "Failed to consume credit"
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      remainingCredits: result.remainingCredits
    })
  } catch (error) {
    console.error("[CREDITS_CONSUME]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
