import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useSWR from 'swr'
import { supabase } from '../../../services/supabaseService'
import { iModelHook, iUser } from '../../../types'

const getUser = async (): Promise<iUser> => {
  const fetchUser = await supabase.auth.getUser()

  if (fetchUser.error != null) {
    throw new Error(fetchUser.error.message)
  }

  const userId = fetchUser?.data.user.id

  if (userId === undefined) throw new Error('No user id')

  const res = await supabase.from('user').select('*, profile ( * ), devices:device (*)').eq('id', userId).single()

  if (res.error != null) throw new Error(res.error.message)

  if (res.data === null) throw new Error('No user data')

  const user: any = res.data
  return user
}

export const useUser = (): iModelHook<iUser> => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const res = useSWR<iUser>('/user', getUser)

  const isLoading = res.data === undefined && res.error === undefined

  useEffect(() => {
    if (res.data === undefined) return

    if (res.data.role === 'ADMIN') {
      if (pathname.includes('login') || pathname === '/') {
        navigate('/admin/clients', { replace: true })
      }
    } else {
      navigate('/devices', { replace: true })
    }
  }, [res.data?.role ?? ''])

  return {
    ...res,
    isLoading,
  }
}
