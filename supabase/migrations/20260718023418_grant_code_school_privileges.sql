-- PostgREST (Supabase's Data API) requires explicit schema/table GRANTs on
-- top of RLS policies for any non-public schema -- RLS only filters rows,
-- it doesn't grant access to the schema/table in the first place. The
-- public schema comes pre-granted by Supabase; custom schemas like
-- code_school do not.

grant usage on schema code_school to anon, authenticated;
grant all on all tables in schema code_school to anon, authenticated;
alter default privileges in schema code_school grant all on tables to anon, authenticated;
