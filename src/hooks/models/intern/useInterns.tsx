import { iIntern, iModelHook } from '../../../types'
import useSWR from 'swr'
import { supabase } from '../../../services/supabaseService'

const getInterns = async (): Promise<iIntern[]> => {
  const res = await supabase.from('profile').select('*, intern_profile(*)').filter('role', 'eq', 'INTERN')
  const tickets = res.data as iIntern[]
  return tickets
}

export const useInterns = (): iModelHook<iIntern[]> => {
  const res = useSWR<iIntern[]>('/interns', getInterns)

  const isLoading = res.data === undefined && res.error === undefined

  return { ...res, isLoading }
}
