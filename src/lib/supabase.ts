import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types based on the schema
export interface Profile {
  id: string;
  username: string;
  email?: string;
  age?: number;
  age_group?: string;
  avatar?: string;
  coins?: number;
  stars?: number;
  level?: 'Beginner' | 'Explorer' | 'Genius';
  is_admin?: boolean;
  status?: 'active' | 'inactive' | 'suspended';
  created_at?: string;
  updated_at?: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  emoji: string;
  why_read: string;
  amazon_url?: string;
  age_range?: string;
  reading_time?: string;
  is_active?: boolean;
  created_at?: string;
}