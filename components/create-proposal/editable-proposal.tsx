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
  // Romantic Fonts
  { value: "font-dancing-script", label: "Dancing Script", description: "Elegant & Flowing", category: "Romantic" },
  { value: "font-great-vibes", label: "Great Vibes", description: "Romantic & Classic", category: "Romantic" },
  { value: "font-parisienne", label: "Parisienne", description: "Graceful & Delicate", category: "Romantic" },
  
  // Standard Fonts
  { value: "font-sans", label: "Inter", description: "Modern & Clean", category: "Standard" },
  { value: "font-serif", label: "Serif", description: "Traditional & Elegant", category: "Standard" },
  { value: "font-mono", label: "Monospace", description: "Technical & Precise", category: "Standard" },
]

export function EditableProposal({
  content,
  onSave,
  className,
  font = "font-dancing-script",
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
        <div className="flex items-center space-x-2 mb-4">
          <Type className="w-4 h-4 text-rose-500" />
          <Select value={font} onValueChange={onFontChange}>
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
      )}

      <Textarea
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
        className={cn(
          "min-h-[400px] text-lg leading-relaxed",
          "bg-white p-6 rounded-lg border border-rose-100",
          "focus:ring-rose-200 focus:border-rose-300",
          font,
          className
        )}
        placeholder="Edit your proposal here..."
      />
      <Button
        onClick={handleSave}
        disabled={isSaving}
        className="w-full bg-rose-500 hover:bg-rose-600"
      >
        {isSaving ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save className="w-4 h-4 mr-2" />
            Save Proposal
          </>
        )}
      </Button>
    </motion.div>
  )
}
