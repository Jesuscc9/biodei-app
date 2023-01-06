export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          id: string
          checksum: string
          finished_at: string | null
          migration_name: string
          logs: string | null
          rolled_back_at: string | null
          started_at: string
          applied_steps_count: number
        }
        Insert: {
          id: string
          checksum: string
          finished_at?: string | null
          migration_name: string
          logs?: string | null
          rolled_back_at?: string | null
          started_at?: string
          applied_steps_count?: number
        }
        Update: {
          id?: string
          checksum?: string
          finished_at?: string | null
          migration_name?: string
          logs?: string | null
          rolled_back_at?: string | null
          started_at?: string
          applied_steps_count?: number
        }
      }
      device: {
        Row: {
          id: string
          name: string
          description: string | null
          external_code: string
          internal_code: string
          brand: string
          model: string
          serial_number: string
          location: string
          image_url: string
          created_at: string
          user_id: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          external_code: string
          internal_code: string
          brand: string
          model: string
          serial_number: string
          location: string
          image_url: string
          created_at?: string
          user_id: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          external_code?: string
          internal_code?: string
          brand?: string
          model?: string
          serial_number?: string
          location?: string
          image_url?: string
          created_at?: string
          user_id?: string
        }
      }
      maintenance: {
        Row: {
          id: string
          title: Database["public"]["Enums"]["maintenances"]
          type: Database["public"]["Enums"]["maintenances_type"]
          description: string
          created_at: string
          device_id: string
        }
        Insert: {
          id?: string
          title: Database["public"]["Enums"]["maintenances"]
          type: Database["public"]["Enums"]["maintenances_type"]
          description: string
          created_at?: string
          device_id: string
        }
        Update: {
          id?: string
          title?: Database["public"]["Enums"]["maintenances"]
          type?: Database["public"]["Enums"]["maintenances_type"]
          description?: string
          created_at?: string
          device_id?: string
        }
      }
      profile: {
        Row: {
          id: string
          email: string
          first_name: string
          last_name: string
          created_at: string
          company_name: string | null
          profile_picture: string | null
          user_id: string
        }
        Insert: {
          id?: string
          email: string
          first_name: string
          last_name: string
          created_at?: string
          company_name?: string | null
          profile_picture?: string | null
          user_id: string
        }
        Update: {
          id?: string
          email?: string
          first_name?: string
          last_name?: string
          created_at?: string
          company_name?: string | null
          profile_picture?: string | null
          user_id?: string
        }
      }
      user: {
        Row: {
          id: string
          email: string
          raw_user_meta_data: string
          created_at: string
          role: Database["public"]["Enums"]["role"]
        }
        Insert: {
          id: string
          email: string
          raw_user_meta_data?: string
          created_at: string
          role: Database["public"]["Enums"]["role"]
        }
        Update: {
          id?: string
          email?: string
          raw_user_meta_data?: string
          created_at?: string
          role?: Database["public"]["Enums"]["role"]
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
      maintenances:
        | "NEEDS_MAINTENANCE"
        | "DO_NOT_NEED_MAINTENANCE"
        | "MAINTENANCE_REQUESTED"
        | "MAINTENANCE_ACCEPTED"
        | "MAINTAINING"
        | "MAINTAINED"
      maintenances_type: "PREVENTIVE" | "CORRECTIVE"
      role: "CLIENT" | "INTERN" | "ADMIN"
    }
  }
}
