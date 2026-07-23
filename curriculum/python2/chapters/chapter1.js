// Chapter 1 — Recap Sprint: Fundamentals
// Same lesson shape as Course 1: { id, title, content (HTML string), starterCode, practice }
// practice.check(actualOutput) returns { pass: boolean, message: string }
// No project this chapter -- pure diagnostic reps before Course 2's pace picks up.

export const chapter = {
  number: 1,
  title: "Recap Sprint: Fundamentals",
  welcome: {
    content: `
      <p><strong>Welcome back.</strong> You finished all 15 chapters of Course 1 — variables,
      strings, numbers, input, comparisons, decisions, lists, loops, functions, dictionaries, all
      of it. That's a real course, completed. This one goes further.</p>

      <p>Course 2 is a genuine step up — not just more of the same at the same pace. From here on,
      almost everything you build feeds into one growing project: a text-adventure game you'll
      keep extending, chapter after chapter, all the way to a capstone at the end where you design
      your own addition to it. By the time you're done, you'll be ready to start a real project
      with your dad's help.</p>

      <p>Before any of that starts, this chapter and the next are a fast recap — not new material,
      just proving to yourself that Course 1's tools are still sharp. These moves faster than
      Course 1 did, and the practice exercises are harder: less hand-holding, more combining
      things together.</p>
    `,
  },
  lessons: [
    {
      id: "1.1",
      title: "Fundamentals Speed Round: Variables, Strings, Numbers",
      content: `
        <p>Quick refresher, all at once: variables store values, f-strings mix text and variables
        together, and Python does math with <code>+ - * /</code> the way you'd expect (mostly —
        remember order of operations).</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>name = "Robin"
gold = 40
found = 15
print(f"{name} now has {gold + found} gold.")</code></pre>
          <p>Output: <code>Robin now has 55 gold.</code> Notice the math happens right inside the
          f-string's curly braces — no need to store <code>gold + found</code> in its own variable
          first.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>mixing a number and a string with <code>+</code> outside an f-string still crashes
          with a <code>TypeError</code> — f-strings convert for you automatically, plain
          <code>+</code> concatenation does not.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Three variables are set up for you: <code>hero</code>, <code>hp</code>, and
          <code>damage_taken</code>. Print exactly one line, using an f-string:
          <code>Robin has 28 HP left.</code> (that's <code>hp - damage_taken</code>).</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>f-strings can do math inline — <code>{hp - damage_taken}</code> works exactly like
          <code>{gold + found}</code> did above.</p>
        </div>
      `,
      starterCode: `hero = "Robin"
hp = 40
damage_taken = 12
# print an f-string here`,
      practice: {
        instructions: "Print exactly: Robin has 28 HP left.",
        solution: `hero = "Robin"
hp = 40
damage_taken = 12
print(f"{hero} has {hp - damage_taken} HP left.")`,
        check(actualOutput) {
          const got = actualOutput.trim();
          const want = "Robin has 28 HP left.";
          if (got === want) {
            return { pass: true, message: "Math inside an f-string, no extra variable needed." };
          }
          return { pass: false, message: `Not quite — we want exactly "${want}".` };
        },
      },
    },
    {
      id: "1.2",
      title: "Input & Comparisons, Revisited",
      content: `
        <p><code>input()</code> always returns a string, and comparisons (<code>== != < > <= >=</code>)
        always return <code>True</code> or <code>False</code>. Both come up constantly once your
        game is reading commands and checking conditions.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>gold = int(input("How much gold do you have? "))
print(gold >= 50)</code></pre>
          <p>Typing <code>75</code> prints <code>True</code>. Notice the <code>int(...)</code>
          wrapped around <code>input()</code> — without it, <code>gold</code> would be the string
          <code>"75"</code>, and comparing a string to a number with <code>>=</code> crashes.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p><code>input()</code>'s answer keeps whatever the person actually typed, spaces and
          all — <code>" yes"</code> (with a leading space) does not equal <code>"yes"</code>.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Ask <code>"Enter your level: "</code>, convert it to an <code>int</code>, and print
          whether it's greater than or equal to <code>10</code> — just <code>True</code> or
          <code>False</code>, nothing else.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>Convert <code>input()</code> with <code>int(...)</code> before comparing it to a
          number — comparing raw strings to numbers crashes your program.</p>
        </div>
      `,
      starterCode: `level = input("Enter your level: ")
print(level >= 10)`,
      practice: {
        instructions: "Fix this so it converts the input to an int before comparing, printing True or False.",
        solution: `level = int(input("Enter your level: "))
print(level >= 10)`,
        check(actualOutput) {
          // endsWith, not === : input()'s own prompt text lands in this same
          // output, right before whichever value got printed.
          const got = actualOutput.trim();
          if (got.endsWith("True") || got.endsWith("False")) {
            return { pass: true, message: "Converted first, then compared — exactly right." };
          }
          return { pass: false, message: "Not quite — wrap input() in int(...) before comparing it with >=." };
        },
      },
    },
    {
      id: "1.3",
      title: "Chapter 1 Wrap-Up",
      content: `
        <p>Variables, f-strings, math, <code>input()</code>, comparisons — still sharp. One more
        recap chapter (conditionals, lists, loops, functions), then the real project starts.</p>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>Chapter 1 complete — no project yet, just confirming the fundamentals are solid.</p>
        </div>
      `,
      starterCode: `# Nothing to fix here — press Next when you're ready for Chapter 2.
print("Chapter 1 complete!")`,
      practice: null,
    },
  ],
};
