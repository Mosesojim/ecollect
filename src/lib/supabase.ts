import { createClient } from '@supabase/supabase-js';

// The user provided these in .env.example
const defaultUrl = 'https://vqhgifkupfkxenmqgiki.supabase.co';
const defaultKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxaGdpZmt1cGZreGVubXFnaWtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4OTQwMjEsImV4cCI6MjEwMDQ3MDAyMX0.5IcoKzhsvux1l4UnpW_hQ249-YUzJnvOQJHXjmQiW9A';

let rawUrl = import.meta.env.VITE_SUPABASE_URL || defaultUrl;
// Fix URL if user accidentally included /rest/v1/
const supabaseUrl = rawUrl.replace('/rest/v1/', '').replace('/rest/v1', '');
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || defaultKey;

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
