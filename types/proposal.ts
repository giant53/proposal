export interface AIProposalResponse {
  success: boolean
  message?: string
  data?: {
    proposal: string
  }
}

export interface ProposalFormData {
  aboutYou: string
  aboutThem: string
  model: string
  generatedProposal?: string
  editedProposal?: string
  savedProposalId?: string
  font?: string
  recipientName?: string
  recipientEmail?: string
  recipientPhone?: string
  deliveryMethod?: "EMAIL" | "SMS" | "WHATSAPP"
}

export type AIModel = "openai" | "gemini" | "deepseek"

export interface SendProposalData {
  name: string
  email?: string
  phone?: string
  methods: Array<"EMAIL" | "SMS" | "WHATSAPP">
}

export interface SavedProposal {
  id: string
  content: string
  createdAt: string
  updatedAt: string
  userId: string
}
