import { supabaseClient } from "./config.js";

export async function fetchProgress(profileId) {
  const { data, error } = await supabaseClient
    .from("progress")
    .select("*")
    .eq("profile_id", profileId);
  if (error) throw error;
  return data;
}

export async function markLessonComplete({ profileId, chapterNumber, lessonNumber }) {
  const { data, error } = await supabaseClient
    .from("progress")
    .upsert(
      {
        profile_id: profileId,
        chapter_number: chapterNumber,
        lesson_number: lessonNumber,
        completed_at: new Date().toISOString(),
      },
      { onConflict: "profile_id,chapter_number,lesson_number" }
    )
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Project checkpoints use a null lesson_number (see the progress table's
// comment) — Postgres never treats two NULLs as conflicting under a UNIQUE
// constraint, so upsert's onConflict can't dedupe these rows. Check first
// instead, so a re-click doesn't insert duplicates.
//
// This is a kid self-click ("I showed someone!"), not a parent approval —
// parent_approved_at is intentionally left null. That column exists in the
// schema for a parent-gated flow, which this project deliberately doesn't
// use (see CLAUDE.md's "Parent gate" principle and project_ideas.md).
export async function markProjectDone({ profileId, chapterNumber }) {
  const { data: existing, error: selectError } = await supabaseClient
    .from("progress")
    .select("*")
    .eq("profile_id", profileId)
    .eq("chapter_number", chapterNumber)
    .is("lesson_number", null)
    .maybeSingle();
  if (selectError) throw selectError;
  if (existing) return existing;

  const { data, error } = await supabaseClient
    .from("progress")
    .insert({
      profile_id: profileId,
      chapter_number: chapterNumber,
      lesson_number: null,
      completed_at: new Date().toISOString(),
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}
