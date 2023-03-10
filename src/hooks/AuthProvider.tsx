import type { AuthChangeEvent, Session, User } from '@supabase/supabase-js'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { mutate } from 'swr'
import { supabase } from '../services/supabaseService'

interface iAuthContext {
  session: null | Session
  user: null | User
}

export const AuthContext = createContext<iAuthContext>({} as iAuthContext)

export const AuthProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [session, setSession] = useState<null | Session>(null)
  const [user, setUser] = useState<null | User>(null)
  const [currentEvent, setCurrentEvent] = useState<AuthChangeEvent | null>(null)

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      const activeSession = await supabase.auth.getSession()
      const activeUser = await supabase.auth.getUser()
      setSession(activeSession.data.session)
      setUser(activeUser.data.user)
    }

    loadData().catch((error) => console.error(error))

    const { data: authListener } = supabase.auth.onAuthStateChange((event, currentSession) => {
      setSession(currentSession)
      setUser(currentSession?.user ?? null)
      setCurrentEvent(event)

      console.info('Auth state changed:', event, currentSession)

      if (event === 'SIGNED_OUT') {
        navigate('/')
      }

      if (event === 'SIGNED_IN') {
        mutate('/user').catch((e) => {
          console.error(e)
        })
      }
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
