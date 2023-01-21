import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { mutate } from 'swr'
import { supabase } from '../../../services/supabaseService'
import { iInsertModelHook, iInsertTicket, iTicket } from '../../../types'

export const useInsertTicket = (): iInsertModelHook<iTicket, iInsertTicket> => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [params] = useSearchParams()

  const deviceId = params.get('deviceId')

  const create = async (values: iInsertTicket): Promise<iTicket> => {
    setIsLoading(true)

    try {
      const res = await supabase
        .from('ticket')
        .insert({ ...values, device_id: deviceId ?? values.device_id })
        .single()

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
