"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"

export function ProposalLoadingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Heart className="w-12 h-12 text-rose-500" fill="currentColor" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 text-center"
      >
        <h3 className="text-lg font-semibold text-gray-800">
          Crafting Your Perfect Proposal
        </h3>
        <p className="text-sm text-gray-600 mt-2">
          Weaving your love story into beautiful words...
        </p>
      </motion.div>
    </div>
  )
}
