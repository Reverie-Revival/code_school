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

2. **Chapter-end Project verification — candidate direction proposed, not yet decided.** James does NOT want a parent-gate blocking chapter-to-chapter progression. AI-based grading was considered and ruled out (2026-07-18) — it would mean real per-request API cost, breaking the $0 budget constraint and requiring a whole new backend/API-key architecture. Leading candidate instead: auto-check just means "the code ran without erroring" (reuse the existing Errors panel — cheap, already built), then a self-click "I showed someone!" button (kid-driven, no parent action required in the app) unlocks the next chapter. Matches CLAUDE.md's own original reasoning that grading a project's correctness well isn't worth solving for v1. **Needs James's explicit go-ahead before building** — this would also require updating CLAUDE.md's "Parent gate" core design principle once confirmed.

3. **Practice-check strictness needs some grace, but not uniformly.** James hit this in real usage: told to type `Hello, Python!` exactly, missed something small, and got blocked — because lesson-locking means a failed check genuinely blocks progress. But blanket leniency isn't right either: Lesson 1.2's whole point is "capitalization and punctuation matter to Python," so exact-match *is* the lesson there, not a bug. Partially eased by the new Help/Reset buttons (2026-07-19, see Built section) — a stuck kid isn't blocked forever now — but the underlying "should some lessons accept near-misses" design question is still open.

4. **Badge system for profiles**, showing what a kid has completed. Explicitly future/low-priority — James flagged it just so it isn't lost, not because it's needed now (added 2026-07-18).

5. **The Errors panel and the practice-failure box look too similar** — both use the same pinkish-red background/color (`#fbe9e7` / `var(--error)`). James genuinely confused the two mid-session on 2026-07-19 (thought the pink "wrong output" box in the Output pane *was* the Errors panel), which is exactly the ambiguity that led to reworking where Help/Reset live. Worth a distinct visual treatment for "your code ran but the answer's wrong" vs. "your code crashed" so they don't read as the same kind of event at a glance.

## Built, awaiting James's QA

Tell James, when he's ready to check these: open the app, and for each item below, do the listed action and confirm the listed result.

1. **Tightened lesson template** (2026-07-19): every lesson section (Example, Watch Out For, Your Turn, Recap) is now a labeled, color-coded callout box, and worked examples now match the assignment's exact shape (same item count/types) instead of a simplified version.
   - Go to **Lesson 1.3**. Confirm the blue "Example" box shows a 3-item `print()` (string, number, string) — the same shape as the assignment below it, not a simpler 2-item one.
   - Confirm each section (Example/Watch Out For/Your Turn/Recap) has a small colored label above it, and they're visually distinct from each other.

2. **Help / Reset buttons on a failed practice attempt** (2026-07-19): live in the pink "wrong output" box in the **Output** pane (not the Errors panel — that was an early miss, corrected this session).
   - On any lesson with practice (1.2, 1.3, 1.4), type something that runs but prints the wrong thing, press Run. Confirm a **Help** and **Reset** button appear next to the failure message.
   - Press **Help** — confirm the code box fills with working code for that lesson.
   - Press **Reset** — confirm it goes back to what you had typed before pressing Help.

3. **"How To Fix It" hint in the Errors panel** (2026-07-19): when code actually crashes (not just wrong output), a plain-English explanation now shows below the raw Python error.
   - On any lesson, break the code so it can't run at all (e.g. delete a closing quote), press Run. Confirm the red Errors panel shows the raw error *and* a "How To Fix It" box translating it into plain language.

4. **Cleaned up the profile-picker header** (2026-07-19): the "Who's coding today?" screen no longer shows the leftover "Loading lesson…" text and an inert chapter dropdown above the profile cards.
   - Load the app fresh (or press Switch from inside a lesson). Confirm the header only shows "Code School" — no lesson title, no dropdown — until a profile is actually picked.
