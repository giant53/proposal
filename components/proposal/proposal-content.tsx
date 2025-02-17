/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { Type } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { RichTextRenderer } from "./rich-text-renderer"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

const fonts = [
   // Standard Fonts
   { value: "font-inter", label: "Inter", description: "Modern & Clean", category: "Standard" },
   { value: "font-serif", label: "Serif", description: "Traditional & Elegant", category: "Standard" },
   { value: "font-roboto", label: "Roboto", description: "Flexible & Modern", category: "Standard" },

  // Romantic Fonts
  { value: "font-dancing-script", label: "Dancing Script", description: "Elegant & Flowing", category: "Romantic" },
  { value: "font-great-vibes", label: "Great Vibes", description: "Romantic & Classic", category: "Romantic" },
  { value: "font-parisienne", label: "Parisienne", description: "Graceful & Delicate", category: "Romantic" },
  { value: "font-lobster", label: "Lobster", description: "Cursive & Elegant", category: "Romantic" }, 
]

interface ProposalContentProps {
  proposal: any // TODO: Add proper type
  isCreator: boolean
}

export function ProposalContent({ proposal, isCreator }: ProposalContentProps) {
  const [selectedFont, setSelectedFont] = useState(proposal.font || "font-dancing-script")

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
          <div className="flex items-center justify-end space-x-2 mb-6">
            <Type className="w-4 h-4 text-rose-500" />
            <Select value={selectedFont} onValueChange={setSelectedFont}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select Font" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Romantic Fonts</SelectLabel>
                  {fonts
                    .filter(f => f.category === "Romantic")
                    .map((f) => (
                      <SelectItem key={f.value} value={f.value}>
                        <span className={cn("block", f.value)}>{f.label}</span>
                        <span className="block text-xs text-muted-foreground">{f.description}</span>
                      </SelectItem>
                    ))
                  }
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Standard Fonts</SelectLabel>
                  {fonts
                    .filter(f => f.category === "Standard")
                    .map((f) => (
                      <SelectItem key={f.value} value={f.value}>
                        <span className="block">{f.label}</span>
                        <span className="block text-xs text-muted-foreground">{f.description}</span>
                      </SelectItem>
                    ))
                  }
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-center mb-6">
            <motion.div 
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 }}
              className="p-3 bg-rose-100 rounded-full"
            >
              <Image src="/wlogo.svg" alt="Dancing Script" width={80} height={80} />
            </motion.div>
          </div>

          <div className={cn(selectedFont)}>
            <RichTextRenderer 
              content={proposal.customMessage || proposal.message}
            />
          </div>

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
