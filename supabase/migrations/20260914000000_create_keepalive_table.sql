-- Dedicated table for the "keep Supabase alive" GitHub Action
-- (.github/workflows/keep-supabase-alive.yml).
--
-- Lesson learned on the Reverie Revival project: a read-only SELECT via the
-- anon key, even run daily with a clean HTTP 200 every time, did NOT count
-- as "activity" against Supabase's free-tier auto-pause metric -- the
-- warning email still showed up. A write (INSERT/UPDATE) does count.
--
-- This table exists purely so the keepalive job has something to write to.
-- RLS is enabled with zero policies, which denies every role except one
-- that bypasses RLS (service_role). Only the keepalive workflow -- using
-- the service_role key, never the anon key checked into the app -- can
-- touch this table.

create table code_school.keepalive (
  id int primary key,
  pinged_at timestamptz not null default now()
);

alter table code_school.keepalive enable row level security;
-- Deliberately no policies: RLS-on-with-no-policies + no grant to
-- anon/authenticated below means the browser app can never see or touch
-- this table, even though it lives in the same schema as everything else.

-- RLS blocks rows, but service_role still needs an explicit Postgres-level
-- GRANT to touch the table at all -- bypassing RLS and having a GRANT are
-- two different permission systems. Without this the workflow gets a 403 /
-- 42501 "permission denied for table" on its first run.
grant usage on schema code_school to service_role;
grant select, insert, update on code_school.keepalive to service_role;
