"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"

export type Message = {
  id: string
  content: string
  proposalId: string
  senderId: string
  recipientId: string
  createdAt: string
}

export function useMessages(proposalId: string) {
  return useQuery({
    queryKey: ["messages", proposalId],
    queryFn: async () => {
      const { data } = await axios.get(`/api/messages?proposalId=${proposalId}`)
      return data.data
    },
    enabled: !!proposalId,
  })
}

export function useSendMessage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      proposalId,
      content,
    }: {
      proposalId: string
      content: string
    }) => {
      const { data } = await axios.post("/api/messages", {
        proposalId,
        content,
      })
      return data.data
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["messages", variables.proposalId] })
      toast.success("Message sent successfully!")
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to send message")
    },
  })
}
