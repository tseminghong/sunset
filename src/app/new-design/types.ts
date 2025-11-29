import { LucideIcon } from 'lucide-react'

export interface Resource {
  id: string
  title: string
  description: string
  tags: string[]
  icon: LucideIcon
  accent: string
}

export interface ChatMessage {
  role: 'user' | 'model'
  text: string
  isError?: boolean
}
