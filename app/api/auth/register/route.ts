import { prisma } from "@/prisma";
import { Role, SubscriptionStatus, SubscriptionTier } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
        role: Role.USER,
        subscriptionTier: SubscriptionTier.FREE,
        subscriptionStatus: SubscriptionStatus.INACTIVE,
        remainingCredits: 1,
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
        cancelAtPeriodEnd: false,
      },
    });

    return NextResponse.json(
      {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
