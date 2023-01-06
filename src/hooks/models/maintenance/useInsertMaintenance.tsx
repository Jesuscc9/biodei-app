import { iInsertModelHook, iMaintenance, iInsertMaintenance } from '../../../types'
import { useState } from 'react'
import { supabase } from '../../../services/supabaseService'
import { useSearchParams } from 'react-router-dom'
import { mutate } from 'swr'

export const useInsertmaintenance = (): iInsertModelHook<iMaintenance, iInsertMaintenance> => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [searchParams] = useSearchParams()

  const deviceId = searchParams.get('deviceId') ?? ''

  const create = async (values: iInsertMaintenance): Promise<iMaintenance> => {
    setIsLoading(true)

    try {
      const res = await supabase
        .from('maintenance')
        .insert({ ...values, device_id: deviceId })
        .single()

      await mutate('/devices')

      return res.data ?? ({} as iMaintenance)
    } catch (e) {
      return {} as iMaintenance
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
