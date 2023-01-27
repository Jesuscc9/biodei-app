import useSWR from 'swr'
import { supabase } from '../../../services/supabaseService'
import { iModelHook, iUser } from '../../../types'

const getClients = async (): Promise<iUser[]> => {
  const res = await supabase.from('user').select('*, profile(*), devices:device(*)  ').filter('role', 'eq', 'CLIENT')

  if (res.error != null) throw new Error(res.error.message)

  const clients = res.data as iUser[]
  return clients
}

export const useClients = (): iModelHook<iUser[]> => {
  const res = useSWR<iUser[]>('/clients', getClients)

  const isLoading = res.data === undefined && res.error === undefined

  return { ...res, isLoading }
}
