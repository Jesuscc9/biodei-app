import { Database } from './supabase'
import { SWRResponse } from 'swr'

export interface iModelHook<T> extends SWRResponse<T> {
  isLoading: boolean
}

export interface iCreateModelHook<Model, InsertModel> {
  create: (data: InsertModel) => Promise<Model>
  isLoading: boolean
  error: Error | null
}

export type iProfile = Database['public']['Tables']['profile']['Row'] & {
  intern_profile?: Database['public']['Tables']['intern_profile']['Row'] & {
    inventory: Database['public']['Tables']['inventory']['Row']
  }
  client_profile?: Database['public']['Tables']['client_profile']['Row']
}

export type iTicket = Database['public']['Tables']['ticket']['Row']

export type iDevice = Database['public']['Tables']['device']['Row']

export type iInsertDevice = Database['public']['Tables']['device']['Insert']
