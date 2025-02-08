"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { format } from "date-fns"
import { motion } from "framer-motion"
import { 
  Heart, 
  Send, 
  Inbox, 
  Clock, 
  CheckCircle, 
  XCircle,
  MessageCircle 
} from "lucide-react"

interface Proposal {
  id: string
  message: string
  createdAt: string | Date
  expiresAt: string | Date
  sender: { 
    id: string
    name: string 
  }
  recipient?: { 
    name: string 
  }
  status: 'DRAFT' | 'SENT' | 'ACCEPTED' | 'REJECTED'
}

interface ProposalListProps {
  filter?: 'all' | 'sent' | 'received'
}

export function ProposalList({ filter = 'all' }: ProposalListProps) {
  const { data: session } = useSession()
  const [proposals, setProposals] = useState<Proposal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProposals() {
      try {
        const response = await fetch('/api/proposals')
        const data = await response.json()
        
        // Validate and normalize the data
        const normalizedProposals: Proposal[] = Array.isArray(data) 
          ? data.map(proposal => ({
              ...proposal,
              createdAt: new Date(proposal.createdAt),
              expiresAt: new Date(proposal.expiresAt),
              sender: {
                id: proposal.sender?.id || '',
                name: proposal.sender?.name || 'Unknown Sender'
              },
              status: proposal.status || 'DRAFT'
            }))
          : (data.proposals || [])

        setProposals(normalizedProposals)
        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch proposals', error)
        setError('Failed to load proposals. Please try again later.')
        setLoading(false)
      }
    }

    fetchProposals()
  }, [])

  const filteredProposals = proposals.filter(proposal => {
    if (filter === 'all') return true
    if (filter === 'sent') return proposal.sender.id === session?.user?.id
    if (filter === 'received') return proposal.sender.id !== session?.user?.id
    return true
  })

  const getStatusIcon = (status: Proposal['status']) => {
    switch (status) {
      case 'DRAFT':
        return <Clock className="w-5 h-5 text-blue-500" />
      case 'SENT':
        return <Send className="w-5 h-5 text-purple-500" />
      case 'ACCEPTED':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'REJECTED':
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <Inbox className="w-5 h-5 text-gray-500" />
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center space-x-2 text-rose-500">
        <Heart className="animate-pulse w-6 h-6" />
        <span>Loading your love stories...</span>
      </div>
    )
  }

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12 bg-rose-50 rounded-2xl"
      >
        <XCircle className="mx-auto w-16 h-16 text-red-300 mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Oops! Something went wrong
        </h3>
        <p className="text-gray-600 mb-6">
          {error}
        </p>
        <Link 
          href="/dashboard" 
          className="inline-flex items-center bg-rose-500 text-white px-6 py-3 rounded-full hover:bg-rose-600 transition"
        >
          <MessageCircle className="mr-2 w-5 h-5" />
          Refresh
        </Link>
      </motion.div>
    )
  }

  if (filteredProposals.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12 bg-rose-50 rounded-2xl"
      >
        <Heart className="mx-auto w-16 h-16 text-rose-300 mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          No Love Stories Yet
        </h3>
        <p className="text-gray-600 mb-6">
          Start your journey by creating your first proposal!
        </p>
        <Link 
          href="/proposals/new" 
          className="inline-flex items-center bg-rose-500 text-white px-6 py-3 rounded-full hover:bg-rose-600 transition"
        >
          <MessageCircle className="mr-2 w-5 h-5" />
          Create Proposal
        </Link>
      </motion.div>
    )
  }

  return (
    <div className="space-y-4">
      {filteredProposals.map((proposal, index) => (
        <motion.div
          key={proposal.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-rose-50 rounded-2xl p-4 flex items-center justify-between hover:bg-rose-100 transition"
        >
          <div className="flex items-center space-x-4">
            {getStatusIcon(proposal.status)}
            <div>
              <h3 className="font-semibold text-gray-800 line-clamp-1">
                {proposal.recipient 
                  ? `To: ${proposal.recipient.name}` 
                  : 'Draft Proposal'}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-1">
                {proposal.message.slice(0, 50)}...
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {format(new Date(proposal.createdAt), 'PPP')}
              </p>
            </div>
          </div>
          <Link 
            href={`/proposals/${proposal.id}`} 
            className="text-rose-500 hover:text-rose-600 transition"
          >
            <Heart className="w-6 h-6" />
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
