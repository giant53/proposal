import { auth } from "@/auth"
import { prisma } from "@/prisma"
import { successResponse, errorResponse } from "@/lib/api-response"
import { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return errorResponse("Unauthorized", 401)
    }

    const body = await req.json()
    const { proposalId, content } = body

    if (!proposalId || !content) {
      return errorResponse("Missing required fields")
    }

    const proposal = await prisma.proposal.findUnique({
      where: { id: proposalId },
    })

    if (!proposal) {
      return errorResponse("Proposal not found", 404)
    }

    if (proposal.senderId !== session.user.id) {
      return errorResponse("Unauthorized", 403)
    }

    const message = await prisma.message.create({
      data: {
        content,
        proposalId,
        senderId: session.user.id,
        recipientId: proposal.recipientHash, // In a real app, this would be the actual recipient's user ID
        answer: ''
      },
    })

    return successResponse(message)
  } catch (error) {
    console.error("Message creation error:", error)
    return errorResponse("Failed to create message")
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return errorResponse("Unauthorized", 401)
    }

    const searchParams = req.nextUrl.searchParams
    const proposalId = searchParams.get("proposalId")

    if (!proposalId) {
      return errorResponse("Missing proposalId")
    }

    const proposal = await prisma.proposal.findUnique({
      where: { id: proposalId },
    })

    if (!proposal) {
      return errorResponse("Proposal not found", 404)
    }

    if (proposal.senderId !== session.user.id) {
      return errorResponse("Unauthorized", 403)
    }

    const messages = await prisma.message.findMany({
      where: { proposalId },
      orderBy: { createdAt: "asc" },
    })

    return successResponse(messages)
  } catch (error) {
    console.error("Message fetch error:", error)
    return errorResponse("Failed to fetch messages")
  }
}
