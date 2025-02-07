"use client"

import { useState } from "react"
import { AIModel, AI_MODELS } from "@/types/ai-models"
import { Icons } from "@/components/ui/icons"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { ChevronDown } from "lucide-react"

interface ModelSelectorProps {
  value: AIModel
  onChange: (value: AIModel) => void
  disabled?: boolean
}

export function ModelSelector({ value, onChange, disabled }: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative w-full">
      <TooltipProvider>
        <div 
          className={cn(
            "w-full rounded-xl border border-rose-200/50 bg-white shadow-sm transition-all duration-300 ease-in-out",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <Tooltip>
            <TooltipTrigger 
              className="w-full"
              onClick={() => !disabled && setIsOpen(!isOpen)}
            >
              <div className="flex items-center justify-between p-3 cursor-pointer">
                <div className="flex items-center space-x-3">
                  {/* Current Model Icon */}
                  {(() => {
                    const currentModel = AI_MODELS.find(model => model.id === value)
                    const Icon = currentModel ? Icons[currentModel.icon as keyof typeof Icons] : null
                    return Icon ? <Icon className="w-6 h-6 text-rose-500" /> : null
                  })()}
                  
                  <div>
                    <div className="font-semibold text-gray-800">
                      {AI_MODELS.find(model => model.id === value)?.name}
                    </div>
                    <div className="text-xs text-gray-500 max-w-[200px] truncate">
                      AI Proposal Generator
                    </div>
                  </div>
                </div>
                
                {/* Dropdown Indicator */}
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-rose-500" />
                </motion.div>
              </div>
            </TooltipTrigger>
            
            <TooltipContent side="bottom">
              Select your AI Proposal Generator
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>

      <AnimatePresence>
        {isOpen && !disabled && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-xl border border-rose-100 overflow-hidden"
          >
            {AI_MODELS.map((model) => {
              const Icon = Icons[model.icon as keyof typeof Icons]
              const isSelected = value === model.id
              
              return (
                <div 
                  key={model.id}
                  onClick={() => {
                    onChange(model.id)
                    setIsOpen(false)
                  }}
                  className={cn(
                    "flex items-center justify-between p-3 cursor-pointer hover:bg-rose-50/50 transition-colors",
                    isSelected && "bg-rose-50 border-l-4 border-rose-500"
                  )}
                >
                  <div className="flex items-center space-x-3">
                    {Icon && <Icon className={cn(
                      "w-6 h-6", 
                      isSelected ? "text-rose-600" : "text-gray-400"
                    )} />}
                    
                    <div>
                      <div className={cn(
                        "font-semibold", 
                        isSelected ? "text-rose-700" : "text-gray-800"
                      )}>
                        {model.name}
                      </div>
                      <div className="text-xs text-gray-500 max-w-[250px] line-clamp-2">
                        {model.description}
                      </div>
                    </div>
                  </div>
                  
                  {model.id === "deepseek" && (
                    <Badge variant="default" className="ml-2">
                      Premium
                    </Badge>
                  )}
                </div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
