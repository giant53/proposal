"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Loader2, Mail, MessageSquare, Send } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { FaWhatsapp } from "react-icons/fa6"

interface SendProposalFormProps {
  onSubmit: (data: {
    name: string
    email?: string
    phone?: string
    method: "EMAIL" | "SMS" | "WHATSAPP"
  }) => Promise<void>
  className?: string
}

export function SendProposalForm({ onSubmit, className }: SendProposalFormProps) {
  const [method, setMethod] = useState<"EMAIL" | "SMS" | "WHATSAPP">("EMAIL")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      await onSubmit({
        name,
        email: method === "EMAIL" ? email : undefined,
        phone: method === "SMS" || method === "WHATSAPP" ? phone : undefined,
        method,
      })
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to send proposal")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-6", className)}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Recipient&apos;s Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter their name"
            required
            className="transition-all duration-200 focus:ring-rose-500"
          />
        </div>

        <div className="space-y-2">
          <Label>Delivery Method</Label>
          <div className="grid grid-cols-3 gap-4">
            <Button
              type="button"
              variant={method === "EMAIL" ? "default" : "outline"}
              className={cn(
                "flex-col py-4 h-auto gap-2",
                method === "EMAIL" && "bg-rose-500 hover:bg-rose-600"
              )}
              onClick={() => setMethod("EMAIL")}
            >
              <Mail className="w-5 h-5" />
              <span className="text-sm">Email</span>
            </Button>
            <Button
              type="button"
              variant={method === "SMS" ? "default" : "outline"}
              className={cn(
                "flex-col py-4 h-auto gap-2",
                method === "SMS" && "bg-rose-500 hover:bg-rose-600"
              )}
              onClick={() => setMethod("SMS")}
            >
              <MessageSquare className="w-5 h-5" />
              <span className="text-sm">SMS</span>
            </Button>
            <Button
              type="button"
              variant={method === "WHATSAPP" ? "default" : "outline"}
              className={cn(
                "flex-col py-4 h-auto gap-2",
                method === "WHATSAPP" && "bg-rose-500 hover:bg-rose-600"
              )}
              onClick={() => setMethod("WHATSAPP")}
            >
              <FaWhatsapp className="w-5 h-5" />
              <span className="text-sm">WhatsApp</span>
            </Button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {method === "EMAIL" ? (
            <motion.div
              key="email"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-2"
            >
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter their email"
                required
                className="transition-all duration-200 focus:ring-rose-500"
              />
            </motion.div>
          ) : (
            <motion.div
              key="phone"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-2"
            >
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter their phone number"
                required
                className="transition-all duration-200 focus:ring-rose-500"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-rose-500 hover:bg-rose-600"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Send Proposal
          </>
        )}
      </Button>
    </form>
  )
}
