// Chapter 4 — Numbers & Math
// Content follows curriculum/python/template.md — see that file for the
// shape every Chapter Welcome / Lesson / Project should follow.
// Each lesson: { id, title, content (HTML string), starterCode, practice }
// practice.check(actualOutput) returns { pass: boolean, message: string }

export const chapter = {
  number: 4,
  title: "Numbers & Math",
  welcome: {
    content: `
      <p><strong>Chapter 4: Numbers & Math.</strong> This chapter is about doing actual math in
      Python — adding, subtracting, multiplying, dividing, controlling the order it happens in,
      and understanding the two kinds of numbers Python works with.</p>

      <p><strong>Why this actually matters:</strong> every score counter, every health bar, every
      "you need 3 more coins" message in a game is math running behind the scenes. Someone wrote
      code that adds up points, subtracts damage, or calculates a total — the exact same
      <code>+</code>, <code>-</code>, <code>*</code>, and <code>/</code> you're about to use.</p>

      <p>By the end of this chapter, you'll use math to pull off a genuine "wait, how does that
      work?!" trick — pick any number, follow a few steps, and the answer is always the same, no
      matter where you started.</p>

      <p>No clock here — take your time. Press <strong>Next</strong> or pick a lesson from the
      dropdown above whenever you're ready.</p>
    `,
  },
  lessons: [
    {
      id: "4.1",
      title: "Doing Math in Python",
      content: `
        <p>Python does math with the same symbols you already know from school —
        <code>+</code> for add, <code>-</code> for subtract, <code>*</code> for multiply, and
        <code>/</code> for divide (note it's a forward slash, not the "x" or "÷" you might use on
        paper).</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>width = 4
height = 3
area = width * height
print(area)</code></pre>
          <p>multiplies <code>width</code> by <code>height</code> and stores the result in a new
          variable, <code>area</code>, before printing it. Output: <code>12</code>.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>using <code>x</code> as a multiply symbol — that's just a letter to Python.
          Multiplication is always <code>*</code>.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Same pattern as the example above. Multiply <code>gems</code> by
          <code>gem_value</code>, store it in <code>total</code>, and print it so the output is
          exactly <code>100</code>.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>Python does math with <code>+</code>, <code>-</code>, <code>*</code>, and
          <code>/</code> — same idea as a calculator, just typed out.</p>
        </div>
      `,
      starterCode: `gems = 4
gem_value = 25
total = 0
print(total)`,
      practice: {
        instructions: "Multiply gems by gem_value, store it in total, and print it so the output is exactly: 100",
        solution: `gems = 4
gem_value = 25
total = gems * gem_value
print(total)`,
        check(actualOutput) {
          const got = actualOutput.trim();
          const want = "100";
          if (got === want) {
            return { pass: true, message: "That's it — real math, done in code." };
          }
          return {
            pass: false,
            message: `Not quite — we want the output to be "${want}". Set total to gems * gem_value.`,
          };
        },
      },
    },
    {
      id: "4.2",
      title: "Order of Operations",
      content: `
        <p>Python follows the same order of operations you learned in school: multiplication and
        division happen before addition and subtraction, unless you use parentheses
        <code>( )</code> to say otherwise.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>result = 2 + 3 * 4
print(result)</code></pre>
          <p>Python does <code>3 * 4</code> first (that's <code>12</code>), <em>then</em> adds
          <code>2</code> — not left to right. Output: <code>14</code>, not <code>20</code>.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>assuming Python reads math strictly left to right — it doesn't. If you want the
          addition to happen <em>first</em>, wrap it in parentheses: <code>(2 + 3) * 4</code> gives
          you <code>20</code> instead.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>The code on the right prints <code>15</code>, not the <code>20</code> we actually
          want, because multiplication is happening before the addition. Add parentheses so the
          addition happens first, making the output exactly <code>20</code>.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>multiplication and division happen before addition and subtraction — use
          <code>( )</code> whenever you want to force a different order.</p>
        </div>
      `,
      starterCode: `result = 5 + 5 * 2
print(result)`,
      practice: {
        instructions: "Add parentheses so the math happens in the order you want, printing exactly: 20",
        solution: `result = (5 + 5) * 2
print(result)`,
        check(actualOutput) {
          const got = actualOutput.trim();
          const want = "20";
          if (got === want) {
            return { pass: true, message: "Exactly — parentheses forced the addition to happen first." };
          }
          return {
            pass: false,
            message: `Not quite — Python printed "${got}", but we want "${want}". Wrap the 5 + 5 in parentheses.`,
          };
        },
      },
    },
    {
      id: "4.3",
      title: "Whole Numbers vs. Decimals (int vs. float)",
      content: `
        <p>Python calls a whole number (no decimal point) an <strong>int</strong>, and a number
        with a decimal point a <strong>float</strong>. Here's the twist: dividing with
        <code>/</code> <em>always</em> gives you a float back — even when the answer is a whole
        number.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>apples = 10
kids = 2
share = apples / kids
print(share)</code></pre>
          <p>divides evenly, but <code>/</code> still hands back a float. Output:
          <code>5.0</code> — not <code>5</code>.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>seeing <code>5.0</code> and assuming something's wrong — it isn't. Division with
          <code>/</code> always produces a float, that trailing <code>.0</code> and all, even when
          the math works out to a whole number.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Same pattern as the example above. Divide <code>apples</code> by <code>kids</code> and
          print the result, so the output is exactly <code>3.0</code>.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>ints are whole numbers, floats have a decimal point — and <code>/</code> always gives
          you a float, no matter what.</p>
        </div>
      `,
      starterCode: `apples = 12
kids = 4
print(apples)`,
      practice: {
        instructions: "Divide apples by kids and print the result, so the output is exactly: 3.0",
        solution: `apples = 12
kids = 4
print(apples / kids)`,
        check(actualOutput) {
          const got = actualOutput.trim();
          const want = "3.0";
          if (got === want) {
            return { pass: true, message: "Right — and notice that .0, exactly as / always produces." };
          }
          return {
            pass: false,
            message: `Not quite — we want the output to be "${want}". Print apples / kids, not apples on its own.`,
          };
        },
      },
    },
    {
      id: "4.4",
      title: "Mixing Math and Strings",
      content: `
        <p>Python won't let you <code>+</code> a number directly onto a string — it doesn't know
        if you mean "add them" or "join them," so it refuses instead of guessing. To join a number
        into a string with <code>+</code>, wrap the number in <code>str(...)</code> first, which
        converts it into text.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>score = 7
message = "You scored " + str(score) + " points!"
print(message)</code></pre>
          <p><code>str(score)</code> turns the number <code>7</code> into the text
          <code>"7"</code> so it can be joined with <code>+</code>. Output:
          <code>You scored 7 points!</code></p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>this only matters for <code>+</code>. A comma-separated <code>print("Score:",
          score)</code> handles the mixing for you automatically — <code>str()</code> is only
          needed when you're gluing pieces together with <code>+</code>.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>The code on the right crashes with a <code>TypeError</code> because it tries to
          <code>+</code> a number straight onto a string. Wrap <code>score</code> in
          <code>str(...)</code> so it prints exactly <code>You scored 7 points!</code></p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>str(number)</code> converts a number into text so you can join it with
          <code>+</code> — commas in <code>print()</code> don't need this conversion.</p>
        </div>
      `,
      starterCode: `score = 7
message = "You scored " + score + " points!"
print(message)`,
      practice: {
        instructions: "Fix the TypeError by converting score to text, so the output is exactly: You scored 7 points!",
        solution: `score = 7
message = "You scored " + str(score) + " points!"
print(message)`,
        check(actualOutput) {
          const got = actualOutput.trim();
          const want = "You scored 7 points!";
          if (got === want) {
            return { pass: true, message: "Fixed — str() turned the number into text so + could join it." };
          }
          return {
            pass: false,
            message: `Not quite — we want the output to be "${want}". Wrap score in str(...) before joining it with +.`,
          };
        },
      },
    },
    {
      id: "4.5",
      title: "Chapter 4 Wrap-Up",
      content: `
        <p>You can now do real math in Python — the four basic operators, controlling the order
        they run in with parentheses, telling ints and floats apart, and converting a number to
        text when you need to join it into a string. Time to use all of it for a genuinely
        surprising trick.</p>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>+ - * /</code>, parentheses for order, ints vs. floats, and
          <code>str()</code> for mixing numbers into text — Chapter 4, complete!</p>
        </div>
      `,
      starterCode: `# Nothing to fix here — just press Next when you're ready for the Project.
print("Chapter 4 complete!")`,
      practice: null,
    },
  ],
  project: {
    title: "The Math Magic Trick",
    content: `
      <p><strong>The Challenge:</strong> here's a trick that looks like mind-reading but is
      actually just algebra. Pick <em>any</em> number. Double it. Add 6. Divide by 2. Subtract
      your original number. No matter what you started with, the answer is always
      <code>3</code>.</p>
      <div class="lesson-recap">
        <span class="lesson-label">What You'll Use</span>
        <ul>
          <li>Variables, to hold your starting number and each step's result (Chapter 2)</li>
          <li>Math operators <code>* + / -</code>, to actually run the trick (this chapter)</li>
          <li><code>print()</code>, to reveal the result (Chapter 1)</li>
        </ul>
      </div>
      <div class="lesson-turn">
        <span class="lesson-label">Step-By-Step</span>
        <ol>
          <li>Start with a variable holding any number you like.</li>
          <li>Double it, storing the result in a new variable.</li>
          <li>Add 6 to that.</li>
          <li>Divide the result by 2.</li>
          <li>Subtract your <em>original</em> starting number from that.</li>
          <li>Print the final result — it should be <code>3</code> (well,
          <code>3.0</code> — remember Chapter 4.3!).</li>
        </ol>
      </div>
      <div class="lesson-tip">
        <span class="lesson-label">Watch Out For</span>
        <p>the last step has to subtract your <em>original</em> number, not whatever the previous
        step produced. Once it works, change the very first number and run it again — the trick
        still lands on <code>3.0</code> no matter what you start with.</p>
      </div>
    `,
    starterCode: `# Try changing this starting number to see the trick still works!
number = 10

doubled = number * 2
plus_six = doubled + 6
halved = plus_six / 2
result = halved - number

print(result)`,
  },
};
