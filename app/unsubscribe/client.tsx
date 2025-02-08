/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

interface UnsubscribeClientProps {
  email?: string
}

export default function UnsubscribeClient({ email }: UnsubscribeClientProps) {
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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Unsubscribe</h2>
          <p className="mt-2 text-gray-600">
            We&apos;re sorry to see you go. You will no longer receive proposal
            notifications at {email}.
          </p>
        </div>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="reason"
              className="block text-sm font-medium text-gray-700"
            >
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
          <Button
            onClick={handleUnsubscribe}
            disabled={isSubmitting}
            className="w-full bg-rose-500 hover:bg-rose-600"
          >
            {isSubmitting ? "Unsubscribing..." : "Confirm Unsubscribe"}
          </Button>
        </div>
        <p className="mt-4 text-center text-sm text-gray-500">
          If you change your mind, you can always resubscribe by accepting a new
          proposal.
        </p>
      </div>
    </div>
  )
}