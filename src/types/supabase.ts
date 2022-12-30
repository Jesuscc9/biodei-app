export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      client_profile: {
        Row: {
          profile_id: string
          id: string
        }
        Insert: {
          profile_id: string
          id?: string
        }
        Update: {
          profile_id?: string
          id?: string
        }
      }
      device: {
        Row: {
          id: string
          name: string
          description: string
          inventory_id: string
          image_url: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          inventory_id: string
          image_url: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          inventory_id?: string
          image_url?: string
          created_at?: string
        }
      }
      intern_profile: {
        Row: {
          profile_id: string
          id: string
        }
        Insert: {
          profile_id: string
          id?: string
        }
        Update: {
          profile_id?: string
          id?: string
        }
      }
      inventory: {
        Row: {
          client_id: string
          created_at: string
          id: string
        }
        Insert: {
          client_id: string
          created_at?: string
          id?: string
        }
        Update: {
          client_id?: string
          created_at?: string
          id?: string
        }
      }
      profile: {
        Row: {
          email: string
          first_name: string
          last_name: string
          created_at: string
          role: Database['public']['Enums']['role']
          id: string
        }
        Insert: {
          email: string
          first_name: string
          last_name: string
          created_at?: string
          role: Database['public']['Enums']['role']
          id: string
        }
        Update: {
          email?: string
          first_name?: string
          last_name?: string
          created_at?: string
          role?: Database['public']['Enums']['role']
          id?: string
        }
      }
      ticket: {
        Row: {
          name: string
          description: string
          device_id: string
          status: Database['public']['Enums']['ticket_status']
          starts_at: string
          finished_at: string | null
          created_at: string
          intern_id: string
          client_id: string
          id: string
        }
        Insert: {
          name: string
          description: string
          device_id: string
          status?: Database['public']['Enums']['ticket_status']
          starts_at: string
          finished_at?: string | null
          created_at?: string
          intern_id: string
          client_id: string
          id?: string
        }
        Update: {
          name?: string
          description?: string
          device_id?: string
          status?: Database['public']['Enums']['ticket_status']
          starts_at?: string
          finished_at?: string | null
          created_at?: string
          intern_id?: string
          client_id?: string
          id?: string
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
