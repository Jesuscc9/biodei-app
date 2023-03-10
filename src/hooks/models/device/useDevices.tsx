import useSWR from 'swr'
import { supabase } from '../../../services/supabaseService'
import { iDevice, iModelHook } from '../../../types'

const getDevices = async (): Promise<iDevice[]> => {
  const userId = (await supabase.auth.getUser()).data.user?.id

  const res = await supabase
    .from('device')
    .select('*, user (*, profile ( * )), tickets:ticket ( * )')
    .eq('user_id', userId)
  if (res.error !== null) {
    throw new Error(res.error.message)
  }
  const devices = res.data as iDevice[]
  return devices
}

export const useDevices = (): iModelHook<iDevice[]> => {
  const res = useSWR<iDevice[]>('/devices', getDevices)

  const isLoading = res.data === undefined && res.error === undefined

  return { ...res, isLoading }
}
