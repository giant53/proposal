/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { Loader2, Save } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"

interface EditableProposalProps {
  content: string
  onSave: (content: string) => Promise<void>
  className?: string
}

export function EditableProposal({
  content,
  onSave,
  className,
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
      <Textarea
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
        className="min-h-[400px] font-serif text-lg leading-relaxed"
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
