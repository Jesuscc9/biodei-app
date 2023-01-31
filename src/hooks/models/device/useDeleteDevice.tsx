import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { mutate } from 'swr'
import { supabase } from '../../../services/supabaseService'
import { iDestroyModelHook, iDevice } from '../../../types'
import { useClient } from '../client'

export const useDeleteDevice = (): iDestroyModelHook<iDevice> => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { clientId } = useParams()

  const { mutate: mutateClient } = useClient(clientId)

  const destroy = async (id: string): Promise<iDevice> => {
    setIsLoading(true)

    try {
      const res = await supabase.from('device').delete().eq('id', id).single()

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
    destroy,
    isLoading,
    error: null,
  }
}
