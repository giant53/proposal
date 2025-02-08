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
              subject: "A Special Message for You 💝",
              content: `
                <!DOCTYPE html>
                <html>
                <head>
                  <meta charset="utf-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>A Special Message</title>
                </head>
                <body style="margin: 0; padding: 0; background-color: #fdf2f4;">
                  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 20px auto; background: linear-gradient(to bottom right, #ffffff, #fff1f2); border-radius: 20px; box-shadow: 0 8px 20px rgba(225, 29, 72, 0.1); padding: 40px; text-align: center;">
                    
                    <!-- Header with animated hearts (using background image) -->
                    <div style="background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI2UxMWQ0OCIgZD0iTTEyIDIxLjM1bC0xLjQ1LTEuMzJDNS40IDE1LjM2IDIgMTIuMjggMiA4LjUgMiA1LjQyIDQuNDIgMyA3LjUgM2MxLjc0IDAgMy40MS44MSA0LjUgMi4wOUMxMy4wOSAzLjgxIDE0Ljc2IDMgMTYuNSAzIDE5LjU4IDMgMjIgNS40MiAyMiA4LjVjMCAzLjc4LTMuNCA2Ljg2LTguNTUgMTEuNTRMMTIgMjEuMzV6Ii8+PC9zdmc+'); height: 60px; background-repeat: no-repeat; background-position: center; background-size: contain; margin-bottom: 30px;">
                    </div>

                    <!-- Main Heading -->
                    <h1 style="color: #e11d48; font-size: 28px; margin: 0 0 30px 0; font-weight: 700; text-shadow: 1px 1px 2px rgba(0,0,0,0.1);">
                      A Surprise sent at speed of light Just for You
                    </h1>

                    <!-- Romantic Border Container -->
                    <div style="background: linear-gradient(135deg, #fff5f6, #fecdd3); padding: 30px; border-radius: 15px; border: 2px solid rgba(225, 29, 72, 0.1); margin: 20px 0;">
                      <p style="color: #881337; font-size: 18px; line-height: 1.6; margin-bottom: 25px; font-weight: 500;">
                        Dearest ${name},
                      </p>
                      <p style="color: #9f1239; font-size: 17px; line-height: 1.7; margin-bottom: 25px;">
                        Someone is overflowing with feelings they can no longer keep hidden...
                      </p>
                      <p style="color: #9f1239; font-size: 17px; line-height: 1.7;">
                        They've created something special, just for your eyes 💝
                      </p>
                    </div>

                    <!-- CTA Button -->
                    <div style="margin: 35px 0;">
                      <a href="${proposalUrl}" 
                         style="background: linear-gradient(135deg, #e11d48, #be123c); 
                                color: white; 
                                padding: 16px 35px; 
                                text-decoration: none; 
                                border-radius: 30px; 
                                font-weight: bold; 
                                font-size: 18px;
                                display: inline-block; 
                                transition: all 0.3s ease;
                                box-shadow: 0 4px 15px rgba(225, 29, 72, 0.2);">
                        Unveil Your Special Message ✨
                      </a>
                    </div>

                    <!-- Decorative Elements -->
                    <div style="color: #e11d48; font-size: 24px; margin: 30px 0;">
                      ✨ 💝 ✨
                    </div>

                    <!-- Footer -->
                    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(225, 29, 72, 0.1);">
                      <p style="color: #9f1239; font-size: 14px; margin-bottom: 15px;">
                        Delivered with love by Proposal.love
                      </p>
                      <p style="color: #9f1239; font-size: 8px;">
                        <a href="${process.env.NEXT_PUBLIC_APP_URL}/unsubscribe?email=${encodeURIComponent(email)}" 
                           style="color: #9f1239; text-decoration: underline;">
                          Unsubscribe from future proposals
                        </a>
                      </p>
                    </div>
                  </div>
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
              content: `Confidential Personal Message 🔒

A message has been sent to you via Proposal.love. This is a private communication.

View your message: ${proposalUrl}

Privacy Notice: If this message was sent to you by mistake, please delete it immediately.

To stop receiving messages, reply STOP.`,
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