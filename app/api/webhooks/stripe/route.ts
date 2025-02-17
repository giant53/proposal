import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/prisma'
import Stripe from 'stripe'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const signature = (await headers()).get('Stripe-Signature') as string

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (error) {
      console.error('Webhook signature verification failed:', error)
      return new NextResponse('Webhook Error', { status: 400 })
    }

    const session = event.data.object as Stripe.Subscription

    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        // Handle subscription updates
        await handleSubscriptionChange(session)
        break

      case 'customer.subscription.deleted':
        // Handle subscription cancellation
        await handleSubscriptionCancellation(session)
        break

      case 'invoice.payment_succeeded':
        // Handle successful payments and credit updates
        await handleSuccessfulPayment(session)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return new NextResponse(null, { status: 200 })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return new NextResponse('Webhook Error', { status: 500 })
  }
}

async function handleSubscriptionChange(session: Stripe.Subscription) {
  const customerId = session.customer as string
  const user = await prisma.user.findFirst({
    where: { customerId }
  })

  if (!user) {
    console.error('User not found for customer:', customerId)
    return
  }

  // Calculate credits based on plan
  const baseCredits = session.items.data[0].price.lookup_key?.includes('yearly') ? 10 : 10
  const freeCredits = 1 // Free tier credits

  await prisma.user.update({
    where: { id: user.id },
    data: {
      subscriptionId: session.id,
      subscriptionStatus: session.status === 'active' ? 'ACTIVE' : 'PAST_DUE',
      subscriptionTier: session.items.data[0].price.lookup_key?.includes('yearly') ? 'YEARLY' : 'PREMIUM',
      currentPeriodStart: new Date(session.current_period_start * 1000),
      currentPeriodEnd: new Date(session.current_period_end * 1000),
      remainingCredits: baseCredits + freeCredits,
      lastCreditReset: new Date(),
    }
  })
}

async function handleSubscriptionCancellation(session: Stripe.Subscription) {
  const customerId = session.customer as string
  const user = await prisma.user.findFirst({
    where: { customerId }
  })

  if (!user) return

  await prisma.user.update({
    where: { id: user.id },
    data: {
      subscriptionStatus: 'CANCELLED',
      subscriptionTier: 'FREE',
      remainingCredits: 1, // Reset to free tier credits
      currentPeriodEnd: null,
      currentPeriodStart: null,
      subscriptionId: null,
    }
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleSuccessfulPayment(session: any) {
  const customerId = session.customer as string
  const user = await prisma.user.findFirst({
    where: { customerId }
  })

  if (!user) return

  // Create a transaction record
  await prisma.transaction.create({
    data: {
      userId: user.id,
      amount: session.amount_paid / 100, // Convert from cents
      currency: session.currency,
      status: 'success',
      paymentMethod: session.payment_method_types[0],
      paymentIntentId: session.payment_intent,
      tier: user.subscriptionTier,
    }
  })
}
