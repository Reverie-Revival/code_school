---
name: project-ideas
description: Code School's lightweight backlog of ideas/improvements — replaces GitHub Issues for this project, re-ordered and worked as James chooses
metadata:
  type: project
---

James's chosen process for this project (see [[project-workflow]]): no GitHub Issues, just this running list. Ideas get added here as they come up, re-ordered/picked up whenever.

**How to apply:** When James wants to work on something, check here first for context before starting. When a new idea comes up mid-session, add it here rather than just fixing it inline (unless it's small enough to just do). When something is built, move it to **Built, awaiting James's QA** — do NOT remove it yet, even if it's been tested end-to-end in an automated browser test. Only remove an item once James has personally tried it himself and confirmed it's good. Automated verification proves it works; it doesn't substitute for James's own sign-off before something leaves the list.

## Open ideas

1. **Chapter-level navigation still needed.** Lesson-level dropdown with titles shipped 2026-07-18 (`#lesson-select` in `js/app.js`), but there's still no chapter list/switcher — the app only knows about Chapter 1 (hardcoded import in `js/app.js`). Same underlying gap as the "design multi-chapter navigation" item that'll come up once Chapter 2 exists — resolve both together.

2. **A more developed, consistent lesson template.** Current lessons (1.1, 1.2) are pretty minimal. James wants something a bit more in-depth, with the same or similar shape lesson-to-lesson. Open question to design: what should that template actually include? (e.g. more example code, a "try it yourself" prompt distinct from the graded practice, common-mistakes callouts, a short recap — needs a real answer, not just more prose.)

3. **Parent Gate needs to be redesigned — this is a real scope change, not a tweak.** James does NOT want a parent-gate blocking chapter-to-chapter progression (the CLAUDE.md "Lesson → Practice → Project → Parent gate" core design principle, as currently written, has the parent manually approving each chapter). His actual intent: the boys move on their own; the only gate between *lessons* should be passing that lesson's practice check (which doesn't currently block navigation — see `js/app.js`'s `nextBtn` handler, it never checks `completedLessons` before allowing advance). For chapter-end **Projects** specifically (ch. 4, 8, 11, 15), James says "parent isn't the way" but hasn't decided the replacement mechanism yet — he wants to see what a real chapter project looks like first before deciding how it gets verified. **This will require updating CLAUDE.md's core design principle section, not just code**, once the replacement mechanism is decided. Don't build ahead of that decision.

## Built, awaiting James's QA

- **Enter key submits the PIN prompt and new-profile form.** Built and verified via automated browser test 2026-07-18 — needs James to actually try it on the PIN prompt and profile-creation form himself before this is considered done.
- **"Check My Work" merged into Run.** Every successful run now auto-checks practice when the lesson has one (not graded/punitive — just tells you right away, you can keep re-running). Built and verified via automated browser test 2026-07-18 — needs James to try it himself on a real practice lesson before this is considered done.
