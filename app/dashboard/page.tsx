"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { ProposalList } from "@/components/proposal-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, PlusCircle, Gift, Calendar } from "lucide-react"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  
  if (status === "loading") {
    return null
  }
  
  if (!session?.user) {
    redirect("/login")
  }

  const daysUntilValentines = Math.max(0, Math.ceil((new Date(2025, 1, 14).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-white">
      {/* Valentine's Day Countdown */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-gradient-to-r from-rose-500 to-pink-600  text-white py-3"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-2">
            <Calendar className="w-5 h-5 animate-pulse" />
            <span className="text-sm font-bold">
              {daysUntilValentines} days until Valentine&apos;s Day!
            </span>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-xl p-6 mb-8 relative overflow-hidden"
        >
          <div className="absolute right-0 top-0 w-32 h-32 transform translate-x-8 -translate-y-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Heart className="w-full h-full text-rose-100" />
            </motion.div>
          </div>
          
          <div className="relative">
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome back, {session.user.name}!
            </h1>
            <p className="text-gray-600 mt-2">
              Ready to create some magical moments?
            </p>
            
            <div className="mt-6 flex space-x-4">
              <Button asChild className="bg-rose-500 hover:bg-rose-600 text-white shadow-lg group">
                <Link href="/proposals/new" className="flex items-center">
                  <PlusCircle className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Create New Proposal
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-rose-200 text-rose-600 hover:bg-rose-50">
                <Link href="/how-it-works" className="flex items-center">
                  <Gift className="mr-2 h-5 w-5" />
                  View Examples
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl shadow-lg p-6 border border-rose-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Total Proposals</h3>
              <Heart className="w-8 h-8 text-rose-400" />
            </div>
            <p className="text-3xl font-bold text-rose-600 mt-2">3</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-rose-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Accepted</h3>
              <Gift className="w-8 h-8 text-rose-400" />
            </div>
            <p className="text-3xl font-bold text-green-600 mt-2">1</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-rose-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Pending</h3>
              <Calendar className="w-8 h-8 text-rose-400" />
            </div>
            <p className="text-3xl font-bold text-blue-600 mt-2">2</p>
          </div>
        </motion.div> */}

        {/* Proposals List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-xl p-6"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-6">Your Love Stories</h2>
          <ProposalList />
        </motion.div>
      </div>
    </div>
  )
}
