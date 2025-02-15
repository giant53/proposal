"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { ProposalList } from "@/components/proposal-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Heart, 
  PlusCircle, 
  Gift, 
  Sparkles, 
  Star, 
  ArrowRight, 
  Lock,
  HeartPulse,
  Flower
} from "lucide-react"
import { useState } from "react"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const [activeTab, setActiveTab] = useState<'all' | 'sent' | 'received'>('all')
  
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-white flex items-center justify-center">
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 1,
            ease: "easeInOut"
          }}
        >
          <HeartPulse className="w-24 h-24 text-rose-500 animate-pulse" />
        </motion.div>
      </div>
    )
  }
  
  if (!session?.user) {
    redirect("/login")
  }

  // const daysUntilValentines = Math.max(0, Math.ceil((new Date(2025, 1, 14).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-white">
      {/* Valentine's Day Countdown */}
     

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Welcome Section with Premium Upsell */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-white rounded-3xl shadow-2xl p-4 sm:p-6 mb-4 overflow-hidden border-4 border-rose-100"
        >
          {/* Floating Hearts Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: Math.random() * 100, 
                  y: -50, 
                  opacity: 0.3,
                  scale: Math.random() * 0.5 + 0.5
                }}
                animate={{ 
                  y: window.innerHeight + 100, 
                  x: Math.random() * 100,
                  rotate: 360
                }}
                transition={{ 
                  duration: Math.random() * 10 + 10, 
                  repeat: Infinity, 
                  repeatType: "loop" 
                }}
                className="absolute"
              >
                <Heart className="text-rose-100/50 w-8 h-8" />
              </motion.div>
            ))}
          </div>

          {/* Premium Upsell Badge */}
          <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-pink-500 text-white px-3 py-1 rounded-full flex items-center space-x-1">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-bold">Premium</span>
          </div>
          
          <div className="relative z-10">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center flex-wrap gap-2">
              <span>Welcome back, {session.user.name?.split(' ')[0] || 'Lover'}!</span>
              <Star className="w-6 h-6 text-amber-400 animate-pulse" />
            </h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              Create magical moments that last forever ✨
            </p>
            
            <div className="mt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                asChild 
                className="bg-rose-500 hover:bg-rose-600 text-white shadow-lg group w-full sm:w-auto"
              >
                <Link href="/proposals/new" className="flex items-center justify-center">
                  <PlusCircle className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Create New Proposal
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                className="border-rose-200 text-rose-600 hover:bg-rose-50 w-full sm:w-auto"
              >
                <Link href="/how-it-works" className="flex items-center justify-center">
                  <Gift className="mr-2 h-5 w-5" />
                  View Examples
                </Link>
              </Button>
            </div>

            {/* Premium Features Teaser */}
            <div className="mt-6 bg-rose-50 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-3">
                <Lock className="w-6 h-6 text-rose-500" />
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Unlock Premium Features</h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Unlimited proposals, custom themes, and more!
                  </p>
                </div>
              </div>
              <Button 
                asChild 
                size="sm" 
                variant="outline" 
                className="border-rose-300 text-rose-600 hover:bg-rose-100 w-full sm:w-auto"
              >
                <Link href="/premium" className="flex items-center justify-center">
                  Upgrade 
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Proposals Filtering Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-4 flex justify-center space-x-2 sm:space-x-4 overflow-x-auto"
        >
          <AnimatePresence>
            {[
              { key: 'all', label: 'All', icon: Heart },
              { key: 'sent', label: 'Sent', icon: PlusCircle },
              { key: 'received', label: 'Received', icon: Gift }
            ].map(({ key, label, icon: Icon }) => (
              <motion.div
                key={key}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <Button
                  variant={activeTab === key ? 'default' : 'outline'}
                  className={`
                    ${activeTab === key 
                      ? 'bg-rose-500 text-white' 
                      : 'border-rose-200 text-rose-600 hover:bg-rose-50'
                    } flex items-center space-x-2 text-xs sm:text-sm px-3 sm:px-4 py-2
                  `}
                  onClick={() => setActiveTab(key as 'all' | 'sent' | 'received')}
                >
                  <Icon className="w-4 h-4 mr-1" />
                  {label}
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Proposals List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl shadow-2xl p-4 sm:p-6 border-4 border-rose-100"
        >
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
            <Flower className="mr-2 w-5 h-5 text-rose-500" />
            <span>Your Love Stories</span>
            <Sparkles className="ml-2 w-5 h-5 text-amber-400" />
          </h2>
          <ProposalList filter={activeTab} />
        </motion.div>
      </div>
    </div>
  )
}
