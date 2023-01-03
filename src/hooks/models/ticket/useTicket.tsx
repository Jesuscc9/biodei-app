/* eslint-disable @typescript-eslint/no-unused-vars */
import { iTicket, iModelHook } from '../../../types'
import useSWR from 'swr'
import { supabase } from '../../../services/supabaseService'

const getSingleTicket = async (params: string[]): Promise<iTicket> => {
  const [_, id] = params
  const res = await supabase.from('ticket').select('*').eq('id', id).single()
  const ticket = res.data as iTicket
  return ticket
}

export const useTicket = (id: string | undefined): iModelHook<iTicket> => {
  const shouldFetch = id !== undefined
  const res = useSWR<iTicket>(shouldFetch && [`/tickets/${id}`, id], getSingleTicket)

  const isLoading = res.data === undefined && res.error === undefined

  return { ...res, isLoading }
}
