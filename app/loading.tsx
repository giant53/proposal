"use client";

import { motion } from "framer-motion"
import { Heart, HeartHandshake, Sparkles } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-rose-50 to-white relative overflow-hidden">
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
            animate={{
              y: [0, -100],
              rotate: [0, 360],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          >
            <Heart className="text-rose-200 w-6 h-6" />
          </motion.div>
        ))}
      </div>

      {/* Main Loading Content */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md text-center relative z-10"
      >
        {/* Animated Heart Container */}
        <motion.div 
          className="mx-auto w-64 h-64 relative mb-8"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Sparkle Effects */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-full"
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="absolute top-0 left-0 w-12 h-12 text-yellow-300" />
            <Sparkles className="absolute bottom-0 right-0 w-12 h-12 text-pink-300" />
          </motion.div>

          {/* Main Heart Animation */}
          <div className="absolute inset-0 bg-rose-100 rounded-full animate-pulse"></div>
          <HeartHandshake 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
            w-32 h-32 text-rose-500 z-10"
          />
        </motion.div>

        {/* Loading Text */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold bg-clip-text text-transparent 
          bg-gradient-to-r from-rose-500 to-pink-600 mb-4"
        >
          Love is Loading...
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-gray-600 mb-6"
        >
          Preparing to craft your magical moment. 
          Every great love story takes time to unfold.
        </motion.p>

        {/* Progress Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="w-full bg-rose-200 rounded-full h-2.5 overflow-hidden"
        >
          <motion.div 
            initial={{ width: 0 }}
            animate={{ 
              width: ['0%', '50%', '75%', '100%'],
              transition: {
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }
            }}
            className="bg-rose-600 h-2.5 rounded-full"
          />
        </motion.div>
      </motion.div>
    </div>
  )
}