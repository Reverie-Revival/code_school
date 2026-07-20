---
name: user-team
description: Who's building Code School and who it's for — James solo-building, two kids as learners
metadata:
  type: user
---

James is building this solo, for his two sons (ages 9 and 12) to use on their iPads.

- One primary learner is a total beginner with no prior coding experience; a second child will also use the app. Progress must stay separate per kid (name/avatar picker, no real auth).
- **Boys are 9 and 12. Lesson tone: write to them like young adults, not little kids** — no baby talk, no over-the-top cutesy framing. They should feel respected by the material. At the same time, give them a lot of guidance and scaffolding at their actual skill level (total beginners) — "young adult tone" is about respect and voice, not about assuming prior knowledge or skipping steps.
- Pace is intentionally slow and low-pressure — no calendar-based schedule, chapter length is the pacing mechanism.
- Lesson-to-lesson progression gates on passing that lesson's practice check (built 2026-07-18) — not a parent gate. Chapter-to-chapter progression (once a chapter has a **Project** — see [curriculum/python/outline.md](../curriculum/python/outline.md) for current assignments) also isn't a parent gate: the kid's code has to run with no error, then they self-click "I showed someone!" in-app (decided and built 2026-07-19, after James confirmed he does NOT want a parent-approval step here — a first pass mistakenly built one, caught and corrected same session).
- James personally prefers to work slow and talk decisions through before building — even outside the kid-facing pacing above, this is how *he* likes to collaborate on this project.
- **Ambition for the curriculum**: James wants this to be as good as, or better than, a course he could have paid for — not a bare-minimum stand-in. When drafting curriculum/lessons, err toward thorough coverage of fundamentals rather than a sparse minimum viable set.
- **Teach with real-world analogies**, the way the classic Java "bike" example ties classes/objects/reuse to something tangible. Especially valuable in later chapters where concepts get more abstract (functions, lists, dictionaries) — tying it to something concrete makes it click. Nice-to-have for early/simple topics too (variables, print()) but James acknowledged that's harder and lower priority there than forcing an awkward analogy onto something already simple.

**Why:** This shapes both the product (see [[project-core]]) and how James works on it — likely in short sessions around family time, not long uninterrupted blocks. The talk-it-through preference is about James's own working style, separate from the app's pacing design.

**How to apply:** When suggesting build steps, favor ones James can ship incrementally and demo to his kids early (e.g. get Chapter 1 fully working before building out all 15 chapters' content). Don't assume a full-time dev cadence. Default to discussing an approach and getting buy-in before writing code, rather than moving straight to implementation — even for small decisions. When the work reaches a point where James would want to *see* it (e.g. try the app in a browser), start any local server and open the browser tab directly rather than handing James a command to run himself — he wants to look at the result, not operate the tooling. When writing any lesson/practice/project content, write for a 9- and 12-year-old audience with a respectful, young-adult voice — and favor thorough coverage over a bare-minimum set, per James's stated ambition above.
