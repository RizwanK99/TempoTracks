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
      playlist_items: {
        Row: {
          apple_music_id: string
          playlist_id: string
        }
        Insert: {
          apple_music_id: string
          playlist_id: string
        }
        Update: {
          apple_music_id?: string
          playlist_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_playlist_items_apple_music_id_fkey"
            columns: ["apple_music_id"]
            isOneToOne: false
            referencedRelation: "songs"
            referencedColumns: ["apple_music_id"]
          },
          {
            foreignKeyName: "public_playlist_items_playlist_id_fkey"
            columns: ["playlist_id"]
            isOneToOne: false
            referencedRelation: "playlists"
            referencedColumns: ["apple_music_id"]
          }
        ]
      }
      playlists: {
        Row: {
          apple_music_id: string
          artwork_url: string
          created_at: string
          length: number
          name: string
          user_id: string | null
        }
        Insert: {
          apple_music_id?: string
          artwork_url: string
          created_at?: string
          length: number
          name: string
          user_id?: string | null
        }
        Update: {
          apple_music_id?: string
          artwork_url?: string
          created_at?: string
          length?: number
          name?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_playlists_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      songs: {
        Row: {
          acousticness: number
          apple_music_id: string
          artist: string
          artwork_url: string
          danceability: number
          duration_ms: number
          energy: number
          instrumentalness: number
          liveness: number
          loudness: number
          speechiness: number
          speed_factor: number
          spotify_id: string
          tempo: number
          title: string
          valence: number
        }
        Insert: {
          acousticness: number
          apple_music_id: string
          artist: string
          artwork_url: string
          danceability: number
          duration_ms: number
          energy: number
          instrumentalness: number
          liveness: number
          loudness: number
          speechiness?: number
          speed_factor?: number
          spotify_id: string
          tempo: number
          title: string
          valence: number
        }
        Update: {
          acousticness?: number
          apple_music_id?: string
          artist?: string
          artwork_url?: string
          danceability?: number
          duration_ms?: number
          energy?: number
          instrumentalness?: number
          liveness?: number
          loudness?: number
          speechiness?: number
          speed_factor?: number
          spotify_id?: string
          tempo?: number
          title?: string
          valence?: number
        }
        Relationships: []
      }
      static_workout_intervals: {
        Row: {
          active: number
          id: number
          intensity_id: number | null
          label: string
          rest: number
        }
        Insert: {
          active: number
          id?: number
          intensity_id?: number | null
          label: string
          rest: number
        }
        Update: {
          active?: number
          id?: number
          intensity_id?: number | null
          label?: string
          rest?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_static_workout_intervals_tempo_fkey"
            columns: ["intensity_id"]
            isOneToOne: false
            referencedRelation: "workout_intensities"
            referencedColumns: ["id"]
          }
        ]
      }
      user_settings: {
        Row: {
          auto_mix: number | null
          bpm_normalization: number | null
          created_at: string
          crossfade: number | null
          data_saver: boolean | null
          explicit_content: boolean | null
          high_bpm_warning: boolean | null
          id: string
        }
        Insert: {
          auto_mix?: number | null
          bpm_normalization?: number | null
          created_at?: string
          crossfade?: number | null
          data_saver?: boolean | null
          explicit_content?: boolean | null
          high_bpm_warning?: boolean | null
          id: string
        }
        Update: {
          auto_mix?: number | null
          bpm_normalization?: number | null
          created_at?: string
          crossfade?: number | null
          data_saver?: boolean | null
          explicit_content?: boolean | null
          high_bpm_warning?: boolean | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_user_settings_user_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          age: number | null
          created_at: string
          daily_calories: number | null
          daily_distance: number | null
          daily_duration: number | null
          email: string | null
          first_name: string | null
          height: number | null
          last_name: string | null
          monthly_calories: number | null
          monthly_distance: number | null
          monthly_duration: number | null
          monthly_workouts: number | null
          phone_number: string | null
          user_id: string
          username: string | null
          weight: number | null
        }
        Insert: {
          age?: number | null
          created_at?: string
          daily_calories?: number | null
          daily_distance?: number | null
          daily_duration?: number | null
          email?: string | null
          first_name?: string | null
          height?: number | null
          last_name?: string | null
          monthly_calories?: number | null
          monthly_distance?: number | null
          monthly_duration?: number | null
          monthly_workouts?: number | null
          phone_number?: string | null
          user_id: string
          username?: string | null
          weight?: number | null
        }
        Update: {
          age?: number | null
          created_at?: string
          daily_calories?: number | null
          daily_distance?: number | null
          daily_duration?: number | null
          email?: string | null
          first_name?: string | null
          height?: number | null
          last_name?: string | null
          monthly_calories?: number | null
          monthly_distance?: number | null
          monthly_duration?: number | null
          monthly_workouts?: number | null
          phone_number?: string | null
          user_id?: string
          username?: string | null
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      workout_intensities: {
        Row: {
          bpm_lower_threshold: number
          bpm_upper_threshold: number
          id: number
          label: string
          tempo: number
        }
        Insert: {
          bpm_lower_threshold: number
          bpm_upper_threshold: number
          id?: number
          label: string
          tempo: number
        }
        Update: {
          bpm_lower_threshold?: number
          bpm_upper_threshold?: number
          id?: number
          label?: string
          tempo?: number
        }
        Relationships: []
      }
      workout_intervals: {
        Row: {
          active: number
          created_at: string
          id: string
          index: number
          intensity_id: number
          label: string
          rest: number
          template_id: string
        }
        Insert: {
          active: number
          created_at?: string
          id?: string
          index: number
          intensity_id: number
          label: string
          rest: number
          template_id?: string
        }
        Update: {
          active?: number
          created_at?: string
          id?: string
          index?: number
          intensity_id?: number
          label?: string
          rest?: number
          template_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_workout_template_dup_intensity_id_fkey"
            columns: ["intensity_id"]
            isOneToOne: false
            referencedRelation: "workout_intensities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_workout_template_dup_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "workout_templates"
            referencedColumns: ["id"]
          }
        ]
      }
      workout_templates: {
        Row: {
          created_at: string
          description: string
          expected_distance: number
          expected_duration: number
          id: string
          interval_ids: string[]
          last_completed: string | null
          name: string
          num_sets: number
          playlist_id: string | null
          type: Database["public"]["Enums"]["workout_type"]
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description: string
          expected_distance: number
          expected_duration: number
          id?: string
          interval_ids: string[]
          last_completed?: string | null
          name: string
          num_sets: number
          playlist_id?: string | null
          type: Database["public"]["Enums"]["workout_type"]
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string
          expected_distance?: number
          expected_duration?: number
          id?: string
          interval_ids?: string[]
          last_completed?: string | null
          name?: string
          num_sets?: number
          playlist_id?: string | null
          type?: Database["public"]["Enums"]["workout_type"]
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_workout_templates_playlist_id_fkey"
            columns: ["playlist_id"]
            isOneToOne: false
            referencedRelation: "playlists"
            referencedColumns: ["apple_music_id"]
          },
          {
            foreignKeyName: "public_workout_templates_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      workouts: {
        Row: {
          average_heart_rate: number | null
          created_at: string
          is_paused: boolean
          paused_at: string | null
          playlist_id: string | null
          status: Database["public"]["Enums"]["workout_status"]
          template_id: string
          time_end: string | null
          time_start: string | null
          total_distance: number
          total_duration: number
          total_elevation_change: number
          total_energy_burned: number
          training_intervals: string | null
          user_id: string | null
          workout_id: string
          workout_name: string
          workout_type: Database["public"]["Enums"]["workout_type"]
        }
        Insert: {
          average_heart_rate?: number | null
          created_at?: string
          is_paused?: boolean
          paused_at?: string | null
          playlist_id?: string | null
          status: Database["public"]["Enums"]["workout_status"]
          template_id: string
          time_end?: string | null
          time_start?: string | null
          total_distance?: number
          total_duration?: number
          total_elevation_change?: number
          total_energy_burned?: number
          training_intervals?: string | null
          user_id?: string | null
          workout_id?: string
          workout_name: string
          workout_type: Database["public"]["Enums"]["workout_type"]
        }
        Update: {
          average_heart_rate?: number | null
          created_at?: string
          is_paused?: boolean
          paused_at?: string | null
          playlist_id?: string | null
          status?: Database["public"]["Enums"]["workout_status"]
          template_id?: string
          time_end?: string | null
          time_start?: string | null
          total_distance?: number
          total_duration?: number
          total_elevation_change?: number
          total_energy_burned?: number
          training_intervals?: string | null
          user_id?: string | null
          workout_id?: string
          workout_name?: string
          workout_type?: Database["public"]["Enums"]["workout_type"]
        }
        Relationships: [
          {
            foreignKeyName: "public_workouts_playlist_id_fkey"
            columns: ["playlist_id"]
            isOneToOne: false
            referencedRelation: "playlists"
            referencedColumns: ["apple_music_id"]
          },
          {
            foreignKeyName: "public_workouts_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "workout_templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_workouts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      workout_status: "PAUSED" | "IN_PROGRESS" | "COMPLETED"
      workout_type: "Biking" | "Running" | "Walking" | "HIIT"
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
