"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface PricingCardsProps {
  user: {
    subscriptionTier: string
    subscriptionStatus?: string
    remainingCredits: number
    currentPeriodEnd?: Date
  } | null
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
}

export function PricingCards({ user, plans }: PricingCardsProps) {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)

  const onSubscribe = async (planId: string) => {
    try {
      setLoading(planId)
      const response = await fetch("/api/subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId })
      })

      const data = await response.json()
      if (data.url) {
        router.push(data.url)
      }
    } catch (error) {
      console.error("Subscription error:", error)
    } finally {
      setLoading(null)
    }
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
            "relative flex flex-col p-8 h-full",
            plan.highlight && "border-2 border-primary shadow-lg"
          )}>
            {plan.highlight && (
              <div className="absolute -top-5 left-0 right-0 mx-auto w-fit">
                <span className="bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1">
                  <Sparkles className="w-4 h-4" />
                  Most Popular
                </span>
              </div>
            )}

            <div className="flex-1">
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <p className="mt-2 text-muted-foreground">{plan.description}</p>
              
              <div className="mt-4">
                <span className="text-4xl font-bold">${plan.price}</span>
                {plan.interval !== "lifetime" && (
                  <span className="text-muted-foreground">/{plan.interval}</span>
                )}
              </div>

              <div className="mt-6 space-y-4">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              {user?.subscriptionTier === plan.tier ? (
                <Button className="w-full" disabled>
                  Current Plan
                </Button>
              ) : (
                <Button 
                  variant={plan.highlight ? "default" : "outline"}
                  className="w-full"
                  onClick={() => onSubscribe(plan.tier)}
                  disabled={loading === plan.tier}
                >
                  {loading === plan.tier ? (
                    "Processing..."
                  ) : plan.interval === "lifetime" ? (
                    "Get Lifetime Access"
                  ) : (
                    `Get Started${plan.price === 0 ? "" : ` - $${plan.price}/${plan.interval}`}`
                  )}
                </Button>
              )}
              {plan.interval !== "lifetime" && (
                <p className="mt-2 text-sm text-center text-muted-foreground">
                  Cancel anytime
                </p>
              )}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
