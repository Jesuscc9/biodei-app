import { iProfile, iModelHook } from '../../../types'
import useSWR from 'swr'
import { supabase } from '../../../services/supabaseService'

const getClients = async (): Promise<iProfile[]> => {
  const res = await supabase.from('profile').select('*, client_profile(*)').filter('role', 'eq', 'CLIENT')
  const tickets = res.data as iProfile[]
  return tickets
}

export const useClients = (): iModelHook<iProfile[]> => {
  const res = useSWR<iProfile[]>('/clients', getClients)

  const isLoading = res.data === undefined && res.error === undefined

  return { ...res, isLoading }
}
