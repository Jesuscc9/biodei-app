import { iDevice, iModelHook } from '../../../types'
import useSWR from 'swr'
import { supabase } from '../../../services/supabaseService'

const getDevices = async (): Promise<iDevice[]> => {
  const res = await supabase.from('device').select('*, maintenance ( * )')
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
