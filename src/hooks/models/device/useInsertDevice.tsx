import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { mutate } from 'swr'
import { supabase } from '../../../services/supabaseService'
import { iDevice, iInsertDevice, iInsertModelHook } from '../../../types'
import { useClient } from '../client'
import { useUser } from '../user'

export const useInsertDevice = (): iInsertModelHook<iDevice, iInsertDevice> => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { data: user } = useUser()

  const { clientId } = useParams()

  const { mutate: mutateClient } = useClient(clientId)

  const userId: string = clientId ?? user?.id ?? ''

  const create = async (values: iInsertDevice): Promise<iDevice> => {
    setIsLoading(true)

    try {
      const res = await supabase
        .from('device')
        .insert({ ...values, user_id: userId })
        .single()

      if (clientId !== undefined) {
        await mutateClient()
      }

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
