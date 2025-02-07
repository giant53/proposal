/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { DefaultSession } from "next-auth"
import { Role, SubscriptionTier, SubscriptionStatus } from "@prisma/client"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: Role
      email: string
      name: string
      image?: string | null
      phone?: string | null
      emailVerified?: Date | null

      // Subscription-related fields
      subscriptionTier: SubscriptionTier
      subscriptionStatus?: SubscriptionStatus
      remainingCredits: number
      currentPeriodStart?: Date | null
      currentPeriodEnd?: Date | null
      cancelAtPeriodEnd?: boolean
      customerId?: string | null
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    role: Role
    name: string
    email: string
    image?: string | null
    phone?: string | null
    emailVerified?: Date | null
    OAuthId?: string | null
    hashedPassword?: string | null

    // Subscription-related fields
    subscriptionTier: SubscriptionTier
    subscriptionStatus?: SubscriptionStatus
    remainingCredits: number
    currentPeriodStart?: Date | null
    currentPeriodEnd?: Date | null
    cancelAtPeriodEnd?: boolean
    customerId?: string | null
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: Role
    email: string
    name: string
    image?: string | null
    phone?: string | null
    emailVerified?: Date | null

    // Subscription-related fields
    subscriptionTier: SubscriptionTier
    subscriptionStatus?: SubscriptionStatus
    remainingCredits: number
    currentPeriodStart?: Date | null
    currentPeriodEnd?: Date | null
    cancelAtPeriodEnd?: boolean
    customerId?: string | null
  }
}