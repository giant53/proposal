"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useProposals } from "@/hooks/use-proposals"
import { Button } from "@/components/ui/button"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"

export function ProposalList() {
  const { data, isLoading, error } = useProposals()

  if (isLoading) {
    return <div>Loading proposals...</div>
  }

  if (error) {
    return <div>Error loading proposals</div>
  }

  return (
    <div className="space-y-4">
      {data?.proposals.map((proposal: any) => (
        <div
          key={proposal.id}
          className="border rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{proposal.recipientName}</h3>
              <p className="text-sm text-gray-500">
                Sent {formatDistanceToNow(new Date(proposal.createdAt))} ago
              </p>
              <p className="text-sm mt-2">
                Status:{" "}
                <span
                  className={`font-medium ${
                    proposal.status === "ACCEPTED"
                      ? "text-green-600"
                      : proposal.status === "REJECTED"
                      ? "text-red-600"
                      : "text-blue-600"
                  }`}
                >
                  {proposal.status}
                </span>
              </p>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href={`/proposals/${proposal.id}`}>View Details</Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
