import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { ProposalSteps } from "@/components/create-proposal/proposal-steps"

export default async function CreateProposalPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Create Your Perfect Proposal
          </h1>
          <p className="text-lg text-gray-600">
            Let&apos;s craft a beautiful proposal that captures your love story
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-8">
          <ProposalSteps />
        </div>
      </div>
    </div>
  )
}
