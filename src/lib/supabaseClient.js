// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://zuwuwwfxmbomhuluhxim.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1d3V3d2Z4bWJvbWh1bHVoeGltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2Nzc3MDMsImV4cCI6MjA3MDI1MzcwM30.bR94CwwYWtyG3uUAlUtfSsRvbn46SnK7fzy_sIpv90k"

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('[supabase] variáveis de ambiente ausentes. Certifique-se de que SUPABASE_URL e SUPABASE_ANON_KEY estejam definidos.')
}

export const supabase = createClient(SUPABASE_URL || '', SUPABASE_ANON_KEY || '')