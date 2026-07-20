---
name: feedback-claude-md-staleness
description: Cross-check CLAUDE.md's original wording against later, more specific feedback before implementing a "core design principle"
metadata:
  type: feedback
---

Before implementing something CLAUDE.md describes as a core design principle, check `memory/project_ideas.md` and `memory/user_team.md` for later feedback that might have superseded it. CLAUDE.md is the source of truth for *current* build/process state, but it isn't automatically re-synced the moment James gives new feedback elsewhere — a memory file can be more current than CLAUDE.md's own wording on the same topic.

**Why:** Built the Project content type (2026-07-19) using CLAUDE.md's then-current "Parent gate" wording (parent manually marks a project complete) without cross-checking it against `project_ideas.md`'s more specific, later note from 2026-07-18: "James does NOT want a parent-gate blocking chapter-to-chapter progression." Those two directly contradicted each other, and the newer, more specific one should have won. Caught mid-session by re-reading memory during housekeeping, asked James directly, and reworked the feature — but it should have been caught before writing code, not after.

**How to apply:** When a design decision touches something CLAUDE.md already documents as settled, grep `memory/project_ideas.md` and any relevant feedback/project memories for the same topic before treating CLAUDE.md's wording as final. If they conflict, the more recent, more specific source wins — and CLAUDE.md should get updated to match once confirmed, per [[project-ideas]]'s own note about this ("this would also require updating CLAUDE.md... once confirmed").
