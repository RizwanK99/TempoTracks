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
      exercises: {
        Row: {
          id: string
        }
        Insert: {
          id: string
        }
        Update: {
          id?: string
        }
        Relationships: []
      }
      music: {
        Row: {
          bpm: number | null
          created_at: string
          increase: number | null
          music_id: number
        }
        Insert: {
          bpm?: number | null
          created_at?: string
          increase?: number | null
          music_id?: number
        }
        Update: {
          bpm?: number | null
          created_at?: string
          increase?: number | null
          music_id?: number
        }
        Relationships: []
      }
      playlist: {
        Row: {
          created_at: string | null
          id: number
          length: number | null
          songs: Json | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          length?: number | null
          songs?: Json | null
        }
        Update: {
          created_at?: string | null
          id?: number
          length?: number | null
          songs?: Json | null
        }
        Relationships: []
      }
      songs: {
        Row: {
          acousticness: number | null
          apple_music_id: string | null
          artists: string[] | null
          danceability: number | null
          duration_ms: number | null
          energy: number | null
          id: string
          instrumentalness: number | null
          isrc: string | null
          key: number | null
          liveness: number | null
          loudness: number | null
          mode: number | null
          speechiness: number | null
          tempo: number | null
          time_signature: number | null
          title: string | null
          valence: number | null
        }
        Insert: {
          acousticness?: number | null
          apple_music_id?: string | null
          artists?: string[] | null
          danceability?: number | null
          duration_ms?: number | null
          energy?: number | null
          id: string
          instrumentalness?: number | null
          isrc?: string | null
          key?: number | null
          liveness?: number | null
          loudness?: number | null
          mode?: number | null
          speechiness?: number | null
          tempo?: number | null
          time_signature?: number | null
          title?: string | null
          valence?: number | null
        }
        Update: {
          acousticness?: number | null
          apple_music_id?: string | null
          artists?: string[] | null
          danceability?: number | null
          duration_ms?: number | null
          energy?: number | null
          id?: string
          instrumentalness?: number | null
          isrc?: string | null
          key?: number | null
          liveness?: number | null
          loudness?: number | null
          mode?: number | null
          speechiness?: number | null
          tempo?: number | null
          time_signature?: number | null
          title?: string | null
          valence?: number | null
        }
        Relationships: []
      }
      user_settings: {
        Row: {
          auto_mix: number | null
          bpm_normalization: number | null
          created_at: string | null
          crossfade: number | null
          data_saver: boolean | null
          explicit_content: boolean | null
          high_bpm_warning: boolean | null
          id: number
        }
        Insert: {
          auto_mix?: number | null
          bpm_normalization?: number | null
          created_at?: string | null
          crossfade?: number | null
          data_saver?: boolean | null
          explicit_content?: boolean | null
          high_bpm_warning?: boolean | null
          id?: number
        }
        Update: {
          auto_mix?: number | null
          bpm_normalization?: number | null
          created_at?: string | null
          crossfade?: number | null
          data_saver?: boolean | null
          explicit_content?: boolean | null
          high_bpm_warning?: boolean | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_settings_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          }
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string | null
          first_name: string | null
          last_name: string | null
          password: string | null
          phone_number: string | null
          user_id: number
          username: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          last_name?: string | null
          password?: string | null
          phone_number?: string | null
          user_id?: number
          username?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          last_name?: string | null
          password?: string | null
          phone_number?: string | null
          user_id?: number
          username?: string | null
        }
        Relationships: []
      }
      workout_templates: {
        Row: {
          created_at: string
          id: string
        }
        Insert: {
          created_at?: string
          id: string
        }
        Update: {
          created_at?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workout_templates_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "workouts"
            referencedColumns: ["workout_id"]
          }
        ]
      }
      workouts: {
        Row: {
          created_at: string | null
          is_paused: boolean
          paused_at: string | null
          playlist_id: string | null
          status: string | null
          time_duration: number | null
          time_end: string | null
          time_start: string | null
          total_distance: number | null
          total_elevation_change: number | null
          total_energy_burned: number | null
          training_intervals: Json | null
          user_id: number | null
          workout_id: string
          workout_name: string | null
          workout_type: string | null
        }
        Insert: {
          created_at?: string | null
          is_paused?: boolean
          paused_at?: string | null
          playlist_id?: string | null
          status?: string | null
          time_duration?: number | null
          time_end?: string | null
          time_start?: string | null
          total_distance?: number | null
          total_elevation_change?: number | null
          total_energy_burned?: number | null
          training_intervals?: Json | null
          user_id?: number | null
          workout_id?: string
          workout_name?: string | null
          workout_type?: string | null
        }
        Update: {
          created_at?: string | null
          is_paused?: boolean
          paused_at?: string | null
          playlist_id?: string | null
          status?: string | null
          time_duration?: number | null
          time_end?: string | null
          time_start?: string | null
          total_distance?: number | null
          total_elevation_change?: number | null
          total_energy_burned?: number | null
          training_intervals?: Json | null
          user_id?: number | null
          workout_id?: string
          workout_name?: string | null
          workout_type?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
