/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { Heart } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { RichTextRenderer } from "./rich-text-renderer"

interface ProposalContentProps {
  proposal: any // TODO: Add proper type
  isCreator: boolean
}

export function ProposalContent({ proposal, isCreator }: ProposalContentProps) {
  return (
    <div className="min-h-screen bg-rose-50">
      <div className="max-w-4xl mx-auto p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-2xl font-bold text-gray-900">A Special Message</h1>
          {isCreator && (
            <Button asChild variant="outline">
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white shadow-lg rounded-2xl p-8 mb-8"
        >
          <div className="flex justify-center mb-6">
            <motion.div 
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 }}
              className="p-3 bg-rose-100 rounded-full"
            >
              <Heart className="w-8 h-8 text-rose-500" />
            </motion.div>
          </div>

          <RichTextRenderer 
            content={proposal.customMessage || proposal.message}
          />

          <div className="mt-8 pt-8 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <p>From: {proposal.sender.name}</p>
              <p>Sent on: {format(new Date(proposal.createdAt), "PPP")}</p>
            </div>
          </div>
        </motion.div>

        {proposal.messages.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white shadow rounded-2xl p-8"
          >
            <h2 className="text-xl font-semibold mb-4">Messages</h2>
            <div className="space-y-4">
              {proposal.messages.map((message: any, index: number) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="bg-rose-50 rounded-lg p-4"
                >
                  <p className="text-sm text-gray-500 mb-2">
                    {format(new Date(message.createdAt), "PPP")}
                  </p>
                  <RichTextRenderer content={message.content || message.answer} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
