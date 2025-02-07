/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useProposals } from "@/hooks/use-proposals"
import { Button } from "@/components/ui/button"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, Clock, Send, CheckCircle2, XCircle, Loader2 } from "lucide-react"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export function ProposalList() {
  const { data, isLoading, error } = useProposals()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-rose-500 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <p className="text-gray-600">Error loading proposals</p>
      </div>
    )
  }

  if (!data?.proposals.length) {
    return (
      <div className="text-center py-12">
        <Heart className="w-12 h-12 text-rose-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-800 mb-2">No proposals yet</h3>
        <p className="text-gray-600 mb-6">Start creating your perfect proposal today!</p>
        <Button asChild className="bg-rose-500 hover:bg-rose-600">
          <Link href="/proposals/new">Create Your First Proposal</Link>
        </Button>
      </div>
    )
  }

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      {data.proposals.map((proposal: any) => (
        <motion.div
          key={proposal.id}
          variants={item}
          className="bg-white rounded-lg border border-rose-100 p-6 hover:shadow-lg transition-all duration-300"
        >
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-rose-500" />
                <h3 className="font-semibold text-gray-800">{proposal.recipientName}</h3>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <p>Sent {formatDistanceToNow(new Date(proposal.createdAt))} ago</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Send className="w-4 h-4 text-gray-400" />
                <p className="text-sm text-gray-600">
                  via {proposal.deliveryMethod}
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                {proposal.status === "ACCEPTED" ? (
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                ) : proposal.status === "REJECTED" ? (
                  <XCircle className="w-4 h-4 text-red-500" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                )}
                <span
                  className={`text-sm font-medium ${
                    proposal.status === "ACCEPTED"
                      ? "text-green-600"
                      : proposal.status === "REJECTED"
                      ? "text-red-600"
                      : "text-blue-600"
                  }`}
                >
                  {proposal.status}
                </span>
              </div>
            </div>
            
            <Button 
              asChild 
              variant="outline" 
              size="sm"
              className="border-rose-200 text-rose-600 hover:bg-rose-50"
            >
              <Link href={`/proposals/${proposal.id}`} className="flex items-center space-x-2">
                <span>View Details</span>
                <Heart className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
