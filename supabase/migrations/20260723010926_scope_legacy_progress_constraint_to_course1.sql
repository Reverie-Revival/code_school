-- The previous migration kept the old 3-column unique constraint
-- (profile_id, chapter_number, lesson_number) alongside the new course-aware
-- one, so the (still-deployed) old app.js wouldn't need to change in lockstep
-- with this schema change. That backfires the moment a profile has progress
-- in *two* courses that happen to share a chapter/lesson number (e.g.
-- Course 1 chapter 1 lesson 1 and Course 2 chapter 1 lesson 1) -- the old
-- constraint doesn't know about course_id, so it sees those as the same row
-- and rejects the second insert outright, even though the new 4-column
-- constraint has no problem with it.
--
-- Fix: replace the blanket old constraint with a *partial* unique index that
-- only applies to course_id = 'python-1' rows. Old app.js never sets
-- course_id (it doesn't know the column exists), so every row it writes
-- defaults to 'python-1' and is still covered -- its ON CONFLICT target
-- (profile_id, chapter_number, lesson_number) still resolves against this
-- index exactly as before. Rows in any other course are no longer
-- constrained by it at all.

alter table code_school.progress drop constraint progress_profile_id_chapter_number_lesson_number_key;
create unique index progress_profile_id_chapter_number_lesson_number_course1_idx
  on code_school.progress (profile_id, chapter_number, lesson_number)
  where course_id = 'python-1';

alter table code_school.saved_code drop constraint saved_code_profile_id_chapter_number_lesson_number_key;
create unique index saved_code_profile_id_chapter_number_lesson_number_course1_idx
  on code_school.saved_code (profile_id, chapter_number, lesson_number)
  where course_id = 'python-1';
