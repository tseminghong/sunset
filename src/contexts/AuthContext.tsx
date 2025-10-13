'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { AuthUser, AuthResponse } from '@/types'

interface AuthContextType {
  user: AuthUser | null
  isLoading: boolean
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (username: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Use the new ICT Sync API
const AUTH_API_BASE = 'https://ict-sync-api.darrenintr.workers.dev'
const TOKEN_KEY = 'ict_sync_jwt_token'
const PROFILE_KEY = 'ict_sync_profile_cache'

async function apiCall(path: string, options: RequestInit = {}): Promise<AuthResponse> {
  const token = localStorage.getItem(TOKEN_KEY)
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  }
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  try {
    const response = await fetch(`${AUTH_API_BASE}${path}`, {
      ...options,
      headers,
    })

    let body
    const text = await response.text()
    
    if (text) {
      try {
        body = JSON.parse(text)
      } catch {
        body = { 
          error: text.trim().startsWith('<') 
            ? `Non-JSON response (status ${response.status})`
            : text.substring(0, 200)
        }
      }
    } else {
      body = {}
    }

    return {
      ok: response.ok,
      status: response.status,
      body,
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return {
      ok: false,
      status: 0,
      body: { error: `Network error: ${errorMessage}` },
    }
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const refreshProfile = async () => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (!token) {
      setUser(null)
      setIsLoading(false)
      return
    }

    const response = await apiCall('/auth/me')
    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem(PROFILE_KEY)
        setUser(null)
      }
      setIsLoading(false)
      return
    }

    if (response.body.user) {
      try {
        localStorage.setItem(PROFILE_KEY, JSON.stringify(response.body.user))
      } catch {}
      setUser(response.body.user)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    refreshProfile()
    
    // Refresh profile every 5 minutes
    const interval = setInterval(refreshProfile, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const login = async (username: string, password: string) => {
    const response = await apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })

    if (!response.ok) {
      return {
        success: false,
        error: response.body.error || 'Login failed',
      }
    }

    if (response.body.token) {
      try {
        localStorage.setItem(TOKEN_KEY, response.body.token)
      } catch {}
      await refreshProfile()
    }

    return { success: true }
  }

  const signup = async (username: string, password: string) => {
    const response = await apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })

    if (!response.ok) {
      return {
        success: false,
        error: response.body.error || 'Signup failed',
      }
    }

    return { success: true }
  }

  const logout = async () => {
    try {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(PROFILE_KEY)
    } catch {}
    
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      signup,
      logout,
      isAuthenticated: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}