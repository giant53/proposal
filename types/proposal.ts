export interface AIProposalResponse {
  success: boolean
  message?: string
  data: {
    proposal: string
  }
}

export interface ProposalFormData {
  aboutYou: string
  aboutThem: string
  model: AIModel
  generatedProposal?: string
  proposalId?: string
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
  method: "EMAIL" | "SMS" | "WHATSAPP"
}
