import { auth } from "@/auth"
import { errorResponse, successResponse } from "@/lib/api-response"
import { NextRequest } from "next/server"
import { generateProposal } from "@/lib/ai-service"
import { AIModel } from "@/types/ai-models"

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return errorResponse("Unauthorized", 401)
    }

    const { aboutYou, aboutThem, model = "openai" } = await req.json()

    if (!aboutYou || !aboutThem) {
      return errorResponse("Missing required information")
    }

    try {
      const proposal = await generateProposal(
        model as AIModel,
        aboutYou,
        aboutThem
      )

      if (!proposal || proposal.trim().length === 0) {
        console.error("Empty proposal generated")
        // If the selected model fails, fallback to OpenAI
        if (model !== "openai") {
          console.log("Falling back to OpenAI")
          const fallbackProposal = await generateProposal(
            "openai",
            aboutYou,
            aboutThem
          )
          return successResponse({ 
            proposal: fallbackProposal,
            message: "Generated using fallback model (OpenAI) due to safety filters"
          })
        }
        return errorResponse("Failed to generate proposal. Please try again with different wording.")
      }

      return successResponse({ proposal })
    } catch (error) {
      console.error("Model-specific error:", error)
      if (model !== "openai") {
        // Fallback to OpenAI
        console.log("Falling back to OpenAI due to error")
        const fallbackProposal = await generateProposal(
          "openai",
          aboutYou,
          aboutThem
        )
        return successResponse({ 
          proposal: fallbackProposal,
          message: "Generated using fallback model (OpenAI) due to an error"
        })
      }
      throw error // Re-throw if OpenAI also fails
    }
  } catch (error) {
    console.error("Proposal generation error:", error)
    return errorResponse("Failed to generate proposal. Please try again later.")
  }
}
