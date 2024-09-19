// src/lib/supabase.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js'

let supabase: SupabaseClient | undefined

if (typeof window !== 'undefined') {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables')
  }

  supabase = createClient(supabaseUrl, supabaseAnonKey)
}

export { supabase }