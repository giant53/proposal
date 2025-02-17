/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { PricingCards } from "@/components/pricing/pricing-cards"
import { PricingHeader } from "@/components/pricing/pricing-header"
import { PremiumWaitlistDialog } from "@/components/pricing/premium-waitlist-dialog"
import { Heart } from "lucide-react"
import { useSession } from "next-auth/react"
import { STRIPE_PRICE_IDS } from "@/lib/stripe"
import { PricingPlan } from "@/types/pricing"

const pricingPlans: PricingPlan[] = [
  {
    tier: "FREE",
    name: "Free",
    description: "Perfect for trying out our proposal creation",
    price: 0,
    interval: "monthly",
    features: [
      "1 Proposal Credit per Week",
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
      "All AI Models",
      "Priority Support",
      "Premium Templates",
      "Custom Expiry Dates",
      "Analytics Dashboard",
      "Customizable Branding"
    ],
    credits: 10,
    highlight: true,
    priceId: STRIPE_PRICE_IDS.PREMIUM_MONTHLY
  },
  {
    tier: "YEARLY",
    name: "Yearly",
    description: "Best value for serious creators",
    price: 50,
    interval: "yearly",
    features: [
      "10 Proposal Credits Monthly",
      "All Premium Features",
      "VIP Support",
      "Early Access to New Features",
      "Personal Success Manager",
      "Custom AI Model Training",
      "API Access"
    ],
    credits: 10,
    highlight: false,
    priceId: STRIPE_PRICE_IDS.PREMIUM_YEARLY
  }
]

export default function PricingPage() {
  const { data: session } = useSession()
  const [selectedTier, setSelectedTier] = useState<string | null>(null)

  const handlePremiumClick = (tier: string) => {
    setSelectedTier(tier)
  }

  const handleDialogClose = () => {
    setSelectedTier(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-pink-50">
      <div className="container max-w-7xl mx-auto px-4 py-16">
        <PricingHeader />

        <PricingCards 
          user={session?.user}
          plans={pricingPlans}
          onPremiumClick={handlePremiumClick}
        />

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-16 text-center max-w-2xl mx-auto"
        >
          <div className="flex justify-center mb-4">
            <Heart className="w-8 h-8 text-rose-500 animate-pulse" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Why Choose Premium?
          </h3>
          <p className="text-gray-600">
            Unlock advanced features, get more credits, and create unlimited proposals.
            Our premium plans are designed to help you create the perfect proposal every time.
          </p>
        </motion.div>

        {/* Premium Waitlist Dialog */}
        {selectedTier && (
          <PremiumWaitlistDialog 
            isOpen={!!selectedTier} 
            onClose={handleDialogClose} 
            tier={selectedTier} 
          />
        )}
      </div>
    </div>
  )
}
