"use client";

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useCreateProposal } from "@/hooks/use-proposals"
import { 
  Heart, 
  Sparkles, 
  Wand2, 
  ArrowRight, 
  Loader2 
} from "lucide-react"

const proposalSchema = z.object({
  recipientName: z.string().min(1, "Recipient name is required"),
  recipientEmail: z.string().email().optional().or(z.literal("")),
  recipientPhone: z.string().min(10).optional().or(z.literal("")),
  customMessage: z.string().optional(),
  deliveryMethod: z.enum(["EMAIL", "SMS", "WHATSAPP"]),
})

type ProposalFormData = z.infer<typeof proposalSchema>

export function ProposalForm() {
  const [isAIGenerating, setIsAIGenerating] = useState(false)
  const { mutate: createProposal, isPending } = useCreateProposal()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProposalFormData>({
    resolver: zodResolver(proposalSchema),
  })

  const onSubmit = async (data: ProposalFormData) => {
    // If no custom message, trigger AI generation
    if (!data.customMessage) {
      setIsAIGenerating(true)
      try {
        const response = await fetch('/api/generate-proposal', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            aboutYou: '', // You might want to add more context later
            aboutThem: data.recipientName,
          })
        })
        
        const result = await response.json()
        
        // Update form with AI-generated message
        setValue('customMessage', result.proposal)
        setIsAIGenerating(false)
      } catch (error) {
        console.error('AI generation failed', error)
        setIsAIGenerating(false)
      }
    }

    // Proceed with proposal creation
    createProposal(data)
  }

  // Love-themed AI generation animation
  const AIGenerationAnimation = () => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        rotate: [0, 10, -10, 0],
      }}
      transition={{ 
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse"
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-rose-50/90 backdrop-blur-sm"
    >
      <div className="relative">
        {/* Floating hearts */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 200 - 100, 
              y: -100, 
              opacity: 0.3,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{ 
              y: window.innerHeight + 100, 
              x: Math.random() * 200 - 100,
              rotate: 360,
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{ 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity, 
              repeatType: "loop" 
            }}
            className="absolute"
          >
            <Heart className="text-rose-300/50 w-8 h-8" />
          </motion.div>
        ))}
        
        {/* Main generation indicator */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <Wand2 className="w-24 h-24 text-rose-500 animate-pulse" />
        </motion.div>
        
        {/* Text overlay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-center"
        >
          <h2 className="text-2xl font-bold text-rose-600 flex items-center justify-center space-x-2">
            <Sparkles className="w-6 h-6 text-amber-400" />
            <span>Crafting Your Love Story</span>
            <Sparkles className="w-6 h-6 text-amber-400" />
          </h2>
          <p className="text-rose-500 mt-2 flex items-center justify-center">
            Our AI is weaving magic 
            <Heart className="w-4 h-4 ml-2 animate-bounce text-rose-400" />
          </p>
        </motion.div>
      </div>
    </motion.div>
  )

  return (
    <>
      {/* AI Generation Overlay */}
      <AnimatePresence>
        {isAIGenerating && <AIGenerationAnimation />}
      </AnimatePresence>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Input
            {...register("recipientName")}
            placeholder="Recipient Name"
            className="w-full"
          />
          {errors.recipientName && (
            <p className="text-sm text-red-500 mt-1">
              {errors.recipientName.message}
            </p>
          )}
        </div>

        <div>
          <Input
            {...register("recipientEmail")}
            type="email"
            placeholder="Recipient Email"
            className="w-full"
          />
          {errors.recipientEmail && (
            <p className="text-sm text-red-500 mt-1">
              {errors.recipientEmail.message}
            </p>
          )}
        </div>

        <div>
          <Input
            {...register("recipientPhone")}
            placeholder="Recipient Phone"
            className="w-full"
          />
          {errors.recipientPhone && (
            <p className="text-sm text-red-500 mt-1">
              {errors.recipientPhone.message}
            </p>
          )}
        </div>

        <div>
          <Textarea
            {...register("customMessage")}
            placeholder="Your message (optional - AI will generate one if left empty)"
            className="w-full h-32"
          />
          {errors.customMessage && (
            <p className="text-sm text-red-500 mt-1">
              {errors.customMessage.message}
            </p>
          )}
        </div>

        <div>
          <select
            {...register("deliveryMethod")}
            className="w-full p-2 border rounded-md"
          >
            <option value="EMAIL">Email</option>
            <option value="SMS">SMS</option>
            <option value="WHATSAPP">WhatsApp</option>
          </select>
          {errors.deliveryMethod && (
            <p className="text-sm text-red-500 mt-1">
              {errors.deliveryMethod.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isPending || isAIGenerating}
          className="w-full group"
        >
          {isPending ? (
            <div className="flex items-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              Create Proposal
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          )}
        </Button>
      </form>
    </>
  )
}
