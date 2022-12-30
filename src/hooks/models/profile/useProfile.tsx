import { supabase } from '../../../services/supabaseService'
import { iProfile, iModelHook } from '../../../types'
import { useAuth } from '../../AuthProvider'
import useSWR from 'swr'

const getProfile = async (params: string[]): Promise<iProfile> => {
  const { 1: userId } = params
  const res = await supabase
    .from('profile')
    .select('*, client_profile ( *, inventory ( * ) )')
    .eq('id', userId)
    .single()

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
