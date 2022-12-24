import { supabase } from '../services/supabaseService'
import { iProfile } from '../types'
import { useAuth } from './AuthProvider'
import useSWR, { SWRResponse } from 'swr'

export interface iModelHook<T> extends SWRResponse<T> {
  isLoading: boolean
}

const getProfile = async (params: string[]): Promise<iProfile> => {
  const { 1: userId } = params
  const res = await supabase.from('profile').select('*').eq('uuid', userId).single()
  const profile = res.data as iProfile
  return profile
}

export const useProfile = (): iModelHook<iProfile> => {
  const { user } = useAuth()

  const shouldFetch = typeof user?.id !== 'undefined'

  const res = useSWR<iProfile>(shouldFetch && ['/profile', user?.id], getProfile)

  const isLoading = res.data === undefined && res.error === undefined

  return {
    ...res,
    isLoading,
  }
}
