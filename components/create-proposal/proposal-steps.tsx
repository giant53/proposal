"use client"

import { useState, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { Loader2, Heart, RefreshCw, Save } from "lucide-react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { ProposalLoadingAnimation } from "./loading-animation"
// import { ModelSelector } from "./model-selector"
import { SendProposalForm } from "./send-proposal-form"
import { RichTextProposal } from "./rich-text-proposal"
import { EditableProposal } from "./editable-proposal"
import { RichTextPreview } from "./rich-text-preview"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { AIProposalResponse, ProposalFormData, SendProposalData } from "@/types/proposal"
// import { AIModel } from "@/types/ai-models"

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

  // Throttling mechanism for save requests
  const lastSaveTime = useRef(0)
  const saveRequestQueue = useRef<(() => Promise<void>)[]>([])
  const isSaveInProgress = useRef(false)

  const throttledSave = useCallback(async (content: string, font: string) => {
    const currentTime = Date.now()
    const THROTTLE_INTERVAL = 5000 // 5 seconds between save attempts

    const performSave = async () => {
      if (isSaveInProgress.current) {
        return
      }

      isSaveInProgress.current = true;
      setIsSaving(true)

      try {
        const response = await fetch("/api/proposals", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            content, 
            font 
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

        lastSaveTime.current = Date.now()
        setStep(4)
        toast.success("Proposal saved successfully!", {
          description: "Your love story is now securely stored ❤️"
        })
      } catch (error) {
        console.error("Failed to save proposal:", error)
        toast.error("Failed to save proposal", {
          description: "Please try again later"
        })
      } finally {
        isSaveInProgress.current = false
        setIsSaving(false)

        // Process next queued save if exists
        if (saveRequestQueue.current.length > 0) {
          const nextSave = saveRequestQueue.current.shift()
          if (nextSave) {
            await nextSave()
          }
        }
      }
    }

    // Throttle save requests
    if (currentTime - lastSaveTime.current < THROTTLE_INTERVAL) {
      // Queue the save request
      saveRequestQueue.current.push(() => performSave())
      return
    }

    await performSave()
  }, [])

  const saveProposal = async (content: string, font: string) => {
    await throttledSave(content, font)
  }

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

  const [proposalViewMode, setProposalViewMode] = useState<"edit" | "preview">("edit")
  const [selectedFont, setSelectedFont] = useState("font-dancing-script")

  return (
    <div className="w-full max-w-[800px] mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 mb-20 sm:mb-0">
      {/* Save Animation Overlay */}
      <AnimatePresence>
        {isSaving && <SaveAnimation />}
      </AnimatePresence>

      {/* Progress Steps */}
      <div className="flex justify-between items-center mb-6 sm:mb-8 space-x-1 sm:space-x-2">
        {[1, 2, 3, 4].map((number) => (
          <div
            key={number}
            className="flex-1 flex items-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0.6 }}
              animate={{ 
                scale: step === number ? 1 : 0.8, 
                opacity: step === number ? 1 : 0.6 
              }}
              transition={{ duration: 0.3 }}
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out",
                step === number
                  ? "bg-rose-500 text-white ring-4 ring-rose-200/50"
                  : step > number
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-500"
              )}
            >
              {number}
            </motion.div>
            {number < 4 && (
              <div
                className={cn(
                  "flex-1 h-1 mx-2 transition-colors duration-300",
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
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Tell me about yourself</h2>
            <p className="text-gray-600 text-sm sm:text-base">
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
            {/* <ModelSelector
              value={proposalData.model as AIModel}
              onChange={(model) => setProposalData((prev) => ({ ...prev, model }))}
              disabled={isGenerating}
            /> */}
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
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex-grow">
                Edit Your Proposal
              </h2>
              <div className="flex items-center space-x-4 w-full sm:w-auto">
                <Tabs 
                  value={proposalViewMode} 
                  onValueChange={(value) => setProposalViewMode(value as "edit" | "preview")}
                  className="bg-rose-50 rounded-full p-1 flex-grow sm:flex-grow-0"
                >
                  <TabsList className="bg-transparent w-full">
                    <TabsTrigger 
                      value="edit" 
                      className={cn(
                        "flex-1 px-3 sm:px-4 py-1 rounded-full transition-colors text-sm",
                        proposalViewMode === "edit" 
                          ? "bg-rose-500 text-white" 
                          : "text-rose-500 hover:bg-rose-100"
                      )}
                    >
                      Edit
                    </TabsTrigger>
                    <TabsTrigger 
                      value="preview" 
                      className={cn(
                        "flex-1 px-3 sm:px-4 py-1 rounded-full transition-colors text-sm",
                        proposalViewMode === "preview" 
                          ? "bg-rose-500 text-white" 
                          : "text-rose-500 hover:bg-rose-100"
                      )}
                    >
                      Preview
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRegenerateProposal}
                  disabled={isGenerating}
                  className="hidden sm:flex"
                >
                  {isGenerating ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4 mr-2" />
                  )}
                  Regenerate
                </Button>
              </div>
            </div>
            
            {fallbackMessage && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700"
              >
                {fallbackMessage}
              </motion.div>
            )}
            
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-lg py-3 text-sm text-red-700"
              >
                {error}
              </motion.div>
            )}

            {/* <div className="bg-white -mx-3 sm:-mx-9 p-4 md:p-6 rounded-xl shadow-lg border border-rose-100/50 transition-all duration-300 hover:shadow-xl"> */}
              {isGenerating ? (
                <ProposalLoadingAnimation />
              ) : proposalData.generatedProposal ? (
                proposalViewMode === "edit" ? (
                  <EditableProposal 
                    content={proposalData.generatedProposal}
                    onSave={(content) => saveProposal(content, selectedFont)}
                    className={cn("prose-base sm:prose-lg", selectedFont)}
                    font={selectedFont}
                    onFontChange={setSelectedFont}
                  />
                ) : (
                  <RichTextPreview 
                    content={proposalData.generatedProposal}
                    className="prose-base sm:prose-lg"
                    font={selectedFont}
                    onFontChange={setSelectedFont}
                  />
                )
              ) : (
                <p className="text-gray-500 italic text-center">
                  No proposal generated yet. Try regenerating...
                </p>
              )}
            {/* </div> */}
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
            <h2 className="text-2xl font-bold text-rose-600">Your Final Proposal</h2>
            
            {/* <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-rose-100/50 transition-all duration-300 hover:shadow-xl"> */}
              <RichTextProposal 
                content={proposalData.editedProposal || ""}
                className="prose-base sm:prose-lg"
              />
            {/* </div> */}

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

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm shadow-2xl z-50 p-3 sm:p-4 border-t border-gray-100">
        <div className="flex justify-between space-x-3 sm:space-x-4 max-w-[800px] mx-auto">
          {step > 1 && step < 4 && (
            <Button 
              variant="outline" 
              onClick={handleBack} 
              className="flex-1"
            >
              Back
            </Button>
          )}
          {step === 3 && proposalViewMode === "edit" && (
            <Button
              onClick={() => saveProposal(proposalData.generatedProposal || "", selectedFont)}
              disabled={!proposalData.generatedProposal || isSaving}
              className="flex-1"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Proposal
                </>
              )}
            </Button>
          )}
          {step === 3 && proposalViewMode === "preview" && (
            <Button
              onClick={() => saveProposal(proposalData.generatedProposal || "", selectedFont)}
              disabled={!proposalData.generatedProposal || isSaving}
              className="flex-1"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Proposal
                </>
              )}
            </Button>
          )}
          {step < 3 && (
            <Button
              className={cn("flex-1", step === 1 && "w-full")}
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
    </div>
  )
}

