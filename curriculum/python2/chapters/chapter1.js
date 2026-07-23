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
      just proving to yourself that Course 1's tools are still sharp. Each one gets its own quick
      lesson and its own practice, so you're not just skimming — you're actually re-proving each
      piece works before building on top of it.</p>
    `,
  },
  lessons: [
    {
      id: "1.1",
      title: "Variables & Naming, Revisited",
      content: `
        <p>A program that couldn't remember anything between lines wouldn't be able to track a
        player's health, gold, or position — that's the whole reason variables exist. A variable
        is a name attached to a value — <code>hero = "Robin"</code> doesn't just set
        <code>hero</code> once, it can be reassigned any time, and the new value completely
        replaces the old one, which is exactly how a game keeps something like health up to date
        turn after turn.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>hero = "Robin"
level = 1
print(hero, level)

level = level + 1
hero = hero + " the Bold"
print(hero, level)</code></pre>
          <p>Output: <code>Robin 1</code>, then <code>Robin the Bold 2</code>. Notice
          <code>level = level + 1</code> — the right side is evaluated first using the
          <em>old</em> value of <code>level</code>, and only then does the result get stored back
          into <code>level</code>. Same idea for <code>hero</code>.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>variable names are case-sensitive (<code>hero</code> and <code>Hero</code> are two
          different names), and they can't start with a digit or contain spaces —
          <code>2nd_place</code> is invalid, <code>second_place</code> is fine.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p><code>gold = 20</code> is given. Add <code>15</code> more gold by reassigning
          <code>gold</code> to <code>gold + 15</code>, then print it.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>Reassigning a variable using its own old value —
          <code>name = name + something</code> — is one of the single most common patterns in
          real programs. You'll use it constantly for score, health, and inventory counts.</p>
        </div>
      `,
      starterCode: `gold = 20
# add 15 to gold, then print it`,
      practice: {
        instructions: "Print exactly: 35",
        solution: `gold = 20
gold = gold + 15
print(gold)`,
        check(actualOutput) {
          const got = actualOutput.trim();
          if (got === "35") {
            return { pass: true, message: "Reassigned gold using its own previous value — exactly right." };
          }
          return { pass: false, message: "Not quite — we want exactly 35 (20 + 15) printed." };
        },
      },
    },
    {
      id: "1.2",
      title: "Strings & f-strings, Revisited",
      content: `
        <p>f-strings mix text and variables together, and they can do more than just drop a
        variable in — anything you could write as a Python expression can go inside the curly
        braces, including math and even calling a string method.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>name = "Robin"
gold = 40
found = 15
print(f"{name} now has {gold + found} gold.")
print(f"{name.upper()} is ready!")</code></pre>
          <p>Output: <code>Robin now has 55 gold.</code>, then <code>ROBIN is ready!</code>. The
          math happens right inside the f-string's curly braces — no need to store
          <code>gold + found</code> in its own variable first — and <code>name.upper()</code>
          works the same way, called right there inline.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>mixing a number and a string with <code>+</code> <em>outside</em> an f-string still
          crashes with a <code>TypeError</code> — f-strings convert for you automatically, plain
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
          <p>f-strings can hold any expression inline — math, method calls, whatever — not just a
          bare variable name.</p>
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
      id: "1.3",
      title: "Numbers & Math, Revisited",
      content: `
        <p>Python's arithmetic operators (<code>+ - * /</code>) follow the same order of
        operations you learned in school — multiplication and division before addition and
        subtraction — and <code>//</code> (floor division) and <code>%</code> (remainder,
        "modulo") come up constantly once you're calculating things like damage or drop rates.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>base_damage = 10
