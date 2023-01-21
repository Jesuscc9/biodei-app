/* eslint-disable @typescript-eslint/no-unused-vars */
import useSWR from 'swr'
import { supabase } from '../../../services/'
import { iDevice, iModelHook } from '../../../types'

const getSingleDevice = async (params: string[]): Promise<iDevice> => {
  const [_, id] = params
  const res = await supabase.from('device').select('*').eq('id', id).single()
  const ticket = res.data as iDevice
  if (res.status !== 200) throw new Error(res.error?.message)
  return ticket
}

export const useDevice = (id: string | undefined): iModelHook<iDevice> => {
  const shouldFetch = id !== undefined

  console.assert(id !== undefined, 'No id provided for useDevice hook')

  const res = useSWR<iDevice>(shouldFetch && [`/devices/${id}`, id], getSingleDevice)

  const isLoading = res.data === undefined && res.error === undefined

  return { ...res, isLoading }
}
