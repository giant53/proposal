/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Heart, Sparkles } from "lucide-react"

interface RichTextPreviewProps {
  content: string
  className?: string
}

export function RichTextPreview({ 
  content, 
  className 
}: RichTextPreviewProps) {
  // Split content into paragraphs for more elegant rendering
  const paragraphs = content.split('\n').filter(p => p.trim() !== '')

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "relative bg-gradient-to-br from-rose-50 to-rose-100 p-6 md:p-8 rounded-2xl shadow-xl border border-rose-200/50",
        "text-gray-800 font-serif leading-relaxed tracking-wide",
        "max-w-2xl mx-auto",
        className
      )}
    >
      {/* Decorative hearts and sparkles */}
      <div className="absolute top-4 right-4 flex space-x-2 opacity-50">
        <Heart className="w-6 h-6 text-rose-400 animate-pulse" />
        <Sparkles className="w-6 h-6 text-amber-400 animate-spin" />
      </div>

      {/* Love letter style header */}
      <div className="text-center mb-6 border-b border-rose-200 pb-4">
        <h2 className="text-3xl font-bold text-rose-600 tracking-wider">
          My Love Letter
        </h2>
        <p className="text-sm text-rose-500 italic">A heartfelt message just for you</p>
      </div>

      {/* Paragraphs with elegant styling */}
      {paragraphs.map((paragraph, index) => (
        <motion.p
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            delay: index * 0.1, 
            duration: 0.5 
          }}
          className={cn(
            "mb-4 text-lg md:text-xl",
            "first-letter:text-4xl first-letter:font-bold first-letter:text-rose-600",
            "first-letter:mr-2 first-letter:float-left"
          )}
        >
          {paragraph}
        </motion.p>
      ))}

      {/* Romantic signature */}
      <div className="mt-6 pt-4 border-t border-rose-200 text-right">
        <p className="text-rose-600 font-handwriting text-xl italic">
          Yours Lovingly
        </p>
      </div>
    </motion.div>
  )
}
