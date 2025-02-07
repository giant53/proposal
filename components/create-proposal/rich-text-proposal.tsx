/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface RichTextProposalProps {
  content: string;
  className?: string;
}

export function RichTextProposal({
  content,
  className,
}: RichTextProposalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn(
        "prose prose-rose max-w-none",
        "prose-headings:text-gray-800 prose-headings:font-semibold",
        "prose-p:text-gray-600 prose-p:leading-relaxed",
        "prose-strong:text-rose-600 prose-strong:font-semibold",
        "prose-em:text-gray-700 prose-em:italic",
        "prose-blockquote:border-rose-300 prose-blockquote:bg-rose-50/50 prose-blockquote:px-4 prose-blockquote:py-2 prose-blockquote:rounded-md",
        "prose-code:text-rose-600 prose-code:bg-rose-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded",
        "prose-ul:list-disc prose-ul:pl-4 prose-li:text-gray-600",
        className
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="text-3xl font-bold mb-4" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-2xl font-semibold mb-3" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-xl font-semibold mb-2" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="mb-4 leading-relaxed" {...props} />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote className="italic border-l-4 pl-4 my-4" {...props} />
          ),
          strong: ({ node, ...props }) => (
            <strong className="font-semibold" {...props} />
          ),
          em: ({ node, ...props }) => (
            <em className="italic text-gray-700" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc pl-5 mb-4" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal pl-5 mb-4" {...props} />
          ),
          li: ({ node, ...props }) => <li className="mb-1" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </motion.div>
  );
}
