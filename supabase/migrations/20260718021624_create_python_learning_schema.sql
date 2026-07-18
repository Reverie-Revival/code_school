-- Code School: python_learning schema
--
-- No real authentication. Profiles are a simple "which kid is this" picker,
-- optionally guarded by a plain-text PIN that's purely a UX nicety (keep a
-- sibling from tapping the wrong name) -- not a security boundary. RLS is
-- enabled on both tables but intentionally permissive: every policy is
-- USING (true), so the anon key (used directly by the browser app) has full
-- read/write access. This is a private, personal-use family app with no
-- sensitive data -- see docs/decisions/0001-architecture.md and
-- docs/decisions/0003-profiles-rls.md for the reasoning.

create schema if not exists python_learning;

create table python_learning.profiles (
  id uuid primary key default gen_random_uuid(),
  display_name text not null,
  avatar_color text not null default '#2e6f4e',
  pin text, -- plain text by design: recoverable by a parent, not a secret. Expect a 4-digit code (stored as text to preserve leading zeros); not enforced by a DB constraint.
  created_at timestamptz not null default now()
);

create table python_learning.progress (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references python_learning.profiles(id) on delete cascade,
  chapter_number int not null,
  lesson_number int, -- null for chapter-level project/checkpoint rows
  completed_at timestamptz,
  parent_approved_at timestamptz, -- set only for parent-gated project checkpoints
  created_at timestamptz not null default now(),
  unique (profile_id, chapter_number, lesson_number)
);

alter table python_learning.profiles enable row level security;
alter table python_learning.progress enable row level security;

create policy "profiles are readable and writable by anyone (family app, no real auth)"
  on python_learning.profiles
  for all
  to anon, authenticated
  using (true)
  with check (true);

create policy "progress is readable and writable by anyone (family app, no real auth)"
  on python_learning.progress
  for all
  to anon, authenticated
  using (true)
  with check (true);
