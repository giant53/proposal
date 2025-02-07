import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { ProposalList } from "@/components/proposal-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function DashboardPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/login")
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Your Proposals</h1>
        <Button asChild>
          <Link href="/proposals/new">Create New Proposal</Link>
        </Button>
      </div>
      
      <ProposalList />
    </div>
  )
}
