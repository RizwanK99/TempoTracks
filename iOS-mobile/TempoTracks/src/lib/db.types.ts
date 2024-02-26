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
      demo_users: {
        Row: {
          first_name: string | null
          height: number | null
          last_name: string | null
          user_id: string
          "username ": string | null
          weight: number | null
        }
        Insert: {
          first_name?: string | null
          height?: number | null
          last_name?: string | null
          user_id: string
          "username "?: string | null
          weight?: number | null
        }
        Update: {
          first_name?: string | null
          height?: number | null
          last_name?: string | null
          user_id?: string
          "username "?: string | null
          weight?: number | null
        }
        Relationships: []
      }
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
        }
        Insert: {
          apple_music_id?: string
          artwork_url: string
          created_at?: string
          length: number
          name: string
        }
        Update: {
          apple_music_id?: string
          artwork_url?: string
          created_at?: string
          length?: number
          name?: string
        }
        Relationships: []
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
          password_hash: string | null
          password_salt: string | null
          phone_number: string | null
          user_id: number
          username: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          last_name?: string | null
          password_hash?: string | null
          password_salt?: string | null
          phone_number?: string | null
          user_id?: number
          username?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          last_name?: string | null
          password_hash?: string | null
          password_salt?: string | null
          phone_number?: string | null
          user_id?: number
          username?: string | null
        }
        Relationships: []
      }
      workout_intervals: {
        Row: {
          active: number | null
          created_at: string
          id: number
          label: string | null
          rest: number | null
        }
        Insert: {
          active?: number | null
          created_at?: string
          id?: number
          label?: string | null
          rest?: number | null
        }
        Update: {
          active?: number | null
          created_at?: string
          id?: number
          label?: string | null
          rest?: number | null
        }
        Relationships: []
      }
      workout_templates: {
        Row: {
          created_at: string
          description: string | null
          expected_distance: number | null
          expected_duration: number | null
          id: string
          interval_ids: string[] | null
          last_completed: string | null
          name: string
          num_sets: number | null
          playlist_id: string | null
          type: Database["public"]["Enums"]["workout_type"] | null
          user_id: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          expected_distance?: number | null
          expected_duration?: number | null
          id?: string
          interval_ids?: string[] | null
          last_completed?: string | null
          name: string
          num_sets?: number | null
          playlist_id?: string | null
          type?: Database["public"]["Enums"]["workout_type"] | null
          user_id?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          expected_distance?: number | null
          expected_duration?: number | null
          id?: string
          interval_ids?: string[] | null
          last_completed?: string | null
          name?: string
          num_sets?: number | null
          playlist_id?: string | null
          type?: Database["public"]["Enums"]["workout_type"] | null
          user_id?: number | null
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
            foreignKeyName: "workout_templates_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          }
        ]
      }
      workouts: {
        Row: {
          created_at: string | null
          is_paused: boolean
          paused_at: string | null
          playlist_id: string | null
          status: Database["public"]["Enums"]["workout_status"] | null
          template_id: string
          time_end: string | null
          time_start: string | null
          total_distance: number | null
          total_duration: number | null
          total_elevation_change: number | null
          total_energy_burned: number | null
          training_intervals: string | null
          user_id: number | null
          workout_id: string
          workout_name: string | null
          workout_type: Database["public"]["Enums"]["workout_type"] | null
        }
        Insert: {
          created_at?: string | null
          is_paused?: boolean
          paused_at?: string | null
          playlist_id?: string | null
          status?: Database["public"]["Enums"]["workout_status"] | null
          template_id: string
          time_end?: string | null
          time_start?: string | null
          total_distance?: number | null
          total_duration?: number | null
          total_elevation_change?: number | null
          total_energy_burned?: number | null
          training_intervals?: string | null
          user_id?: number | null
          workout_id?: string
          workout_name?: string | null
          workout_type?: Database["public"]["Enums"]["workout_type"] | null
        }
        Update: {
          created_at?: string | null
          is_paused?: boolean
          paused_at?: string | null
          playlist_id?: string | null
          status?: Database["public"]["Enums"]["workout_status"] | null
          template_id?: string
          time_end?: string | null
          time_start?: string | null
          total_distance?: number | null
          total_duration?: number | null
          total_elevation_change?: number | null
          total_energy_burned?: number | null
          training_intervals?: string | null
          user_id?: number | null
          workout_id?: string
          workout_name?: string | null
          workout_type?: Database["public"]["Enums"]["workout_type"] | null
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
