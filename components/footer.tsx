"use client";

import { useState } from "react";
import { FaTwitter, FaInstagram, FaFacebook, FaLinkedin, FaHeart, FaEnvelope } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your newsletter subscription logic here
    setEmail("");
  };

  return (
    <footer className="bg-gradient-to-b from-white to-rose-50 border-t border-rose-100">
      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-r from-rose-100 to-pink-100 rounded-2xl p-8 mb-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Get Romantic Proposal Ideas
            </h3>
            <p className="text-gray-600 mb-6">
              Subscribe to receive weekly inspiration for your perfect proposal moment
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="max-w-xs"
                required
              />
              <Button type="submit" className="bg-rose-500 hover:bg-rose-600">
                <FaEnvelope className="mr-2" />
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <Image 
                src="/wlogo.svg" 
                alt="myproposal.love logo" 
                width={40} 
                height={40}
                className="transform hover:scale-110 transition-transform"
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
                myproposal.love
              </span>
            </Link>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Crafting unforgettable moments with AI-powered proposal suggestions. 
              Let us help you create the perfect way to say &quot;Will you marry me?&quot;
            </p>
            <div className="flex space-x-4">
              {[
                { icon: FaTwitter, href: "https://twitter.com/myproposal_love", label: "Twitter" },
                { icon: FaInstagram, href: "https://instagram.com/myproposal.love", label: "Instagram" },
                { icon: FaFacebook, href: "https://facebook.com/myproposal.love", label: "Facebook" },
                { icon: FaLinkedin, href: "https://linkedin.com/company/myproposal-love", label: "LinkedIn" }
              ].map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="text-rose-400 hover:text-rose-600 transition-all transform hover:scale-110"
                >
                  <social.icon className="w-6 h-6" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
              <FaHeart className="w-4 h-4 text-rose-500 mr-2" />
              Proposal Help
            </h4>
            <ul className="space-y-3">
              {[
                { text: "Proposal Ideas", href: "/ideas" },
                { text: "Location Finder", href: "/locations" },
                { text: "Success Stories", href: "/stories" },
                { text: "Proposal Tips", href: "/tips" },
                { text: "Valentine's Special", href: "/valentine" }
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-rose-600 transition-colors flex items-center group"
                  >
                    <span className="transform group-hover:translate-x-1 transition-transform">
                      {link.text}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Company</h4>
            <ul className="space-y-3">
              {[
                { text: "About Us", href: "/about" },
                { text: "Blog", href: "/blog" },
                { text: "Careers", href: "/careers" },
                { text: "Press Kit", href: "/press" },
                { text: "Contact", href: "/contact" }
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-rose-600 transition-colors flex items-center group"
                  >
                    <span className="transform group-hover:translate-x-1 transition-transform">
                      {link.text}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Legal & Support</h4>
            <ul className="space-y-3">
              {[
                { text: "Terms of Service", href: "/terms" },
                { text: "Privacy Policy", href: "/privacy" },
                { text: "Cookie Policy", href: "/cookies" },
                { text: "Help Center", href: "/help" },
                { text: "FAQs", href: "/faqs" }
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-rose-600 transition-colors flex items-center group"
                  >
                    <span className="transform group-hover:translate-x-1 transition-transform">
                      {link.text}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-rose-100">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} myproposal.love. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-gray-600 text-sm flex items-center">
                Made with <FaHeart className="w-4 h-4 text-rose-500 mx-1" /> at localhost:3000
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}