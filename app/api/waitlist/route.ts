import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/prisma"
import { z } from "zod"

const waitlistSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(1, "Name is required"),
  source: z.string().optional(),
  reason: z.string().optional(),
  country: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const validatedData = waitlistSchema.parse(body)

    // Check if email already exists
    const existingSubscriber = await prisma.waitlistSubscriber.findUnique({
      where: { email: validatedData.email },
    })

    if (existingSubscriber) {
      return NextResponse.json(
        { 
          message: "You're already on our waitlist! We'll notify you when we launch." 
        },
        { status: 200 }
      )
    }

    // Create new waitlist subscriber
    const subscriber = await prisma.waitlistSubscriber.create({
      data: {
        ...validatedData,
        country: "IN", // Default to India since this is for Indian users
      },
    })

    return NextResponse.json(
      { 
        message: "Successfully joined the waitlist",
        data: { id: subscriber.id } 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Waitlist error:", error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid data provided", errors: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: "Failed to join waitlist" },
      { status: 500 }
    )
  }
}
