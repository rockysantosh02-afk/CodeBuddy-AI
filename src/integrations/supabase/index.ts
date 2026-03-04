import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];
