"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface RecipientFormProps {
  onSubmit: (data: {
    name: string
    email?: string
    phone?: string
    method: "EMAIL" | "SMS" | "WHATSAPP"
  }) => void
  className?: string
}

export function RecipientForm({ onSubmit, className }: RecipientFormProps) {
  const [method, setMethod] = useState<"EMAIL" | "SMS" | "WHATSAPP">("EMAIL")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      name,
      email: method === "EMAIL" ? email : undefined,
      phone: method === "SMS" || method === "WHATSAPP" ? phone : undefined,
      method,
    })
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-6", className)}>
      <div className="space-y-2">
        <Label htmlFor="name">Recipient&apos;s Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter their name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Delivery Method</Label>
        <Select
          value={method}
          onValueChange={(value) => setMethod(value as typeof method)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select delivery method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="EMAIL">Email</SelectItem>
            <SelectItem value="SMS">SMS</SelectItem>
            <SelectItem value="WHATSAPP">WhatsApp</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {method === "EMAIL" ? (
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter their email"
            required
          />
        </div>
      ) : (
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter their phone number"
            required
          />
        </div>
      )}
    </form>
  )
}
