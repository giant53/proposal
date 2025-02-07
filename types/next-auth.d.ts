/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { DefaultSession } from "next-auth"
import { Role } from "@prisma/client"

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
  }
}