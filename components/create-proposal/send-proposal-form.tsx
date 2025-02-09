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
  //const [phone, setPhone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const toggleMethod = (method: DeliveryMethod) => {
    // Only allow email method
    console.log(method)
    setMethods(["EMAIL"])
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
        email: email,
        methods: ["EMAIL"],
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
            <motion.div
              initial={{ opacity: 0.6 }}
              whileHover={{ scale: 1.05, opacity: 1 }}
              className="relative"
            >
              <Button
                type="button"
                disabled
                variant="outline"
                className="flex-col py-4 h-auto gap-2 w-full opacity-70 cursor-not-allowed relative"
              >
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-400">SMS</span>
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
            <motion.div
              initial={{ opacity: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <Button
                type="button"
                disabled
                variant="outline"
                className="flex-col py-4 h-auto gap-2 w-full opacity-50 cursor-not-allowed relative"
              >
                <FaWhatsapp className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-400">WhatsApp</span>
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
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-gray-500 mt-2 text-center"
          >
            📣 SMS and WhatsApp delivery options are coming soon! We&apos;re working hard to expand your proposal delivery methods.
          </motion.p>
        </div>

        <AnimatePresence mode="wait">
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
