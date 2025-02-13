import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4"><span className="text-rose-500">Terms of Service</span></h1>
            <p className="text-gray-600">Last Updated: February 13, 2025</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. <span className="text-rose-500">Agreement to Terms</span></h2>
              <p className="text-gray-600 leading-relaxed">
                By accessing or using <span className="text-rose-500">myproposal.love</span> (&quot;the <span className="text-rose-500">Service</span>&quot;), you agree to be bound by these <span className="text-rose-500">Terms of Service</span> 
                (&quot;<span className="text-rose-500">Terms</span>&quot;). If you disagree with any part of these terms, you may not access the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Platform Status as <span className="text-rose-500">Intermediary</span></h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  myproposal.love operates solely as an <span className="text-rose-500">intermediary platform</span> that:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provides <span className="text-rose-500">tools</span> for creating and sending proposals</li>
                  <li>Does not generate <span className="text-rose-500">content</span> without user input</li>
                  <li>Acts only as a <span className="text-rose-500">transmission medium</span> for user-created content</li>
                  <li>Has no control over or responsibility for <span className="text-rose-500">user-generated content</span></li>
                </ul>
                <p className="font-medium">
                  Users acknowledge and agree that myproposal.love is not responsible for any user-generated content 
                  or the consequences of transmitting such content.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. <span className="text-rose-500">User Responsibilities</span> and Conduct</h2>
              <div className="space-y-4 text-gray-600">
                <p>Users are solely responsible for:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>All <span className="text-rose-500">content</span> they create and transmit through the Service</li>
                  <li>Obtaining <span className="text-rose-500">consent</span> from proposal recipients</li>
                  <li>Ensuring their use complies with all applicable <span className="text-rose-500">laws</span></li>
                  <li>Any <span className="text-rose-500">consequences</span> resulting from their use of the Service</li>
                </ul>
                <p className="font-medium mt-4">
                  Users specifically agree not to use the Service for:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-red-600">
                  <li><span className="text-rose-500">Harassment</span> or intimidation of any person</li>
                  <li>Sending unwanted or <span className="text-rose-500">unsolicited communications</span></li>
                  <li>Creating or transmitting harmful, threatening, or <span className="text-rose-500">abusive content</span></li>
                  <li>Impersonating others or providing <span className="text-rose-500">false information</span></li>
                  <li>Any <span className="text-rose-500">illegal</span> or unauthorized purpose</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. <span className="text-rose-500">Limitation of Liability</span></h2>
              <div className="space-y-4 text-gray-600">
                <p className="font-medium">
                  To the maximum extent permitted by law, myproposal.love:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Is not liable for any <span className="text-rose-500">direct, indirect, incidental, special, consequential, or punitive damages</span></li>
                  <li>Bears no responsibility for <span className="text-rose-500">user-generated content</span> or its consequences</li>
                  <li>Makes no <span className="text-rose-500">warranties</span> about content accuracy or reliability</li>
                  <li>Is not responsible for any <span className="text-rose-500">disputes</span> between users and recipients</li>
                  <li>Disclaims all <span className="text-rose-500">liability</span> for user misuse of the Service</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. <span className="text-rose-500">Indemnification</span></h2>
              <p className="text-gray-600 leading-relaxed">
                Users agree to indemnify and hold harmless myproposal.love, its officers, directors, employees, and agents 
                from any <span className="text-rose-500">claims, damages, losses, liabilities, costs, or expenses</span> (including legal fees) arising from:
                their use of the Service, their violation of these Terms, their violation of any rights of another, or 
                any content they submit, post, or transmit through the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. <span className="text-rose-500">Content Removal</span> and Account Termination</h2>
              <div className="space-y-4 text-gray-600">
                <p>myproposal.love reserves the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Remove any <span className="text-rose-500">content</span> that violates these Terms</li>
                  <li><span className="text-rose-500">Suspend or terminate accounts</span> for violations</li>
                  <li>Report <span className="text-rose-500">illegal activities</span> to appropriate authorities</li>
                  <li>Cooperate with <span className="text-rose-500">law enforcement</span> investigations</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. <span className="text-rose-500">Service Modifications</span></h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to modify or discontinue the <span className="text-rose-500">Service</span> at any time, with or without notice. 
                We shall not be liable to you or any third party for any modification, suspension, or discontinuance 
                of the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. <span className="text-rose-500">Intellectual Property</span></h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  The Service and its original <span className="text-rose-500">content, features, and functionality</span> are owned by myproposal.love and 
                  are protected by international <span className="text-rose-500">copyright, trademark, patent, trade secret</span>, and other intellectual 
                  property laws.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. <span className="text-rose-500">Dispute Resolution</span></h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Any <span className="text-rose-500">disputes</span> arising from these Terms or use of the Service shall be:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Initially attempted to be resolved through <span className="text-rose-500">informal negotiation</span></li>
                  <li>Subject to <span className="text-rose-500">binding arbitration</span> if informal resolution fails</li>
                  <li>Governed by the <span className="text-rose-500">laws</span> of [Your Jurisdiction]</li>
                  <li>Subject to the exclusive <span className="text-rose-500">jurisdiction</span> of courts in [Your Jurisdiction]</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Changes to <span className="text-rose-500">Terms</span></h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to modify these Terms at any time. We will notify users of any <span className="text-rose-500">material changes</span> 
                through the Service or via email. Continued use of the Service after such modifications constitutes 
                acceptance of the updated Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Contact Information</h2>
              <div className="space-y-4 text-gray-600">
                <p>For questions about these Terms, please contact us at:</p>
                <div className="pl-6">
                  <p><span className="text-rose-500">Legal Department</span></p>
                  <p>myproposal.love</p>
                  <p>Email: legal@myproposal.love</p>
                </div>
              </div>
            </section>

            <section className="border-t pt-8 mt-8">
              <p className="text-sm text-gray-500 text-center">
                By using myproposal.love, you acknowledge that you have read, understood, and agree to be bound by these <span className="text-rose-500">Terms of Service</span>.
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