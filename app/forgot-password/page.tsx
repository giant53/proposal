"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [focused, setFocused] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setLoading(true);
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send reset link");
      }

      setSuccess("If an account exists, a password reset link will be sent to your email.");
      setEmail(""); // Clear email input
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-white flex flex-col items-center justify-center pb-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0.3, 0],
              scale: [1, 0.5],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            <Heart className="text-rose-200 w-6 h-6" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sm:mx-auto sm:w-full sm:max-w-md z-10"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mx-auto w-24 h-24 bg-rose-100/50 rounded-full flex items-center justify-center border-4 border-rose-200/50"
        >
          <Image src="/wlogo.svg" alt="Heart" width={80} height={80} className="p-2" />
        </motion.div>
        <h2 className="mt-6 text-center text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-pink-600">
          Forgot Password
        </h2>
        <p className="mt-2 text-center text-base text-gray-600">
          Enter your email to reset your password
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10"
      >
        <div className="bg-white/90 backdrop-blur-md px-6 py-10 shadow-2xl shadow-rose-200/50 sm:rounded-2xl border border-rose-100/50">
          <form className="space-y-6" onSubmit={handleForgotPassword}>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg border border-red-200"
              >
                {error}
              </motion.div>
            )}

            {success && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-green-600 text-sm text-center bg-green-50 p-3 rounded-lg border border-green-200"
              >
                {success}
              </motion.div>
            )}

            <div>
              <label
                htmlFor="email"
                className={`block text-sm font-medium transition-colors duration-300 ${
                  focused ? 'text-rose-600' : 'text-gray-700'
                }`}
              >
                Email address
              </label>
              <div className="mt-1 relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`block w-full rounded-lg border transition-all duration-300 ${
                    focused 
                      ? 'border-rose-500 ring-2 ring-rose-200' 
                      : 'border-rose-200 focus:border-rose-500'
                  }`}
                />
                <Mail className={`absolute right-3 top-2.5 h-5 w-5 transition-colors duration-300 ${
                  focused ? 'text-rose-500' : 'text-gray-400'
                }`} />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white group transition-all duration-300 ease-in-out transform hover:scale-[1.02]"
                disabled={loading}
              >
                Reset Password
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link 
              href="/login" 
              className="text-rose-600 hover:text-rose-500 font-semibold underline-offset-4 hover:underline transition-all"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
