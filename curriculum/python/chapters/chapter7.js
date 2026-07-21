// Chapter 7 — Making Decisions I
// Content follows curriculum/python/template.md — see that file for the
// shape every Chapter Welcome / Lesson / Project should follow.
// Each lesson: { id, title, content (HTML string), starterCode, practice }
// practice.check(actualOutput) returns { pass: boolean, message: string }

export const chapter = {
  number: 7,
  title: "Making Decisions I",
  welcome: {
    content: `
      <p><strong>Chapter 7: Making Decisions I.</strong> Chapter 6 taught Python to answer
      True/False questions. This chapter is where that finally matters — your program can now
      actually <em>react</em> to the answer, running different code depending on whether something
      is true or false.</p>

      <p><strong>Why this actually matters:</strong> remember that "did the player run out of
      health?" question from last chapter? Now your program can actually <em>do</em> something
      about it — show a "Game Over" screen if the answer is yes, or keep playing if it's no.
      Every fork in every game, every "if your password is wrong, try again" message, every app
      that behaves differently depending on what you tapped — all of it is this same idea:
      check something, then choose what happens next.</p>

      <p>By the end of this chapter, you'll build a small branching story — a
      <strong>Choose Your Own Adventure</strong> where what happens next depends on what the
      player actually types.</p>

      <p>No clock here — take your time. Press <strong>Next</strong> or pick a lesson from the
      dropdown above whenever you're ready.</p>
    `,
  },
  lessons: [
    {
      id: "7.1",
      title: "Teaching Python to Make Choices: if",
      content: `
        <p>An <code>if</code> statement runs some code <em>only</em> when a condition is
        <code>True</code>. The code that should only run conditionally goes on the next line(s),
        indented — Python uses that indentation to know exactly which lines belong to the
        <code>if</code>.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>health = 50
if health > 0:
    print("You're still alive!")</code></pre>
          <p><code>health > 0</code> is <code>True</code> (50 is bigger than 0), so the indented
          <code>print()</code> runs. Output: <code>You're still alive!</code> Notice the colon
          <code>:</code> at the end of the <code>if</code> line, and the indentation (a few
          spaces) on the line underneath — both are required, not optional style choices.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>forgetting to indent the line(s) under an <code>if</code> — Python needs that
          indentation to know what's "inside" the <code>if</code>. Skip it, and you'll get an
          <code>IndentationError</code> instead of your program running.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>The code on the right is missing its indentation, so it won't run. Fix it so it
          prints exactly <code>You're still alive!</code></p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>if condition:</code> followed by an indented line runs that line only when the
          condition is <code>True</code>.</p>
        </div>
      `,
      starterCode: `health = 50
if health > 0:
print("You're still alive!")`,
      practice: {
        instructions: "Fix the indentation so the message prints when the condition is true, printing exactly: You're still alive!",
        solution: `health = 50
if health > 0:
    print("You're still alive!")`,
        check(actualOutput) {
          const got = actualOutput.trim();
          const want = "You're still alive!";
          if (got === want) {
            return { pass: true, message: "Fixed — that indentation is what tells Python this line belongs to the if." };
          }
          return {
            pass: false,
            message: `Not quite — we want the output to be "${want}". Indent the print() line underneath the if.`,
          };
        },
      },
    },
    {
      id: "7.2",
      title: "The Other Path: else",
      content: `
        <p><code>else</code> gives your program a second path — code that runs only when the
        <code>if</code>'s condition is <code>False</code>. Together, <code>if</code>/<code>else</code>
        guarantee exactly one of the two paths runs, never both, never neither.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>health = 0
if health > 0:
    print("You're still alive!")
else:
    print("Game over!")</code></pre>
          <p><code>health > 0</code> is <code>False</code> this time (0 isn't bigger than 0), so
          Python skips the <code>if</code>'s line and runs the <code>else</code>'s instead. Output:
          <code>Game over!</code></p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p><code>else</code> has no condition of its own — no parentheses, nothing after it
          except a colon. It also has to line up exactly with its matching <code>if</code> (same
          indentation), not the indented line underneath it.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p><code>score</code> is <code>3</code>, which doesn't pass the <code>if</code>'s check.
          Add an <code>else</code> that prints <code>Try again!</code>, so the output is exactly
          <code>Try again!</code></p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>else</code> runs when the <code>if</code>'s condition is <code>False</code> —
          together they cover both possibilities.</p>
        </div>
      `,
      starterCode: `score = 3
if score >= 5:
    print("You passed!")`,
      practice: {
        instructions: "Add an else branch that prints Try again! so the output (since score is 3) is exactly: Try again!",
        solution: `score = 3
if score >= 5:
    print("You passed!")
else:
    print("Try again!")`,
        check(actualOutput) {
          const got = actualOutput.trim();
          const want = "Try again!";
          if (got === want) {
            return { pass: true, message: "Right — score didn't pass the check, so the else branch ran instead." };
          }
          return {
            pass: false,
            message: `Not quite — we want the output to be "${want}". Add an else: block underneath the if, lined up with it.`,
          };
        },
      },
    },
    {
      id: "7.3",
      title: "Decisions + Input, Together",
      content: `
        <p>This is where the last few chapters click together: use <code>input()</code> to get an
        answer, then <code>if</code>/<code>else</code> to react differently depending on what was
        typed.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>password = input("Enter the password: ")
if password == "sesame":
    print("Access granted!")
else:
    print("Access denied!")</code></pre>
          <p><code>input()</code>'s answer is a string, so comparing it with <code>==</code> works
          exactly like Chapter 6 — no conversion needed here, unlike the number gotcha from
          Chapter 5.4. Typing <code>sesame</code> prints <code>Access granted!</code>; anything
          else prints <code>Access denied!</code></p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>capitalization and spelling matter in the comparison — <code>"Sesame"</code> or
          <code>"sesame "</code> (with an extra space) won't match <code>"sesame"</code>, and would
          fall through to the <code>else</code>.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Ask <code>"Do you like pizza? (yes/no): "</code> and store the answer in
          <code>answer</code>. If it's exactly <code>"yes"</code>, print
          <code>Pizza is the best!</code> — otherwise print <code>More pizza for me!</code></p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>input()</code> plus <code>if</code>/<code>else</code> lets your program react
          differently depending on what the person actually types.</p>
        </div>
      `,
      starterCode: `answer = input("Do you like pizza? (yes/no): ")
if answer == "yes":
    print("fix me")
else:
    print("fix me")`,
      practice: {
        instructions: 'If the answer is "yes", print exactly: Pizza is the best! Otherwise print exactly: More pizza for me!',
        solution: `answer = input("Do you like pizza? (yes/no): ")
if answer == "yes":
    print("Pizza is the best!")
else:
    print("More pizza for me!")`,
        check(actualOutput) {
          const got = actualOutput.trim();
          // endsWith, not ===: input()'s own prompt text lands in this same
          // output, right before whichever message got printed.
          if (got.endsWith("Pizza is the best!") || got.endsWith("More pizza for me!")) {
            return { pass: true, message: "Your if/else reacted correctly to whatever you typed." };
          }
          return {
            pass: false,
            message: `Not quite — the if branch should print exactly "Pizza is the best!" and the else branch exactly "More pizza for me!"`,
          };
        },
      },
    },
    {
      id: "7.4",
      title: "Chapter 7 Wrap-Up",
      content: `
        <p>You can now make your program branch — running one path or another depending on a
        condition, and combining that with <code>input()</code> so the branch depends on what the
        person actually types. That's everything you need for a real branching story.</p>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>if</code> runs code when a condition is true, <code>else</code> covers the
          opposite case — Chapter 7, complete! Up next: a small Choose Your Own Adventure.</p>
        </div>
      `,
      starterCode: `# Nothing to fix here — just press Next when you're ready for the Project.
print("Chapter 7 complete!")`,
      practice: null,
    },
  ],
  project: {
    title: "Choose Your Own Adventure (Mini)",
    content: `
      <p><strong>The Challenge:</strong> build a small branching story — the player makes a
      choice, and what happens next actually depends on what they typed. This is a taste of a much
      bigger version of this same idea waiting for you at the very end of the course.</p>
      <div class="lesson-recap">
        <span class="lesson-label">What You'll Use</span>
        <ul>
          <li><code>input()</code>, to ask the player what they want to do (Chapter 5)</li>
          <li><code>if</code>/<code>else</code>, to branch the story based on their answer (this
          chapter)</li>
          <li>Variables, strings, and <code>print()</code>, to tell the story itself (Chapters
          1–3)</li>
        </ul>
      </div>
      <div class="lesson-turn">
        <span class="lesson-label">Step-By-Step</span>
        <ol>
          <li>The starter code sets the scene, then asks the player to choose a direction.</li>
          <li>An <code>if</code>/<code>else</code> tells a different part of the story depending
          on which way they picked.</li>
          <li>A second question and a second <code>if</code>/<code>else</code> branch the story
          again.</li>
          <li>Run it, try both answers at each question, and rewrite the story text to be your
          own. If you want a bigger challenge, add a third question and branch with its own
          <code>if</code>/<code>else</code>.</li>
        </ol>
      </div>
      <div class="lesson-tip">
        <span class="lesson-label">Watch Out For</span>
        <p>every <code>if</code> needs its matching <code>else</code> lined up underneath it at
        the same indentation — if you add your own extra branch, double-check the indentation
        matches the pattern already in the starter code.</p>
      </div>
    `,
    starterCode: `print("You step into a dark cave. The path splits in two directions.")
direction = input("Go left or right? (left/right): ")

if direction == "left":
    print("You follow a glittering stream to a hidden waterfall.")
else:
    print("You duck into a narrow tunnel that opens into a huge cavern.")

print()
chest_choice = input("You spot an old chest. Open it? (yes/no): ")

if chest_choice == "yes":
    print("Inside is a dusty map to even more caves nearby!")
else:
    print("You leave it alone and head back out, empty-handed but safe.")`,
  },
};
