---
name: project-core
description: Code School stack, scope, repo details, current phase, and next steps
metadata:
  type: project
---

Code School is a free, browser-based Python learning app for James's two sons, built as a homeschool/family project. It is its own original design — do not describe or reference it as similar to/styled after any other named coding-education product, even if some design/functionality ideas are informally inspired by things James has seen elsewhere.

**Budget:** $0. Every tool/service choice must have a free tier that fully covers this project's scale (GitHub Pages, Pyodide, Supabase free tier). Flag anything that risks incurring cost before adopting it.

**Stack:** Pyodide (client-side Python execution in-browser, WASM) + GitHub Pages hosting (free, works identically on Mac/iPad) + Supabase for progress storage (new `family_projects` org under James's personal Gmail, `python_learning` schema, basic RLS so kid profiles can't read/write each other's rows).

**Repo:** private, `Reverie-Revival/code_school` on GitHub, cloned to `~/Documents/code_school`.

**Scope (v1):** Python only, 15 chapters, Lesson → Practice → Project → Parent gate rhythm. Projects (not-auto-graded, parent reviews) only at chapters 4, 8, 11, 15. Full course outline lives in [CLAUDE.md](../CLAUDE.md) — treat that as the source of truth for curriculum content, this file is for build/process state only.

**Current phase:** Chapter 1 (Lessons 1.1–1.2) working end-to-end in the browser — lesson content, Pyodide code execution, and practice auto-check all verified. Supabase/progress-persistence and the profile picker are not built yet. See [HANDOFF.md](../HANDOFF.md) for exact next steps.

**Why:** A way for James and his sons to build something together while giving them a real guided path into Python — not just a tool being handed to them.

**How to apply:** Any scope question ("should we add X subject/language/feature") should be checked against CLAUDE.md's "Explicitly out of scope for v1" list before agreeing to add it. JS support later is explicitly anticipated (same lesson engine) — not a scope violation if it comes up post-v1. See [[user-team]] for working-pace preferences.
