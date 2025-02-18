import { auth } from "@/auth"
import { prisma } from "@/prisma"
import { AuditAction } from "@prisma/client"
import { NextRequest } from "next/server"
import * as z from "zod"

const profileSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  phone: z.string().optional(),
  image: z.string().url().optional(),
})

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const validatedData = profileSchema.parse(body)

    // Check if email is being changed and if it's already in use
    if (validatedData.email !== session.user.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email: validatedData.email },
      })
      if (existingUser) {
        return Response.json(
          { error: "Email already in use" },
          { status: 400 }
        )
      }
    }

    // Check if phone is being changed and if it's already in use
    if (validatedData.phone) {
      const existingUser = await prisma.user.findUnique({
        where: { phone: validatedData.phone },
      })
      if (existingUser && existingUser.id !== session.user.id) {
        return Response.json(
          { error: "Phone number already in use" },
          { status: 400 }
        )
      }
    }

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        image: validatedData.image,
      },
    })

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: AuditAction.PROFILE_UPDATED,
        details: {
          changes: {
            name: validatedData.name !== session.user.name,
            email: validatedData.email !== session.user.email,
            phone: validatedData.phone !== session.user.phone,
            image: validatedData.image !== session.user.image,
          },
        },
      },
    })

    return Response.json(
      { message: "Profile updated successfully", user: updatedUser },
      { status: 200 }
    )
  } catch (error) {
    console.error("Profile update error:", error)
    if (error instanceof z.ZodError) {
      return Response.json(
        { error: "Invalid data", details: error.errors },
        { status: 400 }
      )
    }
    return Response.json(
      { error: "Failed to update profile" },
      { status: 500 }
    )
  }
}
