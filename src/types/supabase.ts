export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      client_profile: {
        Row: {
          id: number
          profile_id: string
        }
        Insert: {
          id?: number
          profile_id: string
        }
        Update: {
          id?: number
          profile_id?: string
        }
      }
      intern_profile: {
        Row: {
          id: number
          profile_id: string
        }
        Insert: {
          id?: number
          profile_id: string
        }
        Update: {
          id?: number
          profile_id?: string
        }
      }
      profile: {
        Row: {
          id: number
          uuid: string
          email: string
          first_name: string
          last_name: string
          created_at: string
          role: Database['public']['Enums']['role']
        }
        Insert: {
          id?: number
          uuid: string
          email: string
          first_name: string
          last_name: string
          created_at?: string
          role: Database['public']['Enums']['role']
        }
        Update: {
          id?: number
          uuid?: string
          email?: string
          first_name?: string
          last_name?: string
          created_at?: string
          role?: Database['public']['Enums']['role']
        }
      }
      ticket: {
        Row: {
          id: number
          uuid: string
          name: string
          description: string
          status: Database['public']['Enums']['ticket_status']
          starts_at: string
          finished_at: string
          created_at: string
          intern_id: number
          client_id: number
          device_id: string
        }
        Insert: {
          id?: number
          uuid: string
          name: string
          description: string
          status: Database['public']['Enums']['ticket_status']
          starts_at: string
          finished_at: string
          created_at?: string
          intern_id: number
          client_id: number
          device_id: string
        }
        Update: {
          id?: number
          uuid?: string
          name?: string
          description?: string
          status?: Database['public']['Enums']['ticket_status']
          starts_at?: string
          finished_at?: string
          created_at?: string
          intern_id?: number
          client_id?: number
          device_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      role: 'CLIENT' | 'INTERN' | 'ADMIN'
      ticket_status: 'NOT_STARTED' | 'ACTIVE' | 'CLOSED'
    }
  }
}
