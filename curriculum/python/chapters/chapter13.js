// Chapter 13 — Functions II
// Content follows curriculum/python/template.md — see that file for the
// shape every Chapter Welcome / Lesson / Project should follow.
// Each lesson: { id, title, content (HTML string), starterCode, practice }
// practice.check(actualOutput) returns { pass: boolean, message: string }
//
// No chapter.project here — per curriculum/python/outline.md, 13.3's
// calculator checkpoint is deliberately folded into a bigger practice
// exercise instead of a full self-check-in Project.

export const chapter = {
  number: 13,
  title: "Functions II",
  welcome: {
    content: `
      <p><strong>Chapter 13: Functions II.</strong> Chapter 12 taught you to write your own
      functions and hand them information. This chapter completes the picture: getting an answer
      <em>back</em> out of a function, and why that makes functions genuinely useful, not just a
      new way to organize <code>print()</code> calls.</p>

      <p><strong>Why this actually matters:</strong> a function that only prints is like a
      calculator that shows you the answer but won't let you use it for anything else. A function
      that <em>returns</em> a value hands you the actual result, so you can store it, combine it
      with other values, or feed it into yet another function. That's the difference between a
      neat trick and a real building block.</p>

      <p>By the end of this chapter, you'll build a calculator the smart way — one small function
      per operation, instead of one long tangle of code.</p>

      <p>No clock here — take your time. Press <strong>Next</strong> or pick a lesson from the
      dropdown above whenever you're ready.</p>
    `,
  },
  lessons: [
    {
      id: "13.1",
      title: "Getting an Answer Back: return",
      content: `
        <p><code>return</code> sends a value back out of a function, so you can store it in a
        variable or use it elsewhere. This is different from <code>print()</code>, which only
        <em>displays</em> something — <code>return</code> actually hands the value back to
        whatever called the function.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>def add(a, b):
    return a + b

result = add(3, 4)
print(result)</code></pre>
          <p><code>add(3, 4)</code> doesn't print anything itself — it hands back
          <code>7</code>, which gets stored in <code>result</code>. Only the separate
          <code>print(result)</code> line actually shows it. Output: <code>7</code>.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>a function with <code>print()</code> but no <code>return</code> doesn't give you
          anything to store — trying <code>result = my_function()</code> on a print-only function
          gives you <code>None</code>, not the value you saw on screen.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Define <code>square(n)</code> so it <code>return</code>s <code>n * n</code>, store
          the result of <code>square(5)</code> in a variable, and print it so the output is
          exactly <code>25</code>.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>return</code> hands a value back out of a function — <code>print()</code> only
          displays it, it doesn't give you anything back to use.</p>
        </div>
      `,
      starterCode: `def square(n):
    return 0

result = square(5)
print(result)`,
      practice: {
        instructions: "Make square(n) return n * n, then print square(5) so the output is exactly: 25",
        solution: `def square(n):
    return n * n

result = square(5)
print(result)`,
        check(actualOutput) {
          const got = actualOutput.trim();
          const want = "25";
          if (got === want) {
            return { pass: true, message: "Right — return handed the value back so it could be stored and printed." };
          }
          return {
            pass: false,
            message: `Not quite — we want the output to be "${want}". Make sure square returns n * n.`,
          };
        },
      },
    },
    {
      id: "13.2",
      title: "Why Functions Matter (reuse, organizing code)",
      content: `
        <p>Here's the payoff: once a function exists, you can call it as many times as you want
        with different information, instead of retyping similar code over and over. If you ever
        find yourself copy-pasting a few lines and changing just one number, that's usually a sign
        you actually want a function.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>def double(n):
    return n * 2

print(double(4))
print(double(10))
print(double(21))</code></pre>
          <p>one function, <code>double</code>, reused three times with three different numbers
          — instead of writing <code>n * 2</code> three separate times by hand. Output:
          <code>8</code>, <code>20</code>, <code>42</code>.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>a function is only worth writing if you'll actually reuse it, or if it makes a messy
          block of code easier to read by giving it a clear name — not every single line needs to
          become its own function.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Define <code>triple(n)</code> that returns <code>n * 3</code>, then print the result
          of calling it with <code>2</code>, <code>5</code>, and <code>9</code>, so the output is
          exactly:</p>
          <pre><code>6
15
27</code></pre>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>a function written once can be reused as many times as you need — that's what makes
          it worth writing in the first place.</p>
        </div>
      `,
      starterCode: `def triple(n):
    return 0

print(triple(2))
print(triple(5))
print(triple(9))`,
      practice: {
        instructions: "Make triple(n) return n * 3, so calling it with 2, 5, and 9 prints exactly: 6 / 15 / 27",
        solution: `def triple(n):
    return n * 3

print(triple(2))
print(triple(5))
print(triple(9))`,
        check(actualOutput) {
          const got = actualOutput.trim();
          const want = "6\n15\n27";
          if (got === want) {
            return { pass: true, message: "Right — one function, reused three times with three different numbers." };
          }
          return {
            pass: false,
            message: `Not quite — we want "6", "15", "27". Make sure triple returns n * 3.`,
          };
        },
      },
    },
    {
      id: "13.3",
      title: "Mini-Checkpoint: Build a Calculator, the Smart Way",
      content: `
        <p>Time to put <code>return</code> to real use. A calculator needs to add, subtract,
        multiply, and divide — instead of writing that math inline every time you need it, wrap
        each operation in its own small function. Any part of a bigger program could then just
        call <code>add(x, y)</code> or <code>divide(x, y)</code> whenever it needs one of those
        results.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

print(add(10, 3))
print(subtract(10, 3))</code></pre>
          <p>two small functions, each handling one operation and returning the result. Output:
          <code>13</code>, then <code>7</code>.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>remember Chapter 4.3 — dividing with <code>/</code> always gives you a float back,
          even when the math comes out even. <code>divide(8, 2)</code> should return
          <code>4.0</code>, not <code>4</code>.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p><code>multiply</code> and <code>divide</code> are still unfinished — following the
          same pattern as <code>add</code> and <code>subtract</code>, make them return the right
          math. Then run the calculator on <code>x = 8</code> and <code>y = 2</code>, so the
          output is exactly:</p>
          <pre><code>Add: 10
Subtract: 6
Multiply: 16
Divide: 4.0</code></pre>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>one small function per operation, each returning its result — the same calculator,
          built the smart way. Chapter 13, complete!</p>
        </div>
      `,
      starterCode: `def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return 0

def divide(a, b):
    return 0

x = 8
y = 2

print("Add:", add(x, y))
print("Subtract:", subtract(x, y))
print("Multiply:", multiply(x, y))
print("Divide:", divide(x, y))`,
      practice: {
        instructions: "Finish multiply and divide so the calculator prints exactly: Add: 10 / Subtract: 6 / Multiply: 16 / Divide: 4.0",
        solution: `def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

def divide(a, b):
    return a / b

x = 8
y = 2

print("Add:", add(x, y))
print("Subtract:", subtract(x, y))
print("Multiply:", multiply(x, y))
print("Divide:", divide(x, y))`,
        check(actualOutput) {
          const got = actualOutput.trim();
          const want = "Add: 10\nSubtract: 6\nMultiply: 16\nDivide: 4.0";
          if (got === want) {
            return { pass: true, message: "That's a calculator built the smart way — one function per operation." };
          }
          return {
            pass: false,
            message: `Not quite — check multiply returns a * b, and divide returns a / b (remember the .0!).`,
          };
        },
      },
    },
  ],
};
