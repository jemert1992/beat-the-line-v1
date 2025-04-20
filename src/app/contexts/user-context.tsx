'use client'

import { ReactNode, createContext, useContext, useState } from 'react'

type SubscriptionTier = 'free' | 'premium'

interface UserContextType {
  isAuthenticated: boolean
  user: {
    id: string
    name: string
    email: string
    subscriptionTier: SubscriptionTier
  } | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (userData: any) => Promise<boolean>
  updateSubscription: (tier: SubscriptionTier) => void
}

const defaultContext: UserContextType = {
  isAuthenticated: false,
  user: null,
  login: async () => false,
  logout: () => {},
  register: async () => false,
  updateSubscription: () => {}
}

const UserContext = createContext<UserContextType>(defaultContext)

export const useUser = () => useContext(UserContext)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserContextType['user']>(null)
  const isAuthenticated = !!user

  // For MVP, we'll use a simple mock implementation
  const login = async (email: string, password: string) => {
    // In a real app, this would call your API
    if (email === 'user@example.com' && password === 'password') {
      setUser({
        id: '1',
        name: 'Demo User',
        email: 'user@example.com',
        subscriptionTier: 'free'
      })
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
  }

  const register = async (userData: any) => {
    // In a real app, this would call your API
    setUser({
      id: '2',
      name: `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
      subscriptionTier: 'free'
    })
    return true
  }

  const updateSubscription = (tier: SubscriptionTier) => {
    if (user) {
      setUser({
        ...user,
        subscriptionTier: tier
      })
    }
  }

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        register,
        updateSubscription
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
