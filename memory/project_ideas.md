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

1. **Practice-check strictness needs some grace, but not uniformly.** James hit this in real usage: told to type `Hello, Python!` exactly, missed something small, and got blocked — because lesson-locking means a failed check genuinely blocks progress. But blanket leniency isn't right either: Lesson 1.2's whole point is "capitalization and punctuation matter to Python," so exact-match *is* the lesson there, not a bug. Partially eased by the new Help/Reset buttons (2026-07-19, see Built section) — a stuck kid isn't blocked forever now — but the underlying "should some lessons accept near-misses" design question is still open.

2. **Badge system for profiles**, showing what a kid has completed. Explicitly future/low-priority — James flagged it just so it isn't lost, not because it's needed now (added 2026-07-18).

## Built, awaiting James's QA

Tell James, when he's ready to check these: open the app, and for each item below, do the listed action and confirm the listed result.

1. **Multi-chapter navigation** (2026-07-19): the app now knows about a real, ordered list of chapters (`curriculum/python/chapters/index.js`) instead of a single hardcoded Chapter 1 import. The header dropdown now shows every chapter as its own group; a chapter is locked (greyed out, un-selectable) until every lesson in the chapter before it is done. Finishing a chapter's last lesson and pressing Next now carries you straight into the next chapter's Welcome page, if it's unlocked.
   - As "Dad" or "Dad 2" (whichever hasn't finished Chapter 1 yet — or start a fresh profile), confirm the dropdown shows two chapter groups, with "Chapter 2: Variables" greyed out/disabled until Chapter 1 is fully done.
   - Finish Chapter 1's last lesson (1.5, the Print Art wrap-up — no auto-check, just press Next). Confirm Next carries you into Chapter 2's Welcome page, and the dropdown now shows Chapter 2 unlocked.

2. **Chapter 2 content — Variables** (2026-07-19): lessons 2.1–2.6 written in `curriculum/python/chapters/chapter2.js`, following the same template as Chapter 1 (Concept, Example, Watch Out For, Your Turn, Recap; Help/Reset on failed practice attempts; a themed, non-auto-checked Wrap-Up).
   - Work through 2.1–2.6. Confirm each lesson's Example box matches its assignment's shape (2.2's naming-rules lesson intentionally starts you on *broken* code — a variable name starting with a digit — that should show a SyntaxError in the Errors panel until you rename it correctly).
   - Confirm 2.6 ("Wrap-Up: Character Sheet") has no practice check, just an open-ended challenge like 1.5 did.

3. **Project content type — mechanism only, no real content yet** (2026-07-19, reworked same session — see below). `chapter.project` is now a real, renderable shape (`js/app.js`'s `renderProject()`) with its own dropdown entry, a "When You're Done" box, and an **I showed someone! ✓** button. This is the **self check-in** design, not a parent gate: the button stays disabled until the kid's code runs with no error (reusing the Errors panel), and clicking it — no parent action needed — is what unlocks the next chapter. A `progress` row records it (`lesson_number: null`, `completed_at` set; `parent_approved_at` deliberately left null since no parent is involved). CLAUDE.md's "Parent gate" principle is updated to match (now called "Self check-in"). First build of this (mid-session) actually implemented a real parent-approval gate per CLAUDE.md's *then*-current wording — caught before handoff that this directly contradicted James's explicit 2026-07-18 feedback ("does NOT want a parent-gate blocking chapter-to-chapter progression"), asked James directly, and he confirmed self check-in. Verified end-to-end with a temporary throwaway project bolted onto Chapter 1 (not committed, removed before handoff): button stays disabled on an error run, enables after a clean run, clicking it unlocks the next chapter. **No chapter has real Project content yet** (Chapter 3's Mad Libs is next) — nothing to click through live in the real app right now. Flagging so it isn't mistaken for untested.
