// Chapter 3 — Strings & Comments
// Content follows curriculum/python/template.md — see that file for the
// shape every Chapter Welcome / Lesson / Project should follow.
// Each lesson: { id, title, content (HTML string), starterCode, practice }
// practice.check(actualOutput) returns { pass: boolean, message: string }

export const chapter = {
  number: 3,
  title: "Strings & Comments",
  welcome: {
    content: `
      <p><strong>Chapter 3: Strings & Comments.</strong> This chapter is all about text — gluing
      pieces of it together, formatting it neatly, measuring it, grabbing a single character out
      of it, leaving yourself notes, and reading error messages without panicking.</p>

      <p><strong>Why this actually matters:</strong> think about signing into a game and seeing
      "Welcome back, Ash — Level 12, 4 badges" pop up on screen. None of that message exists as
      one fixed sentence somewhere — the app is quietly stitching your name, your level, and your
      badge count into a sentence, every single time, for every single player. That's exactly
      what you're about to learn: how to build a sentence out of pieces instead of typing the
      whole thing out by hand.</p>

      <p>By the end of this chapter, you'll build a full <strong>Mad Libs</strong> game — a silly
      story built entirely out of words you choose, stitched together with the string skills you
      just learned.</p>

      <p>No clock here — take your time. Press <strong>Next</strong> or pick a lesson from the
      dropdown above whenever you're ready.</p>
    `,
  },
  lessons: [
    {
      id: "3.1",
      title: "Joining Strings Together",
      content: `
        <p>You can glue two or more strings together into one bigger string using the
        <code>+</code> symbol. This is called <strong>concatenation</strong> — a fancy word for
        "joining things end to end."</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>first = "Ash"
last = "Ketchum"
print(first + " " + last)</code></pre>
          <p>joins <code>first</code>, a plain space in quotes, and <code>last</code> into one
          string before printing it. Output: <code>Ash Ketchum</code>. Notice the middle piece,
          <code>" "</code> — just a single space between quotes — is what keeps the two names from
          running together.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p><code>+</code> does <em>not</em> add spaces automatically the way <code>print()</code>'s
          commas do. Leave out the <code>" "</code> piece and you'll get
          <code>AshKetchum</code> squished together with no space at all.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Same pattern as the example above. Build <code>message</code> by joining
          <code>"Welcome, "</code>, the <code>name</code> variable, and <code>"!"</code> with
          <code>+</code>, so the output is exactly <code>Welcome, Nova!</code></p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>+</code> joins strings together — but it never adds spaces for you, so any
          space you want has to be its own <code>" "</code> piece.</p>
        </div>
      `,
      starterCode: `name = "Nova"
message = "fix me"
print(message)`,
      practice: {
        instructions: 'Build message by joining "Welcome, " + name + "!" with the + operator, so the output is exactly: Welcome, Nova!',
        solution: `name = "Nova"
message = "Welcome, " + name + "!"
print(message)`,
        check(actualOutput) {
          const got = actualOutput.trim();
          const want = "Welcome, Nova!";
          if (got === want) {
            return { pass: true, message: "Nice — three pieces joined into one string with +." };
          }
          return {
            pass: false,
            message: `Not quite — Python printed "${got}", but we want "${want}". Check you're joining "Welcome, ", name, and "!" with + (and not missing a space).`,
          };
        },
      },
    },
    {
      id: "3.2",
      title: "f-strings: The Easy Way to Mix Text and Variables",
      content: `
        <p>Joining strings with <code>+</code> works, but it gets fiddly fast with lots of pieces.
        An <strong>f-string</strong> is a shortcut: put an <code>f</code> right before the opening
        quote, and any variable name inside curly braces <code>{ }</code> gets swapped in
        automatically.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>name = "Ash"
badges = 4
print(f"{name} has {badges} badges")</code></pre>
          <p>the <code>f</code> right before the quote turns this feature on, and Python replaces
          <code>{name}</code> and <code>{badges}</code> with their actual values. Output:
          <code>Ash has 4 badges</code> — no <code>+</code>, no separate space strings, just the
          sentence written out naturally with the variable names dropped in place.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>forgetting the <code>f</code> right before the quote. Without it, Python just prints
          the curly braces and variable names as literal text — you'd see
          <code>{name} has {badges} badges</code> instead of the real values.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Same pattern as the example above. Build <code>message</code> as an f-string using
          <code>hero</code> and <code>role</code>, so the output is exactly
          <code>Nova the Wizard is ready!</code></p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>an f-string — <code>f"..."</code> with variables in <code>{ }</code> — mixes text and
          variables in one readable line, without <code>+</code>.</p>
        </div>
      `,
      starterCode: `hero = "Nova"
role = "Wizard"
message = "fix me"
print(message)`,
      practice: {
        instructions: "Use an f-string to build message so it prints exactly: Nova the Wizard is ready!",
        solution: `hero = "Nova"
role = "Wizard"
message = f"{hero} the {role} is ready!"
print(message)`,
        check(actualOutput) {
          const got = actualOutput.trim();
          const want = "Nova the Wizard is ready!";
          if (got === want) {
            return { pass: true, message: "That's an f-string — the easiest way to mix text and variables." };
          }
          return {
            pass: false,
            message: `Not quite — Python printed "${got}", but we want "${want}". Check you have an f before the opening quote, and {hero} / {role} inside curly braces.`,
          };
        },
      },
    },
    {
      id: "3.3",
      title: "String Superpowers: .upper() and .lower()",
      content: `
        <p>Strings come with built-in actions called <strong>methods</strong> — you call one by
        writing a dot right after the variable, then the method's name and parentheses.
        <code>.upper()</code> gives you the string in ALL CAPS, and <code>.lower()</code> gives you
        the string in all lowercase.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>shout = "watch out!"
print(shout.upper())</code></pre>
          <p><code>.upper()</code> is called directly on <code>shout</code>, with a dot in
          between and its own parentheses at the end — even though there's nothing to put inside
          them. Output: <code>WATCH OUT!</code></p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>forgetting the parentheses after <code>upper</code> or <code>lower</code> — Python
          needs <code>()</code> to know you're actually calling the method, not just naming it.
          <code>shout.upper</code> (no parentheses) won't give you the shouted text.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Same pattern as the example above. Print <code>name</code> in all uppercase on one
          line, then all lowercase on the next, so the output is exactly these two lines:</p>
          <pre><code>PIKACHU
pikachu</code></pre>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>.upper()</code> and <code>.lower()</code> are methods — dot, name, parentheses —
          that give you a string in all caps or all lowercase.</p>
        </div>
      `,
      starterCode: `name = "Pikachu"
print(name)
print(name)`,
      practice: {
        instructions: "Print name in all uppercase on the first line and all lowercase on the second line, so the output is exactly: PIKACHU / pikachu (two lines)",
        solution: `name = "Pikachu"
print(name.upper())
print(name.lower())`,
        check(actualOutput) {
          const got = actualOutput.trim();
          const want = "PIKACHU\npikachu";
          if (got === want) {
            return { pass: true, message: "Exactly right — .upper() and .lower(), one line each." };
          }
          return {
            pass: false,
            message: `Not quite — check that line one is name.upper() and line two is name.lower(), each with its own print().`,
          };
        },
      },
    },
    {
      id: "3.4",
      title: "Measuring a String: len()",
      content: `
        <p><code>len()</code> tells you how many characters are in a string — including spaces
        and punctuation, not just letters. Unlike <code>.upper()</code>, it's not a method you call
        with a dot; you wrap the string (or variable) inside <code>len(...)</code> instead.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>word = "Python"
print(len(word))</code></pre>
          <p>counts every character in <code>word</code> — P-y-t-h-o-n, six of them. Output:
          <code>6</code>.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p><code>len()</code> counts <em>every</em> character, spaces included.
          <code>"Hi there"</code> is 8 characters, not 7 — don't forget to count the space between
          the words.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Same pattern as the example above. Print how many characters are in
          <code>phrase</code> using <code>len()</code>, so the output is exactly <code>8</code>.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>len(text)</code> counts every character in a string, including spaces.</p>
        </div>
      `,
      starterCode: `phrase = "Hi there"
print(phrase)`,
      practice: {
        instructions: "Print how many characters are in phrase using len(), so the output is exactly: 8",
        solution: `phrase = "Hi there"
print(len(phrase))`,
        check(actualOutput) {
          const got = actualOutput.trim();
          const want = "8";
          if (got === want) {
            return { pass: true, message: "That's it — len() counted every character, space included." };
          }
          return {
            pass: false,
            message: `Not quite — we want the output to be "${want}". Print len(phrase), not phrase itself.`,
          };
        },
      },
    },
    {
      id: "3.5",
      title: "Grabbing Part of a String: Indexing",
      content: `
        <p>Every character in a string has a position, called an <strong>index</strong> — and
        Python starts counting at <code>0</code>, not <code>1</code>. You can grab a single
        character with square brackets: <code>word[0]</code> is the <em>first</em> character.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>word = "Python"
print(word[0])</code></pre>
          <p><code>word[0]</code> grabs the character at index <code>0</code> — the very first
          one. Output: <code>P</code>.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>indexes start at <code>0</code>, not <code>1</code> — this trips up almost everyone
          at first. <code>word[1]</code> is actually the <em>second</em> character
          (<code>"y"</code>), not the first.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Same pattern as the example above. Print just the first character of
          <code>word</code> using indexing, so the output is exactly <code>P</code>.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>word[0]</code> grabs a string's first character — indexes start counting at
          0. (There's even a shortcut for the <em>last</em> character, <code>word[-1]</code> —
          you'll run into that again later.)</p>
        </div>
      `,
      starterCode: `word = "Python"
print(word)`,
      practice: {
        instructions: "Print just the first character of word using indexing (word[0]), so the output is exactly: P",
        solution: `word = "Python"
print(word[0])`,
        check(actualOutput) {
          const got = actualOutput.trim();
          const want = "P";
          if (got === want) {
            return { pass: true, message: "That's indexing — word[0] grabbed exactly the first character." };
          }
          return {
            pass: false,
            message: `Not quite — we want the output to be "${want}". Print word[0], remembering indexes start at 0.`,
          };
        },
      },
    },
    {
      id: "3.6",
      title: "Leaving Notes with # Comments",
      content: `
        <p>A <code>#</code> starts a <strong>comment</strong> — Python completely ignores
        everything after it on that line. Comments are notes for humans reading the code later
        (including future you), not instructions for the computer.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code># Tell the player the game is starting
print("Loading...")</code></pre>
          <p>the first line is pure comment — Python skips it entirely and only runs
          <code>print("Loading...")</code>. Output: <code>Loading...</code> — the comment itself
          never shows up anywhere.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>a <code>#</code> <em>inside</em> quotes doesn't count as a comment — it's just a
          regular character in your string. Comments only work outside quotes.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>The code on the right already works. Add a short comment above each
          <code>print()</code> line explaining what it does — your own words, doesn't need to
          match anything exactly. Comments don't change what runs, so the output should stay
          exactly the same. Press <strong>Run</strong> when you're happy with your notes.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>#</code> starts a comment — a note for humans that Python skips completely
          when it runs your code.</p>
        </div>
      `,
      starterCode: `print("Loading game...")
print("Ready!")`,
      practice: null,
    },
    {
      id: "3.7",
      title: "Reading an Error Message Without Panicking",
      content: `
        <p>Every programmer — even professionals with years of experience — sees error messages
        constantly. Seeing one doesn't mean you broke something; it means Python is trying to tell
        you exactly what confused it. The skill is reading it calmly instead of panicking.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <p>An error message has two useful parts: the <strong>error type</strong> (before the
          colon — like <code>SyntaxError</code> or <code>NameError</code>) and the
          <strong>message</strong> (after the colon, describing what went wrong). The code on the
          right is broken on purpose — press <strong>Run</strong> and look at what shows up in the
          red Errors panel below.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>the wall of red text can look scary, but you don't need to understand every word.
          Read the error <em>type</em> first, then the short message after it — the "How To Fix
          It" box underneath translates it into plain English. If you're still stuck, the Help
          button right there in the Errors panel will fill in working code for you to compare
          against.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>The code on the right is missing something and won't run. Find it, fix it, and make
          it print exactly <code>Game Over</code>.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>an error message is a clue, not a verdict — read the type, read the message, and use
          them to track down exactly what to fix.</p>
        </div>
      `,
      starterCode: `print("Game Over)`,
      practice: {
        instructions: "This code won't run — find the missing piece and fix it so it prints exactly: Game Over",
        solution: `print("Game Over")`,
        check(actualOutput) {
          const got = actualOutput.trim();
          const want = "Game Over";
          if (got === want) {
            return { pass: true, message: "Fixed it — that's a closing quote Python was missing." };
          }
          return {
            pass: false,
            message: `Not quite — we want the output to be "${want}". Look closely at the quotes around the text.`,
          };
        },
      },
    },
    {
      id: "3.8",
      title: "Chapter 3 Wrap-Up",
      content: `
        <p>You can now join strings together, mix text and variables with f-strings, shout or
        whisper with <code>.upper()</code>/<code>.lower()</code>, measure a string with
        <code>len()</code>, grab a single character by index, leave yourself notes with
        <code>#</code>, and read an error message without panicking. That's every tool you'll need
        for this chapter's Project.</p>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>strings can be joined, formatted, measured, indexed, and commented — Chapter 3,
          complete! Up next: put all of it together in a Mad Libs game.</p>
        </div>
      `,
      starterCode: `# Nothing to fix here — just press Next when you're ready for the Project.
print("Chapter 3 complete!")`,
      practice: null,
    },
  ],
  project: {
    title: "Mad Libs",
    content: `
      <p><strong>The Challenge:</strong> build a silly Mad Libs story — the kind where you pick
      random words without knowing what they'll be used for, then laugh at the ridiculous result.
      You'll pick the words by setting variables; Python stitches them into a story using an
      f-string.</p>
      <div class="lesson-recap">
        <span class="lesson-label">What You'll Use</span>
        <ul>
          <li>Variables, to store each word (Chapter 2)</li>
          <li>f-strings, to weave those words into a story (this chapter)</li>
          <li><code>print()</code>, to show the finished story (Chapter 1)</li>
        </ul>
      </div>
      <div class="lesson-turn">
        <span class="lesson-label">Step-By-Step</span>
        <ol>
          <li>Look at the starter code's variables — an animal, an adjective, a name, and a
          number. Change each one to any word or number you like.</li>
          <li>Find the <code>story</code> line. It's one big f-string with your variables dropped
          into a sentence.</li>
          <li>Run it and read your story. Then go back, change a variable or two, and run it
          again — that's the whole game, and it never gets old.</li>
          <li>Once you've got a story that makes you laugh, you're done with the coding part.</li>
        </ol>
      </div>
      <div class="lesson-tip">
        <span class="lesson-label">Watch Out For</span>
        <p>keep your text variables in quotes and your number variable without — the same rule
        from Chapter 2, still true here. If you get a red error instead of a story, check that
        first.</p>
      </div>
    `,
    starterCode: `# Pick your own words for each variable below, then run the code!
animal = "unicorn"
adjective = "spooky"
name = "Ash"
number = 7

story = f"Once upon a time, {name} found a {adjective} {animal} riding a bike with {number} wheels."
print(story)`,
  },
};
