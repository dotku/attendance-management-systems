export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      leave_records: {
        Row: {
          id: string
          user_id: string
          name: string
          personnel_type: 'officer' | 'soldier' | 'civilian'
          start_date: string
          end_date: string
          reason: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          personnel_type: 'officer' | 'soldier' | 'civilian'
          start_date: string
          end_date: string
          reason: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          personnel_type?: 'officer' | 'soldier' | 'civilian'
          start_date?: string
          end_date?: string
          reason?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}