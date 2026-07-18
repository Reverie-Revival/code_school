// Chapter 1 — Hello, Python
// Each lesson: { id, title, content (HTML string), starterCode, practice }
// practice.check(actualOutput) returns { pass: boolean, message: string }

export const chapter = {
  number: 1,
  title: "Hello, Python",
  lessons: [
    {
      id: "1.1",
      title: "What is code, anyway?",
      content: `
        <p>A computer only does what you tell it to do — one instruction at a time. "Code" is just
        text written in a language the computer understands, called <strong>Python</strong>.</p>
        <p>You write the instructions on the left, the computer runs them, and whatever the program
        wants to say back to you shows up as <strong>output</strong>.</p>
        <p>Let's write your very first line of Python. The <code>print()</code> command tells Python
        to display something on the screen. Try running the code on the right — don't change
        anything yet, just press <strong>Run</strong>.</p>
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
        <p>Change the code so it prints <code>Hello, Python!</code> exactly (capital letters and
        punctuation matter to Python!). Then press <strong>Run</strong> — it'll tell you right away
        whether you got it.</p>
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
