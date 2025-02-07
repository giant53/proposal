import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { ProposalForm } from "@/components/proposal-form"

export default async function NewProposalPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/login")
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-8">Create New Proposal</h1>
      <ProposalForm />
    </div>
  )
}
