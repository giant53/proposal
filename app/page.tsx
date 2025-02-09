"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  BrainIcon,
  Heart,
  LockIcon,
  SparklesIcon,
  StarIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [backgroundHearts, setBackgroundHearts] = useState<
    {
      left: number;
      top: number;
      size: number;
      delay: number;
    }[]
  >([]);

  useEffect(() => {
    // Check authentication on client side
    async function checkAuth() {
      try {
        const session = await fetch("/api/auth/session").then((res) =>
          res.json()
        );
        if (session?.user) {
          redirect("/dashboard");
        }
      } catch (error) {
        console.error("Authentication check failed", error);
      }
    }
    checkAuth();

    // Generate background hearts only on client side
    const hearts = [...Array(20)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
    }));
    setBackgroundHearts(hearts);

    // Mark as client-side rendered
    setIsClient(true);
  }, []);

  // Prevent server-side rendering mismatch
  if (!isClient) {
    return null;
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-rose-50 to-white overflow-hidden">
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 pointer-events-none">
        {backgroundHearts.map((heart, i) => (
          <motion.div
            key={i}
            className="absolute text-rose-200/50"
            style={{
              left: `${heart.left}%`,
              top: `${heart.top}%`,
              fontSize: `${heart.size}rem`,
              animationDelay: `${heart.delay}s`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0.2, 0],
              rotate: [0, Math.random() * 360],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-16 lg:py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600 mb-6 flex flex-col lg:flex-row-reverse items-center justify-center"
        >
          <Image src="/wlogo.svg" alt="myproposal." width={300} height={300} />
          <h1>myproposal.love</h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-12"
        >
          Transform Your Love Story into an Unforgettable Moment with
          AI-Powered, Privacy-First Proposal Crafting
        </motion.p>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <Button
            asChild
            size="lg"
            className="bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-300/50 transform hover:scale-105 transition-transform"
          >
            <Link href="/login" className="flex items-center">
              <Heart className="mr-2 w-5 h-5 fill-current" />
              Create Your Perfect Proposal
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-rose-300 text-rose-600 hover:bg-rose-50 transform hover:scale-105 transition-transform"
          >
            <Link href="/how-it-works" className="flex items-center">
              <SparklesIcon className="mr-2 w-5 h-5" />
              How It Works
            </Link>
          </Button>
        </motion.div>

        {/* Features Section */}
        <div className="mt-24 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <Heart className="mx-auto mb-4 text-rose-500 w-12 h-12" />
            <h3 className="text-xl font-bold mb-2 text-gray-800">
              Personalized Proposals
            </h3>
            <p className="text-gray-600">
              Craft unique, heartfelt proposals tailored to your love story
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <BrainIcon className="mx-auto mb-4 text-rose-500 w-12 h-12" />
            <h3 className="text-xl font-bold mb-2 text-gray-800">
              AI-Powered Magic
            </h3>
            <p className="text-gray-600">
              Leverage cutting-edge AI to express your deepest emotions
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <LockIcon className="mx-auto mb-4 text-rose-500 w-12 h-12" />
            <h3 className="text-xl font-bold mb-2 text-gray-800">
              Privacy First
            </h3>
            <p className="text-gray-600">
              Your love story remains completely confidential and secure
            </p>
          </motion.div>
        </div>
      </div>

      {/* Footer CTA */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="text-center py-12 bg-rose-50/50"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Your Perfect Proposal Awaits
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Every love story is unique. Let us help you create a proposal that
          captures the magic of your relationship.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-300/50 transform hover:scale-105 transition-transform"
        >
          <Link href="/login" className="flex items-center">
            <StarIcon className="mr-2 w-5 h-5 fill-current" />
            Start Your Love Story
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}
