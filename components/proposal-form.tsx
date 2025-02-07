"use client";

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useCreateProposal } from "@/hooks/use-proposals"

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
    formState: { errors },
  } = useForm<ProposalFormData>({
    resolver: zodResolver(proposalSchema),
  })

  const onSubmit = (data: ProposalFormData) => {
    createProposal(data)
  }

  return (
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
        className="w-full"
      >
        {isPending ? "Creating..." : "Create Proposal"}
      </Button>
    </form>
  )
}
