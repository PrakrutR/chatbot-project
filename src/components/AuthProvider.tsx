// src/components/AuthProvider.tsx
'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session, SupabaseClient, AuthChangeEvent } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

type AuthContextType = {
  user: User | null
  session: Session | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const setData = async () => {
      const { data: { session }, error } = await (supabase as SupabaseClient).auth.getSession()
      if (error) console.log(error)
      else {
        setSession(session)
        setUser(session?.user ?? null)
      }
      setLoading(false)
    }
    
    const { data: { subscription } } = (supabase as SupabaseClient).auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        setSession(session)
        setUser(session?.user ?? null)
      }
    )

    setData()

    return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, session, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}