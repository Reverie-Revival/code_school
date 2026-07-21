import { supabaseClient } from "./config.js";

export const AVATAR_COLORS = ["#2e6f4e", "#2563eb", "#d97706", "#db2777", "#7c3aed", "#0891b2"];

// Optional -- a profile with no emoji falls back to its initial letter (see
// main.js's renderAvatar()).
export const AVATAR_EMOJIS = [
  "🦊", "🐱", "🐶", "🐰", "🦁", "🐼", "🐵", "🐸", "🦄", "🐙", "🦖", "🦈",
  "🚀", "⭐", "🎮", "🎨", "🍕", "🤖", "🏈",
];

export async function fetchProfiles() {
  const { data, error } = await supabaseClient.from("profiles").select("*").order("created_at");
  if (error) throw error;
  return data;
}

export async function createProfile({ displayName, avatarColor, avatarEmoji, pin }) {
  const { data, error } = await supabaseClient
    .from("profiles")
    .insert({
      display_name: displayName,
      avatar_color: avatarColor,
      avatar_emoji: avatarEmoji || null,
      pin: pin || null,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Cascades to that profile's progress and saved_code rows too (both
// reference profiles with `on delete cascade`).
export async function deleteProfile(id) {
  const { error } = await supabaseClient.from("profiles").delete().eq("id", id);
  if (error) throw error;
}

export async function updateProfile({ id, displayName, avatarColor, avatarEmoji, pin }) {
  const { data, error } = await supabaseClient
    .from("profiles")
    .update({
      display_name: displayName,
      avatar_color: avatarColor,
      avatar_emoji: avatarEmoji || null,
      pin: pin || null,
    })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}
