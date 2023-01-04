import { iInsertModelHook, iDevice, iInsertDevice } from '../../../types'
import { useState } from 'react'
import { supabase } from '../../../services/supabaseService'
import { mutate } from 'swr'
import { useUser } from '../user'

export const useInsertDevice = (): iInsertModelHook<iDevice, iInsertDevice> => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { data: user } = useUser()

  const create = async (values: iInsertDevice): Promise<iDevice> => {
    setIsLoading(true)

    try {
      const res = await supabase
        .from('device')
        .insert({ ...values, user_id: user?.id ?? '' })
        .single()

      await mutate('/devices')

      return res.data ?? ({} as iDevice)
    } catch (e) {
      return {} as iDevice
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
