import { auth } from "@/auth"
import { prisma } from "@/prisma"
import { successResponse, errorResponse } from "@/lib/api-response"
import { NextRequest } from "next/server"

export async function GET(
  req: NextRequest,
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return errorResponse("Unauthorized", 401)
    }

    const params = req.nextUrl.searchParams
    const id = params.get("id")
    if (!id) {
      return errorResponse("Missing id", 400)
    }

    const proposal = await prisma.proposal.findUnique({
      where: { id },
      include: {
        messages: true,
      },
    })

    if (!proposal) {
      return errorResponse("Proposal not found", 404)
    }

    if (proposal.senderId !== session.user.id) {
      return errorResponse("Unauthorized", 403)
    }

    return successResponse(proposal)
  } catch (error) {
    console.error("Proposal fetch error:", error)
    return errorResponse("Failed to fetch proposal")
  }
}

export async function PATCH(
  req: NextRequest,
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return errorResponse("Unauthorized", 401)
    }

    const body = await req.json()
    const { status, customMessage } = body

    const params = req.nextUrl.searchParams
    const id = params.get("id")

    if (!id) {
      return errorResponse("Missing id")
    }

    const proposal = await prisma.proposal.findUnique({
      where: { id },
    })

    if (!proposal) {
      return errorResponse("Proposal not found", 404)
    }

    if (proposal.senderId !== session.user.id) {
      return errorResponse("Unauthorized", 403)
    }

    const updatedProposal = await prisma.proposal.update({
      where: { id: id },
      data: {
        ...(status && { status }),
        ...(customMessage && { customMessage }),
      },
    })

    return successResponse(updatedProposal)
  } catch (error) {
    console.error("Proposal update error:", error)
    return errorResponse("Failed to update proposal")
  }
}

export async function DELETE(
  req: NextRequest,
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return errorResponse("Unauthorized", 401)
    }

    const params = req.nextUrl.searchParams
    const id = params.get("id")

    if (!id) {
      return errorResponse("Missing id")
    }

    const proposal = await prisma.proposal.findUnique({
      where: { id },
    })

    if (!proposal) {
      return errorResponse("Proposal not found", 404)
    }

    if (proposal.senderId !== session.user.id) {
      return errorResponse("Unauthorized", 403)
    }

    await prisma.proposal.delete({
      where: { id },
    })

    return successResponse({ id }, "Proposal deleted successfully")
  } catch (error) {
    console.error("Proposal deletion error:", error)
    return errorResponse("Failed to delete proposal")
  }
}
