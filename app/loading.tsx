import Image from "next/image"
import Link from "next/link"

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-pink-50 to-rose-100">
      <div className="max-w-md text-center">
        <div className="mb-8 flex justify-center">
          <Image 
            src="/heart-loading.svg" 
            alt="Loading Love" 
            width={250} 
            height={250} 
            className="animate-spin-slow"
          />
        </div>
        <h1 className="text-3xl font-bold text-rose-600 mb-4">
          Crafting Your Love Story...
        </h1>
        <p className="text-gray-600 mb-6">
          Just a moment while we weave the magic of your proposal.
          Great things take time, just like true love.
        </p>
        <div className="w-full bg-rose-200 rounded-full h-2.5">
          <div className="bg-rose-600 h-2.5 rounded-full animate-pulse w-1/2"></div>
        </div>
      </div>
    </div>
  )
}