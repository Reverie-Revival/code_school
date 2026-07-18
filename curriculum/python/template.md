# Code School — Content Templates (Python)

**Status: DRAFT — first pass, for review.** Defines the consistent shape every Chapter Welcome page, Lesson, and Project should follow once we start writing real content. Audience/tone reminders live in `memory/user_team.md` — 9 and 12 year olds, young-adult voice, heavy scaffolding, real-world analogies especially in later chapters.

---

## 1. Chapter Welcome Page

What the boys land on before Lesson 1 of each chapter (already built as a concept — see `renderWelcome()` in `js/app.js` — this defines what actually goes *in* it).

1. **The Big Idea** — one or two sentences: what this chapter covers, in plain terms.
2. **Why This Actually Matters** *(new, per James — this is the core addition)* — a short real-world story or scenario, told at a young-adult level, connecting the chapter's concept to something real. Not a dry "this is used in industry" line — an actual short narrative or relatable scenario. Examples of the kind of angle to reach for:
   - Ch. 1 (print/what is code): every app on their iPad, every game, every button that does something — all of it is just code telling the device what to say and do. `print()` is the simplest version of that same basic idea.
   - Ch. 12–13 (functions): the "Bike" analogy James raised — a bike is built from reusable, interchangeable parts (wheels, brakes, chain) that don't have to be reinvented each time; a function is the same idea in code — reusable pieces of a build that snap together.
   - Chapters without an obvious concrete analogy (e.g., ch. 6, comparisons) can lean on a smaller relatable moment instead of forcing a big story — doesn't need to be profound every time.
3. **What You'll Build** — a one-line teaser of the chapter's Project or themed Wrap-Up, to build anticipation ("By the end of this chapter, you'll build a translator that turns any sentence into Pig Latin").
4. Lesson list is already handled by the header dropdown — no need to repeat it here.

---

## 2. Lesson

Every lesson (practice or not) follows the same shape. Roughly a few paragraphs total per CLAUDE.md's own "short explanation, one concept" rule — this template organizes those paragraphs, it doesn't lengthen them.

1. **The Concept** — the core explanation. One idea only. This is most of what already exists in lessons 1.1/1.2.
2. **See It In Action** — a small worked example, shown and briefly explained (not left for the kid to figure out cold). For lessons without practice (like 1.1), this can just *be* the starter code they run. For practice lessons, this is a separate example distinct from the blank/stub they'll edit.
3. **Real-World Tie-In** *(optional, lean into it more as chapters get more abstract)* — one or two sentences connecting the concept to something concrete. Skip it where it'd feel forced (e.g., naming-variable rules don't need a metaphor); use it where it earns its place (functions, dictionaries, loops).
4. **Watch Out For...** — a short, specific heads-up about the one mistake beginners actually make with this exact concept (forgetting quotes, capitalization mattering, off-by-one in `range()`, etc.) — not a generic "be careful" line.
5. **Your Turn** — the practice exercise (unchanged mechanically from what's built: instructions + auto-check on Run).
6. **Quick Recap** — one bolded takeaway sentence closing the lesson out.

## 3. Project

Structurally different from a lesson — bigger, more open-ended, not strictly auto-checked. Should feel like a "real thing you're building," not a longer practice exercise.

1. **The Challenge** — a punchy description of what they're building and why it's fun, using the theme already chosen (Mad Libs, Pig Latin Translator, Crack the Code, etc.). Can call back to the chapter's Welcome-page story if there's a natural thread.
2. **What You'll Use** — a short, explicit list of which tools from *this* chapter and *prior* chapters this project pulls together. Makes the cascade visible instead of implicit — "this uses input() from ch. 5, if/else from ch. 7, and what you just learned about elif."
3. **Step-by-Step Guidance** — unlike a lesson's practice, Projects get real scaffolding: a short numbered list of build steps (not the full solution, just the shape — "Step 1: ask for three words. Step 2: ..."). Heavier guidance here is appropriate specifically *because* Projects aren't auto-graded — there's no check to spoil.
4. **Starter Code** — more substantial than a lesson's starter, likely with comments marking where to fill in, since building a whole project from a blank editor is a bigger ask than a 2–3 line practice.
5. **When You're Done** — placeholder pending `project_ideas.md`'s still-open Project-verification decision. Whatever that resolves to (candidate direction: "ran without erroring" + a self-click "I showed someone!" button) plugs in here. Not writing this section's actual behavior yet — noting where it goes.

---

## Worked example: applying this to Chapter 1

Concrete, not hypothetical — here's roughly how the template maps onto what's already built, to make it easier to react to:

- **Welcome page** would gain a "Why This Actually Matters" story (currently missing) about how every app/game on their iPad is just code — something they interact with daily, now something they're learning to write themselves.
- **Lesson 1.1** already has Concept + a runnable example (the starter code *is* the example, since there's no practice yet) — would gain a short "Watch Out For" (forgetting the quotes around text) and a one-line recap.
- **Lesson 1.2** already has Concept + Your Turn (practice) — would gain a distinct worked example shown before the blank-to-edit starter code, a "Watch Out For" (capitalization/punctuation — this is literally the lesson's point, so the tip reinforces it rather than undercutting it), and a recap line.

---

## What this means for the app (not doing yet, flagging for later)

- The lesson-pane already renders raw HTML (`lesson.content`), so most of this template is just more structured HTML within that same field — a few new CSS classes (e.g. a distinct look for "Watch Out For" callouts) would help it read clearly, not a big change.
- **Projects don't exist as a distinct content type yet** — `content`'s data model only has a `lessons` array with an optional `practice`. Before any real Project content can be written, we need a `chapter.project` shape and a rendering path in `js/app.js` distinct from a lesson (different layout needs: step-by-step guidance, bigger starter code, the "When You're Done" self-report mechanism once that's decided). Real build work, not something to start until this template is approved.
