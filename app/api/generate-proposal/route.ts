import { auth } from "@/auth"
import { errorResponse, successResponse } from "@/lib/api-response"
import { NextRequest } from "next/server"
import { generateProposal } from "@/lib/ai-service"

const SAMPLE_PROPOSAL = `**My Dearest Sarah**,

Do you remember that rainy afternoon in the campus coffee shop? *The way the steam from our lattes created this tiny, intimate world between us* — I knew something extraordinary was beginning.

> "Some love stories start with a spark. Ours started with a spilled coffee and a shared laugh."

**Our Journey**
It wasn't love at first sight. It was love at first *unexpected connection* — when you quoted that obscure Murakami line and I realized you saw the world exactly how I always hoped someone would.

**Vulnerable Moments**
I've been terrified of this—of feeling so deeply that losing you would shatter everything. But loving you taught me that vulnerability isn't weakness; it's the most courageous act of trust.

**The Promises**
- I will hold your hand through every storm
- I will celebrate your dreams as if they were my own
- I will choose you, every single day, with intention and wonder

**The Proposal**
Sarah, *you are not my missing piece*. You are the mirror that reflects my truest self. 

**Will you marry me?**

*Not because it completes us, but because together, we create something more beautiful than either of us could imagine.*

Trembling, 
Always yours`

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return errorResponse("Unauthorized", 401)
    }

    const { aboutYou, aboutThem, model = "gemini" } = await req.json()

    if (!aboutYou || !aboutThem) {
      return errorResponse("Missing required information")
    }

    try {
      // Use sample proposal for testing
      const proposal = SAMPLE_PROPOSAL

      // Validate proposal content
      if (!proposal || proposal.trim().length === 0) {
        console.error("Empty proposal generated")
        return errorResponse("Failed to generate a meaningful proposal. Please try different wording.")
      }

      // Successful generation
      return successResponse({ 
        proposal, 
        message: "Sample proposal generated for testing" 
      })
    } catch (error) {
      console.error("Proposal generation error:", error)
      
      // Detailed error logging
      if (error instanceof Error) {
        console.error("Error details:", {
          name: error.name,
          message: error.message,
          stack: error.stack
        })
      }

      return errorResponse(
        "Failed to generate proposal. Please try again with different wording.",
        500
      )
    }
  } catch (error) {
    console.error("Unexpected error in proposal generation:", error)
    return errorResponse("An unexpected error occurred. Please try again later.", 500)
  }
}
