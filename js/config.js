// Supabase project connection info. The anon key is designed to be public —
// it's meant to be embedded in client-side code like this. Real access
// control is RLS (see supabase/migrations/ and docs/decisions/0003-profiles-rls.md),
// not secrecy of this key. The database password (a real secret) lives only
// in the git-ignored .env, never here.

export const SUPABASE_URL = "https://dpwbqfrwmlvqkfkcvfuy.supabase.co";
export const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwd2JxZnJ3bWx2cWtma2N2ZnV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQzMjM5NDcsImV4cCI6MjA5OTg5OTk0N30.w1SOLAWiOpkp_j3Xggc5fxx3otwj6U_2idmb3cr9yXc";

export const supabaseClient = window.supabase
  .createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  .schema("code_school");
