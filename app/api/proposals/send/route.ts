import { auth } from "@/auth"
import { errorResponse, successResponse } from "@/lib/api-response"
import { NextRequest } from "next/server"
import { prisma } from "@/prisma"
import { sendEmail, sendSMS, sendWhatsApp } from "@/lib/messaging-service"
import crypto from "crypto"

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return errorResponse("Unauthorized", 401)
    }

    const { proposalId, name, email, phone, methods } = await req.json()

    if (!proposalId || !methods?.length) {
      return errorResponse("Missing required information")
    }

    // Check if email is unsubscribed
    if (email) {
      const unsubscribed = await prisma.unsubscribedEmail.findUnique({
        where: { email },
      })
      if (unsubscribed) {
        return errorResponse("This email has unsubscribed from proposals")
      }
    }

    // Fetch proposal
    const proposal = await prisma.proposal.findUnique({
      where: {
        id: proposalId,
        senderId: session.user.id,
      },
      include: {
        sender: true,
      },
    })

    if (!proposal) {
      return errorResponse("Proposal not found", 404)
    }

    // Generate secret hash if not exists
    const secretHash = proposal.secretHash || crypto.randomBytes(32).toString('hex')

    // Update proposal with secret hash
    await prisma.proposal.update({
      where: { id: proposalId },
      data: { secretHash },
    })

    const proposalUrl = `${process.env.NEXT_PUBLIC_APP_URL}/proposals/${proposalId}?secretCode=${secretHash}`

    const results = await Promise.allSettled(
      methods.map(async (method: string) => {
        switch (method) {
          case "EMAIL":
            if (!email) throw new Error("Email required for EMAIL delivery")
            return sendEmail({
              to: email,
              subject: "Someone Special Has a Message for You ",
              content: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #fff; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); padding: 30px;">
                  <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #e11d48; margin: 0;"> A Special Message Awaits You</h1>
                  </div>
                  
                  <div style="background-color: #fff1f2; padding: 25px; border-radius: 8px; margin: 20px 0;">
                    <p style="color: #1f2937; font-size: 18px; line-height: 1.6; margin-bottom: 20px;">
                      Dear ${name},
                    </p>
                    <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                      Someone special has crafted a heartfelt proposal just for you. 
                    </p>
                    <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
                      To view this personal message, click the button below:
                    </p>
                  </div>

                  <div style="text-align: center; margin: 30px 0;">
                    <a href="${proposalUrl}" style="background-color: #e11d48; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block; transition: background-color 0.3s;">
                      View Your Special Message 
                    </a>
                  </div>

                  <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                    <p style="color: #6b7280; font-size: 14px;">
                      This message was sent with care via Proposal.me 
                    </p>
                    <p style="color: #6b7280; font-size: 12px; margin-top: 10px;">
                      <a href="${process.env.NEXT_PUBLIC_APP_URL}/unsubscribe?email=${encodeURIComponent(email)}" style="color: #6b7280; text-decoration: underline;">
                        Unsubscribe from future proposals
                      </a>
                    </p>
                  </div>
                </div>
              `,
              recipientName: name,
            })
          
          case "SMS":
            if (!phone) throw new Error("Phone required for SMS delivery")
            return sendSMS({
              to: phone,
              content: ` Someone special has a message for you! View it here: ${proposalUrl}`,
              recipientName: name,
            })
          
          case "WHATSAPP":
            if (!phone) throw new Error("Phone required for WhatsApp delivery")
            return sendWhatsApp({
              to: phone,
              content: ` Someone special has crafted a heartfelt message just for you!\n\nView it here: ${proposalUrl}`,
              recipientName: name,
            })
          
          default:
            throw new Error(`Unsupported delivery method: ${method}`)
        }
      })
    )

    // Check for any failures
    const failures = results.filter(r => r.status === "rejected")
    if (failures.length > 0) {
      console.error("Some delivery methods failed:", failures)
      return errorResponse("Some delivery methods failed", 500)
    }

    // Update proposal status
    await prisma.proposal.update({
      where: { id: proposalId },
      data: {
        status: "SENT",
        consentSentAt: new Date(),
        deliveryMethod: methods[0],
      },
    })

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: "PROPOSAL_SENT",
        details: {
          proposalId,
          successfulMethods: methods,
        },
      },
    })

    return successResponse({ 
      message: "Proposal sent successfully through all channels" 
    })
  } catch (error) {
    console.error("Error sending proposal:", error)
    return errorResponse("Failed to send proposal", 500)
  }
}
