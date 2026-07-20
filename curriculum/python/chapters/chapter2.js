// Chapter 2 — Variables
// Content follows curriculum/python/template.md — see that file for the
// shape every Chapter Welcome / Lesson / Project should follow.
// Each lesson: { id, title, content (HTML string), starterCode, practice }
// practice.check(actualOutput) returns { pass: boolean, message: string }

export const chapter = {
  number: 2,
  title: "Variables",
  welcome: {
    content: `
      <p><strong>Chapter 2: Variables.</strong> This chapter is about giving values a name, so
      you can store something once and use it again and again without retyping it.</p>

      <p><strong>Why this actually matters:</strong> think about a video game — your score, your
      health, your level. None of those are hardcoded into the game; they change constantly as
      you play, and the game has to remember them. A <strong>variable</strong> is exactly how
      code does that: a labeled box that holds a value, which you can check, use, or change at
      any point. Every game, app, or website you've ever used is quietly juggling dozens of
      variables behind the scenes — your score, your username, how many lives you have left.</p>

      <p>By the end of this chapter, you'll be storing and reusing your own values — and you'll
      wrap it up by building a fun "character sheet" out of nothing but variables.</p>

      <p>No clock here — take your time. Press <strong>Next</strong> or pick a lesson from the
      dropdown above whenever you're ready.</p>
    `,
  },
  lessons: [
    {
      id: "2.1",
      title: "What's a Variable?",
      content: `
        <p>A <strong>variable</strong> is a name that stores a value, so you can use that value
        again later without retyping it. You create one with a single equals sign — the variable
        name goes on the left, the value it stores goes on the right.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>score = 10
print(score)</code></pre>
          <p>stores the number <code>10</code> in a variable named <code>score</code>, then
          prints it — output is just <code>10</code>. Notice <code>score</code> isn't in quotes
          when you print it: quotes mean "print this exact text," but a bare word means "print
          whatever value this variable is holding."</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>mixing up <code>score</code> (the variable, no quotes) with <code>"score"</code>
          (just the literal word "score" as text). They look almost identical but do completely
          different things — try changing the example's <code>print(score)</code> to
          <code>print("score")</code> and see what happens.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>name = value</code> stores something in a variable — and printing the bare
          name (no quotes) prints whatever it's currently holding.</p>
        </div>
      `,
      starterCode: `score = 10
print(score)`,
      practice: null,
    },
    {
      id: "2.2",
      title: "Naming Your Variables",
      content: `
        <p>You can call a variable almost anything you want, but Python has a few real rules:
        names can only use letters, numbers, and underscores (<code>_</code>) — no spaces, no
        symbols like <code>-</code> or <code>!</code> — and a name can <strong>never start with a
        number</strong>. On top of the rules, there's a good habit worth building now: use a name
        that actually describes what it's storing, like <code>score</code> instead of
        <code>x</code>.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>player_1_score = 50
print(player_1_score)</code></pre>
          <p>works because the name starts with a letter — the number is fine <em>later</em> in
          the name, just never as the very first character. Output: <code>50</code>.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>a variable name that starts with a number isn't just bad style — Python won't run it
          at all. That's a real error, not a warning, and it'll show up in the Errors panel below
          instead of the Output pane.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>The code on the right won't run — its variable name breaks the "never start with a
          number" rule. Rename it to something that starts with a letter (like the example
          above), update <em>both</em> places it appears, and make it print exactly
          <code>100</code>.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>variable names use letters, numbers, and underscores — but they can never start with
          a number.</p>
        </div>
      `,
      starterCode: `1st_score = 100
print(1st_score)`,
      practice: {
        instructions: "Fix the broken variable name so the code runs, and make sure it still prints exactly: 100",
        solution: `first_score = 100
print(first_score)`,
        check(actualOutput) {
          const got = actualOutput.trim();
          const want = "100";
          if (got === want) {
            return { pass: true, message: "Fixed it — that name now follows Python's rules, and the value still comes through." };
          }
          return {
            pass: false,
            message: `Not quite — we want the output to be "${want}". Make sure your renamed variable starts with a letter and is used in both lines.`,
          };
        },
      },
    },
    {
      id: "2.3",
      title: "Strings vs. Numbers",
      content: `
        <p>Variables can hold different <strong>types</strong> of values. The two you've seen so
        far are <strong>strings</strong> (text, always in quotes) and <strong>numbers</strong>
        (never in quotes). The quoting rule you learned back in Chapter 1 still applies — it just
        applies to whatever's on the right side of the <code>=</code> now, too.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>pet_name = "Rex"
pet_age = 3
print(pet_name, pet_age)</code></pre>
          <p>stores a string in <code>pet_name</code> (quoted, it's text) and a number in
          <code>pet_age</code> (no quotes, it's a number), then prints both, comma-separated, just
          like Chapter 1 — output: <code>Rex 3</code>.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p><code>pet_age = "3"</code> (with quotes) and <code>pet_age = 3</code> (without) look
          almost the same but store completely different types — one's text, one's an actual
          number you could do math with. Keep numbers unquoted.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Same pattern as the example above. Create a variable <code>name</code> storing the
          text <code>Nova</code> (a string, needs quotes) and a variable <code>level</code>
          storing the number <code>7</code> (no quotes), then print them both with one
          <code>print()</code> call, comma-separated, so the output is exactly
          <code>Nova 7</code>.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>strings (text) need quotes, numbers don't — and that rule applies whether you're
          printing directly or storing the value in a variable first.</p>
        </div>
      `,
      starterCode: `name = "fix me"
level = 0
print(name, level)`,
      practice: {
        instructions: "Store the text Nova in name and the number 7 in level, then print them so the output is exactly: Nova 7",
        solution: `name = "Nova"
level = 7
print(name, level)`,
        check(actualOutput) {
          const got = actualOutput.trim();
          const want = "Nova 7";
          if (got === want) {
            return { pass: true, message: "Exactly right — a string and a number, stored and printed together." };
          }
          return {
            pass: false,
            message: `Not quite — Python printed "${got}", but we want "${want}". Check that name is quoted text and level is an unquoted number.`,
          };
        },
      },
    },
    {
      id: "2.4",
      title: "Changing a Variable's Value",
      content: `
        <p>A variable isn't locked in once you set it — that's the whole point of the name
        "variable." You can assign it a new value at any time, just by using <code>=</code>
        again. You can even build the new value out of the variable's <em>old</em> value.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>coins = 5
coins = coins + 3
print(coins)</code></pre>
          <p>starts <code>coins</code> at <code>5</code>, then reassigns it to "whatever
          <code>coins</code> currently is, plus 3" — Python calculates the right side
          (<code>5 + 3</code>) <em>before</em> storing the result back into <code>coins</code>, so
          it ends up holding <code>8</code>. Output: <code>8</code>.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p><code>coins = coins + 3</code> only works if <code>coins</code> already has a value
          <em>before</em> that line runs — Python reads top to bottom, so the variable has to
          exist first.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Same pattern as the example above. Start <code>health</code> at <code>20</code>, then
          reassign it by subtracting <code>6</code> (<code>health = health - 6</code>), so the
          final printed value is exactly <code>14</code>.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>reassigning a variable with <code>=</code> replaces its value — and you can build
          the new value out of the old one.</p>
        </div>
      `,
      starterCode: `health = 20
print(health)`,
      practice: {
        instructions: "Start health at 20, then reassign it by subtracting 6, so the code prints exactly: 14",
        solution: `health = 20
health = health - 6
print(health)`,
        check(actualOutput) {
          const got = actualOutput.trim();
          const want = "14";
          if (got === want) {
            return { pass: true, message: "That's it — you just updated a variable using its own old value." };
          }
          return {
            pass: false,
            message: `Not quite — we want the output to be "${want}". Reassign health to health - 6 before printing it.`,
          };
        },
      },
    },
    {
      id: "2.5",
      title: "Using Variables with print()",
      content: `
        <p>You've already been printing variables one at a time, and multiple at once with
        commas. That's exactly the same skill as combining several variables to build a bigger
        line of output — nothing new to learn here, just putting the last few lessons together.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>player = "Ash"
badges = 4
print("Trainer:", player, "Badges:", badges)</code></pre>
          <p>mixes plain text (in quotes) with variables (no quotes) in one <code>print()</code>
          call — Python prints each piece in order, space-separated, just like always. Output:
          <code>Trainer: Ash Badges: 4</code>.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>forgetting quotes around the plain-text labels (like <code>"Trainer:"</code>) — if
          you leave those quotes off, Python thinks you're trying to use a variable named
          <code>Trainer</code>, which doesn't exist, and you'll get an error.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Same pattern as the example above. Create <code>hero</code> storing
          <code>Nova</code> and <code>power</code> storing <code>Flight</code>, then print them
          with labels so the output is exactly <code>Hero: Nova Power: Flight</code>.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>mix quoted text and unquoted variables in the same <code>print()</code> call to build
          a labeled line of output.</p>
        </div>
      `,
      starterCode: `hero = "fix me"
power = "fix me"
print(hero, power)`,
      practice: {
        instructions: "Store hero and power, then print with labels so the output is exactly: Hero: Nova Power: Flight",
        solution: `hero = "Nova"
power = "Flight"
print("Hero:", hero, "Power:", power)`,
        check(actualOutput) {
          const got = actualOutput.trim();
          const want = "Hero: Nova Power: Flight";
          if (got === want) {
            return { pass: true, message: "Perfect — labels and variables working together in one line." };
          }
          return {
            pass: false,
            message: `Not quite — Python printed "${got}", but we want "${want}". Check your labels are quoted and your variables aren't.`,
          };
        },
      },
    },
    {
      id: "2.6",
      title: "Wrap-Up: Character Sheet",
      content: `
        <p>You now know how to store values, name them well, tell strings and numbers apart,
        change a value after the fact, and print several variables together. Time for a fun
        challenge instead of a new concept.</p>
        <p><strong>Character Sheet:</strong> using only variables and <code>print()</code>, build
        a bio card for a made-up game character — at minimum a name, a level (number), and a
        favorite weapon or power. Add anything else you want: a health total, a catchphrase, a
        hometown.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>name = "Ember"
level = 12
weapon = "Twin Daggers"
print("Name:", name)
print("Level:", level)
print("Weapon:", weapon)</code></pre>
          <p>not something to copy — just to show the idea: a few variables, then a few labeled
          <code>print()</code> lines to lay them out.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>keep string variables (name, weapon) in quotes and number variables (level) without
          — the same rule from earlier in this chapter, just applied to your own character now.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Challenge</span>
          <p>Build your own character sheet out of variables and <code>print()</code> lines —
          anything you like. There's no exact right answer here, so there's nothing to
          auto-check. Just have fun with it, and show a parent what you made when you're happy
          with it.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>variables let you store, name, and reuse values — Chapter 2, complete!</p>
        </div>
      `,
      starterCode: `name = "Ember"
level = 12
weapon = "Twin Daggers"
print("Name:", name)
print("Level:", level)
print("Weapon:", weapon)`,
      practice: null,
    },
  ],
};
