import { iInsertModelHook, iTicket, iInsertTicket } from '../../../types'
import { useState } from 'react'
import { supabase } from '../../../services/supabaseService'
import { mutate } from 'swr'

export const useInsertTicket = (): iInsertModelHook<iTicket, iInsertTicket> => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const create = async (values: iInsertTicket): Promise<iTicket> => {
    setIsLoading(true)

    try {
      const res = await supabase.from('ticket').insert(values).single()

      await mutate('/tickets')

      return res.data ?? ({} as iTicket)
    } catch (e) {
      return {} as iTicket
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
