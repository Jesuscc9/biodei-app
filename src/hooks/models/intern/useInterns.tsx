import { iProfile, iModelHook } from '../../../types'
import useSWR from 'swr'
import { supabase } from '../../../services/supabaseService'

const getInterns = async (): Promise<iProfile[]> => {
  const res = await supabase.from('profile').select('*, intern_profile(*)').filter('role', 'eq', 'INTERN')
  const tickets = res.data as iProfile[]
  return tickets
}

export const useInterns = (): iModelHook<iProfile[]> => {
  const res = useSWR<iProfile[]>('/interns', getInterns)

  const isLoading = res.data === undefined && res.error === undefined

  return { ...res, isLoading }
}
