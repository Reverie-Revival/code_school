# Code School — Curriculum Outline (Python, Level 2)

**Status: Draft shape, agreed with James 2026-07-22.** Chapter/lesson/project titles and themes only — no lesson content written yet. This is a separate track from [curriculum/python/outline.md](../python/outline.md) ("Course 1"), not a continuation of its chapter numbering.

Audience: the same two boys, now having finished all 15 Course 1 chapters faster than expected. No longer total beginners — Course 2 assumes fluency with Course 1's material and is a genuine step up in depth, not just "more of the same at the same pace."

## Why this exists, and what it's for

Both boys finished Course 1 quickly and want more (see `memory/project_level2_curriculum.md`). Rather than plan an eventual Course 3, the goal is set higher: **Course 2 should be deep enough that afterward, they're ready to start a real, multi-file project with a parent's help** — the thing Course 1's CLAUDE.md explicitly deferred ("out of scope for v1"). That means Course 2 is where the v1-deferred pieces (file I/O, using external/stdlib modules, classes, real debugging) get taught, alongside going deeper on everything Course 1 already introduced.

Given that goal, one boundary from Course 1 still holds and one loosens:
- **Still out of scope:** multi-file *source* projects, file trees, imports between the kid's own files. That's still the thing they graduate *to* after Course 2, with a parent, not something simulated inside the app.
- **Newly in scope:** reading/writing *data* files (text/JSON) and importing *stdlib* modules (`random`, `math`, `datetime`) — both single-file-project-compatible, and both necessary groundwork for a real project to not feel alien later.

## Structure: one project that grows across the whole course

Course 1 gave each project-bearing chapter its own standalone project. Course 2 deliberately does not — every chapter's project is another step on **one running build: a text-based adventure game engine**, so depth compounds instead of resetting each chapter. By the OOP chapters, the boys are refactoring code they've been building for weeks (dicts → classes), which is much closer to real project work than a fresh-each-chapter exercise could be. The two Recap chapters are the exception — they warm up on standalone drills before the running project starts in Ch. 2.

Structure per-chapter: **Lesson → Practice → Project**, same engine and self-check-in model as Course 1 (see root CLAUDE.md) — reused as-is, not rebuilt.

---

## Chapter 1 — Recap Sprint: Fundamentals
*variables, strings, numbers, input, comparisons — each revisited with its own lesson and practice*