bonus = 2
hits = 3
print(base_damage + bonus * hits)
print(17 // 5)
print(17 % 5)</code></pre>
          <p>Output: <code>16</code> (bonus * hits happens first: 2 * 3 = 6, then 10 + 6),
          <code>3</code> (17 divided by 5 is 3 with something left over), then <code>2</code>
          (that leftover remainder). <code>//</code> and <code>%</code> together are how you'd
          split a pile of gold evenly among players and figure out what's left.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p><code>/</code> always produces a <code>float</code>, even when the numbers divide
          evenly — <code>10 / 2</code> is <code>5.0</code>, not <code>5</code>. Use <code>//</code>
          when you specifically want a whole number back.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p><code>gold = 47</code> and <code>players = 4</code> are given. Print how much gold
          each player gets evenly (<code>//</code>), then print how much is left over
          (<code>%</code>), on two separate lines.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>//</code> gives you the whole-number result of division; <code>%</code> gives
          you the remainder — together they let you split something evenly and know what's left.</p>
        </div>
      `,
      starterCode: `gold = 47
players = 4
# print gold // players, then gold % players`,
      practice: {
        instructions: "Print 11 then 3 (47 split 4 ways is 11 each, with 3 left over).",
        solution: `gold = 47
players = 4
print(gold // players)
print(gold % players)`,
        check(actualOutput) {
          const lines = actualOutput.trim().split("\n").map((l) => l.trim());
          if (lines.length === 2 && lines[0] === "11" && lines[1] === "3") {
            return { pass: true, message: "Floor division and remainder, both correct." };
          }
          return { pass: false, message: "Not quite — 47 // 4 is 11, and 47 % 4 is 3." };
        },
      },
    },
    {
      id: "1.4",
      title: "Getting Input, Revisited",
      content: `
        <p>A game that can't ask the player anything isn't interactive at all — <code>input()</code>
        is how your program hears back from whoever's playing it. It always returns a string —
        no exceptions, even if someone types a number. If you want an actual number to do math
        with, you have to convert it yourself with <code>int(...)</code> or
        <code>float(...)</code>, every single time.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>name = input("What's your hero's name? ")
level_text = input("Starting level? ")
level = int(level_text)
print(f"{name}, level {level + 1}!")</code></pre>
          <p>Typing <code>Robin</code> then <code>3</code> prints <code>Robin, level 4!</code>.
          <code>level_text</code> holds the raw string <code>"3"</code>; <code>level</code> holds
          the actual number <code>3</code> — only <code>level</code> can be used in math like
          <code>level + 1</code>.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>you don't need a separate variable for the "before conversion" text —
          <code>level = int(input("Starting level? "))</code> converts in the same line. Course 1
          showed both styles; use whichever reads clearer to you.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Ask <code>"How much gold did you find? "</code>, convert the answer to an
          <code>int</code>, and print <code>f"You now have {gold} gold."</code></p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>input()</code>'s result is always text — convert it with <code>int(...)</code>
          or <code>float(...)</code> the moment you need to do math with it.</p>
        </div>
      `,
      starterCode: `# ask "How much gold did you find? ", convert to int, print "You now have {gold} gold."`,
      practice: {
        instructions: "Print: You now have {gold} gold. using whatever number was typed.",
        solution: `gold = int(input("How much gold did you find? "))
print(f"You now have {gold} gold.")`,
        check(actualOutput) {
          // endsWith, not === : input()'s own prompt text lands in this same
          // output, right before whichever value got printed.
          const got = actualOutput.trim();
          if (/You now have \d+ gold\.$/.test(got)) {
            return { pass: true, message: "Converted to int, then used it in an f-string." };
          }
          return { pass: false, message: 'Not quite — print exactly "You now have {gold} gold." with your converted number.' };
        },
      },
    },
    {
      id: "1.5",
      title: "Comparisons, Revisited",
      content: `
        <p>Comparisons (<code>== != < > <= >=</code>) always produce <code>True</code> or
        <code>False</code> — and they chain naturally with <code>and</code>/<code>or</code> when
        you need to check more than one thing at once.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>hp = 15
max_hp = 100
is_low = hp < max_hp * 0.2
print(is_low)
print(hp > 0 and hp < 20)</code></pre>
          <p>Output: <code>True</code>, then <code>True</code>. <code>max_hp * 0.2</code>
          evaluates first (that's 20), so <code>is_low</code> checks whether <code>hp</code> is
          under 20% of max — a real pattern for a "low health" warning. The second line combines
          two comparisons with <code>and</code>: both have to be true for the whole thing to be
          <code>True</code>.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p><code>=</code> assigns a value, <code>==</code> compares two values — mixing them up
          is one of the most common typos in any language, not just Python.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p><code>level = 7</code> and <code>gold = 120</code> are given. Print whether the
          player can afford a level-10 item that costs <code>150</code> gold — that means
          <code>level >= 10</code> <strong>or</strong> <code>gold >= 150</code>. Just
          <code>True</code> or <code>False</code>.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>and</code> requires both sides true; <code>or</code> only needs one — combine
          comparisons the same way you'd combine any other expressions.</p>
        </div>
      `,
      starterCode: `level = 7
gold = 120
# print level >= 10 or gold >= 150`,
      practice: {
        instructions: "Print exactly: False",
        solution: `level = 7
gold = 120
print(level >= 10 or gold >= 150)`,
        check(actualOutput) {
          const got = actualOutput.trim();
          if (got === "False") {
            return { pass: true, message: "Neither side was true, so or correctly produced False." };
          }
          return { pass: false, message: "Not quite — with level=7 and gold=120, both sides of the or are False." };
        },
      },
    },
    {
      id: "1.6",
      title: "Chapter 1 Wrap-Up",
      content: `
        <p>Variables, f-strings, math, <code>input()</code>, comparisons — every one of them
        re-proven with its own quick exercise, not just skimmed. One more recap chapter
        (conditionals, loops, lists, functions), then the real project starts.</p>
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
