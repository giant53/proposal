"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"

export default function ErrorPage({ 
  error, 
  reset 
}: { 
  error: Error & { digest?: string }, 
  reset: () => void 
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-pink-50 to-rose-100">
      <div className="max-w-md text-center">
        <div className="mb-8 flex justify-center">
          <Image 
            src="/broken-heart.svg" 
            alt="Broken Heart" 
            width={200} 
            height={200} 
            className="animate-pulse"
          />
        </div>
        <h1 className="text-4xl font-bold text-rose-600 mb-4">
          Oops! Something Went Wrong
        </h1>
        <p className="text-gray-600 mb-6">
          It seems like our love connection got a little tangled. 
          Don&apos;t worry, we can untangle this together!
        </p>
        <div className="flex justify-center space-x-4">
          <Button onClick={() => reset()} variant="default">
            Try Again
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Return Home</Link>
          </Button>
        </div>
        {error.digest && (
          <div className="mt-6 text-sm text-gray-500">
            Error Code: {error.digest}
          </div>
        )}
      </div>
    </div>
  )
}