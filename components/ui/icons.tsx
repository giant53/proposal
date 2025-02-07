import {
  Sparkles,
  Zap,
  Heart,
  type LucideIcon,
} from "lucide-react"

export const Icons = {
  sparkles: Sparkles,
  zap: Zap,
  heart: Heart,
} as const

export type Icon = keyof typeof Icons
