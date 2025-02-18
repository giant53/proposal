import { Button } from "@/components/ui/button"
import {ExternalLink, ChevronRight, Rocket } from "lucide-react"
import { motion } from "framer-motion"

export function AcquisitionBanner() {
  return (
    <div className="w-full py-8 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden shadow-2xl shadow-indigo-200/50 border border-indigo-100/50"
        >
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 opacity-100" />
          
          {/* Floating Decorative Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-200/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-200/20 rounded-full blur-3xl" />
          </div>

          <div className="relative grid lg:grid-cols-2 gap-8 p-8 sm:p-12">
            {/* Left Column */}
            <div className="space-y-6 z-10">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium">
                <Rocket className="w-4 h-4 mr-2 animate-bounce" />
                Strategic Acquisition Opportunity
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                Acquire <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">myproposal.love</span>
                <br />
                The Future of AI Proposals
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed">
                A revolutionary AI-powered platform transforming how couples express love. 
                Unique technology, global reach, and proven success await the right investor.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                {[
                  { label: "Monthly Active Users", value: "10,000+" },
                  { label: "Proposal Success Rate", value: "98%" },
                  { label: "Monthly Revenue", value: "$50K" },
                  { label: "YoY Growth", value: "150%" }
                ].map((stat, index) => (
                  <div 
                    key={index} 
                    className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-md border border-indigo-100/50 hover:shadow-lg transition-all"
                  >
                    <div className="text-2xl font-bold text-indigo-700">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:pl-8 space-y-6 z-10">
              <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-indigo-100/50">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <ChevronRight className="text-indigo-500 mr-2" />
                  Acquisition Highlights
                </h3>
                <ul className="space-y-3">
                  {[
                    "AI-Powered Proposal Generation",
                    "Multi-Channel Delivery (WhatsApp, Email)",
                    "Premium Subscription Model",
                    "Global User Base",
                    "Proprietary Love Algorithm",
                    "High User Retention"
                  ].map((feature, index) => (
                    <li 
                      key={index} 
                      className="flex items-start text-gray-700 hover:text-indigo-600 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 space-y-4">
                  <Button
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                    onClick={() => window.open('https://cal.com/abhinandan/myproposal-acquisition', '_blank')}
                  >
                    <Rocket className="mr-2 h-5 w-5 animate-pulse" />
                    Schedule Acquisition Call
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-indigo-200 hover:bg-indigo-50 text-indigo-600"
                    onClick={() => window.open('https://acquire.com/myproposal-love', '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View on Acquire.com
                  </Button>
                  <div className="text-center text-sm text-gray-500 pt-2">
                    Direct inquiries: <a 
                      href="mailto:acquire@myproposal.love" 
                      className="text-indigo-600 hover:underline hover:text-indigo-700 transition-colors"
                    >
                      acquire@myproposal.love
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
