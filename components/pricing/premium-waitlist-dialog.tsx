/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Mail, Sparkles } from "lucide-react"
import { toast } from "sonner"

interface PremiumWaitlistDialogProps {
  isOpen: boolean
  onClose: () => void
  tier: string
}

export function PremiumWaitlistDialog({ 
  isOpen, 
  onClose, 
  tier 
}: PremiumWaitlistDialogProps) {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email, 
          name, 
          source: `pricing_${tier.toLowerCase()}_dialog` 
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to join waitlist")
      }

      toast.success("Thank you for your interest!", {
        description: "We'll notify you when premium features are available in India."
      })
      
      setEmail("")
      setName("")
      onClose()
    } catch (error) {
      toast.error("Failed to join waitlist", {
        description: "Please try again later"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8 relative"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Dialog Content */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Sparkles className="w-8 h-8 text-amber-500 animate-pulse" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Premium Features Coming to India Soon!
              </h2>
              <p className="text-gray-600 mb-6">
                We&lsquo;re working on bringing our {tier} plan to India. 
                Join our waitlist to get exclusive early access and updates.
              </p>

              {/* Waitlist Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                    className="bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="bg-gray-50"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Joining Waitlist..."
                  ) : (
                    <>
                      <Mail className="w-4 h-4 mr-2" />
                      Join Waitlist
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
