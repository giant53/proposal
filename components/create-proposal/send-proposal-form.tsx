"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Loader2, Mail, Send } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { FaWhatsapp } from "react-icons/fa6"
import { SendProposalData } from "@/types/proposal"

interface SendProposalFormProps {
  onSubmit: (data: SendProposalData) => Promise<void>
  className?: string
}

type DeliveryMethod = "EMAIL" | "SMS" | "WHATSAPP"

export function SendProposalForm({ onSubmit, className }: SendProposalFormProps) {
  const [methods, setMethods] = useState<DeliveryMethod[]>([])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const toggleMethod = (method: DeliveryMethod) => {
    setMethods(prev => 
      prev.includes(method)
        ? prev.filter(m => m !== method)
        : [...prev, method]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (methods.length === 0) {
      setError("Please select at least one delivery method")
      return
    }
    setError(null)
    setIsSubmitting(true)

    try {
      await onSubmit({
        name,
        email: methods.includes("EMAIL") ? email : undefined,
        phone: methods.some(m => ["SMS", "WHATSAPP"].includes(m)) ? phone : undefined,
        methods,
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
          <Label>Delivery Methods (Select one or more)</Label>
          <div className="grid grid-cols-3 gap-4">
            <Button
              type="button"
              variant={methods.includes("EMAIL") ? "default" : "outline"}
              className={cn(
                "flex-col py-4 h-auto gap-2",
                methods.includes("EMAIL") && "bg-rose-500 hover:bg-rose-600"
              )}
              onClick={() => toggleMethod("EMAIL")}
            >
              <Mail className="w-5 h-5" />
              <span className="text-sm">Email</span>
            </Button>
            <Button
              type="button"
              variant={methods.includes("SMS") ? "default" : "outline"}
              className={cn(
                "flex-col py-4 h-auto gap-2",
                methods.includes("SMS") && "bg-rose-500 hover:bg-rose-600"
              )}
              onClick={() => toggleMethod("SMS")}
            >
              <Mail className="w-5 h-5" />
              <span className="text-sm">SMS</span>
            </Button>
            <Button
              type="button"
              variant={methods.includes("WHATSAPP") ? "default" : "outline"}
              className={cn(
                "flex-col py-4 h-auto gap-2",
                methods.includes("WHATSAPP") && "bg-rose-500 hover:bg-rose-600"
              )}
              onClick={() => toggleMethod("WHATSAPP")}
            >
              <FaWhatsapp className="w-5 h-5" />
              <span className="text-sm">WhatsApp</span>
            </Button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {methods.includes("EMAIL") && (
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
                required={methods.includes("EMAIL")}
                className="transition-all duration-200 focus:ring-rose-500"
              />
            </motion.div>
          )}
          {methods.some(m => ["SMS", "WHATSAPP"].includes(m)) && (
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
                required={methods.some(m => ["SMS", "WHATSAPP"].includes(m))}
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
        disabled={isSubmitting || methods.length === 0}
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
