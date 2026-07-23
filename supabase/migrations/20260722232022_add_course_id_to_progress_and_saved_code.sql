-- Course tracks (see curriculum/python2/) mean chapter numbers are no longer
-- globally unique -- "Course 2, chapter 3" is not the same thing as
-- "Course 1, chapter 3". Add course_id so progress/saved_code rows are keyed
-- per-course, not just per-chapter. Default 'python-1' backfills every
-- existing row correctly, since all progress recorded so far *is* Course 1.
--
-- The old 3-column unique constraints are deliberately left in place rather
-- than dropped -- this app has no separate staging database, and the old
-- constraint still holds true for every existing row (all default to
-- course_id 'python-1', so there's no real duplicate risk under the looser
-- rule either). Keeping it means this migration is safe to apply the moment
-- it's written, with zero coordination against when the new course-aware
-- frontend code actually ships -- the currently-live app.js's upsert calls
-- keep matching the old constraint, completely unaffected. Drop
-- progress_profile_id_chapter_number_lesson_number_key and
-- saved_code_profile_id_chapter_number_lesson_number_key as cleanup once
-- this branch is merged and confirmed working.

alter table code_school.progress add column course_id text not null default 'python-1';
alter table code_school.progress
  add constraint progress_profile_id_course_id_chapter_number_lesson_number_key
  unique (profile_id, course_id, chapter_number, lesson_number);

alter table code_school.saved_code add column course_id text not null default 'python-1';
alter table code_school.saved_code
  add constraint saved_code_profile_id_course_id_chapter_number_lesson_number_key
  unique (profile_id, course_id, chapter_number, lesson_number);
