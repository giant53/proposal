/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { formatDate } from "@/lib/utils"
import { CreditCard, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface ManageSubscriptionProps {
  subscription: {
    tier: string
    status?: string
    currentPeriodEnd?: Date
    remainingCredits: number
    maxCredits: number
  }
}

export function ManageSubscription({ subscription }: ManageSubscriptionProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const onManageSubscription = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/subscriptions/manage", {
        method: "POST"
      })
      const data = await response.json()
      
      if (data.url) {
        router.push(data.url)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to manage subscription. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Subscription</CardTitle>
        <CardDescription>
          Manage your subscription and proposal credits
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">
              {subscription.remainingCredits} credits remaining
            </span>
            <span className="text-sm text-muted-foreground">
              Resets {subscription.currentPeriodEnd ? 
                formatDate(subscription.currentPeriodEnd) : 
                "annually"}
            </span>
          </div>
          <Progress 
            value={(subscription.remainingCredits / subscription.maxCredits) * 100} 
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Plan</span>
            <span>{subscription.tier}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Status</span>
            <span className="capitalize">{subscription.status?.toLowerCase() || "Active"}</span>
          </div>
          {subscription.currentPeriodEnd && (
            <div className="flex justify-between">
              <span className="font-medium">Next billing date</span>
              <span>{formatDate(subscription.currentPeriodEnd)}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full"
          variant="outline"
          onClick={onManageSubscription}
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <CreditCard className="w-4 h-4 mr-2" />
          )}
          Manage Subscription
        </Button>
      </CardFooter>
    </Card>
  )
}
