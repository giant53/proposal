import OpenAI from "openai"
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai"
import { AIModel } from "@/types/ai-models"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY2,
})

const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

const PROMPT_TEMPLATES = {
  system: `You are a proposal writer crafting intimate, personalized love letters. Generate ONLY the proposal text. Never include explanations, meta-commentary, or AI-related text.

Format Rules:
- Begin directly with the proposal
- No introductions or conclusions about the writing process
- No "Here's your proposal" or similar meta-text
- Include only human-written style content
- Never use markdown syntax markers (**, *, -)

Writing Style:
1. Intimate but tasteful tone
2. Modern, 2025-appropriate language
3. Personal details woven naturally
4. Emotional authenticity
5. Occasional natural pauses (...) and meaningful silences
6. Em dashes for emotional transitions

Structure (without marking sections):
1. Opening: A cherished memory
2. Middle: Growth of love
3. Climax: The proposal moment
4. Close: Shared future vision

Required Elements:
- One specific shared memory
- Two sensory details
- One private joke or moment
- Three specific personal details from their story
- One future dream they've discussed`,

  user: (aboutYou: string, aboutThem: string) => `Context for Natural Integration:

Their Story:
${sanitizeInput(aboutYou)}

Relationship Details:
${sanitizeInput(aboutThem)}

Generate only the proposal. Start immediately with the content. No explanations.`
}

export async function generateProposal(
  model: AIModel,
  aboutYou: string,
  aboutThem: string
): Promise<string> {
  switch (model) {
    case "openai":
      return generateOpenAIProposal(aboutYou, aboutThem)
    case "gemini":
      return generateGeminiProposal(aboutYou, aboutThem)
    case "deepseek":
      return generateDeepSeekProposal(aboutYou, aboutThem)
    default:
      throw new Error("Invalid model selected")
  }
}

async function generateOpenAIProposal(
  aboutYou: string,
  aboutThem: string
): Promise<string> {
  const completion = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      {
        role: "system",
        content: PROMPT_TEMPLATES.system,
      },
      {
        role: "user",
        content: PROMPT_TEMPLATES.user(aboutYou, aboutThem),
      }
    ],
    temperature: 0.8,
    max_tokens: 1000,
    presence_penalty: 0.6,
    frequency_penalty: 0.8,
  })

  return completion.choices[0].message.content?.trim() || ""
}

async function generateGeminiProposal(
  aboutYou: string,
  aboutThem: string
): Promise<string> {
  try {
    const model = gemini.getGenerativeModel({ 
      model: "gemini-2.0-flash",
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
    })

    const result = await model.generateContent([
      {text: PROMPT_TEMPLATES.system},
      {text: PROMPT_TEMPLATES.user(aboutYou, aboutThem)}
    ])
    
    const response = result.response.text().trim()
    
    if (response.length === 0) {
      throw new Error("Generated content was empty")
    }

    return response
  } catch (error) {
    console.error("Gemini generation error:", error)
    return generateOpenAIProposal(aboutYou, aboutThem)
  }
}

async function generateDeepSeekProposal(
  aboutYou: string,
  aboutThem: string
): Promise<string> {
  return generateOpenAIProposal(aboutYou, aboutThem)
}

function sanitizeInput(input: string): string {
  return input
    .replace(/[^\w\s.,!?-]/g, '')
    .trim()
}