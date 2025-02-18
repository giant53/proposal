import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ExternalLink, TrendingUp, Users, Target, ChartBar, X } from "lucide-react"
import Link from 'next/link'

export function AcquisitionDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [dialogDelay, setDialogDelay] = useState(true)

  useEffect(() => {
    const hasSeenDialog = localStorage.getItem('hasSeenAcquisitionDialog')
    const timer = setTimeout(() => {
      setDialogDelay(false)
    }, 2000)

    if (!hasSeenDialog && !dialogDelay) {
      setIsOpen(true)
      localStorage.setItem('hasSeenAcquisitionDialog', 'true')
    }

    return () => clearTimeout(timer)
  }, [dialogDelay])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[640px] bg-white rounded-xl shadow-xl border-none">
        <DialogClose className="absolute top-4 right-4 hover:bg-gray-100 rounded-full p-2 transition-colors">
          <X className="w-5 h-5 text-gray-500" />
        </DialogClose>

        <div className="p-6 pt-12">
          {/* Header Section */}
          <div className="text-center mb-8">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-gray-900">
                Premium Acquisition Opportunity
              </DialogTitle>
              <DialogDescription className="text-gray-600 mt-2 text-base">
                myproposal.love — Leading Digital Proposal Platform
              </DialogDescription>
            </DialogHeader>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {[
              { 
                icon: <Users className="w-5 h-5" />,
                metric: "100+",
                label: "Active Users"
              },
              {
                icon: <Target className="w-5 h-5" />,
                metric: "98%",
                label: "Success Rate"
              },
              {
                icon: <TrendingUp className="w-5 h-5" />,
                metric: "150%",
                label: "MoM Growth"
              },
              {
                icon: <ChartBar className="w-5 h-5" />,
                metric: "$50",
                label: "Monthly Revenue"
              }
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-indigo-600 mb-2">
                  {item.icon}
                  <span className="font-semibold">{item.metric}</span>
                </div>
                <p className="text-sm text-gray-600">{item.label}</p>
              </div>
            ))}
          </div>

          {/* Value Proposition */}
          <p className="text-gray-700 text-sm leading-relaxed mb-8">
            myproposal.love represents an exceptional opportunity to acquire a market-leading platform in the growing digital proposal space. With demonstrated product-market fit and strong unit economics, this asset presents significant scaling potential.
          </p>

          {/* CTA Section */}
          <div className="space-y-4">
            <Button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6"
              onClick={() => window.open('https://cal.com/awesome_v0/30min', '_blank')}
            >
              Schedule Private Investment Discussion
            </Button>
            
            <Button
              variant="outline"
              className="w-full border-gray-200 hover:bg-gray-50 text-gray-700 py-6"
              onClick={() => window.open('https://acquire.com/myproposal-love', '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View Detailed Investment Memorandum
            </Button>
          </div>

          {/* Contact Information */}
          <p className="text-center text-sm text-gray-500 mt-6">
            For confidential inquiries:{' '}
            <Link href="mailto:invest@myproposal.love" className="text-indigo-600 hover:underline font-medium">
              invest@myproposal.love
            </Link>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}