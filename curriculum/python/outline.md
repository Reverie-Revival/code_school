# Code School — Curriculum Outline (Python)

**Status: Finalized shape.** Table of contents — chapter, lesson, and project *titles/themes*, no lesson content written yet beyond what's already built (Ch. 1, Lessons 1.1–1.2). Revised 2026-07-18 after a full review pass with James.

Audience: two boys, ages 9 and 12 — total beginners. Tone throughout: respectful, young-adult voice, heavy scaffolding at their actual skill level (see `memory/user_team.md`). Ambition: this should be as good as, or better than, a paid course — thorough coverage of fundamentals, not a bare-minimum set. Projects lean on real-world/game-like framing (James's "Bike" example feedback) to make them feel like something worth doing, not homework.

Structure per CLAUDE.md: **Chapter → Lesson → Project.** Every chapter ends with a short Wrap-Up lesson (a lightweight review). Projects are bigger, not-auto-graded pieces that pull together the *current* chapter's concepts **and** everything before it — no longer pinned to a fixed 4/8/11/15 schedule; assigned per-chapter based on whether there's enough material to make something genuinely interesting yet.

---

## Chapter 1 — Hello, Python
*print(), what even is code, running your first program*

1.1 What Is Code, Anyway? *(built)*
1.2 Your First print() *(built)*
1.3 Printing More Than One Thing
1.4 Making Print Look Nice (spacing, blank lines, simple formatting)
1.5 Wrap-Up: **Print Art** *(a small ASCII-art challenge — draw something with nothing but print() and characters; no Project yet, just print() alone doesn't support one, but this keeps the wrap-up itself fun)*

## Chapter 2 — Variables
*storing values, naming things, string vs. number*

2.1 What's a Variable?
2.2 Naming Your Variables (the rules, and good habits)
2.3 Strings vs. Numbers
2.4 Changing a Variable's Value
2.5 Using Variables with print()
2.6 Wrap-Up: **Character Sheet** *(build a fun "game character" bio card — name, level, favorite weapon, etc. — out of variables; still no full Project, but a natural, game-flavored capstone for what ch. 2 alone can do)*

## Chapter 3 — Strings & Comments
*concatenation, f-strings, .upper()/len(), # comments, reading errors calmly*

3.1 Joining Strings Together
3.2 f-strings: The Easy Way to Mix Text and Variables
3.3 String Superpowers: .upper() and .lower()
3.4 Measuring a String: len()
3.5 Grabbing Part of a String: Indexing *(word[0] for the first letter, etc. — sets up ch. 5's Pig Latin project)*
3.6 Leaving Notes with # Comments
3.7 Reading an Error Message Without Panicking
3.8 Chapter 3 Wrap-Up
**→ Project: Mad Libs** *(moved here from ch. 4 — this is fundamentally a strings/f-strings exercise, not a math one. Uses variables, strings, f-strings, print.)*

## Chapter 4 — Numbers & Math
*arithmetic operators, order of operations, int vs. float*

4.1 Doing Math in Python
4.2 Order of Operations
4.3 Whole Numbers vs. Decimals (int vs. float)
4.4 Mixing Math and Strings (why you can't just add them — a first look at converting types)
4.5 Chapter 4 Wrap-Up
**→ Project: The Math Magic Trick** *(pick any number, follow a sequence of steps — double it, add 6, divide by 2, subtract your original number — and the answer is* always *the same, no matter what you started with. A genuine "wait, how does that work?!" moment that's really just algebra. Replaces an earlier "build a calculator" idea — that felt flat as its own project once ch. 13 was going to build a calculator anyway; this is a distinct, more delightful use of the same toolkit — arithmetic, order of operations, variables, print.)*

## Chapter 5 — Getting Input
*input(), combining it with variables*

5.1 Quick Recap: Chapters 1–4
5.2 Asking the User a Question: input()
5.3 Saving What They Typed
5.4 The input() Gotcha: It's Always Text
5.5 Chapter 5 Wrap-Up
**→ Project: Pig Latin Translator** *(type in a word or sentence, get it back in Pig Latin — a game they already know from the playground, now as code. Uses the string indexing from ch. 3.5 to move the first letter to the end and add "ay," plus input() and f-strings. Simplified on purpose — the classic every-word-has-a-vowel-rule version needs if/else, which doesn't exist until ch. 7–8, so this version applies one simple rule to every word rather than branching.)*

## Chapter 6 — Comparisons & Booleans
*==, <, >, True/False*

6.1 True or False: What's a Boolean?
6.2 Are They Equal? == and !=
6.3 Bigger or Smaller? < and >
6.4 Wrap-Up: **Stat Battle** *(compare two characters' stats — strength, speed, whatever — and print True/False for each matchup. No Project yet: comparisons alone can only say True or False, not react to it — that's what ch. 7 unlocks. Sets up the scenario ch. 7's project pays off.)*

## Chapter 7 — Making Decisions I
*if / else*

7.1 Teaching Python to Make Choices: if
7.2 The Other Path: else
7.3 Decisions + Input, Together
7.4 Chapter 7 Wrap-Up
**→ Project: Choose Your Own Adventure (Mini)** *(a simple branching story — one or two decision points, if/else based on what the player types. A small, single-fork taste of the idea; ch. 15's capstone is the full multi-branching version with dice/randomness. Can loosely continue ch. 6's Stat Battle scenario for a nice thread between the two, though it doesn't have to. Uses if/else + input + comparisons + variables + strings.)*

## Chapter 8 — Making Decisions II
*elif, combining conditions with and / or*

8.1 More Than Two Choices: elif
8.2 Both Things Have to Be True: and
8.3 Either Thing Can Be True: or
8.4 Chapter 8 Wrap-Up (recap of ch. 5–8)
**→ Project: Crack the Code** *(a secret-agent-themed number/code guessing game — "Guess the Number" with a spy-movie skin. Uses decisions + input + variables + strings.)*

## Chapter 9 — Lists
*creating, indexing, appending*

9.1 Quick Recap: Chapters 5–8
9.2 What's a List?
9.3 Getting Items by Index
9.4 Adding to a List: .append()
9.5 Wrap-Up: **Top 5 List** *(build and print a personal top-5 list — favorite games, animals, whatever — using nothing but lists + print; no full Project yet, loops in ch. 10–11 are what really unlock lists)*

## Chapter 10 — Looping I
*for loops, looping over lists*

10.1 Doing Something Over and Over: for Loops
10.2 Looping Over a List
10.3 Looping a Set Number of Times: range()
10.4 Wrap-Up: **Top 5 List, Take Two** *(revisit ch. 9's Top 5 List, but print it with a loop instead of five separate lines — a small, satisfying callback showing the same result done better. No Project yet — a stepping stone to ch. 11, where break/continue round out looping.)*

## Chapter 11 — Looping II
*while loops, break / continue*

11.1 Looping Until Something Changes: while
11.2 Stopping Early: break
11.3 Skipping Ahead: continue
11.4 Chapter 11 Wrap-Up (recap of ch. 9–11)
**→ Project: Pattern Art Machine** *(use loops to draw shapes/patterns out of characters — triangles, diamonds, borders — genuinely satisfying visual output, more fun than a plain times-table drill. Times-table generator kept as an optional bonus challenge within the same project. Uses loops + lists + decisions + input.)*

## Chapter 12 — Functions I
*defining functions, parameters*

12.1 Quick Recap: Chapters 9–11
12.2 Functions You Already Know *(you've been calling functions since ch. 1 — print() is one. Introduces a new one, `random.randint()`, as "someone else already wrote this function, you just call it" — sets up why writing your own, next, is useful.)*
12.3 Writing Your Own Function: def
12.4 Giving Functions Information: Parameters
12.5 Chapter 12 Wrap-Up *(no Project — a stepping stone to ch. 13, where return values complete the picture)*

## Chapter 13 — Functions II
*return values, why functions matter*

13.1 Getting an Answer Back: return
13.2 Why Functions Matter (reuse, organizing code)
13.3 Mini-Checkpoint: **Build a Calculator, the Smart Way** *(a calculator built from functions — one per operation — per CLAUDE.md's spec for this checkpoint. This is now the* only *calculator in the curriculum (ch. 4 no longer has one — see its note above), so the payoff here is "see how much cleaner this is once you know functions," not a rebuild of something they already did. Folded into practice, not a full checkpoint Project.)*

## Chapter 14 — Dictionaries
*key/value basics*

14.1 What's a Dictionary?
14.2 Getting and Setting Values by Key
14.3 Wrap-Up: **Word Lookup** *(a tiny slang/nickname/translation dictionary they build and query — no full Project, ch. 15 is where dictionaries get put to real use)*

## Chapter 15 — Putting It Together
*combining lists, loops, functions, dictionaries*

15.1 Everything You've Learned (full-course recap)
15.2 Planning Before You Code
**→ Capstone Project: The Dice Dungeon** *(a text-based dungeon-crawl adventure where dice rolls decide what happens — fights, traps, finding treasure — combining a branching story (like ch. 7's mini adventure, but full-sized) with real randomness. Definitively a dice game, not an either/or with ch. 7's adventure — those two are now clearly different in scale: ch. 7 is a single if/else fork, this is the whole course. The gap that would've blocked this — no lesson taught random number generation — is resolved: `random.randint()` is introduced in ch. 12.2, so by ch. 15 it's already a familiar tool. Uses lists, loops, functions, dictionaries, decisions, input — everything from the whole course.)*

---

## Notes on this revision

- **Projects are no longer pinned to chapters 4/8/11/15.** Assigned per-chapter based on whether there's enough material yet to build something genuinely interesting: **Ch. 3 (Mad Libs), Ch. 4 (Math Magic Trick), Ch. 5 (Pig Latin Translator), Ch. 7 (Choose Your Own Adventure Mini), Ch. 8 (Crack the Code), Ch. 11 (Pattern Art Machine), Ch. 13 (mini-checkpoint: Calculator), Ch. 15 (capstone: The Dice Dungeon)**. Chapters 1, 2, 6, 9, 10, 12, 14 don't have enough new ground alone to support a real Project — each still gets a fun, small Wrap-Up instead (several are now themed rather than a plain recap quiz).
- **Ch. 6 and Ch. 7 revisited (2026-07-18):** James flagged both as a missed opportunity. Ch. 6 (comparisons only, no `if`/`else` yet) genuinely can't branch a story — it can only print True/False — so it keeps a themed Wrap-Up (Stat Battle) rather than a forced Project. Ch. 7 (adds `if`/`else`) is exactly where a story can react to a choice, so it gets a real Project: a small single-fork Choose Your Own Adventure — a deliberately smaller taste of ch. 15's capstone, not a duplicate of it (see ch. 15's Dice Dungeon note for how they're differentiated).
- **Redundancy pass (2026-07-18):** James caught that an earlier draft had Ch. 4 build a calculator that Ch. 13 immediately rebuilt — same payoff twice, with the second time just being "in functions now." Ch. 4 got a genuinely different project (Math Magic Trick) instead of a rebuild-bait one; Ch. 13's calculator is now the *only* one in the curriculum, so its payoff is "look how much cleaner functions make this," not repetition. Went through the rest of the Projects looking for the same problem — no other overlaps found (Mad Libs vs. Pig Latin are both "combine words into something fun," but differ enough in mechanic — code-edit-and-run vs. live-interactive — and in what they produce — a silly story vs. a translator you can feed anything).
- **String indexing added to ch. 3.5** (`word[0]`, etc.) specifically to unblock Pig Latin — same pattern as adding `random.randint()` to ch. 12 to unblock the capstone: fill a real gap where the skill naturally belongs, rather than bolting it onto the project's own chapter late.
- **Ch. 10 gets a themed Wrap-Up now too** ("Top 5 List, Take Two" — reprint ch. 9's list with a loop) — a small callback, not a full Project.
- **Chapters 13–14 stay shorter** than the 4–8 lesson range elsewhere — genuinely less new ground at that point. Not padded with filler.
- **Recap lessons are still each their own numbered lesson** (5.1, 9.1, 12.1) — still open to change, hasn't come up again since the last round.
- Deeper real-world analogies (the "Bike" feedback) will show up most in the actual lesson *content* and in how each Project is framed/narrated — not really visible at the table-of-contents level. That's template/content work, next up.
