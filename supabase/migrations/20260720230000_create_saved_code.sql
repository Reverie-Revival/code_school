-- Persist each kid's in-progress code per lesson/project, so navigating away
-- and back shows what they last had in the editor instead of resetting to
-- the lesson's starter code. This is separate from `progress` (which tracks
-- completion) -- passing a practice check is not required to save code, and
-- saving code does not mark anything complete.
--
-- lesson_number is null for a chapter-level Project's saved code, mirroring
-- the same convention already used by `progress`.

create table code_school.saved_code (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references code_school.profiles(id) on delete cascade,
  chapter_number int not null,
  lesson_number int, -- null for a chapter-level Project's saved code
  code text not null,
  updated_at timestamptz not null default now(),
  unique (profile_id, chapter_number, lesson_number)
);

alter table code_school.saved_code enable row level security;

create policy "saved_code is readable and writable by anyone (family app, no real auth)"
  on code_school.saved_code
  for all
  to anon, authenticated
  using (true)
  with check (true);
