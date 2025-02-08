/* eslint-disable @typescript-eslint/no-unused-vars */
import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { notFound } from "next/navigation";
import { UnauthorizedAccess } from "@/components/proposal/unauthorized-access";
import { ProposalContent } from "@/components/proposal/proposal-content";
import { Metadata } from "next";

interface ProposalPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ secretCode?: string }>;
}

export async function generateMetadata({
  params,
  searchParams,
}: ProposalPageProps): Promise<Metadata> {
  try {
    const proposal = await prisma.proposal.findUnique({
      where: { id: await Promise.resolve((await params).id) },
      select: { sender: { select: { name: true } } },
    });

    if (!proposal) {
      return {
        title: "Message Not Found | Proposal.me",
        description: "The requested message could not be found.",
      };
    }

    return {
      title: `Special Message from ${proposal.sender.name} | Proposal.me`,
      description: "A heartfelt message awaits you",
    };
  } catch (error) {
    return {
      title: "Special Message | Proposal.me",
      description: "A heartfelt message awaits you",
    };
  }
}

export default async function ProposalPage({
  params,
  searchParams,
}: ProposalPageProps) {
  const session = await auth();
  const id = await Promise.resolve((await params).id);
  const secretCode = await Promise.resolve((await searchParams).secretCode);

  if (!id || typeof id !== "string") {
    notFound();
  }

  try {
    const proposal = await prisma.proposal.findUnique({
      where: { id },
      include: {
        sender: true,
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

    // Access control logic
    const hasAccess =
      !proposal.isPrivate || // Public proposals are accessible to all
      (session?.user?.id === proposal.senderId) || // Creator has access
      (proposal.secretHash === secretCode); // Valid secret code grants access

    if (!hasAccess) {
      return <UnauthorizedAccess />;
    }

    const isExpired = new Date() > new Date(proposal.expiresAt);

    if (isExpired) {
      return (
        <UnauthorizedAccess
          title="Message Expired"
          message="This proposal has expired and is no longer available for viewing. For privacy reasons, we automatically expire proposals after 7 days."
        />
      );
    }

    return (
      <ProposalContent
        proposal={proposal}
        isCreator={session?.user?.id === proposal.senderId}
      />
    );
  } catch (error) {
    console.error("Error fetching proposal:", error);
    notFound();
  }
}
