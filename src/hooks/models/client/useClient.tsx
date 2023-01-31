import useSWR from 'swr'
import { supabase } from '../../../services/supabaseService'
import { iModelHook, iUser } from '../../../types'

const getSingleClient = async (params: string[]): Promise<iUser> => {
  const [_, id] = params
  const res = await supabase
    .from('user')
    .select('*, profile(*), devices:device(*)  ')
    .filter('role', 'eq', 'CLIENT')
    .eq('id', id)
    .single()

  if (res.error != null) throw new Error(res.error.message)

  const clients = res.data as iUser
  return clients
}

export const useClient = (id: string | undefined): iModelHook<iUser> => {
  const shouldFetch = id !== undefined

  console.assert(id !== undefined, 'No id provided for useClient hook')

  const res = useSWR<iUser>(shouldFetch && [`/clients/${id}`, id], getSingleClient)

  const isLoading = res.data === undefined && res.error === undefined

  return { ...res, isLoading }
}
