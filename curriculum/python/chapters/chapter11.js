// Chapter 11 — Looping II
// Content follows curriculum/python/template.md — see that file for the
// shape every Chapter Welcome / Lesson / Project should follow.
// Each lesson: { id, title, content (HTML string), starterCode, practice }
// practice.check(actualOutput) returns { pass: boolean, message: string }
//
// Note: none of this chapter's starter/solution code is an actual infinite
// loop, even where the lesson is *about* infinite loops (11.1) — that's
// deliberate, since a real one would hang the browser tab when run. The
// danger is explained in prose; the runnable code always still terminates.

export const chapter = {
  number: 11,
  title: "Looping II",
  welcome: {
    content: `
      <p><strong>Chapter 11: Looping II.</strong> Chapter 10's <code>for</code> loop is great when
      you know how many times to repeat something. This chapter adds <code>while</code> — a loop
      that keeps going as long as a condition stays true, however many times that turns out to
      be — plus two ways to control a loop early: <code>break</code> and <code>continue</code>.</p>

      <p><strong>Why this actually matters:</strong> think about a game that keeps going "while
      your health is above 0" — nobody knows in advance exactly how many turns that'll take. Or a
      loop that needs to stop the instant it finds what it's looking for, without checking
      everything else. That's exactly what <code>while</code>, <code>break</code>, and
      <code>continue</code> are for.</p>

      <p>By the end of this chapter, you'll build a <strong>Pattern Art Machine</strong> — using
      loops to draw shapes out of characters, entirely under your control.</p>

      <p>No clock here — take your time. Press <strong>Next</strong> or pick a lesson from the
      dropdown above whenever you're ready.</p>
    `,
  },
  lessons: [
    {
      id: "11.1",
      title: "Looping Until Something Changes: while",
      content: `
        <p>A <code>while</code> loop keeps repeating <em>as long as</em> its condition stays
        <code>True</code> — unlike a <code>for</code> loop, it doesn't know in advance how many
        times it'll run. Something inside the loop needs to eventually make the condition
        <code>False</code>, or it'll never stop.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>count = 0
while count < 3:
    print(count)
    count = count + 1</code></pre>
          <p>checks <code>count < 3</code> before each pass, prints <code>count</code>, then
          increases it by 1. Once <code>count</code> reaches <code>3</code>, the condition becomes
          <code>False</code> and the loop stops. Output: <code>0</code>, <code>1</code>,
          <code>2</code>.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>forgetting to update the variable inside the loop (like <code>count = count +
          1</code>) creates an <strong>infinite loop</strong> — the condition never becomes false,
          so the loop never stops and your program (or browser tab) just hangs. Always double
          check there's a line that moves the condition toward becoming false.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>The loop on the right runs one too many times. Fix the condition so it prints exactly
          three lines: <code>0</code>, <code>1</code>, <code>2</code>.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>while condition:</code> keeps looping as long as the condition is true —
          always make sure something inside the loop eventually makes it false.</p>
        </div>
      `,
      starterCode: `count = 0
while count < 5:
    print(count)
    count = count + 1`,
      practice: {
        instructions: "Fix the condition so it prints exactly three lines: 0 / 1 / 2",
        solution: `count = 0
while count < 3:
    print(count)
    count = count + 1`,
        check(actualOutput) {
          const got = actualOutput.trim();
          const want = "0\n1\n2";
          if (got === want) {
            return { pass: true, message: "Fixed — the loop now stops right where we want it to." };
          }
          return {
            pass: false,
            message: `Not quite — we want exactly "0", "1", "2". Change the condition to count < 3.`,
          };
        },
      },
    },
    {
      id: "11.2",
      title: "Stopping Early: break",
      content: `
        <p><code>break</code> immediately exits a loop, no matter what — even a <code>for</code>
        loop with items left to go, or a <code>while</code> loop whose condition is still
        <code>True</code>.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>for number in [1, 2, 3, 4, 5]:
    if number == 3:
        break
    print(number)</code></pre>
          <p>prints numbers one at a time, but the moment <code>number</code> equals
          <code>3</code>, <code>break</code> exits the loop entirely — <code>3</code> never gets
          printed, and neither does anything after it. Output: <code>1</code>, <code>2</code>.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p><code>break</code> exits the <em>whole</em> loop, not just the current pass — the
          loop doesn't pick back up with the next item afterward. It's done for good.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Add a <code>break</code> so the loop stops the moment it reaches <code>"stop"</code>,
          so the output is exactly these three lines:</p>
          <pre><code>go
go
go</code></pre>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>break</code> exits a loop immediately and completely — the loop doesn't
          continue with what's left.</p>
        </div>
      `,
      starterCode: `commands = ["go", "go", "go", "stop", "go"]
for command in commands:
    print(command)`,
      practice: {
        instructions: 'Add a break so the loop stops at "stop", printing exactly: go / go / go',
        solution: `commands = ["go", "go", "go", "stop", "go"]
for command in commands:
    if command == "stop":
        break
    print(command)`,
        check(actualOutput) {
          const got = actualOutput.trim();
          const want = "go\ngo\ngo";
          if (got === want) {
            return { pass: true, message: "Right — break stopped the loop the moment it hit \"stop\"." };
          }
          return {
            pass: false,
            message: `Not quite — we want exactly three lines of "go". Add an if command == "stop": break before the print.`,
          };
        },
      },
    },
    {
      id: "11.3",
      title: "Skipping Ahead: continue",
      content: `
        <p><code>continue</code> skips the <em>rest</em> of the current pass through the loop and
        jumps straight to the next item — unlike <code>break</code>, the loop keeps going, it just
        skips over one.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>for number in [1, 2, 3, 4, 5]:
    if number == 3:
        continue
    print(number)</code></pre>
          <p>when <code>number</code> is <code>3</code>, <code>continue</code> skips the
          <code>print()</code> for that pass only — the loop moves on to <code>4</code> and
          <code>5</code> like normal. Output: <code>1</code>, <code>2</code>, <code>4</code>,
          <code>5</code> — only <code>3</code> is missing.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>mixing up <code>break</code> and <code>continue</code> — <code>break</code> stops the
          loop for good, <code>continue</code> only skips the current item and keeps going. Swap
          them by accident and you'll get a very different result.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Add a <code>continue</code> so the loop skips <code>"broken"</code> but still prints
          everything else, so the output is exactly:</p>
          <pre><code>sword
shield
potion</code></pre>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>continue</code> skips just the current pass and keeps looping —
          <code>break</code> stops everything.</p>
        </div>
      `,
      starterCode: `items = ["sword", "broken", "shield", "potion"]
for item in items:
    print(item)`,
      practice: {
        instructions: 'Add a continue so "broken" is skipped, printing exactly: sword / shield / potion',
        solution: `items = ["sword", "broken", "shield", "potion"]
for item in items:
    if item == "broken":
        continue
    print(item)`,
        check(actualOutput) {
          const got = actualOutput.trim();
          const want = "sword\nshield\npotion";
          if (got === want) {
            return { pass: true, message: "Right — continue skipped just that one item and kept looping." };
          }
          return {
            pass: false,
            message: `Not quite — we want "sword", "shield", "potion", with "broken" skipped. Add an if item == "broken": continue before the print.`,
          };
        },
      },
    },
    {
      id: "11.4",
      title: "Chapter 11 Wrap-Up",
      content: `
        <p>A quick look back across three chapters of lists and loops. You can now: store many
        values in a list and grab items by index (Chapter 9), repeat code with <code>for</code>
        and <code>range()</code> (Chapter 10), and now loop with <code>while</code>, stopping early
        with <code>break</code> or skipping ahead with <code>continue</code> (this chapter).</p>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>while</code> loops until a condition changes, <code>break</code> stops a loop
          entirely, <code>continue</code> skips just one pass — Chapter 11, complete! Up next:
          drawing with loops.</p>
        </div>
      `,
      starterCode: `# Nothing to fix here — just press Next when you're ready for the Project.
print("Chapter 11 complete!")`,
      practice: null,
    },
  ],
  project: {
    title: "Pattern Art Machine",
    content: `
      <p><strong>The Challenge:</strong> use loops to draw a picture out of characters — a
      triangle that grows one row at a time, built entirely by a loop instead of typed out by
      hand.</p>
      <div class="lesson-recap">
        <span class="lesson-label">What You'll Use</span>
        <ul>
          <li><code>input()</code> and <code>int()</code>, to ask how big to draw it (Chapter 5)</li>
          <li>A <code>for</code> loop with <code>range()</code>, to repeat once per row (Chapter
          10)</li>
          <li><code>print()</code>, to draw each row (Chapter 1)</li>
        </ul>
      </div>
      <div class="lesson-turn">
        <span class="lesson-label">Step-By-Step</span>
        <p>Two new tricks you'll need. First: <code>range()</code> can take <em>two</em>
        arguments, a start and an end — <code>range(1, 5)</code> counts <code>1, 2, 3, 4</code>
        instead of always starting at 0. Second: multiplying a string by a number repeats it —
        <code>"*" * 3</code> gives you <code>"***"</code>.</p>
        <ol>
          <li>Ask for a size (how many rows) and convert it with <code>int()</code>.</li>
          <li>Loop with <code>range(1, size + 1)</code>, so the row count starts at 1.</li>
          <li>Each pass, print <code>"*" * row</code> — one row of stars whose length grows with
          the loop.</li>
          <li>Run it with a few different sizes and watch the triangle grow.</li>
          <li><strong>Bonus, if you want a bigger challenge:</strong> try a different shape (a
          square border, or a diamond), or look up how a times-table generator works using two
          loops, one inside the other.</li>
        </ol>
      </div>
      <div class="lesson-tip">
        <span class="lesson-label">Watch Out For</span>
        <p><code>"*" * row</code> and <code>row * "*"</code> both work — but <code>row +
        "*"</code> doesn't, since <code>+</code> means something different for strings
        (Chapter 3.1) than <code>*</code> does here.</p>
      </div>
    `,
    starterCode: `size_text = input("How tall should the triangle be? ")
size = int(size_text)

for row in range(1, size + 1):
    print("*" * row)`,
  },
};
