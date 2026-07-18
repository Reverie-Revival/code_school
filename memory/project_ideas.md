---
name: project-ideas
description: Code School's lightweight backlog of ideas/improvements — replaces GitHub Issues for this project, re-ordered and worked as James chooses
metadata:
  type: project
---

James's chosen process for this project (see [[project-workflow]]): no GitHub Issues, just this running list. Ideas get added here as they come up, re-ordered/picked up whenever, and removed once done (git history is the record of when/how, not this file).

**How to apply:** When James wants to work on something, check here first for context before starting. When a new idea comes up mid-session, add it here rather than just fixing it inline (unless it's small enough to just do). When an item is completed, remove it from this list rather than marking it done — this is a backlog, not a changelog.

## Open ideas (added 2026-07-18, not yet prioritized/ordered)

1. **Enter key to enter the app.** On the profile picker's PIN prompt (and maybe the new-profile form), pressing Enter should submit, same as clicking Go/Create — right now only clicking the button works.

2. **Chapter/Lesson navigation as a hierarchy dropdown**, not just linear Prev/Next. Chapters should be titled (already are, e.g. "Chapter 1: Hello, Python"), but individual lessons need real titles shown in the nav too, not just "Lesson 1.2" — click-through should read like an actual table of contents.

3. **A more developed, consistent lesson template.** Current lessons (1.1, 1.2) are pretty minimal. James wants something a bit more in-depth, with the same or similar shape lesson-to-lesson. Open question to design: what should that template actually include? (e.g. more example code, a "try it yourself" prompt distinct from the graded practice, common-mistakes callouts, a short recap — needs a real answer, not just more prose.)

4. **"Check My Work" may be redundant with "Run".** James's instinct: running the code should just check it automatically, rather than requiring a separate button press. Worth deciding whether to merge Run+Check into one action, or keep them separate for a reason (e.g. letting a kid experiment/run multiple times before committing to a graded check) — that tradeoff needs to be made explicit before changing it.

5. **Parent Gate needs to be redesigned — this is a real scope change, not a tweak.** James does NOT want a parent-gate blocking chapter-to-chapter progression (the CLAUDE.md "Lesson → Practice → Project → Parent gate" core design principle, as currently written, has the parent manually approving each chapter). His actual intent: the boys move on their own; the only gate between *lessons* should be passing that lesson's practice check (which doesn't currently block navigation — see `js/app.js`'s `nextBtn` handler, it never checks `completedLessons` before allowing advance). For chapter-end **Projects** specifically (ch. 4, 8, 11, 15), James says "parent isn't the way" but hasn't decided the replacement mechanism yet — he wants to see what a real chapter project looks like first before deciding how it gets verified. **This will require updating CLAUDE.md's core design principle section, not just code**, once the replacement mechanism is decided. Don't build ahead of that decision.
