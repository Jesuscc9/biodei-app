/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { iProfile, iTicket } from '../../../types'
import useSWR from 'swr'
import { supabase } from '../../../services/supabaseService'

const getInternProfile = async (params: string[]): Promise<iProfile> => {
  const [_, profileId] = params
  const internProfile = await supabase.from('intern_profile').select('profile_id').eq('intern_id', profileId).single()

  const profile = await supabase
    .from('profile, intern_profile (*)')
    .select('*')
    .eq('id', internProfile.data?.profile_id)
    .single()

  return profile.data as iProfile
}

export const TicketInternProfile = (ticket: iTicket): JSX.Element => {
  const data = useSWR(`/profiles/${ticket.intern_id}`, getInternProfile)

  return <div>Este es el perfil</div>
}
