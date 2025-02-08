import { auth } from "@/auth"
import { prisma } from "@/prisma"
import { successResponse, errorResponse } from "@/lib/api-response"
import { NextRequest, NextResponse } from "next/server"
//  import OpenAI from "openai"
// import { ProposalStatus } from "@prisma/client"

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
  
// })

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return errorResponse("Unauthorized", 401)
    }

    const body = await req.json()
    console.log(body)
    const { content, font = "font-dancing-script" } = body

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
        proposalFont: font, // Save the selected font
      },
    })

    return successResponse(proposal)
  } catch (error) {
    console.error("Proposal creation error:", error)
    return errorResponse("Failed to create proposal")
  }
}

export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json({ 
        error: 'Unauthorized', 
        proposals: [] 
      }, { status: 401 })
    }

    const proposals = await prisma.proposal.findMany({
      where: {
        OR: [
          { senderId: session.user.id },
          { recipientEmail: session.user.email }
        ]
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Normalize the proposals data
    const normalizedProposals = proposals.map(proposal => ({
      id: proposal.id,
      message: proposal.message,
      customMessage: proposal.customMessage,
      createdAt: proposal.createdAt,
      expiresAt: proposal.expiresAt,
      status: proposal.status,
      isPrivate: proposal.isPrivate,
      sender: {
        id: proposal.sender.id,
        name: proposal.sender.name,
        email: proposal.sender.email
      },
      // recipient: proposal.recipient ? {
      //   name: proposal.recipient.name,
      //   email: proposal.recipient.email
      // } : null
    }))

    return NextResponse.json(normalizedProposals)
  } catch (error) {
    console.error('Error fetching proposals:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch proposals', 
      proposals: [] 
    }, { status: 500 })
  }
}
