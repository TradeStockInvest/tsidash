"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type UserRole = "user" | "premium" | "admin"

export interface UserProfile {
  id: string
  name: string
  email: string
  avatar?: string
  role: UserRole
  joinedDate: string
  lastLogin: string
  accountBalance: number
  verificationLevel: 1 | 2 | 3
}

interface UserContextType {
  user: UserProfile | null
  isLoading: boolean
  setUser: (user: UserProfile | null) => void
  logout: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching user data
    const fetchUser = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call
        // For now, we'll use mock data
        setTimeout(() => {
          setUser({
            id: "user-123",
            name: "John Doe",
            email: "john.doe@example.com",
            role: "premium",
            joinedDate: "2024-12-15",
            lastLogin: "2025-03-20T08:45:00",
            accountBalance: 45231.89,
            verificationLevel: 2,
          })
          setIsLoading(false)
        }, 500)
      } catch (error) {
        console.error("Failed to fetch user:", error)
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [])

  const logout = () => {
    setUser(null)
    // In a real app, you would also clear tokens, cookies, etc.
    window.location.href = "/login"
  }

  return <UserContext.Provider value={{ user, isLoading, setUser, logout }}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

