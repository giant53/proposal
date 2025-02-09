"use client";

import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Send,
  MessageCircle,
  Gift,
  Sparkles,
  HeartHandshake,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isHoveredFeature, setIsHoveredFeature] = useState<number | null>(null);

  const testimonials = [
    {
      quote: "This platform helped me create the most magical moment of our lives!",
      author: "Michael R.",
      role: "Recently Engaged",
    },
    {
      quote: "The AI suggestions were so personal and touching. She said yes!",
      author: "Sarah L.",
      role: "Newly Engaged",
    },
    {
      quote: "From planning to execution, everything was simply perfect.",
      author: "James K.",
      role: "Newly Engaged",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    async function checkAuth() {
      try {
        const session = await fetch("/api/auth/session").then((res) => res.json());
        if (session?.user) {
          redirect("/dashboard");
        }
      } catch (error) {
        console.error("Authentication check failed", error);
      }
    }
    checkAuth();
    setIsClient(true);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  if (!isClient) return null;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('/hearts-pattern.png')] opacity-5" />
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0, 0.2, 0],
              top: ["0%", "100%"],
              left: `${Math.random() * 100}%`,
            }}
            transition={{
              duration: 15,
              delay: i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Heart className="text-rose-200" size={24} />
          </motion.div>
        ))}
      </div>

      {/* Hero Section */}
      <div className="relative pt-24 pb-16 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto text-center"
        >
          <div className="relative inline-block mb-8">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -inset-4 bg-gradient-to-r from-rose-100 via-pink-100 to-rose-100 rounded-full blur-xl opacity-75"
            />
            <Image
              src="/wlogo.svg"
              alt="myproposal."
              width={200}
              height={200}
              className="relative"
            />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 bg-clip-text text-transparent">
            Craft Your Perfect Proposal
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed">
            Transform your love story into an unforgettable proposal with our
            AI-powered platform. Because your special moment deserves to be perfect.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white shadow-lg shadow-rose-200/50 transform hover:scale-105 transition-all duration-300 w-full md:w-auto"
            >
              <Link href="/login" className="flex items-center px-8 py-6">
                <Heart className="mr-2 w-5 h-5" />
                Begin Your Love Story
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-rose-200 text-rose-600 hover:bg-rose-50 transform hover:scale-105 transition-all duration-300 w-full md:w-auto"
            >
              <Link href="/examples" className="flex items-center px-8 py-6">
                <Sparkles className="mr-2 w-5 h-5" />
                View Success Stories
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gradient-to-b from-transparent via-white to-transparent">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Create Magic With Our Features
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <MessageCircle className="w-8 h-8" />,
                title: "AI-Powered Suggestions",
                description: "Get personalized proposal ideas tailored to your unique love story",
              },
              {
                icon: <Gift className="w-8 h-8" />,
                title: "Complete Planning Suite",
                description: "From location scouting to timing, we help plan every detail",
              },
              {
                icon: <Send className="w-8 h-8" />,
                title: "Multi-Channel Delivery",
                description: "Share your proposal via email, WhatsApp, or custom methods",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="relative p-8 rounded-2xl bg-white"
                onHoverStart={() => setIsHoveredFeature(index)}
                onHoverEnd={() => setIsHoveredFeature(null)}
                whileHover={{ y: -8 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-rose-100/50 to-pink-100/50 rounded-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHoveredFeature === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="relative">
                  <div className="text-rose-500 mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-24 bg-gradient-to-b from-transparent to-rose-50/30">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Love Stories That Started Here
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white p-8 rounded-2xl shadow-xl"
              >
                <div className="text-rose-500 mb-6">
                  <HeartHandshake className="w-12 h-12 mx-auto" />
                </div>
                <p className="text-xl text-gray-700 italic mb-6">
                  &quot;{testimonials[activeTestimonial].quote}&quot;
                </p>
                <div className="text-gray-600">
                  <p className="font-semibold">
                    {testimonials[activeTestimonial].author}
                  </p>
                  <p className="text-sm">
                    {testimonials[activeTestimonial].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="py-24 bg-gradient-to-b from-rose-50/30 to-transparent">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Ready to Write Your Love Story?
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Join thousands of couples who have created their perfect proposal
              moment with us. Your journey to &quot;yes&quot; starts here.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white shadow-lg shadow-rose-200/50 transform hover:scale-105 transition-all duration-300"
            >
              <Link href="/login" className="flex items-center px-8 py-6">
                <Heart className="mr-2 w-5 h-5 fill-current" />
                Start Your Proposal Journey
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}