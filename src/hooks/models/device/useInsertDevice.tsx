import { iCreateModelHook, iDevice, iInsertDevice } from '../../../types'
import { useState } from 'react'
import { supabase } from '../../../services/supabaseService'
import { mutate } from 'swr'
import { useProfile } from '../profile'

export const useInsertDevice = (): iCreateModelHook<iDevice, iInsertDevice> => {
  const data: any = useProfile()

  console.log({ data })

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const create = async (values: iInsertDevice): Promise<iDevice> => {
    setIsLoading(true)

    try {
      const res = await supabase
        .from('device')
        .insert({ ...values, inventory_id: data.client_profile.inventory.id })
        .single()

      console.log({ res })
      await mutate('/devices')

      return res.data ?? ({} as iDevice)
    } catch (e) {
      console.log({ error: e })
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
