import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { prisma } from "@/prisma";
import { format } from "date-fns";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

interface ProposalPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProposalPageProps) {
  const { id } = await params;
  return {
    title: `Proposal ${id}`,
  };
}

export default async function ProposalPage({ params }: ProposalPageProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const { id } = await params;

  if (!id || typeof id !== "string") {
    notFound();
  }

  try {
    const proposal = await prisma.proposal.findUnique({
      where: { id },
      include: {
        messages: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!proposal) {
      notFound();
    }

    if (proposal.senderId !== session.user.id) {
      redirect("/dashboard");
    }

    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Proposal Details</h1>
          <Button asChild variant="outline">
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>

        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Recipient</h3>
              <p>{proposal.recipientName}</p>
            </div>
            <div>
              <h3 className="font-semibold">Status</h3>
              <p className="capitalize">{proposal.status.toLowerCase()}</p>
            </div>
            <div>
              <h3 className="font-semibold">Created</h3>
              <p>{format(new Date(proposal.createdAt), "PPP")}</p>
            </div>
            <div>
              <h3 className="font-semibold">Expires</h3>
              <p>{format(new Date(proposal.expiresAt), "PPP")}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Message</h3>
            <p className="whitespace-pre-wrap">{proposal.message}</p>
      </div>

          {proposal.customMessage && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Custom Message</h3>
              <p className="whitespace-pre-wrap">{proposal.customMessage}</p>
            </div>
          )}
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Messages</h2>
          {proposal.messages.length > 0 ? (
            <div className="space-y-4">
              {proposal.messages.map((message) => (
                <div
                  key={message.id}
                  className="bg-white shadow rounded-lg p-4"
                >
                  <p className="text-sm text-gray-500 mb-2">
                    {format(new Date(message.createdAt), "PPP")}
                  </p>
                  <p>{message.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No messages yet</p>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching proposal:", error);
    notFound();
  }
}
