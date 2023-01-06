import { Database } from './supabase'
import { SWRResponse } from 'swr'

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
  profile: Database['public']['Tables']['profile']['Row'] | null
  devices: Array<Database['public']['Tables']['device']['Row']>
}

export type iProfile = Database['public']['Tables']['profile']['Row']

export type iDevice = Database['public']['Tables']['device']['Row'] & {
  maintenance: Array<Database['public']['Tables']['maintenance']['Row']> | null
}

export type iMaintenanceTitles = Database['public']['Tables']['maintenance']['Row']['title']

export type iInsertDevice = Database['public']['Tables']['device']['Insert']

export type iMaintenance = Database['public']['Tables']['maintenance']['Row']

export type iInsertMaintenance = Database['public']['Tables']['maintenance']['Insert']
