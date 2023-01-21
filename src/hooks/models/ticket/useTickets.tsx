import { iTicket, iModelHook } from '../../../types'
import useSWR from 'swr'
import { supabase } from '../../../services/supabaseService'

const getTickets = async (): Promise<iTicket[]> => {
  const res = await supabase.from('ticket').select('*')

  if (res.error != null) throw new Error(res.error.message)

  const tickets = res.data as iTicket[]
  return tickets
}

export const useTickets = (): iModelHook<iTicket[]> => {
  const res = useSWR<iTicket[]>('/tickets', getTickets)

  const isLoading = res.data === undefined && res.error === undefined

  return { ...res, isLoading }
}
