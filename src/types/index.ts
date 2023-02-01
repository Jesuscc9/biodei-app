import { SWRResponse } from 'swr'
import { Database } from './supabase'

export interface iModelHook<T> extends SWRResponse<T> {
  isLoading: boolean
}

export interface iInsertModelHook<Model, InsertModel> {
  create: (data: InsertModel) => Promise<Model>
  isLoading: boolean
  error: Error | null
}

export interface iUpdateModelHook<Model, UpdateModel> {
  update: (id: string, data: UpdateModel) => Promise<Model>
  isLoading: boolean
  error: Error | null
}

export interface iDestroyModelHook<Model> {
  destroy: (id: string) => Promise<Model>
  isLoading: boolean
  error: Error | null
}

export type iUser = Database['public']['Tables']['user']['Row'] & {
  profile?: Database['public']['Tables']['profile']['Row'] | null
  devices?: Array<Database['public']['Tables']['device']['Row']>
}

export type iProfile = Database['public']['Tables']['profile']['Row']

// DEVICE MODEL

export type iDevice = Database['public']['Tables']['device']['Row'] & {
  // tickets: Array<Database['public']['Tables']['ticket']['Row']> | null
  user?: iUser
}

export type iInsertDevice = Database['public']['Tables']['device']['Insert']

// TICKET MODEL

export type iTicket = Database['public']['Tables']['ticket']['Row']

export type iInsertTicket = Database['public']['Tables']['ticket']['Insert']

export type iUpdateTicket = Database['public']['Tables']['ticket']['Update']

export interface iInsertUser {
  email: string
  password: string
  first_name: string
  last_name: string
  company_name?: string
  role: Database['public']['Enums']['role']
}
