/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Loader2, Save, Type } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"

interface EditableProposalProps {
  content: string
  onSave: (content: string) => Promise<void>
  className?: string
  font?: string
  onFontChange?: (font: string) => void
}

const fonts = [
  // Professional & Clean Fonts
  { value: "font-inter", label: "Inter", description: "Modern & Crisp", category: "Professional", default: true },
  { value: "font-source-serif", label: "Source Serif Pro", description: "Professional & Polished", category: "Professional" },
  { value: "font-dm-sans", label: "DM Sans", description: "Clean & Contemporary", category: "Professional" },
  { value: "font-plus-jakarta", label: "Plus Jakarta Sans", description: "Elegant & Readable", category: "Professional" },
]

export function EditableProposal({
  content,
  onSave,
  className,
  font = "font-inter", // Default to Inter
  onFontChange
}: EditableProposalProps) {
  const [editedContent, setEditedContent] = useState(content)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await onSave(editedContent)
      toast.success("Proposal saved successfully!")
    } catch (error) {
      toast.error("Failed to save proposal")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn("space-y-4", className)}
    >
      {onFontChange && (
        <div className="flex items-center p-0 mb-4">
          <Type className="w-4 h-4 text-rose-500" />
          <Select value={font} onValueChange={onFontChange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Font" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Professional Fonts</SelectLabel>
                {fonts
                  .filter(f => f.category === "Professional")
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
      )}

      <Textarea
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
        className={cn(
          "min-h-[440px] text-lg leading-relaxed",
          "bg-white rounded-lg border border-rose-100",
          "focus:ring-rose-200 focus:border-rose-300",
          font,
          className
        )}
        placeholder="Edit your proposal here..."
      />
    </motion.div>
  )
}
