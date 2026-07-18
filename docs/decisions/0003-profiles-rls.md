# 0003 — Profile separation: permissive RLS + optional PIN, no real auth

## Status
Accepted (2026-07-18)

## Context
CLAUDE.md originally called for "basic RLS on the `code_school` schema so kid profiles can't read/write each other's progress rows, even though there's no real login system." Making that literally true requires *some* identity behind each browser session — the natural way to get one without a visible login step is Supabase's anonymous-auth feature, which silently creates a persistent per-device session and lets RLS policies check it.

When this tradeoff was explained, James's actual answer was simpler than what CLAUDE.md assumed: he doesn't need real database-level separation between his sons' profiles. He described it as "Mario save world"-style — multiple profiles are just a convenience, the boys aren't expected to mess with each other's saves, and if a PIN exists at all it's to stop a sibling from casually tapping the wrong name, not to secure anything. He also explicitly wants any PIN to be recoverable by him if a kid forgets it, ruling out a real hashed-password approach.

## Decision
- **RLS is enabled on both `code_school.profiles` and `code_school.progress`**, but every policy is `USING (true) WITH CHECK (true)` for the `anon`/`authenticated` roles — i.e. deliberately permissive. This is an explicit choice (documented here), not an oversight: the tables are protected by RLS in the sense that access is intentional and reviewable, but there is no per-profile enforcement at the database layer.
- **No Supabase auth of any kind** — no anonymous sessions, no accounts. The browser app talks to Supabase directly with the anon key, same as any other client-side call.
- **Optional 4-digit PIN per profile**, stored as plain text in `profiles.pin`. Enforcement (if any) happens entirely in the app's UI layer (asking for the PIN before switching into a profile) — it is not a security boundary and was never intended to be one. Plain text specifically so James can look it up and tell a kid their PIN if they forget it, rather than needing a reset flow.

## Alternatives considered
- **Anonymous-auth-backed RLS** (real per-profile enforcement via `auth.uid()`) — this was the initial recommendation, rejected once James clarified the actual stakes. It would have added real complexity (auth session lifecycle, linking `auth.users` rows to `profiles` rows, handling a lost/cleared session) to solve a problem James doesn't have. Revisit only if the "kids messing with each other's data" scenario ever becomes real.
- **Hashed PIN** — rejected: James explicitly wants PINs recoverable by him, which a proper hash doesn't allow without a reset flow. Given the PIN isn't protecting anything sensitive, the tradeoff isn't worth it here.

## Consequences
- Any client with the anon key (which is meant to be public/embedded in client-side code) can read or write any profile's rows. Acceptable because there is no sensitive data in this schema and the app has no other users besides James's own household.
- If this project's stakes ever change (e.g. broader use beyond the immediate family), this decision should be revisited — the permissive policy is a v1-scale choice, not a permanent architectural stance.
