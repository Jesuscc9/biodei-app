import { iModelHook } from '../../useProfile'
import { iTicket } from '../../../types'
import useSWR from 'swr'
import { supabase } from '../../../services/supabaseService'

const getTickets = async (): Promise<iTicket[]> => {
  const res = await supabase.from('ticket').select('*')
  const tickets = res.data as iTicket[]
  return tickets
}

export const useTickets = (): iModelHook<iTicket[]> => {
  const res = useSWR<iTicket[]>('/tickets', getTickets)

  const isLoading = res.data === undefined && res.error === undefined

  return { ...res, isLoading }
}
