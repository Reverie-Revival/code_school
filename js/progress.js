import { supabaseClient } from "./config.js";

export async function fetchProgress(profileId, chapterNumber) {
  const { data, error } = await supabaseClient
    .from("progress")
    .select("*")
    .eq("profile_id", profileId)
    .eq("chapter_number", chapterNumber);
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
