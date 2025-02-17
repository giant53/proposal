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

    // Check user credits
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    })

    if (!user || user.remainingCredits < 1) {
      return errorResponse("Insufficient credits to send proposal")
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

    // Start a transaction to handle proposal sending and credit deduction
    await prisma.$transaction(async (tx) => {
      // Update proposal with secret hash and status
      await tx.proposal.update({
        where: { id: proposalId },
        data: { 
          secretHash,
          status: "SENT",
          consentSentAt: new Date(),
          deliveryMethod: methods[0]
        },
      })

      // Deduct credit
      await tx.user.update({
        where: { id: session.user.id },
        data: {
          remainingCredits: {
            decrement: 1
          }
        }
      })

      // Create audit log
      await tx.auditLog.create({
        data: {
          userId: session.user.id,
          action: "PROPOSAL_SENT",
          details: {
            proposalId,
            successfulMethods: methods,
            creditsUsed: 1
          },
        },
      })
    })

    const proposalUrl = `${process.env.NEXT_PUBLIC_APP_URL}/proposals/${proposalId}?secretCode=${secretHash}`

    // Send proposal through selected channels
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
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="color-scheme" content="light">
    <meta name="supported-color-schemes" content="light">
    <title>A Special Message</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
    <style>
        /* Reset styles */
        body, #bodyTable { 
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            height: 100% !important;
        }
        
        /* Ensure Outlook renders backgrounds */
        body, table, td, div, p, a {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        
        /* Responsive styles */
        @media screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
            }
            .fluid {
                max-width: 100% !important;
                height: auto !important;
                margin-left: auto !important;
                margin-right: auto !important;
            }
            .stack-column {
                display: block !important;
                width: 100% !important;
                max-width: 100% !important;
                direction: ltr !important;
            }
            .center-on-mobile {
                text-align: center !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; width: 100%; background-color: #fdf2f4; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
    <!-- Hidden preheader text -->
    <div style="display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all;">
        Someone has a special message waiting for you... 
    </div>

    <center style="width: 100%; background: #fdf2f4; text-align: left;">
        <div style="max-width: 600px; margin: auto;" class="email-container">
            <!--[if mso]>
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" align="center">
            <tr>
            <td>
            <![endif]-->
            
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 600px; margin: auto;">
                <tr>
                    <td style="padding: 20px 0; text-align: center">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                                <td style="background: #ffffff; border-radius: 20px; padding: 40px 20px; text-align: center;">
                                    <!-- Heart Icon -->
                                    <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI2UxMWQ0OCIgZD0iTTEyIDIxLjM1bC0xLjQ1LTEuMzJDNS40IDE1LjM2IDIgMTIuMjggMiA4LjUgMiA1LjQyIDQuNDIgMyA3LjUgM2MxLjc0IDAgMy40MS44MSA0LjUgMi4wOUMxMy4wOSAzLjgxIDE0Ljc2IDMgMTYuNSAzIDE5LjU4IDMgMjIgNS40MiAyMiA4LjVjMCAzLjc4LTMuNCA2Ljg2LTguNTUgMTEuNTRMMTIgMjEuMzV6Ii8+PC9zdmc+" width="60" height="60" alt="Heart" style="margin-bottom: 30px;">
                                    
                                    <!-- Main Heading -->
                                    <h1 style="color: #e11d48; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 28px; line-height: 36px; margin: 0 0 30px 0; font-weight: 700;">
                                        A Surprise sent at speed of light Just for You
                                    </h1>

                                    <!-- Message Container -->
                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                        <tr>
                                            <td style="background: #fff5f6; padding: 30px; border-radius: 15px; border: 2px solid #fecdd3;">
                                                <p style="color: #881337; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 18px; line-height: 1.6; margin: 0 0 25px 0; font-weight: 500;">
                                                    Dearest ${name},
                                                </p>
                                                <p style="color: #9f1239; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 17px; line-height: 1.7; margin: 0 0 25px 0;">
                                                    Someone has created something special, just for your eyes 💝
                                                </p>
                                            </td>
                                        </tr>
                                    </table>

                                    <!-- CTA Button -->
                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 35px auto;">
                                        <tr>
                                            <td style="border-radius: 30px; background: #e11d48;">
                                                <a href="${proposalUrl}" 
                                                   style="background: #e11d48; border: 15px solid #e11d48; color: #ffffff; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 18px; line-height: 1.1; text-align: center; text-decoration: none; display: block; border-radius: 30px; font-weight: bold;">
                                                    <!--[if mso]>&nbsp;&nbsp;&nbsp;&nbsp;<![endif]-->
                                                    Unveil Your Special Message ✨
                                                    <!--[if mso]>&nbsp;&nbsp;&nbsp;&nbsp;<![endif]-->
                                                </a>
                                            </td>
                                        </tr>
                                    </table>

                                    <!-- Decorative Elements -->
                                    <div style="color: #e11d48; font-size: 24px; margin: 30px 0;">
                                        ✨ 💝 ✨
                                    </div>

                                    <!-- Footer -->
                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                        <tr>
                                            <td style="padding: 20px 0 0 0; border-top: 1px solid #fecdd3;">
                                                <p style="color: #9f1239; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 14px; margin: 0 0 15px 0;">
                                                    Delivered with love by Proposal.love
                                                </p>
                                                <p style="color: #9f1239; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 12px; margin: 0;">
                                                    <a href="${process.env.NEXT_PUBLIC_APP_URL}/unsubscribe?email=${encodeURIComponent(email)}" 
                                                       style="color: #9f1239; text-decoration: underline;">
                                                        Unsubscribe from future proposals
                                                    </a>
                                                </p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            <!--[if mso]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </div>
    </center>
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
      message: "Proposal sent successfully through all channels",
      remainingCredits: user.remainingCredits - 1
    })
  } catch (error) {
    console.error("Error sending proposal:", error)
    return errorResponse("Failed to send proposal", 500)
  }
}