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
    setMethods(prev => {
      const methodExists = prev.includes(method)
      if (methodExists) {
        return prev.filter(m => m !== method)
      }
      return [...prev, method]
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (methods.length === 0) {
      setError("Please select at least one delivery method")
      return
    }

    // Validate required fields based on selected methods
    if (methods.includes("EMAIL") && !email) {
      setError("Email is required for email delivery")
      return
    }
    if ((methods.includes("SMS") || methods.includes("WHATSAPP")) && !phone) {
      setError("Phone number is required for SMS/WhatsApp delivery")
      return
    }

    setError(null)
    setIsSubmitting(true)

    try {
      await onSubmit({
        name,
        email,
        phone,
        methods,
      })
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to send proposal")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4 sm:space-y-6", className)}>
      <div className="space-y-3 sm:space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm sm:text-base">Recipient&apos;s Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter their name"
            required
            className="transition-all duration-200 focus:ring-rose-500 text-sm sm:text-base p-2 sm:p-3"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm sm:text-base">Delivery Methods (Select one or more)</Label>
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <Button
              type="button"
              variant={methods.includes("EMAIL") ? "default" : "outline"}
              className={cn(
                "flex-col py-2 sm:py-4 h-auto gap-1 sm:gap-2 text-xs sm:text-sm",
                methods.includes("EMAIL") && "bg-rose-500 hover:bg-rose-600"
              )}
              onClick={() => toggleMethod("EMAIL")}
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Email</span>
            </Button>
            <motion.div
              initial={{ opacity: 0.6 }}
              whileHover={{ scale: 1.05, opacity: 1 }}
              className="relative"
            >
              <Button
                type="button"
                disabled
                variant="outline"
                className="flex-col py-2 sm:py-4 h-auto gap-1 sm:gap-2 w-full opacity-70 cursor-not-allowed relative text-xs sm:text-sm"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <span>SMS</span>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full"
                >
                  Soon
                </motion.div>
              </Button>
            </motion.div>
            <Button
              type="button"
              variant={methods.includes("WHATSAPP") ? "default" : "outline"}
              className={cn(
                "flex-col py-2 sm:py-4 h-auto gap-1 sm:gap-2 text-xs sm:text-sm",
                methods.includes("WHATSAPP") && "bg-green-500 hover:bg-green-600"
              )}
              onClick={() => toggleMethod("WHATSAPP")}
            >
              <FaWhatsapp className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>WhatsApp</span>
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
              <Label htmlFor="email" className="text-sm sm:text-base">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter their email"
                required={methods.includes("EMAIL")}
                className="transition-all duration-200 focus:ring-rose-500 text-sm sm:text-base p-2 sm:p-3"
              />
            </motion.div>
          )}

          {methods.includes("WHATSAPP") && (
            <motion.div
              key="phone"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-2"
            >
              <Label htmlFor="phone" className="text-sm sm:text-base">Phone Number (WhatsApp)</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1234567890"
                required={methods.includes("WHATSAPP")}
                className="transition-all duration-200 focus:ring-rose-500 text-sm sm:text-base p-2 sm:p-3"
              />
              <p className="text-xs text-gray-500">
                Enter the full phone number with country code (e.g., +1 for US)
              </p>
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
