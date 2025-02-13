import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-gray-600">Last Updated: February 13, 2025</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
              <p className="text-gray-600 leading-relaxed">
                <span className="font-bold text-rose-500">myproposal.love</span> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting the <span className="text-rose-500">privacy</span> and <span className="text-rose-500">security</span> of your personal information. This <span className="text-rose-500">Privacy Policy</span> explains how we collect, use, disclose, and safeguard your information when you use our proposal creation and delivery service. By using our service, you consent to the data practices described in this policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Information We Collect</h2>
              <div className="space-y-4 text-gray-600">
                <h3 className="text-xl font-medium text-gray-800">2.1 <span className="text-rose-500">Personal Information</span></h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><span className="text-rose-500">Account Information</span>: Name, email address, and contact information</li>
                  <li><span className="text-rose-500">Proposal Content</span>: Text and customizations you create</li>
                  <li><span className="text-rose-500">Recipient Information</span>: Email addresses of intended recipients</li>
                  <li><span className="text-rose-500">Communication Records</span>: Customer service communications</li>
                </ul>

                <h3 className="text-xl font-medium text-gray-800 mt-6">2.2 <span className="text-rose-500">Technical Information</span></h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><span className="text-rose-500">Device Information</span>: Browser type, IP address, device identifiers</li>
                  <li><span className="text-rose-500">Usage Data</span>: Interaction with our service, access times, error logs</li>
                  <li><span className="text-rose-500">Cookies</span> and Similar Technologies: As described in our Cookie Policy</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. How We Use Your Information</h2>
              <div className="space-y-4 text-gray-600">
                <p>We use collected information for the following <span className="text-rose-500">purposes</span>:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Providing and maintaining our <span className="text-rose-500">service</span></li>
                  <li>Processing and delivering <span className="text-rose-500">proposals</span></li>
                  <li>Improving and personalizing <span className="text-rose-500">user experience</span></li>
                  <li>Communicating service updates and support</li>
                  <li>Ensuring <span className="text-rose-500">compliance</span> with our terms and applicable laws</li>
                  <li>Detecting and preventing <span className="text-rose-500">fraud</span> or abuse</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Data Protection and Security</h2>
              <div className="space-y-4 text-gray-600">
                <p>We implement appropriate technical and organizational measures to protect your <span className="text-rose-500">data</span>:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><span className="text-rose-500">End-to-end encryption</span> for all proposal content</li>
                  <li>Secure <span className="text-rose-500">SSL/TLS encryption</span> for all data transfers</li>
                  <li>Regular <span className="text-rose-500">security assessments</span> and penetration testing</li>
                  <li><span className="text-rose-500">Access controls</span> and authentication requirements</li>
                  <li>Data backup and disaster recovery procedures</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Anti-Harassment and Misuse Prevention</h2>
              <div className="space-y-4 text-gray-600">
                <p>We maintain a <span className="text-rose-500">zero-tolerance policy</span> for harassment and misuse:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Strict <span className="text-rose-500">monitoring</span> and reporting systems for abuse</li>
                  <li>Immediate action on <span className="text-rose-500">harassment</span> reports</li>
                  <li>Cooperation with law enforcement when required</li>
                  <li><span className="text-rose-500">Account termination</span> for policy violations</li>
                  <li>Recipient <span className="text-rose-500">consent verification</span> procedures</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Your Rights and Choices</h2>
              <div className="space-y-4 text-gray-600">
                <p>Under applicable <span className="text-rose-500">privacy laws</span>, you have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access your <span className="text-rose-500">personal information</span></li>
                  <li>Correct inaccurate <span className="text-rose-500">data</span></li>
                  <li>Request <span className="text-rose-500">deletion</span> of your data</li>
                  <li>Object to data processing</li>
                  <li>Request data <span className="text-rose-500">portability</span></li>
                  <li>Withdraw <span className="text-rose-500">consent</span> at any time</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Data Retention and Deletion</h2>
              <p className="text-gray-600 leading-relaxed">
                We retain <span className="text-rose-500">personal information</span> only for as long as necessary to provide our service and fulfill the purposes outlined in this policy. <span className="text-rose-500">Proposal content</span> is automatically deleted 30 days after delivery. You may request immediate <span className="text-rose-500">deletion</span> of your data at any time through your account settings or by contacting us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. International Data Transfers</h2>
              <p className="text-gray-600 leading-relaxed">
                We process <span className="text-rose-500">data</span> in the United States and comply with applicable <span className="text-rose-500">data transfer mechanisms</span> including Standard Contractual Clauses for international transfers. We ensure appropriate <span className="text-rose-500">safeguards</span> are in place for all international data transfers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Children&apos;s Privacy</h2>
              <p className="text-gray-600 leading-relaxed">
                Our service is not directed to <span className="text-rose-500">children</span> under 18. We do not knowingly collect <span className="text-rose-500">personal information</span> from children. If you believe we have collected information from a child, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Changes to This Policy</h2>
              <p className="text-gray-600 leading-relaxed">
                We may update this <span className="text-rose-500">Privacy Policy</span> periodically. We will notify you of any <span className="text-rose-500">material changes</span> through our service or via email. Your continued use of our service after such modifications constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Contact Information</h2>
              <div className="space-y-4 text-gray-600">
                <p>For <span className="text-rose-500">privacy-related</span> inquiries or to exercise your rights, contact us at:</p>
                <div className="pl-6">
                  <p><span className="text-rose-500">Data Protection Team</span></p>
                  <p>myproposal.love</p>
                  <p>Email: support@myproposal.love</p>
                  <p>Address: Sector-62, Noida, India</p>
                </div>
              </div>
            </section>

            <section className="border-t pt-8 mt-8">
              <p className="text-sm text-gray-500 text-center">
                This privacy policy is compliant with <span className="text-rose-500">GDPR</span>, <span className="text-rose-500">CCPA</span>, and other applicable privacy laws.
              </p>
            </section>
          </div>

          <div className="text-center mt-8">
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