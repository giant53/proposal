import { auth } from "@/auth"
import { prisma } from "@/prisma"
import { successResponse, errorResponse } from "@/lib/api-response"
import { NextRequest } from "next/server"
import OpenAI from "openai"
import { ProposalStatus } from "@prisma/client"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  
})

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return errorResponse("Unauthorized", 401)
    }

    const body = await req.json()
    console.log(body)
    const { content } = body

    // if (!recipientEmail && !recipientPhone) {
    //   return errorResponse("Either email or phone is required")
    // }

    debugger;

    // Generate AI proposal if no custom message
    // let message = customMessage
    // if (!customMessage) {
    //   const completion = await openai.chat.completions.create({
    //     model: "gpt-4o-mini",
    //     messages: [
    //       {
    //         role: "system",
    //         content: "You are a helpful assistant that creates personalized proposal messages."
    //       },
    //       {
    //         role: "user",
    //         content: `Create a proposal message for ${recipientName}`
    //       }
    //     ]
    //   })
    //   message = completion.choices[0].message.content || ""
    // }

    // Create proposal
    const proposal = await prisma.proposal.create({
      data: {
        senderId: session.user.id,
        recipientName: session.user.name,
        message: content,
        customMessage: content,
        recipientHash: "32478203949", // You should hash this in production
        deliveryMethod: "EMAIL",
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        aiModel: "openai",
      },
    })

    return successResponse(proposal)
  } catch (error) {
    console.error("Proposal creation error:", error)
    return errorResponse("Failed to create proposal")
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return errorResponse("Unauthorized", 401)
    }

    const searchParams = req.nextUrl.searchParams
    const status = searchParams.get("status") as ProposalStatus
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    const where = {
      senderId: session.user.id,
      ...(status && { status }),
    }

    const [proposals, total] = await Promise.all([
      prisma.proposal.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.proposal.count({ where }),
    ])

    return successResponse({
      proposals,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
      },
    })
  } catch (error) {
    console.error("Proposal fetch error:", error)
    return errorResponse("Failed to fetch proposals")
  }
}
