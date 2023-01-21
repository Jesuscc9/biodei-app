import type { iMaintenance, iUpdateModelHook, iUpdateMaintenance } from '../../../types'
import { useState } from 'react'
import { supabase } from '../../../services/supabaseService'
import { mutate } from 'swr'

export const useUpdateMintenance = (): iUpdateModelHook<iMaintenance, iUpdateMaintenance> => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const update = async (id: string, values: iUpdateMaintenance): Promise<iMaintenance> => {
    setIsLoading(true)

    try {
      const res = await supabase.from('maintenance').update(values).eq('id', id).single()

      await mutate('/devices')

      return res.data ?? ({} as iMaintenance)
    } catch (e) {
      return {} as iMaintenance
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
