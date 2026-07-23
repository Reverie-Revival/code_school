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
*variables, strings, numbers, input, comparisons — reviewed at a harder pace*

1.1 Fundamentals Speed Round (variables, strings, numbers)
1.2 Input & Comparisons, Revisited
1.3 Chapter 1 Wrap-Up
*(No project yet — diagnostic reps, not new material. Confirms the boys are actually fluent before Course 2's pace picks up.)*

## Chapter 2 — Recap Sprint: Logic & Loops
*conditionals, lists, loops, functions — reviewed, then the running project begins*

2.1 Decisions & Loops Speed Round
2.2 Lists & Functions, Revisited
2.3 Chapter 2 Wrap-Up
**→ Project: The Command Loop** — a `while`-loop command prompt reading player input ("look," "help," "quit") with `if`/`elif` dispatch. Small on its own, but this *is* the game engine's skeleton — every later chapter's project extends this same code.

## Chapter 3 — Strings, Deep Dive
*slicing, formatting, splitting input into command + argument*

3.1 Slicing Strings (beyond single-character indexing)
3.2 Splitting Input into Words
3.3 Formatting Output Like a Real Program
3.4 Chapter 3 Wrap-Up
**→ Project: Parsing the Player** — parse multi-word commands ("go north," "take sword") into a verb + argument, and print formatted room descriptions.

## Chapter 4 — Nested Data & Comprehensions
*dict-of-dicts, list comprehensions, dict comprehensions*

4.1 Lists of Dicts, Dicts of Dicts
4.2 List Comprehensions
4.3 Dict Comprehensions
4.4 Chapter 4 Wrap-Up
**→ Project: The World Map** — rooms modeled as a dict of dicts (description, exits, items); wire up real movement between rooms using the map data.

## Chapter 5 — Functions, Deep Dive
*default/keyword args, `*args`/`**kwargs`, scope*

5.1 Default and Keyword Arguments
5.2 Flexible Functions: `*args` and `**kwargs`
5.3 Scope: What a Function Can and Can't See
5.4 Chapter 5 Wrap-Up
**→ Project: The Refactor** — pull the sprawling game code from Ch. 2–4 into clean, well-named functions (`move_player()`, `describe_room()`, `parse_command()`); first real lesson in *why* functions matter at scale.

## Chapter 6 — Lists in Practice
*sorting, searching, tuples*

6.1 Sorting and Searching Lists
6.2 Tuples: When Not to Use a List
6.3 Chapter 6 Wrap-Up
**→ Project: The Inventory System** — pick up, drop, and list items; sort inventory by name; use a tuple for fixed item data (name, weight).

## Chapter 7 — Error Handling
*try/except, raising exceptions*

7.1 When Code Breaks: try / except
7.2 Raising Your Own Exceptions
7.3 Chapter 7 Wrap-Up
**→ Project: Bulletproofing** — the game survives bad commands, moving into walls, and grabbing nonexistent items without crashing.

## Chapter 8 — Modules & the Standard Library
*import, random, math, datetime*

8.1 Importing Code Other People Wrote
8.2 `random`: Adding Chance to the Game
8.3 Chapter 8 Wrap-Up
**→ Project: Dice & Loot** — random loot drops and a dice-roll combat mechanic using `random`.

## Chapter 9 — Classes & OOP I
*`__init__`, attributes, methods*

9.1 What's a Class? (bundling data and behavior)
9.2 Writing `__init__` and Methods
9.3 Chapter 9 Wrap-Up
**→ Project: From Dicts to Classes** — refactor Player, Room, and Item from the Ch. 4–8 dict-based version into real classes. The course's biggest structural leap: same game, fundamentally different architecture.

## Chapter 10 — Classes & OOP II: Inheritance
*one level of inheritance, method overriding*

10.1 Sharing Behavior: Inheritance
10.2 Overriding a Method
10.3 Chapter 10 Wrap-Up
**→ Project: Enemies** — an `Enemy` base class with subclasses (Goblin, Dragon) that each fight differently by overriding a `attack()` method.

## Chapter 11 — File I/O
*reading/writing text files, saving structured data with JSON*

11.1 Reading and Writing Text Files
11.2 Saving Structured Data with JSON
11.3 Chapter 11 Wrap-Up
**→ Project: Save & Load** — persist player position, inventory, and world state to a file, so a game session survives closing and reopening.

## Chapter 12 — Debugging & Testing Mindset
*reading tracebacks, `assert`, deliberate bug hunts*

12.1 Reading a Traceback Like a Detective
12.2 Sanity-Checking Your Own Code with `assert`
12.3 Chapter 12 Wrap-Up
**→ Project: Bug Hunt** — planted bugs in their own (by-now-substantial) game codebase to find and fix, plus `assert`-based sanity checks added to catch future regressions.

## Chapter 13 — Capstone: Finish the Game
*open-ended — everything from Ch. 1–12*

13.1 Planning Your Addition
**→ Capstone Project: Your Game, Your Addition** — design and build a genuinely new room, enemy, item, or mechanic of their own choosing, using whatever combination of Ch. 1–12 skills the design calls for. No fixed spec — the closest thing in the course to real, self-directed project work, and the deliberate on-ramp to starting a real project with a parent afterward.

---

## Notes on this draft

- **Separate track, not a continuation.** Chapter numbering restarts at 1 and lives in its own `curriculum/python2/` directory — not appended as Course 1's chapters 16+. Keeps "Level 2, Chapter 1" legible on its own, and avoids Course 1's chapter-lock logic in `js/app.js` having to reason about one 25+ chapter spine. Data-model consequence still open: the `progress` table scopes by `profile_id` + `chapter_number`, which collides across tracks (Course 1 ch. 3 and Course 2 ch. 3 are different chapters) — needs a `course`/track column, or a separate table, before any Course 2 progress gets written. Not yet resolved — flag before wiring this up in the app.
- **One running project, by design.** Every project-bearing chapter (all of them except Ch. 1–2's recap) extends the same text-adventure codebase rather than starting fresh — see "Structure" above. This is the direct answer to James's feedback that projects, not just lessons, needed to be "significantly more in depth."
- **No Course 3 planned.** The explicit design target is that Ch. 13's capstone leaves the boys ready to start a real, parent-guided, multi-file project — not ready for a Course 3. Revisit only if that assumption turns out wrong once they're actually through it.
- **File I/O and stdlib imports are new territory Course 1 deliberately left out** (see root CLAUDE.md's "Explicitly out of scope for v1"). Course 2 is where they get introduced — both are single-file-compatible and don't violate Course 1's "no multi-file source trees" boundary, which still holds here.
- **Lesson counts per chapter are lighter than Course 1's 4–8 range** (mostly 2–4) since each chapter now covers one focused deep-dive concept rather than a cluster of beginner basics, and the project itself carries more of the chapter's weight than in Course 1.
