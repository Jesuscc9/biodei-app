import { supabase } from '../../../services/supabaseService'
import { iModelHook, iUser } from '../../../types'
import { useAuth } from '../../AuthProvider'
import useSWR from 'swr'

const getUser = async (params: string[]): Promise<iUser> => {
  const { 1: userId } = params
  const res: any = await supabase.from('user').select('*, profile ( * )').eq('id', userId).single()

  const user = res?.data ?? ({} as iUser)
  return user
}

export const useUser = (): iModelHook<iUser> => {
  const { user } = useAuth()

  const shouldFetch = typeof user?.id !== 'undefined'

  const res = useSWR<iUser>(shouldFetch && ['/profile', user?.id], getUser)

  const isLoading = res.data === undefined && res.error === undefined

  return {
    ...res,
    isLoading,
  }
}