1.1 Variables & Naming, Revisited
1.2 Strings & f-strings, Revisited
1.3 Numbers & Math, Revisited
1.4 Getting Input, Revisited
1.5 Comparisons, Revisited
1.6 Chapter 1 Wrap-Up
*(No project yet — diagnostic reps, not new material. Confirms the boys are actually fluent before Course 2's pace picks up.)*

## Chapter 2 — Recap Sprint: Logic & Loops
*conditionals, loops, lists, functions — each revisited with its own lesson and practice, then the running project begins*

2.1 Decisions, Revisited
2.2 While Loops, Revisited
2.3 Lists, Revisited
2.4 Defining and Calling Functions, Revisited
2.5 How Functions Return Values, Revisited
2.6 Chapter 2 Wrap-Up
**→ Project: The Command Loop** — a `while`-loop command prompt reading player input ("look," "help," "quit") with `if`/`elif` dispatch. Small on its own, but this *is* the game engine's skeleton — every later chapter's project extends this same code.

## Chapter 3 — Strings, Deep Dive
*slicing, splitting/joining, formatting — genuinely new material (not recap), given the fuller lesson-by-lesson treatment that warrants*

3.1 Basic Slicing
3.2 Omitting Start or End
3.3 Negative Indices
3.4 Splitting Input into Words
3.5 Joining Words Back Together
3.6 Formatting Output Like a Real Program
3.7 Chapter 3 Wrap-Up
**→ Project: Parsing the Player** — parse multi-word commands ("go north," "take sword") into a verb + argument, and print formatted room descriptions.

## Chapter 4 — Nested Data & Comprehensions
*dict-of-dicts, lists of dicts, list/dict comprehensions (including filtering)*

4.1 Dicts Inside Dicts
4.2 Lists of Dicts
4.3 List Comprehensions
4.4 List Comprehensions with a Condition
4.5 Dict Comprehensions
4.6 Chapter 4 Wrap-Up
**→ Project: The World Map** — rooms modeled as a dict of dicts (description, exits, items); wire up real movement between rooms using the map data.

## Chapter 5 — Functions, Deep Dive
*default args, keyword args, `*args`, `**kwargs`, scope*

5.1 Default Arguments
5.2 Keyword Arguments
5.3 `*args`: Flexible Positional Arguments
5.4 `**kwargs`: Flexible Keyword Arguments
5.5 Scope: What a Function Can and Can't See
5.6 Chapter 5 Wrap-Up
**→ Project: The Refactor** — pull the sprawling game code from Ch. 2–4 into clean, well-named functions (`move_player()`, `describe_room()`, `parse_command()`); first real lesson in *why* functions matter at scale.

## Chapter 6 — Lists in Practice
*sorting, searching, tuples*

6.1 Sorting Lists
6.2 Searching Lists
6.3 Tuples: When Not to Use a List
6.4 Chapter 6 Wrap-Up
**→ Project: The Inventory System** — pick up, drop, and list items; sort inventory by name; use a tuple for fixed item data (name, weight).

## Chapter 7 — Error Handling
*try/except, catching different errors differently, raising exceptions*

7.1 When Code Breaks: try / except
7.2 Catching Different Errors Differently
7.3 Raising Your Own Exceptions
7.4 Chapter 7 Wrap-Up
**→ Project: Bulletproofing** — the game survives bad commands, moving into walls, and grabbing nonexistent items without crashing.

## Chapter 8 — Modules & the Standard Library
*import, random, math, datetime*

8.1 Importing Code Other People Wrote
8.2 `random.randint()`: Dice Rolls
8.3 `random.choice()`: Random Picks
8.4 A Taste of `datetime`
8.5 Chapter 8 Wrap-Up
**→ Project: Dice & Loot** — random loot drops and a dice-roll combat mechanic using `random`.

## Chapter 9 — Classes & OOP I
*`__init__`, methods, multiple independent objects from one class*

9.1 What's a Class? (bundling data and behavior)
9.2 Writing `__init__`
9.3 Writing Methods
9.4 Multiple Objects, One Class
9.5 Chapter 9 Wrap-Up
**→ Project: From Dicts to Classes** — refactor Player, Room, and Item from the Ch. 4–8 dict-based version into real classes. The course's biggest structural leap: same game, fundamentally different architecture.

## Chapter 10 — Classes & OOP II: Inheritance
*inheritance, method overriding, extending a method with `super()`*

10.1 Sharing Behavior: Inheritance
10.2 Overriding a Method
10.3 Adding to a Method with `super()`
10.4 Chapter 10 Wrap-Up
**→ Project: Enemies** — an `Enemy` base class with subclasses (Goblin, Dragon) that each fight differently by overriding a `attack()` method.

## Chapter 11 — File I/O
*reading/writing text files, saving/loading structured data with JSON*

11.1 Writing to a Text File
11.2 Reading from a Text File
11.3 Saving Structured Data with JSON
11.4 Loading Structured Data with JSON
11.5 Chapter 11 Wrap-Up
**→ Project: Save & Load** — persist player position, inventory, and world state to a file, so a game session survives closing and reopening.

## Chapter 12 — Debugging & Testing Mindset
*reading tracebacks, common error types, `assert`, deliberate bug hunts*

12.1 Reading a Traceback Like a Detective
12.2 A Field Guide to Common Errors
12.3 Sanity-Checking Your Own Code with `assert`
12.4 Chapter 12 Wrap-Up
**→ Project: Bug Hunt** — planted bugs in their own (by-now-substantial) game codebase to find and fix, plus `assert`-based sanity checks added to catch future regressions.

## Chapter 13 — Capstone: Finish the Game
*open-ended — everything from Ch. 1–12, plus a short note on testing incrementally*

13.1 Planning Your Addition
13.2 Testing As You Go
**→ Capstone Project: Your Game, Your Addition** — design and build a genuinely new room, enemy, item, or mechanic of their own choosing, using whatever combination of Ch. 1–12 skills the design calls for. No fixed spec — the closest thing in the course to real, self-directed project work, and the deliberate on-ramp to starting a real project with a parent afterward.

---

## Notes on this draft

- **Separate track, not a continuation.** Chapter numbering restarts at 1 and lives in its own `curriculum/python2/` directory — not appended as Course 1's chapters 16+. Keeps "Level 2, Chapter 1" legible on its own, and avoids Course 1's chapter-lock logic in `js/app.js` having to reason about one 25+ chapter spine. The once-open data-model question (the `progress` table originally scoped only by `profile_id` + `chapter_number`, which would've collided across tracks) is resolved — see `js/courses.js`'s `TRACKS` registry and the `course_id` migrations in `supabase/migrations/`.
- **One running project, by design.** Every project-bearing chapter (all of them except Ch. 1–2's recap) extends the same text-adventure codebase rather than starting fresh — see "Structure" above. This is the direct answer to James's feedback that projects, not just lessons, needed to be "significantly more in depth."
- **No Course 3 planned.** The explicit design target is that Ch. 13's capstone leaves the boys ready to start a real, parent-guided, multi-file project — not ready for a Course 3. Revisit only if that assumption turns out wrong once they're actually through it.
- **File I/O and stdlib imports are new territory Course 1 deliberately left out** (see root CLAUDE.md's "Explicitly out of scope for v1"). Course 2 is where they get introduced — both are single-file-compatible and don't violate Course 1's "no multi-file source trees" boundary, which still holds here.
- **Revised 2026-07-23, after James reviewed the finished chapters on the live app (round 1).** His original feedback: too light. "It doesn't need to be quite as detailed as Course 1, but there's a lot more to this so we should explain things a bit more" — and since Course 2 covers meatier concepts than Course 1 chapter-for-chapter, each one needs more practice reps too, not just more prose. Resolved by splitting single lessons into several narrower ones rather than building new multi-practice-per-lesson UI (see `memory/project_level2_curriculum.md` for the fuller reasoning on why that approach was chosen over a stepper/sub-page UI). Applied across all 13 chapters: lesson counts roughly doubled chapter-by-chapter (e.g. Ch. 3's one "Slicing Strings" lesson became three narrower slicing lessons plus split-out splitting/joining lessons; Ch. 5 gained a real `**kwargs` lesson and Ch. 8 a real `datetime` lesson, both promised by their original chapter subtitle but never actually written the first time around; Ch. 10 gained a `super()` lesson; Ch. 12 gained a common-error-types field guide; Ch. 13's capstone stayed intentionally project-heavy but still gained a second short lesson on testing incrementally).
- **Revised again 2026-07-23, round 2 — functions weren't actually being taught, and lessons were inconsistent about explaining "why," not just "how."** James's sharpest feedback: Chapter 5 (and functions generally) never showed *how the code actually reads* — the execution flow of a function call jumping into the `def` body, parameters receiving the passed-in values, and `return` sending a value back to the exact call site — kids were left to infer that from syntax alone. Separately, roughly half the lessons across the whole course opened with a bare mechanical description ("`*args` collects extra arguments into a tuple") instead of first motivating *why* that concept exists — inconsistent with the other half, which already did this well. Fixed: Ch. 2's old single "Functions, Revisited" lesson became two — 2.4 (defining/calling, with an explicitly numbered-and-annotated execution-order trace: ① def is just a recipe, ② the call happens, ③ execution jumps into the body, ④ execution resumes at the call site) and 2.5 (return values, using the same numbered-trace technique) — so Ch. 5's deeper function material (default/keyword args, `*args`, `**kwargs`, scope) has real ground to build on and explicitly references it. Every other chapter got a pass checking each lesson's opening for genuine "why" framing, with the weakest ones (parts of Ch. 1, 3, 4, 6, 8, 10, 11) rewritten to lead with the real problem the concept solves before the mechanism. The table above reflects the *current* lesson breakdown — always cross-check against the actual `.js` chapter files as the ultimate source of truth, since further James feedback may move it again.
