import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
  appInfo: {
    name: 'MyProposal.app',
    version: '0.1.0'
  }
})

export const SUBSCRIPTION_TIERS = {
  FREE: 'FREE',
  PREMIUM: 'PREMIUM',
  YEARLY: 'YEARLY'
} as const

export const SUBSCRIPTION_PRICES = {
  PREMIUM_MONTHLY: process.env.STRIPE_PREMIUM_MONTHLY_PRICE_ID!,
  PREMIUM_YEARLY: process.env.STRIPE_PREMIUM_YEARLY_PRICE_ID!
} as const

export const SUBSCRIPTION_CREDITS = {
  FREE: 1,
  PREMIUM: 10,
  YEARLY: 10
} as const

export const CREDIT_RESET_INTERVALS = {
  FREE: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  PREMIUM: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
  YEARLY: 30 * 24 * 60 * 60 * 1000 // 30 days in milliseconds
} as const

export const getNextCreditResetDate = (tier: keyof typeof SUBSCRIPTION_CREDITS) => {
  const now = new Date()
  const interval = CREDIT_RESET_INTERVALS[tier]
  return new Date(now.getTime() + interval)
}

export const calculateRemainingCredits = (
  tier: keyof typeof SUBSCRIPTION_CREDITS,
  lastResetDate: Date,
  currentCredits: number
) => {
  const now = new Date()
  const interval = CREDIT_RESET_INTERVALS[tier]
  const resetCount = Math.floor((now.getTime() - lastResetDate.getTime()) / interval)
  
  if (resetCount > 0) {
    return SUBSCRIPTION_CREDITS[tier]
  }
  
  return currentCredits
}
