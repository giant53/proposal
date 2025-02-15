import { Button } from "@/components/ui/button"
import { TrendingUp, ExternalLink, ChevronRight } from "lucide-react"
import Image from "next/image"

export function AcquisitionBanner() {
  return (
    <div className="w-full bg-gradient-to-r from-gray-50 to-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <Image
              src="/wlogo.svg"
              alt="Pattern"
              width={400}
              height={400}
              className="w-full h-full object-cover opacity-10"
            />
          </div>

          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-sm font-medium">
                <TrendingUp className="w-4 h-4 mr-2" />
                Strategic Acquisition Opportunity
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                Acquire <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">myproposal.love</span><br />
                The future of AI proposals.
              </h2>

              <p className="text-lg text-gray-500 leading-relaxed">
                Join us in revolutionizing the way people express their love. Our AI-powered platform 
                has helped a number of couples create unforgettable moments.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                {[
                  { label: "Monthly Active Users", value: "10,000+" },
                  { label: "Proposal Success Rate", value: "98%" },
                  { label: "Monthly Revenue", value: "$50K" },
                  { label: "YoY Growth", value: "150%" }
                ].map((stat, index) => (
                  <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:pl-10 space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Acquisition Highlights
                </h3>
                <ul className="space-y-4">
                  {[
                    "AI-Powered Proposal Generation",
                    "Multi-Channel Delivery (WhatsApp, Email)",
                    "Premium Subscription Model",
                    "Global User Base",
                    "Proprietary Love Algorithm",
                    "High User Retention"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <ChevronRight className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 ml-2">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 space-y-4">
                  <Button
                    className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white"
                    onClick={() => window.open('https://cal.com/abhinandan/myproposal-acquisition', '_blank')}
                  >
                    <span className="mr-2">📞</span>
                    Contact Owner
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-rose-200 hover:bg-rose-50 text-rose-600"
                    onClick={() => window.open('https://acquire.com/myproposal-love', '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View on Acquire.com
                  </Button>
                  <div className="text-center text-sm text-gray-500 pt-2">
                    Direct inquiries: <a href="mailto:acquire@myproposal.love" className="text-rose-600 hover:underline">acquire@myproposal.love</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
