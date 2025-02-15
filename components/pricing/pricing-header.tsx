"use client";

import { motion } from "framer-motion"
import Image from "next/image";

export function PricingHeader() {
  return (
    <div className="text-center mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-4 flex flex-col items-center justify-center"
      >
        <Image src="/wlogo.svg" alt="Dancing Script" width={80} height={80} />
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Choose Your Perfect Plan 
        </h1>
        <p className="mt-4 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
          Craft the perfect proposal with our AI-powered platform. 
          Select a plan that matches your needs and start your journey to a successful proposal.
        </p>
      </motion.div>
    </div>
  )
}
