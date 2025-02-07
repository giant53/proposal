"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles } from "lucide-react"

interface UpgradePromptProps {
  tier?: string
  remainingCredits?: number
}

export function UpgradePrompt({ 
  tier = "FREE", 
  remainingCredits = 0 
}: UpgradePromptProps) {
  const [open, setOpen] = useState(true)
  const router = useRouter()

  const upgradeMessages = {
    FREE: {
      title: "Unlock Your Love Story's Potential",
      description: `You've used your ${remainingCredits} free credit. Upgrade to Premium to continue creating beautiful, AI-powered proposals with advanced features.`
    },
    PREMIUM: {
      title: "Maximize Your Proposal Power",
      description: "You're close to your monthly credit limit. Consider upgrading to our Lifetime plan for unlimited creativity."
    }
  }

  const currentMessage = upgradeMessages[tier as keyof typeof upgradeMessages] || upgradeMessages.FREE

  return (
    <AnimatePresence>
      {open && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <DialogHeader>
                <DialogTitle className="text-center flex items-center justify-center gap-2">
                  <Sparkles className="w-6 h-6 text-primary" />
                  {currentMessage.title}
                  <Sparkles className="w-6 h-6 text-primary" />
                </DialogTitle>
                <DialogDescription className="text-center">
                  {currentMessage.description}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6 space-y-4">
                <Button 
                  className="w-full"
                  onClick={() => router.push("/pricing")}
                >
                  Explore Premium Plans
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  Maybe Later
                </Button>
              </div>

              <p className="mt-4 text-sm text-center text-muted-foreground">
                Premium plans start at just $7.77/month
              </p>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}
