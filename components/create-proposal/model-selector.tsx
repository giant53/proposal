"use client"

import { AIModel, AI_MODELS } from "@/types/ai-models"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Icons } from "@/components/ui/icons"
import { Label } from "@/components/ui/label"

interface ModelSelectorProps {
  value: AIModel
  onChange: (value: AIModel) => void
  disabled?: boolean
}

export function ModelSelector({ value, onChange, disabled }: ModelSelectorProps) {
  return (
    <div className="space-y-2">
      <Label>AI Model</Label>
      <Select
        value={value}
        onValueChange={(value) => onChange(value as AIModel)}
        disabled={disabled}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select AI model" />
        </SelectTrigger>
        <SelectContent>
          {AI_MODELS.map((model) => {
            const Icon = Icons[model.icon as keyof typeof Icons]
            return (
              <SelectItem
                key={model.id}
                value={model.id}
                className="flex items-center space-x-2"
              >
                <div className="flex items-center space-x-2">
                  {Icon && <Icon className="w-4 h-4" />}
                  <span>{model.name}</span>
                </div>
                <p className="text-sm text-gray-500">{model.description}</p>
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    </div>
  )
}
