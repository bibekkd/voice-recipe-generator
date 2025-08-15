import { createClient } from '@supabase/supabase-js';

// Get the anon key from your Supabase project
// Go to Project Settings > API > Project API keys
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types based on your schema
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: number;
          auth_user_id: string | null;
          username: string;
          email: string;
          password_hash: string;
          profile_picture: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          auth_user_id?: string | null;
          username: string;
          email: string;
          password_hash: string;
          profile_picture?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          auth_user_id?: string | null;
          username?: string;
          email?: string;
          password_hash?: string;
          profile_picture?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      recipes: {
        Row: {
          id: number;
          name: string;
          description: string | null;
          ingredients: string | null;
          steps: string | null;
          image_url: string | null;
          created_by_user_id: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          description?: string | null;
          ingredients?: string | null;
          steps?: string | null;
          image_url?: string | null;
          created_by_user_id?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          description?: string | null;
          ingredients?: string | null;
          steps?: string | null;
          image_url?: string | null;
          created_by_user_id?: number | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
