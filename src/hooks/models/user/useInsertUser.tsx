import { useState } from 'react'
import { supabase } from '../../../services/supabaseService'
import { iInsertModelHook, iInsertUser, iUser } from '../../../types'

export const useInsertUser = (): iInsertModelHook<iUser, iInsertUser> => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const create = async (values: iInsertUser): Promise<iUser> => {
    setIsLoading(true)

    try {
      const res = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            email: values.email,
            first_name: values.first_name,
            last_name: values.last_name,
            role: values.role,
          },
        },
      })
      return {} as iUser
    } catch (e) {
      return {} as iUser
    } finally {
      setIsLoading(false)
    }
  }

  return {
    create,
    isLoading,
    error: null,
  }
}
