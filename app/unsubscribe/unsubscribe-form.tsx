/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

export default function UnsubscribeForm({ email }: { email: string | undefined }) {
  const [reason, setReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleUnsubscribe = async () => {
    if (!email) {
      toast.error("Email is required")
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          reason,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to unsubscribe")
      }

      toast.success("Successfully unsubscribed from future proposals")
    } catch (error) {
      toast.error("Failed to unsubscribe. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
          Would you like to tell us why? (Optional)
        </label>
        <Textarea
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Your feedback helps us improve..."
          className="mt-1"
        />
      </div>

      <Button onClick={handleUnsubscribe} disabled={isSubmitting} className="w-full bg-rose-500 hover:bg-rose-600">
        {isSubmitting ? "Unsubscribing..." : "Confirm Unsubscribe"}
      </Button>
    </div>
  )
}

