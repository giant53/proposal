/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { PricingCards } from "@/components/pricing/pricing-cards"
import { PricingHeader } from "@/components/pricing/pricing-header"
import { PremiumWaitlistDialog } from "@/components/pricing/premium-waitlist-dialog"
import { Heart, Sparkles } from "lucide-react"

export default function PricingPage() {
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
          user={null}
          onPremiumClick={handlePremiumClick}
          plans={[
            {
              tier: "FREE",
              name: "Free",
              description: "Perfect for trying out our proposal creation",
              price: 0,
              interval: "yearly",
              features: [
                "1 Proposal Credit per Year",
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
              description: "Coming soon to India!",
              price: 7.77,
              interval: "monthly",
              features: [
                "7 Proposal Credits Monthly",
                "All AI Models",
                "Priority Support",
                "Premium Templates",
                "Custom Expiry Dates",
                "Analytics Dashboard",
                "Customizable Branding"
              ],
              credits: 7,
              highlight: true
            },
            {
              tier: "YEARLY",
              name: "Lifetime",
              description: "One-time purchase, coming soon!",
              price: 100,
              interval: "lifetime",
              features: [
                "7 Proposal Credits Monthly",
                "All Premium Features",
                "VIP Support",
                "Early Access to New Features",
                "Personal Success Manager",
                "Custom AI Model Training",
                "API Access"
              ],
              credits: 7,
              highlight: false
            }
          ]}
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
            Why Join the Waitlist?
          </h3>
          <p className="text-gray-600">
            Be the first to access our premium features when they launch in India.
            Get exclusive early-bird pricing and special bonuses for being an early supporter!
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
