import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://zuwuwwfxmbomhuluhxim.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1d3V3d2Z4bWJvbWh1bHVoeGltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2Nzc3MDMsImV4cCI6MjA3MDI1MzcwM30.bR94CwwYWtyG3uUAlUtfSsRvbn46SnK7fzy_sIpv90k"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
