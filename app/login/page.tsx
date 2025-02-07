"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { ArrowRight, Gift, Heart, HeartHandshake, Mail } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signIn("email", { email, callbackUrl: "/dashboard" });
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  // If user is already logged in, show a special screen
  if (session?.user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-white flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Floating Hearts */}
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
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl shadow-rose-100/50 p-8 text-center max-w-md w-full z-10 border border-rose-100"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mx-auto w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center mb-6"
          >
            <HeartHandshake className="w-12 h-12 text-rose-500" />
          </motion.div>

          <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-pink-600">
            Welcome Back, {session.user.name}!
          </h2>

          <p className="text-gray-600 mb-6">
            You&apos;re already logged in and ready to spread love.
          </p>

          <div className="flex flex-col space-y-4">
            <Button
              asChild
              className="w-full bg-rose-500 hover:bg-rose-600 text-white group"
            >
              <Link
                href="/dashboard"
                className="flex items-center justify-center"
              >
                <Gift className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                View Your Proposals
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="w-full border-rose-200 text-rose-600 hover:bg-rose-50 group"
            >
              <Link
                href="/proposals/new"
                className="flex items-center justify-center"
              >
                <Heart className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Create New Proposal
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Original login form remains the same
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-white flex flex-col items-center justify-center pb-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Floating Hearts */}
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
          className="mx-auto w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center"
        >
          <Heart className="w-8 h-8 text-rose-500" />
        </motion.div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-pink-600">
          Welcome to myproposal.❤️
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Create your perfect Valentine&apos;s proposal
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10"
      >
        <div className="bg-white/80 backdrop-blur-sm px-4 py-8 shadow-xl shadow-rose-100/50 sm:rounded-xl sm:px-10 border border-rose-100">
          <form className="space-y-6" onSubmit={handleEmailSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1 relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-rose-200 focus:border-rose-500 focus:ring-rose-500"
                />
                <Mail className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full bg-rose-500 hover:bg-rose-600 text-white group"
                disabled={loading}
              >
                Continue with Email
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-rose-100" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Button
                onClick={handleGoogleSignIn}
                variant="outline"
                className="w-full border-rose-200 hover:bg-rose-50 text-rose-600 hover:text-rose-700"
                disabled={loading}
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
