// Chapter 1 — Hello, Python
// Content follows curriculum/python/template.md — see that file for the
// shape every Chapter Welcome / Lesson / Project should follow.
// Each lesson: { id, title, content (HTML string), starterCode, practice }
// practice.check(actualOutput) returns { pass: boolean, message: string }

export const chapter = {
  number: 1,
  title: "Hello, Python",
  welcome: {
    content: `
      <p><strong>Chapter 1: Hello, Python.</strong> This chapter is about two things: what
      "code" actually is, and writing your very first working program.</p>

      <p><strong>Why this actually matters:</strong> every app on your iPad — every game, every
      button, every notification — is running on code, right now, while you're reading this.
      Someone wrote instructions telling the device exactly what to do and what to say back to
      you. That's the whole trick behind every piece of software you've ever used.
      <code>print()</code>, the very first thing you're about to learn, is the simplest possible
      version of that same idea: telling the computer to say something back. You're not learning
      a toy version of "real" programming — you're learning the actual foundation everything else
      is built on.</p>

      <p>By the end of this chapter, you'll have written real, working Python — and wrapped it up
      with a small challenge: drawing a picture using nothing but <code>print()</code> and a few
      characters.</p>

      <p>No clock here — take your time. Press <strong>Next</strong> or pick a lesson from the
      dropdown above whenever you're ready.</p>
    `,
  },
  lessons: [
    {
      id: "1.1",
      title: "What is code, anyway?",
      content: `
        <p>A computer only does what you tell it to do — one instruction at a time. "Code" is just
        text written in a language the computer understands, called <strong>Python</strong>.</p>
        <p>You write the instructions on the left, the computer runs them, and whatever the program
        wants to say back to you shows up as <strong>output</strong>, on the right.</p>
        <p>Let's write your very first line of Python. The <code>print()</code> command tells Python
        to display something on the screen. The code already sitting in the box on the right
        <em>is</em> your example this time — try running it exactly as-is, don't change anything
        yet, just press <strong>Run</strong>.</p>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>those parentheses and quotation marks around the text aren't optional — Python needs
          both to know exactly where your message starts and ends. Miss one, and you'll get an
          error instead of output. (You'll get good at spotting that fast — and there's a whole
          lesson coming up on reading errors calmly.)</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>code is just instructions, and <code>print()</code> is how a program shows you
          something.</p>
        </div>
      `,
      starterCode: `print("Hello, world!")`,
      practice: null,
    },
    {
      id: "1.2",
      title: "Your turn: print() something",
      content: `
        <p><code>print()</code> can display any text you put between the quotes. That text is
        called a <strong>string</strong> — you'll hear that word a lot.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>print("I love pizza!")</code></pre>
          <p>shows <code>I love pizza!</code> as output. Same command, different words inside the
          quotes — that's the whole idea.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>capital letters and punctuation matter to Python. <code>"Hello, Python!"</code> and
          <code>"hello, python"</code> are two completely different strings as far as the
          computer's concerned — even though we'd read them as "the same thing." That's exactly
          the skill you're practicing below.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Same idea as the example above — one <code>print()</code>, one string in quotes, just
          different words. Change the code in the box on the right so it prints
          <code>Hello, Python!</code> exactly (capital letters and comma included), then press
          <strong>Run</strong>.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>print()</code> shows whatever text is inside the quotes — and Python cares
          about capitalization and punctuation exactly as written.</p>
        </div>
      `,
      starterCode: `print("write your message here")`,
      practice: {
        instructions: "Make the program print exactly: Hello, Python!",
        solution: `print("Hello, Python!")`,
        check(actualOutput) {
          const got = actualOutput.trim();
          const want = "Hello, Python!";
          if (got === want) {
            return { pass: true, message: "That's it! You just ran your first real Python program." };
          }
          return {
            pass: false,
            message: `Not quite — Python printed "${got}", but we want "${want}". Check your spelling and punctuation.`,
          };
        },
      },
    },
    {
      id: "1.3",
      title: "Printing more than one thing",
      content: `
        <p>So far, everything inside your <code>print()</code> has been one single piece of text.
        But <code>print()</code> can actually take <strong>several</strong> things at once — you
        just separate them with commas.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>print("Round", 2, "Begins")</code></pre>
          <p>shows <code>Round 2 Begins</code> as output — three separate pieces, joined by
          commas, with a space between each one added automatically. Look closely at each piece:
          <code>"Round"</code> and <code>"Begins"</code> are in quotes because they're words
          (Python calls these <strong>strings</strong>), but <code>2</code> has no quotes because
          it's a number. Words need quotes, plain numbers don't — that rule doesn't change no
          matter how many things you're printing.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>a missing comma between items is one of the most common early mistakes — Python will
          throw an error if you forget one. Also, don't add your own spaces inside the quotes to
          try to separate things (like <code>"Round "</code>) — Python's automatic spacing means
          you'll usually end up with double spaces instead.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Same pattern as the example above: three pieces, separated by commas. Your target is
          <code>Level 5 Complete</code> — that's <code>"Level"</code> (a word, needs quotes),
          <code>5</code> (a number, no quotes), and <code>"Complete"</code> (a word, needs quotes
          again). Head to the code box on the right, fix the line so it prints that using one
          <code>print()</code> call, and press <strong>Run</strong>.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>separate multiple items in <code>print()</code> with commas, and Python spaces them
          out for you automatically — words still need quotes, numbers still don't.</p>
        </div>
      `,
      starterCode: `print("fix", "this", "line")`,
      practice: {
        instructions: "Using one print() call with commas, make the program print exactly: Level 5 Complete",
        solution: `print("Level", 5, "Complete")`,
        check(actualOutput) {
          const got = actualOutput.trim();
          const want = "Level 5 Complete";
          if (got === want) {
            return { pass: true, message: "Nice — that's exactly how print() lines up multiple items with automatic spacing." };
          }
          return {
            pass: false,
            message: `Not quite — Python printed "${got}", but we want "${want}". Try one print() with three comma-separated pieces.`,
          };
        },
      },
    },
    {
      id: "1.4",
      title: "Making print() look nice",
      content: `
        <p>Right now, your programs probably only have one <code>print()</code> line. But a
        program can have as many as it needs — and they run <strong>top to bottom</strong>, in the
        order you write them, each one adding a new line of output.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>print("Loading...")
print("Ready!")</code></pre>
          <p>shows two lines of output, one under the other — Python just runs each
          <code>print()</code> in order. You can even leave a <code>print()</code> completely
          empty to add a blank line between things, the same way you might press Enter twice in a
          text message to leave some space.</p>
        </div>
        <p>There's also a shortcut for a line break <strong>inside</strong> a single string:
        <code>\\n</code>. It looks like the letter "n" with a backslash, but Python reads it as
        "start a new line here" instead of printing it as text.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>print("Loading...\\nSaving...\\nDone!")</code></pre>
          <p>shows three separate lines — <code>Loading...</code>, then <code>Saving...</code>,
          then <code>Done!</code> — all from one <code>print()</code> call, because each
          <code>\\n</code> starts a new line. Either way (stacked <code>print()</code> calls or
          <code>\\n</code> inside one) gets you the same kind of result; which one you reach for
          is just a matter of style.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p><code>\\n</code> only works <em>inside</em> quotes, as part of a string — typing a
          literal backslash-n outside of quotes won't do anything special. And an empty
          <code>print()</code> still needs its parentheses, even with nothing inside them.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Same idea as the second example above, just different words. Make the program print
          exactly these three lines, in order — using either three <code>print()</code> calls or
          one with two <code>\\n</code>s, whichever you prefer:</p>
          <pre><code>Loading...
Level 1
Ready!</code></pre>
          <p>Head to the code box on the right, fix it, and press <strong>Run</strong>.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>stack <code>print()</code> calls (or use <code>\\n</code> inside one) to control
          exactly how your output is laid out, line by line.</p>
        </div>
      `,
      starterCode: `print("fix this")`,
      practice: {
        instructions: "Make the program print exactly these three lines: Loading... / Level 1 / Ready!",
        solution: `print("Loading...\\nLevel 1\\nReady!")`,
        check(actualOutput) {
          const got = actualOutput.trim();
          const want = "Loading...\nLevel 1\nReady!";
          if (got === want) {
            return { pass: true, message: "Perfect layout — you're controlling exactly how your output looks now." };
          }
          return {
            pass: false,
            message: `Not quite — check that you have exactly three lines, in this order: "Loading...", "Level 1", "Ready!".`,
          };
        },
      },
    },
    {
      id: "1.5",
      title: "Wrap-Up: Print Art",
      content: `
        <p>You've learned everything <code>print()</code> can do — a single message, multiple
        items on one line, and stacking lines together to build up a bigger picture of output.
        Time for a fun challenge instead of a new concept.</p>
        <p><strong>Print Art:</strong> using nothing but <code>print()</code> calls and whatever
        characters you like — letters, numbers, symbols like <code>*</code> or <code>#</code> or
        <code>@</code> — draw a simple picture out of text. A house, a smiley face, your initials
        in big blocky letters, a tic-tac-toe board, anything you want.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>print("  /\\\\  ")
print(" /  \\\\ ")
print("/____\\\\")</code></pre>
          <p>draws a little triangle "roof" — not something to copy, just to show the idea: stack
          up <code>print()</code> lines, lining up your spaces carefully, until you've built
          something that actually looks like something.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>spacing is everything in ASCII art — an extra or missing space can throw off the
          whole picture. Run your code often and check the output as you go, rather than writing
          the whole thing blind and hoping.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Challenge</span>
          <p>Draw your own picture out of <code>print()</code> lines and characters — anything you
          like. There's no exact right answer here, so there's nothing to auto-check. Just have
          fun with it, and show a parent what you made when you're happy with it.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>you can build anything out of <code>print()</code> and characters — Chapter 1,
          complete!</p>
        </div>
      `,
      starterCode: `print("  /\\\\  ")
print(" /  \\\\ ")
print("/____\\\\")`,
      practice: null,
    },
  ],
};
