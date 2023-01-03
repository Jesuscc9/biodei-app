import { iTicket, iUpdateTicket, iUpdateModelHook } from '../../../types'
import { useState } from 'react'
import { supabase } from '../../../services/supabaseService'
import { mutate } from 'swr'

export const useUpdateTicket = (): iUpdateModelHook<iTicket, iUpdateTicket> => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const update = async (id: string, values: iUpdateTicket): Promise<iTicket> => {
    setIsLoading(true)

    try {
      const res = await supabase.from('ticket').update(values).eq('id', id).single()

      await mutate(`/tickets/${id}`)
      await mutate('/tickets')

      return res.data ?? ({} as iTicket)
    } catch (e) {
      return {} as iTicket
    } finally {
      setIsLoading(false)
    }
  }

  return {
    update,
    isLoading,
    error: null,
  }
}
