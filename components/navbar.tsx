"use client"

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { Button } from "./ui/button"

export function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link
              href="/"
              className="flex items-center px-2 text-xl font-bold"
            >
              proposal.me
            </Link>
          </div>

          <div className="flex items-center">
            {session?.user ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard">Dashboard</Link>
                <Button
                  variant="ghost"
                  onClick={() => signOut()}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button asChild variant="ghost">
                <Link href="/login">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
