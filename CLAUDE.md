# Code School

A free, browser-based Python learning app, built by James and his sons as a homeschool + family coding project. Runs on any device (Mac, iPad) with zero recurring cost.

## Why this exists

A hands-on way for James and his sons to build something together as a family and homeschooling project, while giving the boys a real, guided path into Python: short lesson, write code, run it, see output, repeat. Building it themselves means it can be shaped exactly around how the boys learn best, and the boys get to see how a real project comes together along the way. Starting with Python only; JavaScript may follow later using the same architecture. No other languages, subjects, or multi-file "real project" tooling are in scope for v1 — see "Explicitly out of scope" below.

## Who this is for

- Primary learner: a total beginner, no prior coding experience.
- A second child will also use this app; progress must be tracked separately per kid.
- Pace is intentionally slow and low-pressure. No fixed daily/weekly schedule — chapter length (not a calendar) is the pacing mechanism. A chapter should be completable in roughly one sitting (20–45 min).

## Core design principle

**Lesson → Practice → Project → Parent gate.**

- **Lesson**: a short explanation of one small idea (a few paragraphs max, one concept only).
- **Practice**: a tiny code exercise right after the lesson (write 2–3 lines, run it, get instant automatic feedback on whether it worked). This is the repeated rep — happens after every lesson, not just at the end of a chapter.
- **Project** (only at 4 checkpoint chapters, not every chapter): a bigger "put it together" exercise that deliberately pulls in concepts from the *current* chapter **and** all prior chapters — not just the newest material. This is what makes the course cascade instead of just being a list of disconnected topics.
- **Parent gate**: projects are NOT auto-graded. The kid shows the parent the finished project; the parent manually marks the chapter complete and unlocks the next one in the app. The app should make this a simple, obvious action for a parent to take (not hidden in a menu).

Practice exercises ARE auto-checked (simple output/behavior matching) so the kid gets an immediate "yep, that worked!" without waiting on a parent. Projects are NOT auto-checked — deliberately, because grading a real project well is a hard problem not worth solving for v1, and parent review is actually the better mechanism here anyway.

## Chapter outline (15 chapters)

Each chapter = 4–8 short lessons, each with a practice exercise. Projects appear only at chapters 4, 8, 11, and 15.

1. **Hello, Python** — print(), what even is code, running your first program
2. **Variables** — storing values, naming things, string vs. number
3. **Strings & Comments** — concatenation, f-strings, basic string methods (`.upper()`, `len()`), using `#` comments to leave notes; include a short "how to read an error message without panicking" lesson here
4. **Numbers & Math** — arithmetic operators, order of operations, `int` vs `float`
   → **Project: Mad Libs** (uses variables, strings, string formatting, print — everything so far)
5. **Getting Input** — `input()`, combining it with variables (brief recap of ch. 1–4 concepts at the start)
6. **Comparisons & Booleans** — `==`, `<`, `>`, `True`/`False`
7. **Making Decisions I** — `if` / `else`
8. **Making Decisions II** — `elif`, combining conditions with `and` / `or`
   → **Project: Guess the Number** or simple quiz (uses decisions + input + variables + strings)
9. **Lists** — creating, indexing, appending (brief recap of ch. 5–8 at the start)
10. **Looping I** — `for` loops, looping over lists
11. **Looping II** — `while` loops, `break` / `continue`
    → **Project: Times-table generator or pattern printer** (uses loops + lists + decisions + input)
12. **Functions I** — defining functions, parameters (brief recap of ch. 9–11 at the start)
13. **Functions II** — return values, why functions matter
    → mini-checkpoint: calculator built from functions for each operation (not necessarily a full parent-gated project — can fold into ch. 13's practice)
14. **Dictionaries** — key/value basics
15. **Putting It Together** — combining lists, loops, functions, dictionaries
    → **Capstone Project: text-based dice game or simple adventure** (uses everything from the whole course)

Reference material: include a simple, always-accessible cheat sheet / glossary (not a chapter — a sidebar or reference page) so the kid can look up "what's an f-string again?" without digging back through old chapters.

## Explicitly out of scope for v1

- Other subjects (math, history, geography, etc.) — a different interaction model entirely, not being built now.
- Languages other than Python for v1. JavaScript may be added later using the same lesson engine, since it runs natively in-browser.
- Multi-file projects, file trees, imports between files, "how real projects are structured," README/documentation lessons. The goal of this course is to get the learner to the point where they can build a real project *with a parent's help* afterward — not to simulate that inside the app.
- Autograding of projects. Parent review only.

## Architecture

- **Python execution**: [Pyodide](https://pyodide.org/) (CPython compiled to WebAssembly) running entirely client-side in the browser. No server, no per-execution cost, works offline after first load/cache.
- **Hosting**: GitHub Pages (free), so the app works identically on the Mac and the iPad from day one — any device with a browser.
- **Progress storage**: Supabase.
  - Org: James's existing personal `beja0502` org (same org that already hosts the separate, isolated `Forge Anchor` production project — this is org-level account grouping, not a shared database; kept separate from `Reverie Revival`, which lives under the business email on its own island).
  - A dedicated Supabase **Project** named `family_hub` — the second of the org's two free-tier project slots (Forge Anchor uses the first) — using a dedicated schema: `code_school` (named to match the GitHub repo; originally created as `python_learning`, renamed via [migration](supabase/migrations/20260718022409_rename_python_learning_to_code_school.sql)).
  - `family_hub` is also expected to eventually host a `meridian_almanac` schema for a separate personal project — both stay small enough to comfortably share one free-tier project.
- **Profiles**: a simple picker on launch — each kid selects their name/avatar. No real auth; an optional 4-digit PIN per profile (plain text, parent-recoverable) is purely a UX nicety to stop a sibling tapping the wrong name, not a security boundary.
- **Row Level Security**: RLS is enabled on the `code_school` schema, but deliberately permissive (no per-profile enforcement) — this is a private, low-stakes family app, and James doesn't need his sons' profiles genuinely isolated from each other. See [docs/decisions/0003-profiles-rls.md](docs/decisions/0003-profiles-rls.md) for the full reasoning and what would change if that ever stopped being true.

### Data model (`code_school` schema — see [migrations](supabase/migrations/))

- `profiles`: id, display_name, avatar_color, pin (plain text, optional), created_at
- `progress`: profile_id, chapter_number, lesson_number, completed_at, parent_approved_at (for chapter-project checkpoints), created_at

### Known low-stakes gotcha

Free Supabase projects auto-pause after 7 days with no database activity. Not a bug — just means if the app isn't opened for a week+, the first load afterward will fail until James manually resumes the project from the Supabase dashboard.

## Naming note

"Code School" was previously a real company (acquired by Pluralsight) and is close to the name of an active kids'-coding franchise, theCoderSchool. Not a concern for a private, personal-use repo. Worth revisiting if this ever becomes a public-facing product.
