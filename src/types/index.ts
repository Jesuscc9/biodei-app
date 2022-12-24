import { Database } from './supabase'

export type iProfile = Database['public']['Tables']['profile']['Row']

export type iTicket = Database['public']['Tables']['ticket']['Row']

export type iIntern = Database['public']['Tables']['profile']['Row'] & {
  intern_profile: Database['public']['Tables']['intern_profile']['Row']
}

export type iClient = Database['public']['Tables']['profile']['Row'] & {
  client_profile: Database['public']['Tables']['client_profile']['Row']
}
