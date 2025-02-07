import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-rose-600 mb-6">
              Crafting Love Stories with Care
            </h1>
            <p className="text-xl text-gray-600">
              Where heartfelt proposals meet privacy and trust
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative h-[400px]">
              <Image
                src="/couple-illustration.svg"
                alt="Couple Illustration"
                fill
                className="object-contain"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold text-gray-800">
                Why Choose proposal.me?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-6 w-6 text-rose-500">❤️</div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-xl font-medium text-gray-900">AI-Powered Romance</h3>
                    <p className="mt-2 text-gray-600">Our AI helps craft the perfect proposal while keeping your unique voice and emotions.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-6 w-6 text-rose-500">🔒</div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-xl font-medium text-gray-900">Privacy First</h3>
                    <p className="mt-2 text-gray-600">Your love story is precious. We ensure it stays private with end-to-end encryption.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-6 w-6 text-rose-500">✨</div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-xl font-medium text-gray-900">Beautiful Experience</h3>
                    <p className="mt-2 text-gray-600">Create stunning proposals with our beautiful templates and customization options.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
              Our Commitment to You
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🌹</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Authenticity</h3>
                <p className="text-gray-600">Your proposals remain genuine and heartfelt, enhanced by AI but true to your emotions.</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🛡️</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Security</h3>
                <p className="text-gray-600">Industry-leading security measures protect your personal information and proposals.</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">💝</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Support</h3>
                <p className="text-gray-600">24/7 support to help you create the perfect proposal for your special someone.</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">
              Ready to Start Your Love Story?
            </h2>
            <div className="space-x-4">
              <Button asChild size="lg">
                <Link href="/login">Create Your Proposal</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/privacy">Learn About Privacy</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
