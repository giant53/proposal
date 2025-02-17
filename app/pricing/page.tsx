/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { PricingCards } from "@/components/pricing/pricing-cards"
import { PricingHeader } from "@/components/pricing/pricing-header"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { StripePaymentForm } from "@/components/pricing/stripe-payment-form"
import { Heart, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import { User } from "@prisma/client"

export default function PricingPage() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const router = useRouter()
  const { data: session } = useSession()

  const handlePremiumClick = async (tier: string) => {
    try {
      const response = await fetch("/api/subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          priceId: tier === "PREMIUM" 
            ? process.env.NEXT_PUBLIC_STRIPE_PREMIUM_MONTHLY_PRICE_ID 
            : process.env.NEXT_PUBLIC_STRIPE_PREMIUM_YEARLY_PRICE_ID
        }),
      })

      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url
      } else if (data.clientSecret) {
        // Show inline payment form
        setClientSecret(data.clientSecret)
        setSelectedTier(tier)
      }
    } catch (error) {
      console.error("Subscription error:", error)
      toast.error("Failed to start subscription process")
    }
  }

  const handlePaymentSuccess = () => {
    toast.success("Subscription activated successfully!")
    setSelectedTier(null)
    setClientSecret(null)
    router.refresh()
  }

  const handlePaymentCancel = () => {
    setSelectedTier(null)
    setClientSecret(null)
  }

  // Convert session user to Prisma User type
  const user = session?.user ? {
    id: session.user.id,
    name: session.user.name ?? '',
    email: session.user.email ?? '',
    role: session.user.role,
    subscriptionTier: session.user.subscriptionTier,
    subscriptionStatus: session.user.subscriptionStatus,
    cancelAtPeriodEnd: session.user.cancelAtPeriodEnd,
    currentPeriodEnd: session.user.currentPeriodEnd,
    remainingCredits: session.user.remainingCredits,
    image: session.user.image,
    phone: session.user.phone ?? null,
  } as User : null

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-pink-50">
      <div className="container max-w-7xl mx-auto px-4 py-16">
        <PricingHeader />

        <PricingCards 
          user={user}
          onPremiumClick={handlePremiumClick}
          plans={[
            {
              tier: "FREE",
              name: "Free",
              description: "Perfect for trying out our proposal creation",
              price: 0,
              interval: "weekly",
              features: [
                "1 Proposal Credit Every 7 Days",
                "Basic AI Model",
                "Email Support",
                "Basic Templates",
                "7-day Proposal Expiry"
              ],
              credits: 1,
              highlight: false
            },
            {
              tier: "PREMIUM",
              name: "Premium",
              description: "For regular proposal creators",
              price: 7,
              interval: "monthly",
              features: [
                "10 Proposal Credits Monthly",
                "+ Free Tier Credits",
                "All AI Models",
                "Priority Support",
                "Premium Templates",
                "Custom Expiry Dates",
                "Analytics Dashboard"
              ],
              credits: 10,
              highlight: true
            },
            {
              tier: "YEARLY",
              name: "Yearly",
              description: "Best value for dedicated users",
              price: 50,
              interval: "yearly",
              features: [
                "10 Proposal Credits Monthly",
                "+ Free Tier Credits",
                "All Premium Features",
                "VIP Support",
                "Early Access Features",
                "Personal Success Manager",
                "2 Months Free!"
              ],
              credits: 10,
              highlight: false
            }
          ]}
        />

        {/* Credit Usage Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-16 text-center max-w-2xl mx-auto"
        >
          <div className="flex justify-center mb-4">
            <Sparkles className="w-8 h-8 text-rose-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Flexible Credit System
          </h3>
          <p className="text-gray-600">
            Credits are automatically renewed based on your plan:
            <br />
            Free: 1 credit every 7 days
            <br />
            Premium/Yearly: 10 credits every month + Free tier credits
          </p>
        </motion.div>

        {/* Payment Dialog */}
        <Dialog open={!!selectedTier && !!clientSecret} onOpenChange={() => setSelectedTier(null)}>
          <DialogContent className="sm:max-w-[500px]">
            <div className="space-y-6 py-4">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900">Complete Your Subscription</h2>
                <p className="mt-2 text-gray-600">
                  You&apos;re subscribing to the {selectedTier} plan
                </p>
              </div>
              {clientSecret && (
                <StripePaymentForm
                  clientSecret={clientSecret}
                  onSuccess={handlePaymentSuccess}
                  onCancel={handlePaymentCancel}
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
