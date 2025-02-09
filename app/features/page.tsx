"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Heart,
  Lock,
  Gift,
  Wand2,
  Palette,
  Globe,
  Share2,
  BrainCogIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const FeatureCard = ({
  icon,
  title,
  description,
  gradient,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}) => (
  <motion.div
    whileHover={{ 
      scale: 1.05,
      transition: { duration: 0.3 }
    }}
    className={`
      relative 
      p-8 
      rounded-2xl 
      bg-white 
      shadow-xl 
      border-2 
      border-transparent 
      hover:border-rose-200 
      transition-all 
      duration-300
      overflow-hidden
    `}
  >
    <div className={`
      absolute 
      inset-0 
      ${gradient} 
      opacity-10 
      blur-2xl 
      -z-10
    `}/>
    <div className="flex items-center mb-6">
      <div className="mr-4 text-rose-500">{icon}</div>
      <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

export default function FeaturesPage() {
  const features = [
    {
      icon: <Wand2 className="w-10 h-10" />,
      title: "AI-Powered Love Story Generation",
      description: "Our advanced AI understands the nuances of your relationship, crafting proposals that are deeply personal and emotionally resonant.",
      gradient: "bg-gradient-to-br from-rose-100 to-pink-100",
    },
    {
      icon: <Palette className="w-10 h-10" />,
      title: "Customization at Your Fingertips",
      description: "Tailor every aspect of your proposal. From tone to style, ensure it reflects your unique love story perfectly.",
      gradient: "bg-gradient-to-br from-pink-100 to-rose-100",
    },
    {
      icon: <Globe className="w-10 h-10" />,
      title: "Multi-Channel Delivery",
      description: "Share your proposal via email, WhatsApp, SMS, or print. Choose the method that speaks to your love.",
      gradient: "bg-gradient-to-br from-rose-100 to-pink-100",
    },
    {
      icon: <Share2 className="w-10 h-10" />,
      title: "Seamless Sharing & Privacy",
      description: "Generate secret links, control visibility, and share your proposal with complete peace of mind.",
      gradient: "bg-gradient-to-br from-pink-100 to-rose-100",
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ 
              scale: 0, 
              opacity: 0,
              rotate: Math.random() * 360 
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.2, 0],
              y: [0, 200, 400],
              x: [Math.random() * 200 - 100],
              rotate: [0, 360],
            }}
            transition={{
              duration: 15,
              delay: i * 0.5,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Heart className="text-rose-200" size={24} />
          </motion.div>
        ))}
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-24 pb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="inline-block mb-6">
            <Image src="/wlogo.svg" alt="Proposal Magic" width={150} height={150} />
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-pink-600">
            Proposal Magic, Simplified
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-12">
            Transform your love story into an unforgettable moment with our 
            AI-powered proposal platform. Because your love deserves nothing less 
            than perfection.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              {...feature}
            />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white shadow-xl transform hover:scale-105 transition-all"
          >
            <Link href="/login" className="flex items-center px-10 py-6 text-lg">
              <Heart className="mr-3 w-6 h-6 fill-current" />
              Start Your Proposal Journey
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Value Proposition Section */}
      <div className="bg-white py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 text-gray-800">
              Why Choose <span className="text-rose-600">myproposal.love?</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Lock className="w-12 h-12 text-rose-500 mx-auto mb-4" />,
                  title: "100% Private",
                  description: "Your love story remains confidential and secure."
                },
                {
                  icon: <BrainCogIcon className="w-12 h-12 text-rose-500 mx-auto mb-4" />,
                  title: "AI Magic",
                  description: "Unleash the power of AI to create your perfect proposal."
                },
                {
                  icon: <Gift className="w-12 h-12 text-rose-500 mx-auto mb-4" />,
                  title: "Unique Experience",
                  description: "Personalized proposals that tell your unique story."
                }
              ].map((item, index) => (
                <div key={index} className="bg-rose-50 p-8 rounded-xl">
                  {item.icon}
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-rose-500 to-pink-600 text-white py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Your Perfect Proposal Awaits
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Every great love story deserves an extraordinary beginning. 
            Let us help you create a proposal that will be remembered forever.
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="bg-white text-rose-600 hover:bg-rose-50 transform hover:scale-105 transition-all shadow-xl"
          >
            <Link href="/login" className="flex items-center text-lg px-10 py-6">
              <Heart className="mr-3 w-6 h-6" />
              Create Your Magical Moment
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
