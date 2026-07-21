-- Lets a profile pick a simple emoji avatar instead of just a color swatch.
-- Nullable and optional: existing profiles (and anyone who skips picking
-- one) keep falling back to their display name's first letter, same as
-- today -- see main.js's renderAvatar().

alter table code_school.profiles add column avatar_emoji text;
