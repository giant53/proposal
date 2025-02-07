import { auth } from "@/auth"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await auth()
  
  if (session?.user) {
    redirect("/dashboard")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">proposal.me</h1>
      <p className="text-xl text-gray-600 mb-8 text-center max-w-2xl">
        AI-powered proposal platform that helps you craft personalized, privacy-first proposals
      </p>
      
      <div className="space-x-4">
        <Button asChild>
          <Link href="/login">Get Started</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/about">Learn More</Link>
        </Button>
      </div>
    </div>
  )
}
