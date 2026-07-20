---
name: project-close
description: Close-of-session ritual for Code School, fires on James's phrase trigger
metadata:
  type: project
---

When James signals the session is ending ("let's end the session," "let's close it out," or equivalent):

1. File any concrete follow-ups discovered this session in `memory/project_ideas.md` — **not** GitHub Issues, per [[project-workflow]]'s correction of this step.
2. Rewrite HANDOFF.md with what was actually done, what was discovered, any blockers, and a real (not placeholder) Next Up list.
3. Run `/housekeeping` for a code/docs/memory tidy pass.
4. Sync memory files — update any that changed (stack decisions, scope changes, new safety considerations), keep MEMORY.md's index accurate and under ~150 lines.
5. Commit and push.

No Build Journal step — this project skipped Google Drive integration (kept lightweight per [[project-core]]).

**Why:** Mirrors the standard Reverie Revival close ritual, minus the Drive/Build Journal step this project doesn't use.

**How to apply:** Only fires on explicit signal from James, never automatically — a session isn't over until he says so.
