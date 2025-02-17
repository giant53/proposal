import { SubscriptionTier, SubscriptionStatus } from "@prisma/client"

export interface PricingPlan {
  tier: SubscriptionTier
  name: string
  description: string
  price: number
  interval: "monthly" | "yearly" | "lifetime"
  features: string[]
  credits: number
  highlight: boolean
  priceId?: string
}

export interface SubscriptionData {
  subscriptionId: string
  clientSecret: string
}

export interface UserSubscription {
  tier: SubscriptionTier
  status: SubscriptionStatus
  currentPeriodEnd: Date | null
  remainingCredits: number
}
