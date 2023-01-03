import { iDevice, iDestroyModelHook } from '../../../types'
import { useState } from 'react'
import { supabase } from '../../../services/supabaseService'
import { mutate } from 'swr'

export const useDeleteDevice = (): iDestroyModelHook<iDevice> => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const destroy = async (id: string): Promise<iDevice> => {
    setIsLoading(true)

    try {
      const res = await supabase.from('device').delete().eq('id', id).single()

      await mutate('/devices')

      return res.data ?? ({} as iDevice)
    } catch (e) {
      return {} as iDevice
    } finally {
      setIsLoading(false)
    }
  }

  return {
    destroy,
    isLoading,
    error: null,
  }
}
