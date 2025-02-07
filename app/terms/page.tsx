import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-rose-600 mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-600">
              Building Trust in Digital Romance
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-16 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Welcome to myproposal.love (or myproposal.❤️)
              </h2>
              <p className="text-gray-600 leading-relaxed">
                By using our service, you agree to these terms. We&apos;ve
                created these terms to ensure a safe, respectful, and romantic
                environment for all users while protecting privacy and
                maintaining legal compliance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Using Our Services
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-6 w-6 text-rose-500">💌</div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-xl font-medium text-gray-900">
                      Proposal Creation
                    </h3>
                    <p className="mt-2 text-gray-600">
                      Create genuine, heartfelt proposals. We reserve the right
                      to remove inappropriate or harmful content.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-6 w-6 text-rose-500">🤝</div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-xl font-medium text-gray-900">
                      Consent
                    </h3>
                    <p className="mt-2 text-gray-600">
                      Ensure you have the recipient&apos;s consent before
                      sending proposals. Respect boundaries and privacy.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-6 w-6 text-rose-500">⚖️</div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-xl font-medium text-gray-900">
                      Legal Compliance
                    </h3>
                    <p className="mt-2 text-gray-600">
                      Follow all applicable laws and regulations. We comply with
                      data protection standards worldwide.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Your Responsibilities
              </h2>
              <ul className="list-disc pl-6 space-y-3 text-gray-600">
                <li>Maintain account security</li>
                <li>Respect others&apos; privacy and consent</li>
                <li>Create appropriate content</li>
                <li>Report suspicious activity</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Content Guidelines
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                While we encourage creativity and romance, we prohibit:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-gray-600">
                <li>Harassment or threatening content</li>
                <li>Inappropriate or explicit material</li>
                <li>False or misleading information</li>
                <li>Spam or commercial solicitation</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Updates to Terms
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We may update these terms to reflect service improvements or
                legal requirements. We&apos;ll notify you of significant changes
                via email.
              </p>
            </section>
          </div>

          <div className="text-center">
            <div className="space-x-4">
              <Button asChild size="lg">
                <Link href="/privacy">Privacy Policy</Link>
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
