"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { Loader2, Heart, RefreshCw } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ProposalLoadingAnimation } from "./loading-animation"
import { ModelSelector } from "./model-selector"
import { SendProposalForm } from "./send-proposal-form"
import { RichTextProposal } from "./rich-text-proposal"
import { EditableProposal } from "./editable-proposal"
import { toast } from "sonner"
import { AIProposalResponse, ProposalFormData, SendProposalData } from "@/types/proposal"
import { AIModel } from "@/types/ai-models"

export function ProposalSteps() {
  const [step, setStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fallbackMessage, setFallbackMessage] = useState<string | null>(null)
  const [proposalData, setProposalData] = useState<ProposalFormData>({
    aboutYou: "",
    aboutThem: "",
    model: "gemini", // Default to Gemini
  })

  const generateProposal = async (regenerate: boolean = false) => {
    setIsGenerating(true)
    setError(null)
    setFallbackMessage(null)

    try {
      const response = await fetch("/api/generate-proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          aboutYou: proposalData.aboutYou,
          aboutThem: proposalData.aboutThem,
          model: proposalData.model,
        }),
      })

      const responseData = (await response.json()) as AIProposalResponse
      
      if (!response.ok) {
        throw new Error(responseData.message || "Failed to generate proposal")
      }

      if (!responseData.data?.proposal) {
        throw new Error("No proposal content received")
      }

      setProposalData((prev) => ({ 
        ...prev, 
        generatedProposal: responseData.data?.proposal 
      }))

      if (responseData.message) {
        setFallbackMessage(responseData.message)
      }

      if (!regenerate) {
        setStep(3)
      }
    } catch (error) {
      console.error("Failed to generate proposal:", error)
      setError(error instanceof Error ? error.message : "Failed to generate proposal")
    } finally {
      setIsGenerating(false)
    }
  }

  const saveProposal = async (content: string) => {
    setIsSaving(true)
    try {
      const response = await fetch("/api/proposals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to save proposal")
      }

      const { data } = await response.json()
      setProposalData(prev => ({
        ...prev,
        editedProposal: content,
        savedProposalId: data.id
      }))

      setStep(4)
    } catch (error) {
      throw error
    } finally {
      setIsSaving(false)
    }
  }

  const handleNext = async () => {
    if (step === 2) {
      await generateProposal()
    } else {
      setStep((prev) => prev + 1)
    }
  }

  const handleBack = () => setStep((prev) => prev - 1)

  const handleRegenerateProposal = () => generateProposal(true)

  const handleSendProposal = async (data: SendProposalData) => {
    try {
      if (!proposalData.savedProposalId) {
        throw new Error("No saved proposal found")
      }

      const sendResponse = await fetch("/api/proposals/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proposalId: proposalData.savedProposalId,
          ...data
        }),
      })

      if (!sendResponse.ok) {
        const errorData = await sendResponse.json()
        throw new Error(errorData.message || "Failed to send proposal")
      }

      toast.success("Proposal sent successfully! 💝")
      
      // Redirect to proposal details
      window.location.href = `/proposals/${proposalData.savedProposalId}`
    } catch (error) {
      console.error("Failed to send proposal:", error)
      toast.error(error instanceof Error ? error.message : "Failed to send proposal")
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Steps */}
      <div className="flex justify-between mb-8">
        {[1, 2, 3, 4].map((number) => (
          <div
            key={number}
            className="flex items-center"
          >
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                step === number
                  ? "bg-rose-500 text-white"
                  : step > number
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-500"
              )}
            >
              {number}
            </div>
            {number < 4 && (
              <div
                className={cn(
                  "h-1 w-16 mx-2",
                  step > number ? "bg-green-500" : "bg-gray-200"
                )}
              />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-gray-800">Tell me about yourself</h2>
            <p className="text-gray-600">
              Share a bit about who you are, your personality, and what makes you unique.
            </p>
            <Textarea
              value={proposalData.aboutYou}
              onChange={(e) =>
                setProposalData((prev) => ({ ...prev, aboutYou: e.target.value }))
              }
              className="h-40"
              placeholder="I am someone who believes in the power of love..."
            />
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-800">Tell me about your love</h2>
            <p className="text-gray-600">
              Share the beautiful story of your love - how you met, what makes them special,
              and why they mean so much to you.
            </p>
            <ModelSelector
              value={proposalData.model as AIModel}
              onChange={(model) => setProposalData((prev) => ({ ...prev, model }))}
              disabled={isGenerating}
            />
            <Textarea
              value={proposalData.aboutThem}
              onChange={(e) =>
                setProposalData((prev) => ({ ...prev, aboutThem: e.target.value }))
              }
              className="h-40"
              placeholder="We first met on a rainy evening..."
            />
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Edit Your Proposal</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRegenerateProposal}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
                )}
                Regenerate
              </Button>
            </div>
            
            {fallbackMessage && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-700">
                {fallbackMessage}
              </div>
            )}
            
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="bg-white p-6 rounded-lg shadow-lg border border-rose-100">
              {isGenerating ? (
                <ProposalLoadingAnimation />
              ) : proposalData.generatedProposal ? (
                <EditableProposal 
                  content={proposalData.generatedProposal}
                  onSave={saveProposal}
                  className="prose-lg"
                />
              ) : (
                <p className="text-gray-500 italic">
                  No proposal generated yet. Try regenerating...
                </p>
              )}
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-800">Your Final Proposal</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-lg border border-rose-100">
              <RichTextProposal 
                content={proposalData.editedProposal || ""}
                className="prose-lg"
              />
            </div>

            <div className="mt-8 pt-8 border-t">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Send Your Proposal
              </h3>
              <p className="text-gray-600 mb-6">
                Choose one or more ways to deliver your heartfelt message
              </p>
              <SendProposalForm onSubmit={handleSendProposal} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between mt-8">
        {step > 1 && step < 4 && (
          <Button variant="outline" onClick={handleBack}>
            Back
          </Button>
        )}
        {step < 3 && (
          <Button
            className={cn("ml-auto", step === 1 && "w-full")}
            onClick={handleNext}
            disabled={
              (step === 1 && !proposalData.aboutYou) ||
              (step === 2 && !proposalData.aboutThem) ||
              isGenerating
            }
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                {step === 2 ? (
                  <>
                    <Heart className="w-4 h-4 mr-2" />
                    Generate Proposal
                  </>
                ) : (
                  "Continue"
                )}
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  )
}
