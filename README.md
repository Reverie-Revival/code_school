# Code School

A free, browser-based Python learning app — built by James and his sons as a homeschool and family coding project.

It runs entirely client-side (Python via [Pyodide](https://pyodide.org/), compiled to WebAssembly) and is hosted on GitHub Pages, so it works identically on a Mac or an iPad with zero recurring cost. No installs, no per-execution server cost, works offline after the first load.

## How it works

Each chapter follows the same rhythm: **Lesson → Practice → Project → Self check-in.**

- **Lesson** — a short explanation of one small idea.
- **Practice** — a tiny code exercise right after, auto-checked for instant feedback.
- **Project** — at select chapters (assigned based on whether there's enough material yet for something genuinely interesting, not a fixed schedule), a bigger exercise pulling together everything learned so far.
- **Self check-in** — projects aren't auto-graded, and there's no parent gate. Once the kid's code runs cleanly, they self-click "I showed someone!" after showing their work to someone, which unlocks the next chapter.

15 chapters total, starting from `print()` and ending with a capstone project combining lists, loops, functions, and dictionaries. Progress is tracked separately per kid via lightweight profiles (no passwords) backed by Supabase.

## Try it

**https://reverie-revival.github.io/code_school/**

## Current phase

Chapters 1–2 ("Hello, Python" and "Variables") are fully working end-to-end and live: profile picker, multi-chapter navigation, Pyodide code execution, practice auto-checking, and progress saved per profile to Supabase. Chapters 3–15 aren't built yet — see [CLAUDE.md](CLAUDE.md) for the full course outline and [HANDOFF.md](HANDOFF.md) (local only, not committed) for exact next steps.

## Scope

Python only for v1. JavaScript may follow later using the same lesson engine. No other subjects, no multi-file project tooling, no autograding — see [CLAUDE.md](CLAUDE.md) for the full rationale.

---

Personal, non-commercial family project. The repo is public only because free GitHub Pages hosting requires it — not affiliated with the unrelated companies/franchises that have used similar names.
