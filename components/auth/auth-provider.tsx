"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { AuthService, type User, type AuthState } from "@/lib/auth"

const AuthContext = createContext<
  AuthState & {
    signIn: (role?: "buyer" | "seller") => Promise<void>
    signInAdmin: (credentials: { email: string; password: string }) => Promise<void>
    signInWithZkLogin: (email: string, role: "buyer" | "seller") => Promise<void> // Added zkLogin method
    signOut: () => Promise<void>
  }
>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  signIn: async () => {},
  signInAdmin: async () => {},
  signInWithZkLogin: async () => {}, // Added to context
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const authService = AuthService.getInstance()

  useEffect(() => {
    // Check for existing session
    const currentUser = authService.getCurrentUser()
    setUser(currentUser)
    setIsLoading(false)
  }, [])

  const signIn = async (role: "buyer" | "seller" = "buyer") => {
    setIsLoading(true)
    try {
      const user = await authService.signInWithGoogle(role)
      setUser(user)
    } catch (error) {
      console.error("Sign in failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signInAdmin = async (credentials: { email: string; password: string }) => {
    setIsLoading(true)
    try {
      const user = await authService.signInAdmin(credentials)
      setUser(user)
    } catch (error) {
      console.error("Admin sign in failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signInWithZkLogin = async (email: string, role: "buyer" | "seller") => {
    setIsLoading(true)
    try {
      const user = await authService.signInWithZkLogin(email, role)
      setUser(user)
    } catch (error) {
      console.error("zkLogin sign in failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    setIsLoading(true)
    try {
      await authService.signOut()
      setUser(null)
    } catch (error) {
      console.error("Sign out failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        signIn,
        signInAdmin,
        signInWithZkLogin, // Added to context
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
