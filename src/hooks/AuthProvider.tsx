import type { Session, User } from '@supabase/supabase-js'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../services/supabaseService'

interface iAuthContext {
  session: null | Session
  user: null | User
}

export const AuthContext = createContext<iAuthContext>({} as iAuthContext)

export const AuthProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [session, setSession] = useState<null | Session>(null)
  const [user, setUser] = useState<null | User>(null)

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      const activeSession = await supabase.auth.getSession()
      const activeUser = await supabase.auth.getUser()
      setSession(activeSession.data.session)
      setUser(activeUser.data.user)
    }

    loadData().catch((error) => console.log(error))

    const { data: authListener } = supabase.auth.onAuthStateChange((event, currentSession) => {
      setSession(currentSession)
      setUser(currentSession?.user ?? null)

      console.log('Auth state changed:', event, currentSession)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): iAuthContext => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
