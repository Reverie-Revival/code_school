// Chapter 12 — Functions I
// Content follows curriculum/python/template.md — see that file for the
// shape every Chapter Welcome / Lesson / Project should follow.
// Each lesson: { id, title, content (HTML string), starterCode, practice }
// practice.check(actualOutput) returns { pass: boolean, message: string }
//
// 12.2 uses random.randint(), so its check verifies the output is a number
// in the right range rather than one fixed answer — same "check the shape,
// not one exact literal" approach used for input()-based checks in Chapter 5.

export const chapter = {
  number: 12,
  title: "Functions I",
  welcome: {
    content: `
      <p><strong>Chapter 12: Functions I.</strong> You've been calling functions since Chapter 1 —
      <code>print()</code> is one, <code>len()</code> is one, <code>int()</code> is one. This
      chapter shows you how to write your <em>own</em>.</p>

      <p><strong>Why this actually matters:</strong> think about a bike. A bike is built from
      reusable parts — wheels, brakes, a chain — that don't have to be reinvented every time
      someone builds one. A <strong>function</strong> is the same idea in code: a reusable chunk
      you build once and reuse anywhere, instead of retyping the same lines over and over.</p>

      <p>By the end of this chapter, you'll be writing your own functions and handing them
      information to work with — the foundation for everything that's left in this course.</p>

      <p>No clock here — take your time. Press <strong>Next</strong> or pick a lesson from the
      dropdown above whenever you're ready.</p>
    `,
  },
  lessons: [
    {
      id: "12.1",
      title: "Quick Recap: Chapters 9–11",
      content: `
        <p>Before diving into something new, a quick look back. Since Chapter 9 you've learned to
        store many values in a list, grab one out by index, and repeat code with <code>for</code>,
        <code>range()</code>, and <code>while</code> — including stopping early with
        <code>break</code> or skipping ahead with <code>continue</code>.</p>
        <p>This chapter is a shift in a new direction: instead of repeating code Python already
        knows how to run, you'll start <em>writing</em> your own reusable pieces.</p>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>lists and loops — three chapters of tools, all still in play as you head into Chapter
          12.</p>
        </div>
      `,
      starterCode: `# Nothing to fix here — just press Next when you're ready to keep going.
print("Ready for Chapter 12!")`,
      practice: null,
    },
    {
      id: "12.2",
      title: "Functions You Already Know",
      content: `
        <p>Every time you've called <code>print()</code>, <code>len()</code>, or
        <code>int()</code>, you've been using a <strong>function</strong> — a named, reusable
        chunk of code someone already wrote, that runs when you call it with parentheses. Here's
        a new one: <code>random.randint(a, b)</code>, which picks a random whole number between
        <code>a</code> and <code>b</code> (both included).</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>import random

number = random.randint(1, 6)
print(number)</code></pre>
          <p><code>import random</code> at the top makes Python's <code>random</code> tools
          available. <code>random.randint(1, 6)</code> then rolls a random number from
          <code>1</code> to <code>6</code>, like a six-sided die — a different result nearly every
          time you run it.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>forgetting <code>import random</code> before using anything from it — skip that line
          and you'll get a <code>NameError</code>, since Python doesn't load it in automatically.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>The code on the right rolls a six-sided die. Change it to simulate a
          <strong>20-sided</strong> die instead — a random number from 1 to 20 — and print it.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>a function is reusable code someone already wrote — <code>random.randint(a, b)</code>
          is one more example, just like <code>print()</code> or <code>len()</code>.</p>
        </div>
      `,
      starterCode: `import random

number = random.randint(1, 6)
print(number)`,
      practice: {
        instructions: "Change the die to a 20-sided die — a random number from 1 to 20 — and print it.",
        solution: `import random

number = random.randint(1, 20)
print(number)`,
        check(actualOutput) {
          const got = actualOutput.trim();
          const n = Number(got);
          if (got !== "" && Number.isInteger(n) && String(n) === got && n >= 1 && n <= 20) {
            return { pass: true, message: `Rolled a ${n} — anywhere from 1 to 20 counts as correct, since it's random.` };
          }
          return {
            pass: false,
            message: `We want a single whole number from 1 to 20 — check you're calling random.randint(1, 20).`,
          };
        },
      },
    },
    {
      id: "12.3",
      title: "Writing Your Own Function: def",
      content: `
        <p><code>def</code> lets you create your own function — a named, reusable chunk of code
        you can run anytime, just by calling its name followed by parentheses.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>def greet():
    print("Hello there!")

greet()
greet()</code></pre>
          <p><code>def greet():</code> defines the function — note the colon and the indented
          line underneath, same pattern as <code>if</code> and <code>for</code>. Calling
          <code>greet()</code> runs that indented code. Output: <code>Hello there!</code> printed
          twice, once for each call.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>defining a function with <code>def</code> doesn't run it by itself — nothing happens
          until you actually <em>call</em> it by name with parentheses, same as any built-in
          function.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Define a function called <code>cheer</code> that prints <code>Let's go!</code>, then
          call it three times, so the output is exactly:</p>
          <pre><code>Let's go!
Let's go!
Let's go!</code></pre>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>def name():</code> plus an indented block defines a function — calling
          <code>name()</code> afterward is what actually runs it.</p>
        </div>
      `,
      starterCode: `def cheer():
    print("fix me")

cheer()`,
      practice: {
        instructions: "Define cheer() to print Let's go!, then call it three times, so the output is exactly: Let's go! (three times)",
        solution: `def cheer():
    print("Let's go!")

cheer()
cheer()
cheer()`,
        check(actualOutput) {
          const got = actualOutput.trim();
          const want = "Let's go!\nLet's go!\nLet's go!";
          if (got === want) {
            return { pass: true, message: "Right — one function, called three times." };
          }
          return {
            pass: false,
            message: `Not quite — we want "Let's go!" printed exactly three times. Check cheer()'s print() line, and that you called cheer() three times.`,
          };
        },
      },
    },
    {
      id: "12.4",
      title: "Giving Functions Information: Parameters",
      content: `
        <p>A <strong>parameter</strong> lets you pass information <em>into</em> a function when
        you call it, so it can behave differently each time instead of always doing the exact
        same thing. You list parameters inside the function's parentheses, both when defining it
        and when calling it.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>def greet(name):
    print(f"Hello, {name}!")

greet("Ash")
greet("Misty")</code></pre>
          <p><code>name</code> is a parameter — a variable that only exists inside
          <code>greet</code>, holding whatever was passed in when it was called. Output:
          <code>Hello, Ash!</code> then <code>Hello, Misty!</code> — same function, different
          result each time based on what was passed in.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>a parameter only exists <em>inside</em> its function — trying to use
          <code>name</code> outside of <code>greet</code> won't work, since it doesn't exist out
          there.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Define <code>power_up(item)</code> that prints <code>You found a &lt;item&gt;!</code>,
          then call it with <code>"Shield"</code> and then <code>"Potion"</code>, so the output is
          exactly:</p>
          <pre><code>You found a Shield!
You found a Potion!</code></pre>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>a parameter lets a function take in information when it's called, so the same
          function can produce a different result each time.</p>
        </div>
      `,
      starterCode: `def power_up(item):
    print("fix me")

power_up("Shield")
power_up("Potion")`,
      practice: {
        instructions: "Print 'You found a <item>!' inside power_up, so calling it with Shield then Potion prints exactly: You found a Shield! / You found a Potion!",
        solution: `def power_up(item):
    print(f"You found a {item}!")

power_up("Shield")
power_up("Potion")`,
        check(actualOutput) {
          const got = actualOutput.trim();
          const want = "You found a Shield!\nYou found a Potion!";
          if (got === want) {
            return { pass: true, message: "Right — same function, different result each call, thanks to the parameter." };
          }
          return {
            pass: false,
            message: `Not quite — check power_up's print() uses an f-string with {item} inside it.`,
          };
        },
      },
    },
    {
      id: "12.5",
      title: "Chapter 12 Wrap-Up",
      content: `
        <p>You can now write your own functions with <code>def</code>, call them by name, and
        hand them information with parameters so they behave differently each time. No Project
        this chapter — Chapter 13 finishes the picture with return values, and that's when
        functions really start to pay off.</p>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>def name():</code> defines a function, parameters let you pass information in
          — Chapter 12, complete!</p>
        </div>
      `,
      starterCode: `# Nothing to fix here — just press Next when you're ready to keep going.
print("Chapter 12 complete!")`,
      practice: null,
    },
  ],
};
