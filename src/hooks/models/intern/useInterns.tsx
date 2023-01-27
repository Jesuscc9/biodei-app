import useSWR from 'swr'
import { supabase } from '../../../services/supabaseService'
import { iModelHook, iUser } from '../../../types'

const getInterns = async (): Promise<iUser[]> => {
  const res = await supabase.from('user').select('*, profile(*), devices:device(*)  ').filter('role', 'eq', 'INTERN')

  if (res.error != null) throw new Error(res.error.message)
  const tickets = res.data as iUser[]
  return tickets
}

export const useInterns = (): iModelHook<iUser[]> => {
  const res = useSWR<iUser[]>('/interns', getInterns)

  const isLoading = res.data === undefined && res.error === undefined

  return { ...res, isLoading }
}
