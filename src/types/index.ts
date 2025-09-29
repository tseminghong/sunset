export interface ResourceData {
  href: string
  tags: string
  icon: string
  title: string
  description: string
  linkText: string
  progressKey?: string
  totalLessons?: number
}

export interface AuthUser {
  username: string
  id?: string
}

export interface AuthResponse {
  ok: boolean
  status: number
  body: {
    token?: string
    user?: AuthUser
    error?: string
  }
}