// Chapter 8 — Making Decisions II
// Content follows curriculum/python/template.md — see that file for the
// shape every Chapter Welcome / Lesson / Project should follow.
// Each lesson: { id, title, content (HTML string), starterCode, practice }
// practice.check(actualOutput) returns { pass: boolean, message: string }

export const chapter = {
  number: 8,
  title: "Making Decisions II",
  welcome: {
    content: `
      <p><strong>Chapter 8: Making Decisions II.</strong> Chapter 7 gave you two paths — if and
      else. This chapter adds more choices at once (<code>elif</code>) and a way to combine
      conditions together (<code>and</code>, <code>or</code>).</p>

      <p><strong>Why this actually matters:</strong> real decisions are rarely just "yes or no."
      A report card isn't pass/fail, it's A, B, C, D, or F — several bands, checked in order.
      A game might only let you through a door if you have <em>both</em> a key <em>and</em> enough
      strength, or let you in if you have <em>either</em> a password <em>or</em> a special item.
      That's exactly what this chapter unlocks.</p>

      <p>By the end of this chapter, you'll build <strong>Crack the Code</strong> — a spy-themed
      guessing game where every guess gets a different reaction depending on how close it is.</p>

      <p>No clock here — take your time. Press <strong>Next</strong> or pick a lesson from the
      dropdown above whenever you're ready.</p>
    `,
  },
  lessons: [
    {
      id: "8.1",
      title: "More Than Two Choices: elif",
      content: `
        <p><code>elif</code> (short for "else if") lets you check another condition when the
        first <code>if</code> was <code>False</code>, before falling back to a final
        <code>else</code>. You can chain as many <code>elif</code>s as you need — Python checks
        them top to bottom and stops at the first one that's <code>True</code>.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>score = 75
if score >= 90:
    print("A")
elif score >= 70:
    print("B")
else:
    print("C")</code></pre>
          <p><code>75</code> isn't <code>>= 90</code>, so Python checks the next one:
          <code>75 >= 70</code> is <code>True</code>. Output: <code>B</code> — and Python never
          even looks at the <code>else</code>, since a match was already found.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>order matters. Conditions are checked top to bottom, and the <em>first</em> one that
          matches wins — even if a later one would also technically be true. Put your most
          specific conditions first.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Add an <code>elif</code> between the existing <code>if</code> and <code>else</code>
          so that a <code>temperature</code> of <code>75</code> prints exactly
          <code>Warm</code> (it should be <code>Hot</code> at 90 or above, <code>Warm</code> at 70
          or above, and <code>Cool</code> otherwise).</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>elif</code> checks another condition when the one before it was false — chain
          as many as you need, checked in order, top to bottom.</p>
        </div>
      `,
      starterCode: `temperature = 75
if temperature >= 90:
    print("Hot")
else:
    print("Cool")`,
      practice: {
        instructions: "Add an elif so that a temperature of 75 prints exactly: Warm (90+ is Hot, 70+ is Warm, otherwise Cool)",
        solution: `temperature = 75
if temperature >= 90:
    print("Hot")
elif temperature >= 70:
    print("Warm")
else:
    print("Cool")`,
        check(actualOutput) {
          const got = actualOutput.trim();
          const want = "Warm";
          if (got === want) {
            return { pass: true, message: "Right — 75 didn't clear 90, but it did clear 70." };
          }
          return {
            pass: false,
            message: `Not quite — we want the output to be "${want}". Add an elif temperature >= 70: between the if and else.`,
          };
        },
      },
    },
    {
      id: "8.2",
      title: "Both Things Have to Be True: and",
      content: `
        <p><code>and</code> combines two conditions into one — the whole thing is only
        <code>True</code> if <em>both</em> sides are true. If either side is false, the whole
        combined condition is false.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>age = 12
has_ticket = True
if age >= 10 and has_ticket:
    print("You can ride!")</code></pre>
          <p><code>age >= 10</code> is <code>True</code> <em>and</em> <code>has_ticket</code> is
          <code>True</code> — both sides check out, so the combined condition is <code>True</code>
          and the line runs. Output: <code>You can ride!</code></p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>each side of <code>and</code> needs to be a complete condition on its own —
          <code>age >= 10 and has_ticket</code>, not a shortcut like <code>age and has_ticket >=
          10</code>. Write out both full comparisons.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Using <code>and</code>, print whether <code>strength >= 5</code> <em>and</em>
          <code>has_sword</code> are both true, so the output is exactly <code>True</code>.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>and</code> combines two full conditions — the result is <code>True</code> only
          when both sides are.</p>
        </div>
      `,
      starterCode: `strength = 8
has_sword = True
print(strength)`,
      practice: {
        instructions: "Print whether strength >= 5 and has_sword are both true, so the output is exactly: True",
        solution: `strength = 8
has_sword = True
print(strength >= 5 and has_sword)`,
        check(actualOutput) {
          const got = actualOutput.trim();
          const want = "True";
          if (got === want) {
            return { pass: true, message: "Right — both sides were true, so and gave back True." };
          }
          return {
            pass: false,
            message: `Not quite — we want the output to be "${want}". Print strength >= 5 and has_sword.`,
          };
        },
      },
    },
    {
      id: "8.3",
      title: "Either Thing Can Be True: or",
      content: `
        <p><code>or</code> also combines two conditions, but it's more forgiving than
        <code>and</code> — the combined condition is <code>True</code> if <em>either</em> side is
        true (or both). It's only <code>False</code> when both sides are false.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>has_key = False
has_password = True
if has_key or has_password:
    print("Door unlocked!")</code></pre>
          <p><code>has_key</code> is <code>False</code>, but <code>has_password</code> is
          <code>True</code> — since only one side needs to be true for <code>or</code>, the
          combined condition is still <code>True</code>. Output: <code>Door unlocked!</code></p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>mixing up <code>and</code> and <code>or</code> — using <code>and</code> when you
          meant <code>or</code> makes a condition stricter than you intended, and can fail in
          cases where it really should have passed.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Using <code>or</code>, print whether <code>has_shield</code> or <code>has_potion</code>
          is true, so the output is exactly <code>True</code>.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>or</code> is <code>True</code> if either side is true — only <code>False</code>
          when both sides are.</p>
        </div>
      `,
      starterCode: `has_shield = False
has_potion = True
print(has_shield)`,
      practice: {
        instructions: "Print whether has_shield or has_potion is true, so the output is exactly: True",
        solution: `has_shield = False
has_potion = True
print(has_shield or has_potion)`,
        check(actualOutput) {
          const got = actualOutput.trim();
          const want = "True";
          if (got === want) {
            return { pass: true, message: "Right — has_potion alone was enough for or to say True." };
          }
          return {
            pass: false,
            message: `Not quite — we want the output to be "${want}". Print has_shield or has_potion.`,
          };
        },
      },
    },
    {
      id: "8.4",
      title: "Chapter 8 Wrap-Up",
      content: `
        <p>A quick look back across four big chapters. You can now: get input from the person
        running your program (Chapter 5), have Python answer True/False questions (Chapter 6),
        branch between paths with <code>if</code>/<code>else</code> (Chapter 7), and now chain
        <em>more</em> than two paths with <code>elif</code>, or combine conditions with
        <code>and</code>/<code>or</code> (this chapter).</p>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>elif</code> for more than two choices, <code>and</code>/<code>or</code> for
          combining conditions — Chapter 8, complete! Up next: cracking a secret code.</p>
        </div>
      `,
      starterCode: `# Nothing to fix here — just press Next when you're ready for the Project.
print("Chapter 8 complete!")`,
      practice: null,
    },
  ],
  project: {
    title: "Crack the Code",
    content: `
      <p><strong>The Challenge:</strong> you've infiltrated a secret vault. There's a numeric
      access code guarding the alarm, and you get exactly one guess — enter it correctly and the
      alarm disarms; enter it wrong and you'll at least find out whether you guessed too high or
      too low.</p>
      <div class="lesson-recap">
        <span class="lesson-label">What You'll Use</span>
        <ul>
          <li><code>input()</code> and <code>int()</code>, to get a guess and convert it to a
          real number (Chapter 5)</li>
          <li><code>if</code>/<code>elif</code>/<code>else</code>, to react differently to a
          correct guess, a too-low guess, or a too-high guess (this chapter)</li>
          <li>Variables and <code>print()</code>, to run the whole scene (Chapters 1–2)</li>
        </ul>
      </div>
      <div class="lesson-turn">
        <span class="lesson-label">Step-By-Step</span>
        <ol>
          <li>The starter code sets a secret number and asks for a guess.</li>
          <li>Convert the guess to a real number with <code>int()</code> — comparing numbers only
          works once it's actually a number, not text.</li>
          <li>An <code>if</code>/<code>elif</code>/<code>else</code> chain checks: is the guess
          exactly right, too low, or too high?</li>
          <li>Run it a few times with different guesses — right, too low, too high — to see all
          three reactions. Then try changing the secret number and the vault's theme text to make
          it your own.</li>
        </ol>
      </div>
      <div class="lesson-tip">
        <span class="lesson-label">Watch Out For</span>
        <p>if you skip converting the guess with <code>int()</code>, comparing it to the secret
        number with <code>&lt;</code> or <code>&gt;</code> will crash with a
        <code>TypeError</code> — text and numbers can't be compared that way.</p>
      </div>
    `,
    starterCode: `print("You've infiltrated the secret vault. Enter the access code to disarm the alarm!")
secret_code = 42

guess_text = input("Enter the code (a number): ")
guess = int(guess_text)

if guess == secret_code:
    print("Access granted — you disarmed the alarm just in time!")
elif guess < secret_code:
    print("ALARM! Too low — the vault seals shut.")
else:
    print("ALARM! Too high — the vault seals shut.")`,
  },
};
