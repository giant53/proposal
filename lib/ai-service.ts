import OpenAI from "openai"
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai"
import { AIModel } from "@/types/ai-models"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY2,
})

const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

// In ai-service.ts
const PROMPT_TEMPLATES = {
  base: `You are a professional romance writer crafting a deeply personal valentine proposal. Create content that:
1. Feels handwritten from the heart with raw, vulnerable emotions
2. Uses specific details from their relationship history
3. Incorporates meaningful metaphors related to their journey
4. Includes 2-3 intimate moments only they would understand
5. Uses natural, conversational language with occasional imperfections
6. Follows this emotional arc:
   - Nostalgic beginning (remembering first meeting)
   - Vulnerable middle (sharing fears/hopes)
   - Poetic climax (actual proposal)
   - Hopeful ending (imagining future)
7. Format using Markdown for emphasis without markdown syntax:
   **Bold** for key emotional phrases
   *Italic* for intimate moments
   - Bullet points for promises
   > Quotes for meaningful memories
8. Better to give a modern tone of love that feels permium and latest trend of 2025

Avoid clichés like "soulmate" or "meant to be". Focus on unique, personal details that feel authentically human.`,
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
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: PROMPT_TEMPLATES.base,
      },
      {
        role: "user",
        content: generateUserPrompt(aboutYou, aboutThem),
      },
    ],
    temperature: 0.7,
    max_tokens: 1000,
  })

  return completion.choices[0].message.content || ""
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
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
    })

    const prompt = `${PROMPT_TEMPLATES.base}

    Context about the person proposing:
    ${sanitizeInput(aboutYou)}

    Context about their relationship:
    ${sanitizeInput(aboutThem)}

    Please write a beautiful valentines day proposal that incorporates these details while keeping the content appropriate and family-friendly.`

    //const prompt = "Explain how AI works"
    const result = await model.generateContent(prompt)
    console.log(result)
    const response = result.response

    if (response.text().trim().length === 0) {
      throw new Error("Generated content was empty")
    }

    return response.text()
  } catch (error) {
    console.error("Gemini generation error:", error)
    // Fallback to OpenAI if Gemini fails
    return generateOpenAIProposal(aboutYou, aboutThem)
  }
}

async function generateDeepSeekProposal(
  aboutYou: string,
  aboutThem: string
): Promise<string> {
  // For now, we'll use OpenAI as a fallback
  return generateOpenAIProposal(aboutYou, aboutThem)
}

function generateUserPrompt(aboutYou: string, aboutThem: string): string {
  return `Craft a proposal that would make them say "This is SO us!" Include:
  
**Our Unique Story**
- First meeting: ${sanitizeInput(aboutYou.split(' ').slice(0, 50).join(' '))}
- Key moments: ${sanitizeInput(aboutThem.split('.').join(' - '))}

**Love Language**
- How we show affection: 
- Secret gestures only we understand:

**Future Vision**
- What home means to us:
- Shared dreams we whisper about:

Write like you're trembling while holding the ring. Include 1 inside joke reference and 2 sensory details (their scent, a song lyric, etc.). Use em dashes—for interrupted thoughts and ... for emotional pauses.`
}

function sanitizeInput(input: string): string {
  // Remove any potentially problematic characters or patterns
  return input
    .replace(/[^\w\s.,!?-]/g, '') // Only allow basic punctuation and alphanumeric characters
    .trim()
}
