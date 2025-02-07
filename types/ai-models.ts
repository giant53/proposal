export type AIModel = "openai" | "gemini" | "deepseek"

export interface ModelConfig {
  id: AIModel
  name: string
  description: string
  icon: string
}

export const AI_MODELS: ModelConfig[] = [
  {
    id: "openai",
    name: "ChatGPT o3-mini",
    description: "OpenAI's powerful language model optimized for creative writing and emotional expression.",
    icon: "sparkles",
  },
  {
    id: "gemini",
    name: "Gemini 2.0 Flash",
    description: "Google's advanced AI model known for its natural and contextual understanding.",
    icon: "zap",
  },
  {
    id: "deepseek",
    name: "DeepSeek R1",
    description: "Specialized in generating deeply personalized and emotionally resonant content.",
    icon: "heart",
  },
]
