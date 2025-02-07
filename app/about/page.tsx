"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { 
  Heart, 
  Lock, 
  Sparkles, 
  Brain, 
  Shield, 
  MessageCircleHeart, 
  Rocket 
} from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-rose-100 overflow-hidden">
      <div className="container mx-auto px-4 py-16 relative">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-rose-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-rose-200/30 rounded-full blur-3xl"></div>
        </div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-6xl mx-auto relative z-10"
        >
          {/* Hero Section */}
          <motion.div 
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold text-rose-600 mb-6 tracking-tight">
              Elevate Your Love Story with AI
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Craft the most meaningful, personalized proposal with cutting-edge AI that understands the language of love
            </p>
          </motion.div>

          {/* Key Features */}
          <motion.div 
            variants={itemVariants}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            {[
              {
                icon: <Brain className="w-12 h-12 text-rose-500" />,
                title: "AI-Powered Emotion",
                description: "Advanced language models that capture the essence of your unique love story"
              },
              {
                icon: <Lock className="w-12 h-12 text-rose-500" />,
                title: "Absolute Privacy",
                description: "End-to-end encryption ensuring your intimate moments remain confidential"
              },
              {
                icon: <Sparkles className="w-12 h-12 text-rose-500" />,
                title: "Personalized Magic",
                description: "Tailored proposals that reflect your individual relationship and emotions"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 text-center shadow-lg border border-rose-100 hover:shadow-xl transition-all"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Detailed Features */}
          <motion.div 
            variants={itemVariants}
            className="grid md:grid-cols-2 gap-12 items-center mb-16 bg-white/70 backdrop-blur-lg rounded-2xl p-12 shadow-xl border border-rose-100"
          >
            <div className="relative h-[500px]">
              <Image
                src="/proposal-illustration.svg"
                alt="AI Proposal Generation"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                How We Transform Proposals
              </h2>
              {[
                {
                  icon: <MessageCircleHeart className="w-8 h-8 text-rose-500" />,
                  title: "Emotional Intelligence",
                  description: "Our AI understands nuanced emotions, crafting proposals that truly resonate"
                },
                {
                  icon: <Shield className="w-8 h-8 text-rose-500" />,
                  title: "Secure & Confidential",
                  description: "Military-grade encryption protects your most precious moments"
                },
                {
                  icon: <Rocket className="w-8 h-8 text-rose-500" />,
                  title: "Instant Perfection",
                  description: "Generate beautifully crafted proposals in seconds, tailored to your story"
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div>{feature.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            variants={itemVariants}
            className="text-center bg-gradient-to-br from-rose-500 to-pink-500 text-white rounded-3xl p-12 shadow-2xl"
          >
            <h2 className="text-4xl font-bold mb-6">
              Your Love Story Deserves Magic
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Transform your proposal into an unforgettable moment with AI-powered personalization
            </p>
            <div className="items-center flex flex-col md:flex-row justify-center gap-4">
              <Button 
                asChild 
                size="lg" 
                className="bg-white text-rose-600 hover:bg-rose-50 w-full md:w-auto"
              >
                <Link href="/create">
                  <Heart className="w-5 h-5 mr-2" />
                  Create Your Proposal
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="border-white text-white bg-transparent hover:bg-white/10 hover:text-white w-full md:w-auto"
              >
                <Link href="/privacy">
                  Learn About Privacy
                </Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