const SaveAnimation = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.5,
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  }

  const heartVariants: Variants = {
    initial: { 
      scale: 0.8, 
      opacity: 0.6,
      rotate: 0
    },
    animate: {
      scale: [0.8, 1.2, 0.9],
      opacity: [0.6, 1, 0.7],
      rotate: [0, 15, -15, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  }


  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ 
        background: 'linear-gradient(135deg, rgba(255,105,180,0.1) 0%, rgba(255,20,147,0.2) 100%)',
        backdropFilter: 'blur(10px)'
      }}
    >
      {/* Decorative Background Hearts */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: -100,
            opacity: 0,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{ 
            y: window.innerHeight + 100,
            x: [
              Math.random() * window.innerWidth, 
              Math.random() * window.innerWidth, 
              Math.random() * window.innerWidth
            ],
            opacity: [0, 0.3, 0],
            rotate: 360
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "loop"
          }}
          className="absolute"
        >
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="30" 
            height="30" 
            viewBox="0 0 24 24" 
            fill="rgba(255,105,180,0.3)"
            variants={heartVariants}
            initial="initial"
            animate="animate"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </motion.svg>
        </motion.div>
      ))}

      {/* Main Content */}
      <motion.div 
        variants={itemVariants}
        className="relative text-center max-w-md  p-0 bg-white/80 rounded-2xl shadow-2xl border border-rose-100"
      >
        <motion.div
          variants={itemVariants}
          className="absolute -top-12 left-1/2 transform -translate-x-1/2"
        >
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="80" 
            height="80" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            className="text-rose-500"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: [0.8, 1.2, 1],
              opacity: 1,
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </motion.svg>
        </motion.div>

        <motion.h2 
          variants={itemVariants}
          className="text-2xl font-bold text-rose-600 mt-12 mb-4"
        >
          Saving Your Love Story
        </motion.h2>

        <motion.p 
          variants={itemVariants}
          className="text-gray-700 mb-6 text-sm"
        >
          Your heartfelt message is being securely stored with love and care
        </motion.p>

        <motion.div 
          variants={itemVariants}
          className="flex justify-center space-x-4"
        >
          <motion.div
            className="w-2 h-2 bg-rose-300 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity
            }}
          />
          <motion.div
            className="w-2 h-2 bg-rose-400 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: 0.3
            }}
          />
          <motion.div
            className="w-2 h-2 bg-rose-500 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: 0.6
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
