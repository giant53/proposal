"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, Sparkles, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { SubscriptionTier, SubscriptionStatus, User } from "@prisma/client"
import { toast } from "sonner"
import { useState } from "react"

interface PricingCardsProps {
  user: User | null
  plans: {
    tier: string
    name: string
    description: string
    price: number
    interval: string
    features: string[]
    credits: number
    highlight: boolean
  }[]
  onPremiumClick: (tier: string) => void
}

export function PricingCards({ 
  user, 
  plans, 
  onPremiumClick 
}: PricingCardsProps) {
  const [loading, setLoading] = useState<string | null>(null)

  const handleSubscribe = async (tier: string) => {
    try {
      setLoading(tier)

      if (tier === "FREE") {
        // Handle free tier signup
        const response = await fetch("/api/subscriptions/free", {
          method: "POST",
        })

        const data = await response.json()
        
        if (data.error) {
          throw new Error(data.error)
        }

        toast.success("Free plan activated!")
        return
      }

      // Handle premium subscriptions
      onPremiumClick(tier)
    } catch (error) {
      console.error("Subscription error:", error)
      toast.error("Failed to process subscription")
    } finally {
      setLoading(null)
    }
  }

  const getButtonText = (plan: typeof plans[0]) => {
    if (loading === plan.tier) {
      return (
        <div className="flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          Processing...
        </div>
      )
    }

    if (!user) {
      return "Sign up"
    }

    if (user.subscriptionTier === plan.tier as SubscriptionTier) {
      if (user.cancelAtPeriodEnd) {
        return "Cancelled"
      }
      return "Current Plan"
    }

    if (plan.tier === "FREE") {
      return "Get Started Free"
    }

    if (user.subscriptionStatus === SubscriptionStatus.PAST_DUE) {
      return "Update Payment"
    }

    return "Subscribe"
  }

  const isButtonDisabled = (plan: typeof plans[0]) => {
    if (loading) return true
    if (!user) return false
    if (user.subscriptionTier === plan.tier as SubscriptionTier) return true
    if (user.subscriptionStatus === SubscriptionStatus.PAST_DUE) return false
    return false
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      {plans.map((plan, index) => (
        <motion.div
          key={plan.tier}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <Card className={cn(
            "relative flex flex-col p-6 sm:p-8 h-full",
            "transition-all duration-300 hover:shadow-lg",
            plan.highlight && "border-2 border-rose-500 shadow-lg"
          )}>
            {plan.highlight && (
              <div className="absolute -top-5 left-0 right-0 mx-auto w-fit">
                <span className="bg-rose-500 text-white text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1">
                  <Sparkles className="w-4 h-4" />
                  Most Popular
                </span>
              </div>
            )}

            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl font-bold">{plan.name}</h3>
              <p className="mt-2 text-muted-foreground text-sm sm:text-base">
                {plan.description}
              </p>
              
              <div className="mt-4">
                <span className="text-3xl sm:text-4xl font-bold">
                  ${plan.price}
                </span>
                <span className="text-muted-foreground">
                  /{plan.interval}
                </span>
              </div>

              <div className="mt-6 space-y-3 sm:space-y-4">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm sm:text-base">
                    <Check className="w-4 h-4 text-rose-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <Button 
                variant={plan.highlight ? "default" : "outline"}
                className={cn(
                  "w-full",
                  plan.highlight && "bg-rose-500 hover:bg-rose-600"
                )}
                onClick={() => handleSubscribe(plan.tier)}
                disabled={isButtonDisabled(plan)}
              >
                {getButtonText(plan)}
              </Button>
              
              {plan.tier === "FREE" && (
                <p className="mt-2 text-xs sm:text-sm text-center text-muted-foreground">
                  No credit card required
                </p>
              )}

              {user?.subscriptionTier === plan.tier && user.cancelAtPeriodEnd && (
                <p className="mt-2 text-xs sm:text-sm text-center text-rose-500">
                  Expires on {new Date(user.currentPeriodEnd!).toLocaleDateString()}
                </p>
              )}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
