import OpenAI from "openai"
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai"
import { AIModel } from "@/types/ai-models"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY2,
})

const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

const PROMPT_TEMPLATES = {
  base: `You are a professional writer helping to create a heartfelt and sincere marriage proposal. Please create a respectful and appropriate proposal that:
  1. Reflects the unique story of the couple
  2. Expresses genuine emotions and feelings
  3. Maintains a respectful and sincere tone
  4. Includes specific details from their relationship
  5. Concludes with a clear marriage proposal
  Please keep the content appropriate and family-friendly.`,
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

//     const prompt = `${PROMPT_TEMPLATES.base}

// Context about the person proposing:
// ${sanitizeInput(aboutYou)}

// Context about their relationship:
// ${sanitizeInput(aboutThem)}

// Please write a beautiful marriage proposal that incorporates these details while keeping the content appropriate and family-friendly.`

    const prompt = "Explain how AI works"
    const result = await model.generateContent(prompt)
    console.log(result)
    const response = await result.response

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
  return `Create a romantic proposal based on the following information:
          
About the person proposing:
${sanitizeInput(aboutYou)}

About their love and relationship:
${sanitizeInput(aboutThem)}

Please write a beautiful marriage proposal that incorporates these details.`
}

function sanitizeInput(input: string): string {
  // Remove any potentially problematic characters or patterns
  return input
    .replace(/[^\w\s.,!?-]/g, '') // Only allow basic punctuation and alphanumeric characters
    .trim()
}
