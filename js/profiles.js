import { supabaseClient } from "./config.js";

export const AVATAR_COLORS = ["#2e6f4e", "#2563eb", "#d97706", "#db2777", "#7c3aed", "#0891b2"];

export async function fetchProfiles() {
  const { data, error } = await supabaseClient.from("profiles").select("*").order("created_at");
  if (error) throw error;
  return data;
}

export async function createProfile({ displayName, avatarColor, pin }) {
  const { data, error } = await supabaseClient
    .from("profiles")
    .insert({ display_name: displayName, avatar_color: avatarColor, pin: pin || null })
    .select()
    .single();
  if (error) throw error;
  return data;
}
