import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ExternalLink, TrendingUp, Users, Heart, BarChart } from "lucide-react"

export function AcquisitionDialog() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const hasSeenDialog = localStorage.getItem('hasSeenAcquisitionDialog')
    if (!hasSeenDialog) {
      setIsOpen(true)
      localStorage.setItem('hasSeenAcquisitionDialog', 'true')
    }
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-gray-800">
            Strategic Acquisition Opportunity
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-6 space-y-6">
          <p className="text-gray-600 leading-relaxed text-center">
            MyProposal.Love, a pioneering AI-powered proposal platform, is now available for strategic acquisition.
            Join us in revolutionizing the way people express their love.
          </p>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: <Users className="w-6 h-6 text-rose-500" />, label: "10K+ Active Users" },
              { icon: <Heart className="w-6 h-6 text-rose-500" />, label: "98% Success Rate" },
              { icon: <TrendingUp className="w-6 h-6 text-rose-500" />, label: "150% Monthly Growth" },
              { icon: <BarChart className="w-6 h-6 text-rose-500" />, label: "$50K MRR" },
            ].map((stat, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                {stat.icon}
                <span className="text-sm font-medium text-gray-700">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <Button
              className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700"
              onClick={() => window.open('https://cal.com/abhinandan/myproposal-acquisition', '_blank')}
            >
              <span className="mr-2">📞</span>
              Contact Owner
            </Button>
            <Button
              variant="outline"
              className="border-rose-200 hover:bg-rose-50 text-rose-600"
              onClick={() => window.open('https://acquire.com/myproposal-love', '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View on Acquire.com
            </Button>
            <div className="text-center text-sm text-gray-500 pt-2">
              For direct inquiries: <a href="mailto:acquire@myproposal.love" className="text-rose-600 hover:underline">acquire@myproposal.love</a>
            </div>
          </div>

          <div className="text-center text-sm text-gray-500">
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
