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
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
      }
      device: {
        Row: {
          brand: string
          created_at: string
          description: string | null
          external_code: string
          id: string
          image_url: string
          internal_code: string
          location: string
          model: string
          name: string
          serial_number: string
          user_id: string
        }
        Insert: {
          brand: string
          created_at?: string
          description?: string | null
          external_code: string
          id?: string
          image_url: string
          internal_code: string
          location: string
          model: string
          name: string
          serial_number: string
          user_id: string
        }
        Update: {
          brand?: string
          created_at?: string
          description?: string | null
          external_code?: string
          id?: string
          image_url?: string
          internal_code?: string
          location?: string
          model?: string
          name?: string
          serial_number?: string
          user_id?: string
        }
      }
      profile: {
        Row: {
          company_name: string | null
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          profile_picture: string | null
          user_id: string
        }
        Insert: {
          company_name?: string | null
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          profile_picture?: string | null
          user_id: string
        }
        Update: {
          company_name?: string | null
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          profile_picture?: string | null
          user_id?: string
        }
      }
      ticket: {
        Row: {
          created_at: string
          description: string | null
          device_id: string
          id: string
          maintenance_type: Database["public"]["Enums"]["maintenances_type"]
        }
        Insert: {
          created_at?: string
          description?: string | null
          device_id: string
          id?: string
          maintenance_type: Database["public"]["Enums"]["maintenances_type"]
        }
        Update: {
          created_at?: string
          description?: string | null
          device_id?: string
          id?: string
          maintenance_type?: Database["public"]["Enums"]["maintenances_type"]
        }
      }
      update: {
        Row: {
          created_at: string
          description: string
          id: string
          ticket_id: string
          title: Database["public"]["Enums"]["maintenances"]
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          ticket_id: string
          title: Database["public"]["Enums"]["maintenances"]
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          ticket_id?: string
          title?: Database["public"]["Enums"]["maintenances"]
        }
      }
      user: {
        Row: {
          created_at: string
          email: string
          id: string
          raw_user_meta_data: string
          role: Database["public"]["Enums"]["role"]
        }
        Insert: {
          created_at: string
          email: string
          id: string
          raw_user_meta_data?: string
          role: Database["public"]["Enums"]["role"]
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          raw_user_meta_data?: string
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
      maintenances: "MAINTAINING"
      maintenances_type: "PREVENTIVE" | "CORRECTIVE"
      role: "CLIENT" | "INTERN" | "ADMIN"
    }
  }
}
