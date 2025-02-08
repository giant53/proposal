"use client"

import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

interface UnauthorizedAccessProps {
  title?: string
  message?: string
}

export function UnauthorizedAccess({
  title = "Private Message",
  message = "This is a private proposal that can only be viewed by the sender and the intended recipient. If you received a link to this proposal, make sure to use the complete URL including the secret code.",
}: UnauthorizedAccessProps) {
  return (
    <div className="min-h-screen bg-rose-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-2xl shadow-lg"
      >
        <motion.div 
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="p-3 bg-rose-100 rounded-full">
            <Lock className="w-8 h-8 text-rose-500" />
          </div>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-gray-900"
        >
          {title}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600"
        >
          {message}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="pt-4"
        >
          <Button asChild variant="outline">
            <Link href="/">Return Home</Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
