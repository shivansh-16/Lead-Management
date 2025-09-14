import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string;
          leadsource: string;
          createdat: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone: string;
          leadsource: string;
          createdat?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string;
          leadsource?: string;
          createdat?: string;
        };
      };
    };
  };
};