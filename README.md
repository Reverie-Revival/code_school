# Code School

A free, browser-based Python learning app — built by James and his sons as a homeschool and family coding project.

It runs entirely client-side (Python via [Pyodide](https://pyodide.org/), compiled to WebAssembly) and is hosted on GitHub Pages, so it works identically on a Mac or an iPad with zero recurring cost. No installs, no per-execution server cost, works offline after the first load.

## How it works

Each chapter follows the same rhythm: **Lesson → Practice → Project → Parent gate.**

- **Lesson** — a short explanation of one small idea.
- **Practice** — a tiny code exercise right after, auto-checked for instant feedback.
- **Project** — at checkpoint chapters only (4, 8, 11, 15), a bigger exercise pulling together everything learned so far.
- **Parent gate** — projects aren't auto-graded. The kid shows the finished project to a parent, who marks the chapter complete and unlocks the next one.

15 chapters total, starting from `print()` and ending with a capstone project combining lists, loops, functions, and dictionaries. Progress is tracked separately per kid via lightweight profiles (no passwords) backed by Supabase.

## Current phase

Kickoff / pre-build. Course outline and architecture are defined in [CLAUDE.md](CLAUDE.md); implementation hasn't started yet.

## Scope

Python only for v1. JavaScript may follow later using the same lesson engine. No other subjects, no multi-file project tooling, no autograding — see [CLAUDE.md](CLAUDE.md) for the full rationale.

---

Private, personal-use project. Not affiliated with the unrelated companies/franchises that have used similar names.
