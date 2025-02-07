import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-pink-50 to-rose-100">
      <div className="max-w-md text-center">
        <div className="mb-8 flex justify-center">
          <Image 
            src="/lost-love.svg" 
            alt="Lost Love" 
            width={250} 
            height={250} 
            className="animate-bounce"
          />
        </div>
        <h1 className="text-4xl font-bold text-rose-600 mb-4">
          Lost in Love&apos;s Maze
        </h1>
        <p className="text-gray-600 mb-6">
          The page you&apos;re looking for seems to have wandered off on a romantic journey. 
          Let&apos;s find our way back together!
        </p>
        <div className="flex justify-center space-x-4">
          <Button asChild variant="default">
            <Link href="/">Return Home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/dashboard">My Proposals</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}