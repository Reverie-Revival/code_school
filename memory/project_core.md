---
name: project-core
description: Code School stack, scope, repo details, current phase, and next steps
metadata:
  type: project
---

Code School is a free, browser-based Python learning app for James's two sons, built as a homeschool/family project. It is its own original design — do not describe or reference it as similar to/styled after any other named coding-education product, even if some design/functionality ideas are informally inspired by things James has seen elsewhere.

**Critical — token transparency:** James cannot see what's happening during a long unbroken stretch of tool calls (tests, file edits, debugging, etc.) — he only sees text you write. Hard cutoff: **5,000 tokens** of tool-call activity without a user-facing text update is too long. Before crossing that, pause and tell him what you're doing and why (a sentence or two is enough) before continuing. This applies even mid-task — don't wait for a natural stopping point if the cutoff is reached first.

**Why:** James was surprised to find a single stretch had burned ~12k tokens with no visibility into what was happening.

**Budget:** $0. Every tool/service choice must have a free tier that fully covers this project's scale (GitHub Pages, Pyodide, Supabase free tier). Flag anything that risks incurring cost before adopting it.

**Stack:** Pyodide (client-side Python execution in-browser, WASM) + GitHub Pages hosting (free, works identically on Mac/iPad) + Supabase for progress storage. Supabase structure: James's existing personal `beja0502` org (same org as the separate, isolated `Forge Anchor` project — org-level grouping only, not a shared database), a dedicated **Project** named `family_hub` (the org's second free-tier project slot), with a `code_school` schema and basic RLS so kid profiles can't read/write each other's rows. `family_hub` is expected to also host a `meridian_almanac` schema later.

**Repo:** `Reverie-Revival/code_school` on GitHub, cloned to `~/Documents/code_school`. Made **public** on 2026-07-18 (was private) — required for free GitHub Pages hosting on the Free plan (private-repo Pages needs paid GitHub Pro, which breaks the $0 constraint). Git history was verified clean first (no secrets ever committed). Live at https://reverie-revival.github.io/code_school/.

**Scope (v1):** Python only, 15 chapters, Lesson → Practice → Project rhythm. Projects are assigned per-chapter (not a fixed 4/8/11/15 schedule — see [curriculum/python/outline.md](../curriculum/python/outline.md) for the current assignment), not auto-graded. Lesson-to-lesson progression gates on passing that lesson's practice check; a chapter's Project (once it has one) gates chapter-to-chapter progression on the kid's own "self check-in" — code has to run with no error, then the kid self-clicks "I showed someone!" (decided and built 2026-07-19, see CLAUDE.md's "Self check-in" principle). No parent action is required in the app — James was explicit he doesn't want a parent gate blocking chapter-to-chapter progression. Full course outline lives in [CLAUDE.md](../CLAUDE.md) — treat that as the source of truth for build/process state; [curriculum/python/outline.md](../curriculum/python/outline.md) is the source of truth for the actual curriculum content.

**Current phase:** Chapters 1–2 content-complete and working end-to-end in the browser — lesson rendering, Pyodide code execution, practice auto-check, Supabase progress persistence, the profile picker, multi-chapter navigation, and the Project content type (mechanism built, no chapter has real Project content yet) are all built and verified. Chapters 3–15 not started; Chapter 3 (Strings & Comments + Mad Libs project) is next and will be the first real exercise of the Project mechanism. See [HANDOFF.md](../HANDOFF.md) for exact next steps.

**Why:** A way for James and his sons to build something together while giving them a real guided path into Python — not just a tool being handed to them.

**How to apply:** Any scope question ("should we add X subject/language/feature") should be checked against CLAUDE.md's "Explicitly out of scope for v1" list before agreeing to add it. JS support later is explicitly anticipated (same lesson engine) — not a scope violation if it comes up post-v1. See [[user-team]] for working-pace preferences.
