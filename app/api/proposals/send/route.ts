import { auth } from "@/auth"
import { prisma } from "@/prisma"
import { errorResponse, successResponse } from "@/lib/api-response"
import { sendMessage } from "@/lib/messaging-service"
import { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return errorResponse("Unauthorized", 401)
    }

    const { proposalId, methods = ["EMAIL"] } = await req.json()

    const proposal = await prisma.proposal.findUnique({
      where: { id: proposalId },
      include: {
        sender: true,
      },
    })

    if (!proposal) {
      return errorResponse("Proposal not found")
    }

    if (proposal.senderId !== session.user.id) {
      return errorResponse("Unauthorized", 401)
    }

    const results = []
    const errors = []

    // Send via each selected method
    for (const method of methods) {
      let to = ""
      switch (method) {
        case "EMAIL":
          to = proposal.recipientEmail || ""
          break
        case "SMS":
        case "WHATSAPP":
          to = proposal.recipientPhone || ""
          break
      }

      if (!to) {
        errors.push(`No ${method.toLowerCase()} address provided`)
        continue
      }

      const { success, error } = await sendMessage({
        to,
        message: proposal.message,
        recipientName: proposal.recipientName || "",
        method,
      })

      if (success) {
        results.push(method)
      } else {
        errors.push(`${method} sending failed: ${error}`)
      }
    }

    if (results.length === 0) {
      return errorResponse(`Failed to send proposal: ${errors.join(", ")}`)
    }

    // Update proposal status
    const updatedProposal = await prisma.proposal.update({
      where: { id: proposalId },
      data: {
        status: "SENT",
        consentSentAt: new Date(),
      },
    })

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: "PROPOSAL_SENT",
        details: {
          proposalId,
          successfulMethods: results,
          failedMethods: errors,
        },
      },
    })

    return successResponse({
      proposal: updatedProposal,
      sentVia: results,
      errors: errors.length > 0 ? errors : undefined,
    })
  } catch (error) {
    console.error("Proposal sending error:", error)
    return errorResponse("Failed to send proposal")
  }
}
