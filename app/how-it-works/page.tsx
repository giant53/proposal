"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  Clock,
  Gift,
  Heart,
  HeartIcon,
  LockIcon,
  StarIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 },
};

const ProcessStep = ({
  step,
  title,
  description,
  image,
  delay,
}: {
  step: number;
  title: string;
  description: string;
  image: string;
  delay: number;
}) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, delay }
    });
  }, [controls, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={controls}
      className="flex items-center gap-8 mb-16"
    >
      <div className="relative flex-1">
        <div className="absolute -left-4 -top-4 w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 font-bold text-xl">
          {step}
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
          <p className="text-gray-600 mb-6">{description}</p>
          <div className="relative h-64 rounded-lg overflow-hidden">
            <Image src={image} alt={title} fill className="object-cover" />
          </div>
        </div>
      </div>
      {step < 4 && (
        <div className="hidden md:block">
          <ArrowRight className="w-8 h-8 text-rose-400" />
        </div>
      )}
    </motion.div>
  );
};

export default function HowItWorksPage() {
  const [daysUntilValentines, setDaysUntilValentines] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const calculateDays = () => {
      const valentinesDay = new Date(2025, 1, 14);
      const today = new Date();
      const difference = valentinesDay.getTime() - today.getTime();
      const days = Math.max(0, Math.ceil(difference / (1000 * 60 * 60 * 24)));
      setDaysUntilValentines(days);
    };

    calculateDays();
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-rose-50 to-white">
      <div className="flex items-center justify-center space-x-2 sm:px-4">
        <Clock className="w-5 h-5 animate-pulse" />
        <span className="font-semibold">
          Only {daysUntilValentines} days until Valentine&apos;s Day! Don&apos;t
          miss your chance!
        </span>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-rose-100 to-white py-24">
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-block mb-6">
            <Gift className="w-20 h-20 text-rose-500 mx-auto" />
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-pink-600">
            Make This Valentine&apos;s Special
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-12">
            Create a moment they&apos;ll never forget with our AI-powered
            proposal platform
          </p>
          <div className="space-y-4 md:space-y-0 md:space-x-4">
            <Button
              size="lg"
              className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-6 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              <Link href="/login" className="flex items-center">
                <Heart className="mr-2 w-6 h-6" />
                Start Your Perfect Proposal
              </Link>
            </Button>
          </div>
        </div>

        {/* Floating hearts background */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => {
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const duration = Math.random() * 5 + 3;

            return (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                }}
                initial={{ 
                  y: 0, 
                  opacity: 0.3,
                  scale: 1 
                }}
                animate={{ 
                  y: -100,
                  opacity: 0,
                  scale: 0.5 
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              >
                <Heart className="text-rose-200 w-8 h-8" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Process Flow */}
      <div className="container mx-auto px-6 py-24">
        <motion.h2
          {...fadeInUp}
          className="text-4xl font-bold text-center text-gray-800 mb-16"
        >
          Your Journey to the Perfect Proposal
        </motion.h2>

        {/* Video Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative aspect-video mb-24 rounded-xl overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-rose-100 flex items-center justify-center">
            <p className="text-rose-600 text-xl font-semibold">
              Promotional Video Coming Soon
            </p>
          </div>
        </motion.div>

        {/* Sequential Process Steps */}
        <ProcessStep
          step={1}
          title="Share Your Love Story"
          description="Tell us about your journey together, special moments, and what makes your relationship unique. Our AI understands the emotions behind your words."
          image="/sc/sc-1.webp"
          delay={0.3}
        />
        <ProcessStep
          step={2}
          title="AI Magic at Work"
          description="Watch as our advanced AI transforms your story into a beautifully crafted proposal, capturing the essence of your relationship."
          image="/sc/sc-2.webp"
          delay={0.5}
        />
        <ProcessStep
          step={3}
          title="Perfect Your Message"
          description="Review and customize your proposal until it's exactly right. Add personal touches and make it uniquely yours."
          image="/sc/sc-3.webp"
          delay={0.7}
        />
        <ProcessStep
          step={4}
          title="Deliver with Love"
          description="Choose how to deliver your proposal - whether through a romantic message, email, or printed card. Make the moment unforgettable."
          image="/sc/sc-4.webp"
          delay={0.9}
        />
      </div>

      {/* Trust Indicators */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-3 gap-8 text-center"
          >
            <div className="bg-rose-50 p-8 rounded-xl">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <StarIcon className="w-12 h-12 text-rose-500 mx-auto mb-4" />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                1000+ Success Stories
              </h3>
              <p className="text-gray-600">
                Join our community of happy couples
              </p>
            </div>
            <div className="bg-rose-50 p-8 rounded-xl">
              <LockIcon className="w-12 h-12 text-rose-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                100% Private & Secure
              </h3>
              <p className="text-gray-600">
                Your love story stays confidential
              </p>
            </div>
            <div className="bg-rose-50 p-8 rounded-xl">
              <HeartIcon className="w-12 h-12 text-rose-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                AI-Powered Magic
              </h3>
              <p className="text-gray-600">
                Cutting-edge technology for your love
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Valentine's Day CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-gradient-to-r from-rose-500 to-pink-600 text-white py-20"
      >
        <div className="container mx-auto px-6 text-center">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Don&apos;t Let This Valentine&apos;s Day Pass By
            </h2>
          </motion.div>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Create a proposal that will be remembered forever. Only{" "}
            {daysUntilValentines} days left to make it perfect!
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="bg-white text-rose-600 hover:bg-rose-50 transform hover:scale-105 transition-all shadow-xl"
          >
            <Link href="/login" className="flex items-center text-lg px-8 py-6">
              <Heart className="mr-2 w-6 h-6" />
              Start Creating Your Proposal Now
            </Link>
          </Button>
          <p className="mt-6 text-rose-100">
            Join 1000+ couples who made their moment special with
            myproposal.love 
          </p>
        </div>
      </motion.div>
    </div>
  );
}
