import { createClient } from '@supabase/supabase-js'

export const SUPABASE_URL = "https://zuwuwwfxmbomhuluhxim.supabase.co";
export const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1d3V3d2Z4bWJvbWh1bHVoeGltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2Nzc3MDMsImV4cCI6MjA3MDI1MzcwM30.bR94CwwYWtyG3uUAlUtfSsRvbn46SnK7fzy_sIpv90k";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);