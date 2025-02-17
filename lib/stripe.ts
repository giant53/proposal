import Stripe from 'stripe'

// Server-side Stripe instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-01-27.acacia',
  typescript: true,
})

// Constants for Stripe Price IDs
export const STRIPE_PRICE_IDS = {
  PREMIUM_MONTHLY: process.env.STRIPE_PREMIUM_MONTHLY_PRICE_ID!,
  PREMIUM_YEARLY: process.env.STRIPE_PREMIUM_YEARLY_PRICE_ID!,
} as const

export const getStripeCustomer = async (customerId: string) => {
  try {
    return await stripe.customers.retrieve(customerId)
  } catch (error) {
    console.error('Error retrieving Stripe customer:', error)
    return null
  }
}

export const createStripeCustomer = async (email: string, name: string) => {
  try {
    return await stripe.customers.create({
      email,
      name,
      metadata: {
        source: 'myproposal.app'
      }
    })
  } catch (error) {
    console.error('Error creating Stripe customer:', error)
    return null
  }
}

export const createStripeSubscription = async (
  customerId: string,
  priceId: string,
) => {
  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    })
    return subscription
  } catch (error) {
    console.error('Error creating Stripe subscription:', error)
    return null
  }
}

export const cancelStripeSubscription = async (subscriptionId: string) => {
  try {
    return await stripe.subscriptions.cancel(subscriptionId)
  } catch (error) {
    console.error('Error canceling Stripe subscription:', error)
    return null
  }
}
