"use client"

import { motion } from "framer-motion"
import { 
  Heart, 
  SparklesIcon, 
  SendIcon, 
  CheckCircle2Icon, 
  StarIcon,
  LockIcon,
  HeartIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const StepCard = ({ 
  icon: Icon, 
  title, 
  description, 
  delay 
}: { 
  icon: React.ComponentType<{ className?: string }>, 
  title: string, 
  description: string, 
  delay: number 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all group"
  >
    <Icon className="mx-auto mb-4 text-rose-500 w-12 h-12 group-hover:scale-110 transition-transform" />
    <h3 className="text-xl font-bold mb-2 text-gray-800 text-center">{title}</h3>
    <p className="text-gray-600 text-center">{description}</p>
  </motion.div>
)

export default function HowItWorksPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-rose-50 to-white overflow-hidden">
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-rose-200/50"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 3 + 1}rem`,
              animationDelay: `${Math.random() * 5}s`
            }}
            animate={{
              y: [0, -100],
              opacity: [0.2, 0],
              rotate: [0, Math.random() * 360]
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-16 lg:py-24">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600 mb-6">
            Your Love Story, Crafted with AI
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
            Transform your emotions into an unforgettable moment with our AI-powered proposal platform
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          <StepCard 
            icon={SparklesIcon}
            title="Personalize Your Story"
            description="Share the unique details of your love journey"
            delay={0.3}
          />
          <StepCard 
            icon={HeartIcon}
            title="AI Crafts Your Proposal"
            description="Our advanced AI generates a heartfelt, personalized proposal"
            delay={0.5}
          />
          <StepCard 
            icon={SendIcon}
            title="Send with Love"
            description="Choose how to deliver your perfect proposal"
            delay={0.7}
          />
        </div>

        {/* Detailed Process */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-8 mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-rose-600 mb-8">
            The Proposal.me Journey
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <StarIcon className="mr-2 text-rose-500" /> Step 1: Your Love Story Input
              </h3>
              <p className="text-gray-600 mb-4">
                Begin by sharing the intimate details of your relationship. Our intuitive questionnaire helps you capture the essence of your love story.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>✨ Memorable moments</li>
                <li>✨ Shared interests</li>
                <li>✨ Future dreams</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <HeartIcon className="mr-2 text-rose-500" /> Step 2: AI-Powered Crafting
              </h3>
              <p className="text-gray-600 mb-4">
                Our advanced AI analyzes your input to create a proposal that is deeply personal, emotionally resonant, and uniquely yours.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>🧠 Multiple AI models</li>
                <li>🧠 Emotional intelligence</li>
                <li>🧠 Contextual understanding</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Privacy and Security */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="bg-rose-50 rounded-xl p-8 text-center"
        >
          <LockIcon className="mx-auto text-rose-500 w-16 h-16 mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Your Love, Your Privacy
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            We understand the intimacy of your moment. Your love story remains completely confidential, 
            protected by state-of-the-art security measures.
          </p>
          <div className="flex justify-center space-x-4">
            <Button 
              asChild 
              variant="default" 
              size="lg" 
              className="shadow-lg hover:scale-105 transition-transform"
            >
              <Link href="/login" className="flex items-center">
                <Heart className="mr-2 w-5 h-5" />
                Start Your Journey
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="hover:scale-105 transition-transform"
            >
              <Link href="/about" className="flex items-center">
                <CheckCircle2Icon className="mr-2 w-5 h-5" />
                Learn More
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Valentine's Day Special CTA */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.3 }}
        className="text-center py-16 bg-gradient-to-r from-rose-500 to-pink-600 text-white"
      >
        <h2 className="text-4xl font-bold mb-4">
          Valentine&apos;s Day is Just Around the Corner!
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Make this Valentine&apos;s Day unforgettable with a proposal that speaks directly to your partner&apos;s heart.
        </p>
        <Button 
          asChild 
          size="lg" 
          variant="secondary" 
          className="transform hover:scale-105 transition-transform"
        >
          <Link href="/login" className="flex items-center">
            <StarIcon className="mr-2 w-5 h-5" />
            Create Your Valentine&apos;s Proposal
          </Link>
        </Button>
      </motion.div>
    </div>
  )
}
