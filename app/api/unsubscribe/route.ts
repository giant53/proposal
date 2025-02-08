import { NextRequest } from "next/server"
import { prisma } from "@/prisma"
import { errorResponse, successResponse } from "@/lib/api-response"

export async function POST(req: NextRequest) {
  try {
    const { email, reason } = await req.json()

    if (!email) {
      return errorResponse("Email is required")
    }

    await prisma.unsubscribedEmail.create({
      data: {
        email,
        reason,
      },
    })

    return successResponse({
      message: "Successfully unsubscribed from future proposals",
    })
  } catch (error) {
    console.error("Unsubscribe error:", error)
    return errorResponse("Failed to unsubscribe")
  }
}

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get("email")

    if (!email) {
      return errorResponse("Email is required")
    }

    const unsubscribed = await prisma.unsubscribedEmail.findUnique({
      where: { email },
    })

    return successResponse({
      isUnsubscribed: !!unsubscribed,
    })
  } catch (error) {
    console.error("Unsubscribe check error:", error)
    return errorResponse("Failed to check unsubscribe status")
  }
}
