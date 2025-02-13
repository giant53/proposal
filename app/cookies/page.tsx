import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
            <p className="text-gray-600">Last Updated: February 13, 2025</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
              <p className="text-gray-600 leading-relaxed">
                This Cookie Policy explains how <span className="font-bold text-rose-500">myproposal.love</span> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) uses cookies and similar technologies 
                when you use our website and services. This policy specifically covers our use of cookies in conjunction 
                with our authentication system, which utilizes Next-Auth v5 for Google OAuth and email authentication.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. What Are Cookies?</h2>
              <p className="text-gray-600 leading-relaxed">
                Cookies are small text files that are stored on your device when you visit our website. They help us 
                remember your preferences, understand how you use our site, and provide you with secure authentication.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Types of Cookies We Use</h2>
              <div className="space-y-6 text-gray-600">
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">3.1 Essential Authentication Cookies</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>next-auth.session-token:</strong> Manages your authenticated session state
                    </li>
                    <li>
                      <strong>next-auth.csrf-token:</strong> Protects against Cross-Site Request Forgery attacks
                    </li>
                    <li>
                      <strong>next-auth.callback-url:</strong> Manages authentication redirect flows
                    </li>
                    <li>
                      <strong>next-auth.state:</strong> Maintains OAuth state during authentication
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">3.2 Functional Cookies</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Language Preferences:</strong> Remember your preferred language settings
                    </li>
                    <li>
                      <strong>Theme Settings:</strong> Store your interface preferences
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">3.3 Analytics Cookies</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Anonymous usage data to improve our service</li>
                    <li>Performance monitoring and error tracking</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Cookie Duration</h2>
              <div className="space-y-4 text-gray-600">
                <p>Our cookies have different lifespans:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Session Cookies:</strong> Temporary cookies that expire when you close your browser
                  </li>
                  <li>
                    <strong>Authentication Cookies:</strong> Valid for up to 30 days for persistent sessions
                  </li>
                  <li>
                    <strong>Preference Cookies:</strong> May last up to one year to remember your settings
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Third-Party Authentication Cookies</h2>
              <div className="space-y-4 text-gray-600">
                <p>When using third-party authentication providers:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Google OAuth:</strong> May set cookies for authentication state and security
                  </li>
                  <li>
                    <strong>Email Provider:</strong> May set cookies for email verification flows
                  </li>
                </ul>
                <p>
                  These providers have their own cookie policies, which we encourage you to review.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Managing Cookies</h2>
              <div className="space-y-4 text-gray-600">
                <p>You can control cookies through your browser settings:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Block all or certain types of cookies</li>
                  <li>Delete existing cookies</li>
                  <li>Set preferences for different websites</li>
                </ul>
                <p className="mt-4 font-medium">
                  Note: Blocking essential authentication cookies will prevent you from logging in and using our services.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Cookie Security</h2>
              <div className="space-y-4 text-gray-600">
                <p>We protect your cookie data through:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Encryption of sensitive cookie data</li>
                  <li>Secure flag on authentication cookies</li>
                  <li>HTTP-only flag to prevent JavaScript access</li>
                  <li>SameSite attributes for CSRF protection</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Updates to This Policy</h2>
              <p className="text-gray-600 leading-relaxed">
                We may update this Cookie Policy to reflect changes in our practices or for legal compliance. 
                We will notify you of any material changes through our website or via email.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Contact Us</h2>
              <div className="space-y-4 text-gray-600">
                <p>If you have questions about our use of cookies, please contact us at:</p>
                <div className="pl-6">
                  <p>Privacy Team</p>
                  <p>myproposal.love</p>
                  <p>Email: support@myproposal.love</p>
                </div>
              </div>
            </section>

            <section className="border-t pt-8 mt-8">
              <p className="text-sm text-gray-500 text-center">
                This cookie policy complies with GDPR, ePrivacy Directive, and other applicable privacy laws.
              </p>
            </section>
          </div>

          <div className="text-center mt-8">
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