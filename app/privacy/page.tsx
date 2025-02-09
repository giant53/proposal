import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-rose-600 mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600">
              Protecting Your Love Story with Care
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-16 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Our Commitment to Privacy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                At myproposal.love, we understand that your proposals are deeply
                personal and meaningful. We are committed to protecting your
                privacy and ensuring that your romantic moments remain secure
                and confidential.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Information We Collect
              </h2>
              <ul className="list-disc pl-6 space-y-3 text-gray-600">
                <li>Basic account information (name, email)</li>
                <li>Proposal content and customizations</li>
                <li>Recipient email addresses (with consent)</li>
                <li>Usage data to improve our services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                How We Protect Your Data
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-6 w-6 text-rose-500">🔒</div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-xl font-medium text-gray-900">
                      End-to-End Encryption
                    </h3>
                    <p className="mt-2 text-gray-600">
                      Your proposals are encrypted from the moment you create
                      them until they&apos;re viewed by your intended recipient.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-6 w-6 text-rose-500">⚡️</div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-xl font-medium text-gray-900">
                      Secure Infrastructure
                    </h3>
                    <p className="mt-2 text-gray-600">
                      We use industry-leading security measures and regular
                      audits to protect your data.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-6 w-6 text-rose-500">📝</div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-xl font-medium text-gray-900">
                      Data Retention
                    </h3>
                    <p className="mt-2 text-gray-600">
                      You control your data. Delete your proposals at any time,
                      and we&apos;ll remove them from our servers within 30
                      days.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Your Rights
              </h2>
              <ul className="list-disc pl-6 space-y-3 text-gray-600">
                <li>Access your personal data</li>
                <li>Request data deletion</li>
                <li>Opt-out of communications</li>
                <li>Update your preferences</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Contact Us
              </h2>
              <p className="text-gray-600 leading-relaxed">
                If you have any questions about our privacy practices, please
                contact our Data Protection Officer at privacy@myproposal.love
              </p>
            </section>
          </div>

          <div className="text-center">
            <div className="space-x-4">
              <Button asChild size="lg">
                <Link href="/terms">Terms of Service</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/">Return Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
