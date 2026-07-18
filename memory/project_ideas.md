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

3. **Chapter-end Project verification still undecided.** James does NOT want a parent-gate blocking chapter-to-chapter progression (lesson-to-lesson locking is now built — see below). What's still open is specifically the checkpoint **Projects** (ch. 4, 8, 11, 15): James says "parent isn't the way" but hasn't decided the replacement mechanism yet — he wants to see what a real chapter project looks like first before deciding how it gets verified. **This will require updating CLAUDE.md's "Parent gate" core design principle**, once the replacement mechanism is decided. Don't build ahead of that decision.

## Built, awaiting James's QA

- **"Check My Work" merged into Run.** Every successful run now auto-checks practice when the lesson has one (not graded/punitive — just tells you right away, you can keep re-running). Built and verified via automated browser test 2026-07-18 — needs James to try it himself on a real practice lesson before this is considered done.
- **Chapter welcome page + hierarchical dropdown + real lesson locking.** New profiles now land on a Chapter 1 welcome page before any lesson. The header dropdown's first entry is the chapter's own name ("Chapter 1: Hello, Python") — selecting it goes to the welcome page, no separate "Welcome" item (per James's 2026-07-18 feedback on the first version, which had a redundant nested "👋 Welcome" entry). Lessons are visually indented under it, show real titles + ✓ when done, and genuinely disable (🔒) any lesson whose predecessor isn't done yet — you cannot select a locked lesson. Next is also blocked on a practice lesson until its check passes, so Next/Prev and the dropdown never contradict each other. This resolves the lesson-to-lesson half of the old "Parent Gate" item (see #3 above for what's still open). Verified via automated browser test 2026-07-18 — needs a fresh QA pass from James since the dropdown structure changed after his feedback: visit a fresh/new profile, confirm the dropdown's first entry is just "Chapter 1: Hello, Python" (no separate Welcome item), confirm 1.2 shows locked (🔒) until 1.1 is finished, and confirm Next won't advance past 1.2 until the practice is passed.
