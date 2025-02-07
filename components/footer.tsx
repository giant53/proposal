"use client";

import { FaHeart, FaTwitter, FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa6";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-rose-50 border-t border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Tagline */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              {/* <FaHeart className="w-8 h-8 text-rose-500" /> */}
              <span className="text-2xl font-bold text-rose-600">
                myproposal.❤️
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              Transform your love story into an unforgettable moment with
              AI-powered proposal crafting.
            </p>

            {/* Social Media Links */}
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-rose-400 hover:text-rose-600 transition-colors"
              >
                <FaTwitter className="w-6 h-6" />
              </Link>
              <Link
                href="#"
                className="text-rose-400 hover:text-rose-600 transition-colors"
              >
                <FaInstagram className="w-6 h-6" />
              </Link>
              <Link
                href="#"
                className="text-rose-400 hover:text-rose-600 transition-colors"
              >
                <FaFacebook className="w-6 h-6" />
              </Link>
              <Link
                href="#"
                className="text-rose-400 hover:text-rose-600 transition-colors"
              >
                <FaLinkedin className="w-6 h-6" />
              </Link>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/features"
                  className="text-gray-600 hover:text-rose-600 transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-gray-600 hover:text-rose-600 transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/demo"
                  className="text-gray-600 hover:text-rose-600 transition-colors"
                >
                  Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-rose-600 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-600 hover:text-rose-600 transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-rose-600 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-rose-600 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-rose-600 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-rose-100 text-center">
          <p className="text-gray-600">
            {new Date().getFullYear()} myproposal.love. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
