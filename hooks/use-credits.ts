/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export function useCredits() {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const consumeCredit = async (
    action: () => Promise<any>, 
    options?: {
      creditCost?: number
      onSuccess?: (result: any) => void
      onError?: (error: any) => void
    }
  ) => {
    setLoading(true)
    try {
      const response = await fetch("/api/credits/consume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          creditCost: options?.creditCost || 1 
        })
      })

      const creditResult = await response.json()

      if (!creditResult.success) {
        // No credits available
        toast({
          title: "Credit Limit Reached",
          description: "You've used all your available credits. Please upgrade your plan.",
          variant: "destructive"
        })
        router.push("/pricing")
        return null
      }

      // Perform the actual action
      const result = await action()
      
      // Optional success callback
      options?.onSuccess?.(result)

      // Show credit consumption toast
      toast({
        title: "Credit Used",
        description: `Remaining Credits: ${creditResult.remainingCredits}`,
        variant: "default"
      })

      return result
    } catch (error) {
      console.error("Credit consumption error:", error)
      options?.onError?.(error)
      
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      })
      
      return null
    } finally {
      setLoading(false)
    }
  }

  return { consumeCredit, loading }
}
