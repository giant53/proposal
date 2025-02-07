"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"

export type Proposal = {
  id: string
  recipientName: string
  recipientEmail?: string
  recipientPhone?: string
  message: string
  customMessage?: string
  status: string
  deliveryMethod: string
  createdAt: string
  expiresAt: string
}

export function useProposals(page = 1, limit = 10) {
  return useQuery({
    queryKey: ["proposals", page, limit],
    queryFn: async () => {
      const { data } = await axios.get(`/api/proposals?page=${page}&limit=${limit}`)
      return data.data
    },
  })
}

export function useProposal(id: string) {
  return useQuery({
    queryKey: ["proposal", id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/proposals/${id}`)
      return data.data
    },
    enabled: !!id,
  })
}

export function useCreateProposal() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (proposalData: Partial<Proposal>) => {
      const { data } = await axios.post("/api/proposals", proposalData)
      return data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proposals"] })
      toast.success("Proposal created successfully!")
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create proposal")
    },
  })
}

export function useUpdateProposal() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string
      data: Partial<Proposal>
    }) => {
      const response = await axios.patch(`/api/proposals/${id}`, data)
      return response.data.data
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["proposals"] })
      queryClient.invalidateQueries({ queryKey: ["proposal", variables.id] })
      toast.success("Proposal updated successfully!")
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update proposal")
    },
  })
}
