/* eslint-disable @typescript-eslint/no-unused-vars */
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/prisma'
import Stripe from 'stripe'
import { SubscriptionStatus, SubscriptionTier } from '@prisma/client'
import { SUBSCRIPTION_CREDITS, CREDIT_RESET_INTERVALS } from '@/lib/stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = (await headers()).get('stripe-signature')

  if (!signature) {
    return new NextResponse('No signature', { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error) {
    return new NextResponse('Invalid signature', { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session
  const subscription = event.data.object as Stripe.Subscription
  const customer = event.data.object as Stripe.Customer

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        // Update user subscription status
        if (session.subscription && session.customer) {
          const stripeCustomerId = session.customer as string
          
          // Find user by Stripe customer ID
          const user = await prisma.user.findFirst({
            where: { 
              customerId: stripeCustomerId 
            }
          })

          if (user) {
            await prisma.user.update({
              where: { id: user.id },
              data: {
                subscriptionId: session.subscription as string,
                subscriptionStatus: SubscriptionStatus.ACTIVE,
                subscriptionTier: SubscriptionTier.PREMIUM,
                remainingCredits: SUBSCRIPTION_CREDITS.PREMIUM,
                currentPeriodStart: new Date(),
                currentPeriodEnd: new Date(Date.now() + CREDIT_RESET_INTERVALS.PREMIUM),
                lastCreditReset: new Date(),
                customerId: stripeCustomerId
              },
            })
          }
        }
        break

      case 'customer.subscription.updated':
        // Handle subscription updates
        if (subscription.status === 'active') {
          const user = await prisma.user.findFirst({
            where: { 
              subscriptionId: subscription.id 
            }
          })

          if (user) {
            await prisma.user.update({
              where: { id: user.id },
              data: {
                subscriptionStatus: SubscriptionStatus.ACTIVE,
                cancelAtPeriodEnd: subscription.cancel_at_period_end,
                currentPeriodStart: new Date(subscription.current_period_start * 1000),
                currentPeriodEnd: new Date(subscription.current_period_end * 1000),
              },
            })
          }
        }
        break

      case 'customer.subscription.deleted':
        // Handle subscription cancellation
        const cancelledUser = await prisma.user.findFirst({
          where: { 
            subscriptionId: subscription.id 
          }
        })

        if (cancelledUser) {
          await prisma.user.update({
            where: { id: cancelledUser.id },
            data: {
              subscriptionStatus: SubscriptionStatus.CANCELLED,
              subscriptionTier: SubscriptionTier.FREE,
              remainingCredits: SUBSCRIPTION_CREDITS.FREE,
              subscriptionId: null,
              currentPeriodStart: null,
              currentPeriodEnd: null,
            },
          })
        }
        break

      case 'customer.deleted':
        // Handle customer deletion
        const deletedUser = await prisma.user.findFirst({
          where: { 
            customerId: customer.id 
          }
        })

        if (deletedUser) {
          await prisma.user.update({
            where: { id: deletedUser.id },
            data: {
              customerId: null,
              subscriptionId: null,
              subscriptionStatus: SubscriptionStatus.INACTIVE,
              subscriptionTier: SubscriptionTier.FREE,
              remainingCredits: SUBSCRIPTION_CREDITS.FREE,
            },
          })
        }
        break
    }

    return new NextResponse(null, { status: 200 })
  } catch (error) {
    console.error('Stripe webhook error:', error)
    return new NextResponse('Webhook error', { status: 400 })
  }
}
