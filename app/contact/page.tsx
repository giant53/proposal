"use client";

import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Clock } from "lucide-react";

// Email validation schema
const ContactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSubmitStatus("submitting");

    try {
      // Validate form data
      const validatedData = ContactFormSchema.parse(formData);

      // Send email via server action
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(validatedData)
      });

      if (response.ok) {
        setSubmitStatus("success");
        // Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        const fieldErrors: { [key: string]: string } = {};
        error.errors.forEach(err => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      }
      setSubmitStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4"><span className="text-rose-500">Contact Us</span></h1>
            <p className="text-gray-600">
              We&apos;re here to help with any questions about your love story
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Contact Info Card */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Get in Touch
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-rose-500 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Email Us</h3>
                    <p className="text-gray-600">support@myproposal.love</p>
                    <p className="text-sm text-gray-500 mt-1">
                      For general inquiries and support
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-rose-500 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Response Time</h3>
                    <p className="text-gray-600">Within 24 hours</p>
                    <p className="text-sm text-gray-500 mt-1">
                      We strive to respond quickly
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <h3 className="font-medium text-gray-900 mb-4">Office Address</h3>
                <address className="text-gray-600 not-italic">
                  myproposal.love<br />
                  Sector-62<br />
                  Noida<br />
                  India - 201301
                </address>
              </div>
            </div>

            {/* Contact Form Card */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Send us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={`w-full ${errors.name ? 'border-red-500' : ''}`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className={`w-full ${errors.email ? 'border-red-500' : ''}`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <Input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this about?"
                    className={`w-full ${errors.subject ? 'border-red-500' : ''}`}
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    className={`w-full min-h-[150px] ${errors.message ? 'border-red-500' : ''}`}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                  )}
                </div>

                <div>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg" 
                    disabled={submitStatus === "submitting"}
                  >
                    {submitStatus === "submitting" ? "Sending..." : "Send Message"}
                  </Button>
                </div>

                {submitStatus === "success" && (
                  <p className="text-green-600 text-center mt-4">
                    Message sent successfully! We&apos;ll get back to you soon.
                  </p>
                )}

                {submitStatus === "error" && (
                  <p className="text-red-600 text-center mt-4">
                    Failed to send message. Please try again later.
                  </p>
                )}
              </form>

              <p className="text-sm text-gray-500 mt-6 text-center">
                We&apos;ll get back to you as soon as possible
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-800">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 mt-2">
                Quick answers to common questions
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">
                  How quickly will I receive a response?
                </h3>
                <p className="text-gray-600">
                  We typically respond to all inquiries within 24 hours during business days.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">
                  What if I need urgent assistance?
                </h3>
                <p className="text-gray-600">
                  For urgent matters, please email us with &quot;URGENT&quot; in the subject line.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">
                  How can I report misuse?
                </h3>
                <p className="text-gray-600">
                  Send details to privacy@myproposal.love for immediate investigation.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">
                  Where can I find privacy information?
                </h3>
                <p className="text-gray-600">
                  Visit our Privacy Policy page or contact our privacy team directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}