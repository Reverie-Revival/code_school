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

3. **`input()`'s browser-`prompt()` bridge (added 2026-07-20) may break if this ever becomes an "Add to Home Screen" app.** `window.prompt()` (and `alert()`/`confirm()`) are well-documented as broken/no-ops in iOS Safari's standalone home-screen-icon mode — they work fine in a normal Safari tab, which is how the app runs today (no manifest/`apple-mobile-web-app-capable` tag exists yet). Not an issue right now, but flagging so that if a home-screen icon / PWA-style launch is ever added for the boys' iPads, `input()` needs to be re-verified in that specific mode, since it's a real chapter-5-onward dependency now.

## Built, awaiting James's QA

(empty — everything previously here was confirmed good by James on 2026-07-20: sticky lesson-pane header, Help/Reset showing on errors, the Project/self-check-in mechanism, Chapter 3 content + Mad Libs Project, the input()-popup fix (including re-verifying 5.2/5.3/5.4/7.3), and all of Chapters 4–15/the rest of the curriculum. Full 15-chapter course is now complete and QA'd end to end.)
