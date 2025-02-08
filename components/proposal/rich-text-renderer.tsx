/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { cn } from "@/lib/utils"

interface RichTextRendererProps {
  content: string
  className?: string
}

export function RichTextRenderer({ content, className }: RichTextRendererProps) {
  return (
    <div className={cn("prose prose-rose lg:prose-lg max-w-none", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => (
            <h1 
              className="text-3xl font-bold text-gray-900 mb-4 font-serif" 
              {...props} 
            />
          ),
          h2: ({ node, ...props }) => (
            <h2 
              className="text-2xl font-bold text-gray-800 mb-3 font-serif" 
              {...props} 
            />
          ),
          p: ({ node, ...props }) => (
            <p 
              className="text-gray-700 leading-relaxed mb-4" 
              {...props} 
            />
          ),
          strong: ({ node, ...props }) => (
            <strong 
              className="font-bold text-rose-600" 
              {...props} 
            />
          ),
          em: ({ node, ...props }) => (
            <em 
              className="text-rose-500 not-italic font-medium" 
              {...props} 
            />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote 
              className="border-l-4 border-rose-200 pl-4 italic text-gray-600" 
              {...props} 
            />
          ),
          ul: ({ node, ...props }) => (
            <ul 
              className="list-disc list-inside space-y-2 text-gray-700" 
              {...props} 
            />
          ),
          ol: ({ node, ...props }) => (
            <ol 
              className="list-decimal list-inside space-y-2 text-gray-700" 
              {...props} 
            />
          ),
          li: ({ node, ...props }) => (
            <li 
              className="text-gray-700" 
              {...props} 
            />
          ),
          a: ({ node, ...props }) => (
            <a 
              className="text-rose-500 hover:text-rose-600 underline" 
              {...props} 
            />
          ),
          hr: ({ node, ...props }) => (
            <hr 
              className="my-8 border-t border-rose-100" 
              {...props} 
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
