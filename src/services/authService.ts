import { supabase } from '@/lib/supabase'
import type { AuthUser } from '@/types'

export interface SignUpData {
  email: string
  password: string
  username: string
  studentClass?: string
}

export interface SignInData {
  email: string
  password: string
}

/**
 * Sign up a new user with Supabase authentication
 */
export const signUpUser = async (data: SignUpData) => {
  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          display_name: data.username,
          school_class: data.studentClass || ''
        }
      }
    })

    if (authError) {
      return { success: false, error: authError.message }
    }

    // Create user profile in the profiles table
    if (authData.user) {
      const { error: profileError } = await supabase.from('profiles').insert({
        id: authData.user.id,
        username: data.username,
        class: data.studentClass || '',
        role: 'student'
      })

      if (profileError) {
        console.error('Error creating user profile:', profileError)
        return { success: false, error: 'Failed to create user profile' }
      }
    }

    return { success: true, user: authData.user }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error during sign up'
    return { success: false, error: message }
  }
}

/**
 * Sign in an existing user
 */
export const signInUser = async (data: SignInData) => {
  try {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, user: authData.user }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error during sign in'
    return { success: false, error: message }
  }
}

/**
 * Sign out the current user
 */
export const signOutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut()

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error during sign out'
    return { success: false, error: message }
  }
}

/**
 * Get the current user session
 */
export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser()

    if (error || !data.user) {
      return { success: false, user: null }
    }

    return { success: true, user: data.user }
  } catch (error) {
    console.error('Error getting current user:', error)
    return { success: false, user: null }
  }
}

/**
 * Get user profile from the profiles table
 */
export const getUserProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      return { success: false, profile: null }
    }

    return { success: true, profile: data }
  } catch (error) {
    console.error('Error getting user profile:', error)
    return { success: false, profile: null }
  }
}

/**
 * Update user profile
 */
export const updateUserProfile = async (userId: string, updates: Record<string, any>) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()

    if (error) {
      return { success: false, profile: null }
    }

    return { success: true, profile: data }
  } catch (error) {
    console.error('Error updating user profile:', error)
    return { success: false, profile: null }
  }
}

/**
 * Listen to authentication state changes
 */
export const onAuthStateChange = (callback: (user: any | null) => void) => {
  const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
    callback(session?.user || null)
  })

  return data.subscription
}
