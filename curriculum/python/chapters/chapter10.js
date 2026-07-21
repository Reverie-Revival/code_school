// Chapter 10 — Looping I
// Content follows curriculum/python/template.md — see that file for the
// shape every Chapter Welcome / Lesson / Project should follow.
// Each lesson: { id, title, content (HTML string), starterCode, practice }
// practice.check(actualOutput) returns { pass: boolean, message: string }

export const chapter = {
  number: 10,
  title: "Looping I",
  welcome: {
    content: `
      <p><strong>Chapter 10: Looping I.</strong> So far, doing something five times has meant
      writing the same line five times. This chapter fixes that — the <code>for</code> loop
      repeats code automatically, once for each item in a list or a set number of times.</p>

      <p><strong>Why this actually matters:</strong> think about a game printing every item in
      your inventory, or an app showing every message in your inbox — nobody wrote a separate
      <code>print()</code> for each one. A loop ran once, and handled all of them, no matter how
      many there were. That's the whole point of a loop: write the instructions once, let Python
      repeat them.</p>

      <p>By the end of this chapter, you'll revisit your Top 5 List from Chapter 9 — same result,
      built with a loop instead of five separate lines.</p>

      <p>No clock here — take your time. Press <strong>Next</strong> or pick a lesson from the
      dropdown above whenever you're ready.</p>
    `,
  },
  lessons: [
    {
      id: "10.1",
      title: "Doing Something Over and Over: for Loops",
      content: `
        <p>A <code>for</code> loop repeats a block of code once for each item in something —
        like a list. The indented line(s) underneath run once per item, exactly like the
        indentation rule from <code>if</code> back in Chapter 7.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>for number in [1, 2, 3]:
    print(number)</code></pre>
          <p>runs <code>print(number)</code> three times — once with <code>number</code> set to
          <code>1</code>, once set to <code>2</code>, once set to <code>3</code>. Output:
          <code>1</code>, <code>2</code>, <code>3</code>, each on its own line.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>just like <code>if</code>, a <code>for</code> loop needs a colon <code>:</code> at
          the end of its line and an indented block underneath — forget either and you'll get a
          <code>SyntaxError</code> or <code>IndentationError</code>.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>The code on the right is missing its indentation, so it won't run. Fix it so it
          prints each number in the list, one per line, in order:</p>
          <pre><code>10
20
30</code></pre>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>for item in something:</code> followed by an indented block repeats that block
          once for every item.</p>
        </div>
      `,
      starterCode: `for number in [10, 20, 30]:
print(number)`,
      practice: {
        instructions: "Fix the indentation so it prints each number on its own line, in order: 10 / 20 / 30",
        solution: `for number in [10, 20, 30]:
    print(number)`,
        check(actualOutput) {
          const got = actualOutput.trim();
          const want = "10\n20\n30";
          if (got === want) {
            return { pass: true, message: "Fixed — that indentation is what makes it part of the loop." };
          }
          return {
            pass: false,
            message: `Not quite — we want three lines: "10", "20", "30". Indent the print() line underneath the for.`,
          };
        },
      },
    },
    {
      id: "10.2",
      title: "Looping Over a List",
      content: `
        <p>You can loop directly over a list of any kind of value, not just numbers. The loop
        variable (<code>fruit</code> below) takes on each item in turn — and its name is entirely
        up to you, just like any other variable.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)</code></pre>
          <p>each pass through the loop, <code>fruit</code> holds the next item from
          <code>fruits</code>. Output: <code>apple</code>, <code>banana</code>, <code>cherry</code>,
          each on its own line.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>the loop variable's name doesn't have to match the list's name in any special way —
          <code>fruit</code> and <code>fruits</code> are just two ordinary variables. Pick whatever
          name makes the single item clear.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Loop over <code>pets</code> and print each one with a label, so the output is exactly
          these three lines:</p>
          <pre><code>I have a: dog
I have a: cat
I have a: fish</code></pre>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>a <code>for</code> loop works over any list — the loop variable takes on each item,
          one pass at a time.</p>
        </div>
      `,
      starterCode: `pets = ["dog", "cat", "fish"]
for pet in pets:
    print(pet)`,
      practice: {
        instructions: "Print each pet with a label, so the output is exactly: I have a: dog / I have a: cat / I have a: fish",
        solution: `pets = ["dog", "cat", "fish"]
for pet in pets:
    print(f"I have a: {pet}")`,
        check(actualOutput) {
          const got = actualOutput.trim();
          const want = "I have a: dog\nI have a: cat\nI have a: fish";
          if (got === want) {
            return { pass: true, message: "Right — one f-string, run once per pet by the loop." };
          }
          return {
            pass: false,
            message: `Not quite — check each line reads "I have a: <pet>" using an f-string inside the loop.`,
          };
        },
      },
    },
    {
      id: "10.3",
      title: "Looping a Set Number of Times: range()",
      content: `
        <p>Sometimes you just want to repeat something a set number of times, without an existing
        list. <code>range(n)</code> gives you exactly that — <code>range(3)</code> counts
        <code>0</code>, <code>1</code>, <code>2</code>: three numbers, three trips through the
        loop.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>for i in range(3):
    print(i)</code></pre>
          <p>loops three times, with <code>i</code> taking the values <code>0</code>,
          <code>1</code>, then <code>2</code>. Output: <code>0</code>, <code>1</code>,
          <code>2</code>, each on its own line.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p><code>range(3)</code> gives you <code>0</code>, <code>1</code>, <code>2</code> —
          <em>three</em> numbers total, never <code>3</code> itself. This trips almost everyone up
          the first time.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Use <code>range()</code> to print <code>Training rep!</code> exactly 4 times, one per
          line.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>range(n)</code> loops <code>n</code> times, counting from <code>0</code> up to
          (but not including) <code>n</code>.</p>
        </div>
      `,
      starterCode: `for i in range(2):
    print("Training rep!")`,
      practice: {
        instructions: "Use range() to print Training rep! exactly 4 times, one per line.",
        solution: `for i in range(4):
    print("Training rep!")`,
        check(actualOutput) {
          const got = actualOutput.trim();
          const want = "Training rep!\nTraining rep!\nTraining rep!\nTraining rep!";
          if (got === want) {
            return { pass: true, message: "Right — range(4) means four trips through the loop." };
          }
          return {
            pass: false,
            message: `Not quite — we want "Training rep!" printed exactly 4 times. Check your range() argument.`,
          };
        },
      },
    },
    {
      id: "10.4",
      title: "Wrap-Up: Top 5 List, Take Two",
      content: `
        <p>Remember Chapter 9's Top 5 List, printed with five separate lines? Now you know a
        better way.</p>
        <p><strong>Top 5 List, Take Two:</strong> rebuild that same list, but print it with a
        <code>for</code> loop instead of writing out each line by hand.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>top_games = ["Chess", "Minecraft", "Mario Kart", "Tetris", "Zelda"]
for game in top_games:
    print(game)</code></pre>
          <p>not something to copy — just to show the idea: the exact same list from Chapter 9,
          printed with one loop instead of five separate <code>print()</code> lines.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>there's no auto-check here — the point is just seeing the same result come out of a
          loop instead of repeated lines. Use your own top 5 from Chapter 9, or make a new one.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Challenge</span>
          <p>Build your top 5 list again (or reuse the one from Chapter 9) and print it with a
          <code>for</code> loop. There's nothing to auto-check here. Just have fun with it, and
          show a parent what you made when you're happy with it.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>for</code> loops, looping over a list, and <code>range()</code> for a set
          number of repeats — Chapter 10, complete!</p>
        </div>
      `,
      starterCode: `top_games = ["Chess", "Minecraft", "Mario Kart", "Tetris", "Zelda"]
for game in top_games:
    print(game)`,
      practice: null,
    },
  ],
};
