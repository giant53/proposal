/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Heart,
  Send,
  MessageCircle,
  Gift,
  // Sparkles,
  HeartHandshake,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { AcquisitionDialog } from "@/components/acquisition/acquisition-dialog";
import { AcquisitionBanner } from "@/components/acquisition/acquisition-banner";

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [_, setActiveTestimonial] = useState(0);
  //const [isHoveredFeature, setIsHoveredFeature] = useState<number | null>(null);

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

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50" />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50"
    >
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

      {/* Hero Section with Video Background */}
      <div className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          {/* Dark overlay to improve text visibility */}
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-rose-50 via-rose-50 to-pink-50 backdrop-blur-sm z-10" />
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/proposal-bg.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Floating Hearts Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ 
                scale: 0, 
                opacity: 0,
                x: Math.random() * window.innerWidth,
                y: -100
              }}
              animate={{
                scale: [0.5, 1, 0.5],
                opacity: [0, 0.5, 0],
                y: window.innerHeight + 100,
                x: [
                  Math.random() * window.innerWidth, 
                  Math.random() * window.innerWidth, 
                  Math.random() * window.innerWidth
                ]
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                delay: i * 0.5,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Heart 
                className="text-white/20" 
                size={Math.random() * 30 + 10} 
                fill="currentColor"
              />
            </motion.div>
          ))}
        </div>

        {/* Content */}
        <div className="relative z-20 container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto relative"
          >
            {/* Logo */}
            <div className="relative inline-block mb-6 sm:mb-8">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -inset-4 bg-gradient-to-r from-rose-100 via-pink-100 to-rose-100 rounded-full blur-xl opacity-50"
              />
              <Image
                src="/wlogo.svg"
                alt="myproposal."
                width={180}
                height={180}
                className="relative w-36 sm:w-44 md:w-48 h-auto drop-shadow-2xl"
                priority
              />
            </div>
            
            {/* Main Headline */}
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 sm:mb-6 text-rose-600 drop-shadow-2xl leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Make Your Proposal
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600">
                Unforgettable
              </span>
            </motion.h1>
            
            {/* Subheadline */}
            <motion.p 
              className="text-lg sm:text-md md:text-lg text-gray-600 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4 drop-shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Create a magical moment that will last forever with our AI-powered
              proposal platform. Because your love story deserves to be told beautifully.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row justify-center items-center gap-4 px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white shadow-xl shadow-rose-500/30 transform hover:scale-101 transition-all duration-300 w-full"
              >
                <Link href="/login" className="flex items-center px-8 sm:px-10 py-5 sm:py-6 text-base sm:text-lg">
                  <Heart className="mr-2 w-5 h-5 animate-pulse fill-current" />
                  Create Your Proposal
                </Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="bg-white/90 hover:bg-white/70 text-rose-500 backdrop-blur-md shadow-xl transform hover:scale-101 transition-all duration-300 w-full sm:w-auto"
              >
                <Link href="#how-it-works" className="flex items-center px-8 sm:px-10 py-5 sm:py-6 text-base sm:text-lg">
                  <span className="mr-2">✨</span>
                  See How It Works
                </Link>
              </Button>
            </motion.div>
            {/* Romantic Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { number: "1000+", label: "Proposals" },
                { number: "98%", label: "Success Rate" },
                { number: "50+", label: "Templates" },
                { number: "24/7", label: "Support" }
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center p-4 rounded-xl bg-white/90 backdrop-blur-md border border-white/20 shadow-lg"
                >
                  <p className="text-2xl sm:text-3xl font-bold text-rose-600 drop-shadow-md">
                    {stat.number}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>

            
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 sm:py-24 bg-gradient-to-b from-transparent via-white to-transparent" id="how-it-works">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800">
              How the Magic Happens
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Create a proposal that&lsquo;s as unique as your love story. Our AI-powered platform
              helps you craft the perfect moment, step by step.
            </p>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                icon: <MessageCircle className="w-8 h-8" />,
                title: "AI Love Letter Writer",
                description: "Express your feelings beautifully with our AI that understands the language of love",
                color: "from-rose-400 to-pink-400",
                delay: 0.2
              },
              {
                icon: <Gift className="w-8 h-8" />,
                title: "Romantic Planning",
                description: "Get personalized suggestions for locations, timing, and special touches",
                color: "from-pink-400 to-purple-400",
                delay: 0.4
              },
              {
                icon: <Send className="w-8 h-8" />,
                title: "Perfect Delivery",
                description: "Choose from multiple ways to deliver your proposal - email, WhatsApp, or in person",
                color: "from-purple-400 to-rose-400",
                delay: 0.6
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: feature.delay }}
                className="group relative"
              >
                <div className="relative p-8 rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300 h-full transform hover:-translate-y-2">
                  {/* Background Gradient */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{ backgroundImage: `linear-gradient(to bottom right, ${feature.color})` }} 
                  />
                  
                  {/* Icon with gradient background */}
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} text-white shadow-lg mb-6`}>
                    {feature.icon}
                  </div>

                  <h3 className="text-xl font-bold mb-4 text-gray-800 group-hover:text-gray-900">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700">
                    {feature.description}
                  </p>

                  {/* Decorative elements */}
                  <div className="absolute -bottom-2 -right-2 w-20 h-20 opacity-50 group-hover:opacity-90 transition-opacity duration-300">
                    <Image src="/wlogo.svg" alt="Dancing Script" width={80} height={80} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Love Journey Steps */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 max-w-5xl mx-auto"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-center mb-12 text-gray-800">
              Your Journey to &quot;Yes&quot;
            </h3>

            <div className="grid gap-8 relative">
              {[
                {
                  step: "1",
                  title: "Share Your Story",
                  description: "Tell us about your journey together and what makes your love special"
                },
                {
                  step: "2",
                  title: "Craft Your Words",
                  description: "Our AI helps you express your feelings in the most beautiful way"
                },
                {
                  step: "3",
                  title: "Perfect the Details",
                  description: "Add personal touches, photos, and choose the perfect delivery method"
                },
                {
                  step: "4",
                  title: "Make it Magical",
                  description: "Create a moment they'll remember forever"
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="flex items-start gap-6 relative"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {step.step}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2 text-gray-800">{step.title}</h4>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                  </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 sm:py-24 bg-gradient-to-b from-transparent to-rose-50/30">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800">
              Love Stories That Started Here
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Join countless couples who found their perfect way to say &quot;Will you marry me?&quot;
            </p>
          </motion.div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative"
                >
                  <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 h-full group">
                    {/* Decorative elements */}
                    <div className="absolute -top-3 -right-3 transform rotate-12">
                      <Heart className="w-6 h-6 text-rose-400 fill-rose-400 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="absolute -bottom-2 -left-2 transform -rotate-12">
                      <Heart className="w-4 h-4 text-pink-400 fill-pink-400 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <div className="relative">
                      <div className="text-rose-500 mb-6">
                        <HeartHandshake className="w-10 h-10 sm:w-12 sm:h-12 mx-auto" />
                      </div>
                      <p className="text-lg sm:text-xl text-gray-700 italic mb-6 leading-relaxed">
                        &quot;{testimonial.quote}&quot;
                      </p>
                      <div className="text-center">
                        <p className="font-semibold text-base sm:text-lg text-gray-800 mb-1">
                          {testimonial.author}
                        </p>
                        <p className="text-sm sm:text-base text-rose-500">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Success Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {[
                { number: "500+", label: "Proposals This Month" },
                { number: "98%", label: "Success Rate" },
                { number: "2.5K+", label: "Happy Couples" },
                { number: "4.9/5", label: "Average Rating" }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="text-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm"
                >
                  <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
                    {stat.number}
                  </p>
                  <p className="text-sm sm:text-base text-gray-600 mt-2">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      
      {/* Final CTA Section */}
      <div className="py-16 sm:py-24 bg-gradient-to-b from-rose-50/30 to-transparent">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-800 px-4">
              Ready to Write Your Love Story?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto px-4 leading-relaxed">
              Join thousands of couples who have created their perfect proposal
              moment with us. Your journey to &quot;yes&quot; starts here.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white shadow-lg shadow-rose-200/50 transform hover:scale-105 transition-all duration-300 rounded-xl"
            >
              <Link href="/login" className="flex items-center px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg">
                <Heart className="mr-2 w-5 h-5 fill-current animate-pulse" />
                Start Your Proposal Journey
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
      {/* Acquisition Banner */}
      <AcquisitionBanner />

      <AcquisitionDialog />
    </motion.div>
  );
}