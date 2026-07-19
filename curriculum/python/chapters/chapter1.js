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
        to display something on the screen. Try running the code on the right — don't change
        anything yet, just press <strong>Run</strong>.</p>
        <p class="lesson-tip"><strong>Watch out for:</strong> those parentheses and quotation marks
        around the text aren't optional — Python needs both to know exactly where your message
        starts and ends. Miss one, and you'll get an error instead of output. (You'll get good at
        spotting that fast — and there's a whole lesson coming up on reading errors calmly.)</p>
        <p class="lesson-recap"><strong>Recap:</strong> code is just instructions, and
        <code>print()</code> is how a program shows you something.</p>
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
        <p>For example, this line:</p>
        <pre><code>print("I love pizza!")</code></pre>
        <p>would show <code>I love pizza!</code> as output. Same command, different words inside
        the quotes — that's the whole idea.</p>
        <p>Now it's your turn. Change the code so it prints <code>Hello, Python!</code> exactly.</p>
        <p class="lesson-tip"><strong>Watch out for:</strong> capital letters and punctuation
        matter to Python. <code>"Hello, Python!"</code> and <code>"hello, python"</code> are two
        completely different strings as far as the computer's concerned — even though we'd read
        them as "the same thing." That's exactly the skill you're practicing below.</p>
        <p class="lesson-recap"><strong>Recap:</strong> <code>print()</code> shows whatever text
        is inside the quotes — and Python cares about capitalization and punctuation exactly as
        written.</p>
      `,
      starterCode: `print("write your message here")`,
      practice: {
        instructions: "Make the program print exactly: Hello, Python!",
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
  ],
};
