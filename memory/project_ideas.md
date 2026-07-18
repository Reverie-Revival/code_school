---
name: project-ideas
description: Code School's lightweight backlog of ideas/improvements — replaces GitHub Issues for this project, re-ordered and worked as James chooses
metadata:
  type: project
---

James's chosen process for this project (see [[project-workflow]]): no GitHub Issues, just this running list. Ideas get added here as they come up, re-ordered/picked up whenever.

**How to apply:** When James wants to work on something, check here first for context before starting. When a new idea comes up mid-session, add it here rather than just fixing it inline (unless it's small enough to just do). When something is built, move it to **Built, awaiting James's QA** — do NOT remove it yet, even if it's been tested end-to-end in an automated browser test. Only remove an item once James has personally tried it himself and confirmed it's good. Automated verification proves it works; it doesn't substitute for James's own sign-off before something leaves the list.

**Every time one or more items move into "Built, awaiting James's QA," give James an explicit checklist of what to click and what he should see** — not just "done, go check it out." One line per item: where to go, what to do, what the expected result is. Don't make him rediscover what needs testing by reading this file or guessing.

## Open ideas

1. **Actual chapter-to-chapter switching still needed.** The header dropdown now groups lessons under a "Chapter 1: Hello, Python" heading (shipped 2026-07-18), but there's still only one chapter to group — the app doesn't know about Chapter 2+ yet (hardcoded `chapter1.js` import in `js/app.js`). Needs a real chapter list/switcher once Chapter 2 exists, including whether finishing Chapter 1's Project should auto-unlock Chapter 2 or require something else.

2. **A more developed, consistent lesson template.** Current lessons (1.1, 1.2) are pretty minimal. James wants something a bit more in-depth, with the same or similar shape lesson-to-lesson. Open question to design: what should that template actually include? (e.g. more example code, a "try it yourself" prompt distinct from the graded practice, common-mistakes callouts, a short recap — needs a real answer, not just more prose.)

3. **Chapter-end Project verification — candidate direction proposed, not yet decided.** James does NOT want a parent-gate blocking chapter-to-chapter progression. AI-based grading was considered and ruled out (2026-07-18) — it would mean real per-request API cost, breaking the $0 budget constraint and requiring a whole new backend/API-key architecture. Leading candidate instead: auto-check just means "the code ran without erroring" (reuse the existing Errors panel — cheap, already built), then a self-click "I showed someone!" button (kid-driven, no parent action required in the app) unlocks the next chapter. Matches CLAUDE.md's own original reasoning that grading a project's correctness well isn't worth solving for v1. **Needs James's explicit go-ahead before building** — this would also require updating CLAUDE.md's "Parent gate" core design principle once confirmed.

4. **Practice-check strictness needs some grace, but not uniformly.** James hit this in real usage: told to type `Hello, Python!` exactly, missed something small, and got blocked — because today's lesson-locking work (see below) means a failed check now genuinely blocks progress, where before it was just informational. But blanket leniency isn't right either: Lesson 1.2's whole point is "capitalization and punctuation matter to Python," so exact-match *is* the lesson there, not a bug. Open design question, not yet decided: per-lesson leniency flag? Something else? (added 2026-07-18)

5. **Badge system for profiles**, showing what a kid has completed. Explicitly future/low-priority — James flagged it just so it isn't lost, not because it's needed now (added 2026-07-18).

## Built, awaiting James's QA

Nothing pending right now.
