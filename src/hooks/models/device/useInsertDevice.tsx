import { iInsertModelHook, iDevice, iInsertDevice } from '../../../types'
import { useState } from 'react'
import { supabase } from '../../../services/supabaseService'
import { mutate } from 'swr'
import { useProfile } from '../profile'

export const useInsertDevice = (): iInsertModelHook<iDevice, iInsertDevice> => {
  const { data: profile } = useProfile()

  const inventoryId = profile?.client_profile?.inventory.id ?? ''

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const create = async (values: iInsertDevice): Promise<iDevice> => {
    setIsLoading(true)

    try {
      const res = await supabase
        .from('device')
        .insert({ ...values, inventory_id: inventoryId })
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
