import { iModelHook } from '../../useProfile'
import { iClient } from '../../../types'
import useSWR from 'swr'
import { supabase } from '../../../services/supabaseService'

const getClients = async (): Promise<iClient[]> => {
  const res = await supabase.from('profile').select('*, client_profile(*)').filter('role', 'eq', 'CLIENT')
  const tickets = res.data as iClient[]
  return tickets
}

export const useClients = (): iModelHook<iClient[]> => {
  const res = useSWR<iClient[]>('/clients', getClients)

  const isLoading = res.data === undefined && res.error === undefined

  return { ...res, isLoading }
}
