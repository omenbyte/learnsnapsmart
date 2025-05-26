"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { type User, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth"
import { auth, googleProvider } from "@/lib/firebase"

interface AuthContextType {
  user: User | null
  loading: boolean
  signInWithGoogle: () => Promise<void>
  logout: () => Promise<void>
  isPremium: boolean
  generationsUsed: number
  incrementGeneration: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isPremium, setIsPremium] = useState(false)
  const [generationsUsed, setGenerationsUsed] = useState(0)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)

      // Load user data from localStorage or database
      if (user) {
        const savedGenerations = localStorage.getItem(`generations_${user.uid}`)
        const savedPremium = localStorage.getItem(`premium_${user.uid}`)

        setGenerationsUsed(savedGenerations ? Number.parseInt(savedGenerations) : 0)
        setIsPremium(savedPremium === "true")
      }
    })

    return () => unsubscribe()
  }, [])

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (error) {
      console.error("Error signing in with Google:", error)
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      setIsPremium(false)
      setGenerationsUsed(0)
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const incrementGeneration = () => {
    if (user) {
      const newCount = generationsUsed + 1
      setGenerationsUsed(newCount)
      localStorage.setItem(`generations_${user.uid}`, newCount.toString())
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithGoogle,
        logout,
        isPremium,
        generationsUsed,
        incrementGeneration,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
