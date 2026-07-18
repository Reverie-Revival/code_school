# 0001 — Core architecture: Pyodide + GitHub Pages + Supabase

## Status
Accepted (2026-07-17)

## Context
Code School needs to let two kids write and run real Python in a browser, on either a Mac or an iPad, at **$0 recurring cost** — that's a hard constraint, not a preference. It also needs to remember each kid's progress separately, without a real login system (the learners are children, not accounts to secure).

The original spark: James's sons were partway through a paid coding-education site's Python track when it hit a paywall. Rather than pay monthly for the rest, James is building a private, from-scratch replacement — same "learn Python in small steps" spirit, none of the same code, content, or branding.

## Decision
- **Python execution: [Pyodide](https://pyodide.org/)** — CPython compiled to WebAssembly, running entirely client-side in the browser. No server means no per-run cost and no server to maintain. Downloads the interpreter + stdlib once (~10-20MB), then caches for fast repeat visits. Works offline after first load.
- **Hosting: GitHub Pages** — free static hosting, same URL works identically on the Mac and the iPads. No build/deploy infrastructure to run ourselves.
- **Progress storage: Supabase**, free tier — a *new* project inside a *new* `family_projects` org under James's personal Gmail (separate from the `Forge Anchor` org, which is an isolated production app, and separate from `Reverie Revival`, which lives under the business email). One Supabase project, a dedicated `python_learning` schema. This same `family_projects` umbrella is expected to also eventually host a `meridian_almanac` schema for a separate personal project — both are expected to stay small enough to share one free-tier project comfortably.
- **Auth: none.** A simple profile picker (name/avatar) on launch distinguishes the two kids' progress records. Basic Row Level Security on `python_learning` prevents one kid's browser session from reading/writing the other's rows, even without real authentication — defense against accidental cross-writes, not a real security boundary.

## Alternatives considered
- **Server-side Python execution (e.g. a small Flask/FastAPI sandbox)** — rejected: needs a server, which means either recurring hosting cost or a cold-start free-tier service that's unreliable for kids waiting on output. Pyodide's client-side model is free and instant after first load.
- **Local-only storage (localStorage/IndexedDB, no backend)** — considered, rejected: doesn't survive switching between the Mac and an iPad, and doesn't cleanly separate two kids' progress on a shared device. Supabase's free tier costs nothing and solves both.
- **Firebase instead of Supabase** — not seriously explored; James already operates Supabase for another project (Forge Anchor) and knows the tooling, so reusing that expertise (in a fully separate project/org) was the lower-friction choice.

## Consequences
- Free Supabase projects auto-pause after 7 days of no database activity. Not a bug — if the app goes unopened for a week+, the first load afterward will fail until James manually resumes the project from the Supabase dashboard. Documented here so it isn't mistaken for a real outage later.
- Every future dependency/tool choice for this project should be checked against the $0 constraint before adoption.
