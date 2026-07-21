import { supabaseClient } from "./config.js";

export async function fetchSavedCode(profileId) {
  const { data, error } = await supabaseClient
    .from("saved_code")
    .select("*")
    .eq("profile_id", profileId);
  if (error) throw error;
  return data;
}

// lessonNumber is null for a chapter's Project. Null can't dedupe via
// upsert's onConflict (Postgres never treats two NULLs as conflicting under
// a UNIQUE constraint), so that case is handled with a select-then-write,
// same pattern as progress.js's markProjectDone.
export async function saveCode({ profileId, chapterNumber, lessonNumber, code }) {
  if (lessonNumber !== null) {
    const { error } = await supabaseClient.from("saved_code").upsert(
      {
        profile_id: profileId,
        chapter_number: chapterNumber,
        lesson_number: lessonNumber,
        code,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "profile_id,chapter_number,lesson_number" }
    );
    if (error) throw error;
    return;
  }

  const { data: existing, error: selectError } = await supabaseClient
    .from("saved_code")
    .select("id")
    .eq("profile_id", profileId)
    .eq("chapter_number", chapterNumber)
    .is("lesson_number", null)
    .maybeSingle();
  if (selectError) throw selectError;

  if (existing) {
    const { error } = await supabaseClient
      .from("saved_code")
      .update({ code, updated_at: new Date().toISOString() })
      .eq("id", existing.id);
    if (error) throw error;
    return;
  }

  const { error } = await supabaseClient.from("saved_code").insert({
    profile_id: profileId,
    chapter_number: chapterNumber,
    lesson_number: null,
    code,
    updated_at: new Date().toISOString(),
  });
  if (error) throw error;
}
