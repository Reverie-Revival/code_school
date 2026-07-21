// Chapter 6 — Comparisons & Booleans
// Content follows curriculum/python/template.md — see that file for the
// shape every Chapter Welcome / Lesson / Project should follow.
// Each lesson: { id, title, content (HTML string), starterCode, practice }
// practice.check(actualOutput) returns { pass: boolean, message: string }

export const chapter = {
  number: 6,
  title: "Comparisons & Booleans",
  welcome: {
    content: `
      <p><strong>Chapter 6: Comparisons & Booleans.</strong> This chapter teaches Python to answer
      yes-or-no questions — is this equal to that, is this bigger than that — and the special
      True/False value it uses to answer them.</p>

      <p><strong>Why this actually matters:</strong> think about a game checking "did the player
      run out of health?" or "is this the high score?" Every single one of those checks boils down
      to a comparison that's either true or false — and that True/False answer is exactly what
      decides what happens next. You're not able to make your program actually <em>react</em> to
      one yet (that's Chapter 7), but you're about to learn how it asks the question in the first
      place.</p>

      <p>By the end of this chapter, you'll run a themed <strong>Stat Battle</strong> — comparing
      two characters' stats and seeing exactly how Python answers each matchup.</p>

      <p>No clock here — take your time. Press <strong>Next</strong> or pick a lesson from the
      dropdown above whenever you're ready.</p>
    `,
  },
  lessons: [
    {
      id: "6.1",
      title: "True or False: What's a Boolean?",
      content: `
        <p>A <strong>boolean</strong> is a value that's only ever <code>True</code> or
        <code>False</code> — Python's way of answering a yes-or-no question. You'll see this type
        constantly from here on, since every comparison you make hands one back.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>is_raining = True
print(is_raining)</code></pre>
          <p>stores a boolean directly in a variable, then prints it. Output: <code>True</code> —
          notice it's capitalized, and printed with no quotes around it, since it isn't text.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p><code>True</code> and <code>False</code> are special Python words, capitalized
          exactly like that. Typing <code>true</code> or <code>false</code> in lowercase gives you
          a <code>NameError</code> — Python has no idea what those words mean.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Create a variable called <code>is_sunny</code>, set it to <code>False</code>, and
          print it so the output is exactly <code>False</code>.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>a boolean is a <code>True</code>/<code>False</code> value, capitalized, with no
          quotes — Python's way of storing a yes-or-no answer.</p>
        </div>
      `,
      starterCode: `is_sunny = True
print(is_sunny)`,
      practice: {
        instructions: "Set is_sunny to False and print it, so the output is exactly: False",
        solution: `is_sunny = False
print(is_sunny)`,
        check(actualOutput) {
          const got = actualOutput.trim();
          const want = "False";
          if (got === want) {
            return { pass: true, message: "That's a boolean — capitalized, no quotes." };
          }
          return {
            pass: false,
            message: `Not quite — we want the output to be "${want}". Remember it's capitalized with no quotes.`,
          };
        },
      },
    },
    {
      id: "6.2",
      title: "Are They Equal? == and !=",
      content: `
        <p><code>==</code> checks whether two things are equal, and hands back <code>True</code>
        or <code>False</code>. <code>!=</code> asks the opposite question — are these
        <em>not</em> equal? Neither of these changes a variable's value; they only ask a
        question about it.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>score = 10
print(score == 10)
print(score != 5)</code></pre>
          <p><code>score == 10</code> asks "is score equal to 10?" — yes, so <code>True</code>.
          <code>score != 5</code> asks "is score <em>not</em> equal to 5?" — also yes, so
          <code>True</code>. Output: <code>True</code> then <code>True</code>.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>mixing up <code>=</code> and <code>==</code> — this trips up every beginner at some
          point. A single <code>=</code> <em>assigns</em> a value ("make this variable equal to
          this"); <code>==</code> <em>asks</em> a question ("is this equal to that?"). Using
          <code>=</code> when you meant <code>==</code> is one of the most common bugs there is.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Same pattern as the example above. Using <code>level</code>, print whether it equals
          <code>5</code> with <code>==</code>, then print whether it's not equal to <code>1</code>
          with <code>!=</code>, so the output is exactly two lines: <code>True</code> then
          <code>True</code>.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>==</code> asks "are these equal?", <code>!=</code> asks "are these
          different?" — both answer with <code>True</code> or <code>False</code>, neither one
          assigns anything.</p>
        </div>
      `,
      starterCode: `level = 5
print(level)
print(level)`,
      practice: {
        instructions: "Print whether level == 5, then whether level != 1, so the output is exactly: True / True (two lines)",
        solution: `level = 5
print(level == 5)
print(level != 1)`,
        check(actualOutput) {
          const got = actualOutput.trim();
          const want = "True\nTrue";
          if (got === want) {
            return { pass: true, message: "Right — == asked if they're equal, != asked if they're different." };
          }
          return {
            pass: false,
            message: `Not quite — check line one is level == 5 and line two is level != 1.`,
          };
        },
      },
    },
    {
      id: "6.3",
      title: "Bigger or Smaller? < and >",
      content: `
        <p><code>&lt;</code> and <code>&gt;</code> compare whether one number is smaller or bigger
        than another, giving back <code>True</code> or <code>False</code> just like
        <code>==</code> and <code>!=</code> do.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>health = 30
max_health = 100
print(health < max_health)</code></pre>
          <p>asks "is <code>health</code> smaller than <code>max_health</code>?" — yes, 30 is less
          than 100. Output: <code>True</code>.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>the direction of the symbol matters — <code>health &lt; max_health</code> and
          <code>health &gt; max_health</code> ask completely different questions. Read
          <code>&lt;</code> as "is smaller than" and <code>&gt;</code> as "is bigger than," in the
          order the variables appear.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Same pattern as the example above. Using <code>speed</code> and
          <code>rival_speed</code>, print whether <code>speed</code> is bigger than
          <code>rival_speed</code>, so the output is exactly <code>True</code>.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>&lt;</code> and <code>&gt;</code> compare two numbers and answer with
          <code>True</code> or <code>False</code>. (There's also <code>&lt;=</code> and
          <code>&gt;=</code> for "or equal to" — same idea, you'll run into those again soon.)</p>
        </div>
      `,
      starterCode: `speed = 90
rival_speed = 60
print(speed)`,
      practice: {
        instructions: "Print whether speed is bigger than rival_speed, so the output is exactly: True",
        solution: `speed = 90
rival_speed = 60
print(speed > rival_speed)`,
        check(actualOutput) {
          const got = actualOutput.trim();
          const want = "True";
          if (got === want) {
            return { pass: true, message: "Right — 90 is bigger than 60, so > answered True." };
          }
          return {
            pass: false,
            message: `Not quite — we want the output to be "${want}". Print speed > rival_speed.`,
          };
        },
      },
    },
    {
      id: "6.4",
      title: "Wrap-Up: Stat Battle",
      content: `
        <p>You now know every comparison Python has: <code>==</code>, <code>!=</code>,
        <code>&lt;</code>, and <code>&gt;</code> — each one answering with a boolean. Time for a
        themed challenge instead of a new concept.</p>
        <p><strong>Stat Battle:</strong> make up two characters, each with a few stats (strength,
        speed, health — whatever you like), then run a comparison for each stat and print the
        result.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>hero_strength = 8
villain_strength = 6
hero_speed = 5
villain_speed = 9

print(hero_strength > villain_strength)
print(hero_speed > villain_speed)</code></pre>
          <p>not something to copy — just to show the idea: stats for two characters, then a
          comparison printed for each matchup.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>there's no auto-check here, since there's no single right answer — make up whatever
          stats you like, the point is just seeing Python answer each comparison correctly.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Challenge</span>
          <p>Build your own Stat Battle — two characters, a few stats each, and a comparison
          printed for every matchup. There's nothing to auto-check here. Just have fun with it,
          and show a parent what you made when you're happy with it.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>comparisons answer questions with <code>True</code>/<code>False</code> — Chapter 6,
          complete! Next up: teaching Python to actually <em>react</em> to one.</p>
        </div>
      `,
      starterCode: `hero_strength = 8
villain_strength = 6
hero_speed = 5
villain_speed = 9

print(hero_strength > villain_strength)
print(hero_speed > villain_speed)`,
      practice: null,
    },
  ],
};
