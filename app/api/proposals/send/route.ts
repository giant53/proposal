import { auth } from "@/auth"
import { errorResponse, successResponse } from "@/lib/api-response"
import { NextRequest } from "next/server"
import { prisma } from "@/prisma"
import { sendEmail, sendSMS, sendWhatsApp } from "@/lib/messaging-service";
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

    // Check remaining credits
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        remainingCredits: true,
        subscriptionStatus: true,
        lastCreditReset: true,
        subscriptionTier: true
      }
    })

    if (!user) {
      return errorResponse("User not found")
    }

    // if (user.remainingCredits <= 0) {
    //   return errorResponse("No remaining credits. Please upgrade your plan.")
    // }

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
              subject: "Your Proposal Access Link",
              content: `
                <!DOCTYPE html>
                <html lang="en">
                  <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta name="color-scheme" content="light">
                    <title>Access Your Proposal</title>
                  </head>
                  <body style="margin: 0; padding: 0; width: 100%; background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                    <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; margin: 0; padding: 0; background-color: #ffffff;">
                      <tr>
                        <td align="center" style="padding: 25px 0;">
                          <table role="presentation" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; margin: 0 auto; padding: 0; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
                            <!-- Header -->
                            <tr>
                              <td style="padding: 30px 40px; text-align: center; border-bottom: 1px solid #f3f4f6;">
                                <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #1e293b;">Secure Proposal Access</h1>
                              </td>
                            </tr>
                            
                            <!-- Main Content -->
                            <tr>
                              <td style="padding: 40px; background-color: #ffffff;">
                                <p style="margin: 0 0 20px; font-size: 16px; line-height: 24px; color: #334155;">Dear ${name},</p>
                                
                                <p style="margin: 0 0 20px; font-size: 16px; line-height: 24px; color: #334155;">A special proposal has been securely shared with you through our platform. For your privacy and security:</p>
                                
                                <ul style="margin: 0 0 20px; padding-left: 20px; color: #334155;">
                                  <li style="margin-bottom: 8px;">This link is unique to you</li>
                                  <li style="margin-bottom: 8px;">It will expire in 24 hours</li>
                                  <li style="margin-bottom: 8px;">Access is encrypted and secure</li>
                                </ul>

                                <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; margin: 30px 0;">
                                  <tr>
                                    <td align="center">
                                      <a href="${proposalUrl}" style="display: inline-block; padding: 14px 32px; background-color: #2563eb; color: #ffffff; text-decoration: none; font-weight: 500; font-size: 16px; border-radius: 6px; transition: background-color 0.2s ease;">Access Your Proposal</a>
                                    </td>
                                  </tr>
                                </table>

                                <p style="margin: 30px 0 0; padding-top: 20px; border-top: 1px solid #f3f4f6; font-size: 14px; line-height: 21px; color: #64748b;">
                                  For your security, this is an automated message. Please do not reply to this email. If you did not expect to receive this proposal, you may safely ignore this message.
                                </p>
                              </td>
                            </tr>

                            <!-- Footer -->
                            <tr>
                              <td style="padding: 20px 40px; background-color: #f8fafc; border-top: 1px solid #f3f4f6; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
                                <p style="margin: 0; font-size: 13px; line-height: 20px; color: #64748b; text-align: center;">
                                  Sent by Proposal.love | <a href="${process.env.NEXT_PUBLIC_APP_URL}/unsubscribe?email=${encodeURIComponent(email)}" style="color: #64748b; text-decoration: underline;">Unsubscribe</a>
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </body>
                </html>
              `,
              recipientName: name,
            })

          case "SMS":
            if (!phone) throw new Error("Phone required for SMS delivery")
            return sendSMS({
              to: phone,
              content: `You have received a confidential personal message via Proposal.love. 
Visit ${proposalUrl} to view. Msg&data rates may apply. Reply STOP to unsubscribe.`,
              recipientName: name,
            })
          
          case "WHATSAPP":
            if (!phone) throw new Error("Phone required for WhatsApp delivery")
            return sendWhatsApp({
              to: phone,
              content: `✨ A heartfelt message awaits you ✨

🎁 Someone special has created a beautiful proposal just for you.

💌 View your special message here:
${proposalUrl}

With love and anticipation,
Proposal.love`,
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

    // Update proposal status and deduct credit
    await prisma.$transaction([
      prisma.proposal.update({
        where: { id: proposalId },
        data: {
          status: "SENT",
          consentSentAt: new Date(),
          deliveryMethod: methods[0],
        },
      }),
      prisma.user.update({
        where: { id: session.user.id },
        data: {
          remainingCredits: {
            decrement: 1
          }
        }
      })
    ])

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