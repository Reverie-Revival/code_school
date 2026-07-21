// Chapter 9 — Lists
// Content follows curriculum/python/template.md — see that file for the
// shape every Chapter Welcome / Lesson / Project should follow.
// Each lesson: { id, title, content (HTML string), starterCode, practice }
// practice.check(actualOutput) returns { pass: boolean, message: string }

export const chapter = {
  number: 9,
  title: "Lists",
  welcome: {
    content: `
      <p><strong>Chapter 9: Lists.</strong> Every variable so far has held exactly one value. This
      chapter introduces the <strong>list</strong> — a single variable that holds many values
      together, in order.</p>

      <p><strong>Why this actually matters:</strong> think about a game's high score board, a
      playlist of songs, or your friends list in an app. None of those are five or ten separate
      variables — they're one list, holding everything together, that the app can add to, search
      through, or display all at once. That's exactly what a list is for.</p>

      <p>By the end of this chapter, you'll build your own <strong>Top 5 List</strong> — favorite
      games, animals, anything you want — using nothing but lists and <code>print()</code>.</p>

      <p>No clock here — take your time. Press <strong>Next</strong> or pick a lesson from the
      dropdown above whenever you're ready.</p>
    `,
  },
  lessons: [
    {
      id: "9.1",
      title: "Quick Recap: Chapters 5–8",
      content: `
        <p>Before diving into something new, a quick look back. Since Chapter 5 you've learned to
        get input from the person running your program, have Python answer True/False questions,
        branch between paths with <code>if</code>/<code>elif</code>/<code>else</code>, and combine
        conditions with <code>and</code>/<code>or</code>.</p>
        <p>This chapter is a bit of a breather from decisions — it introduces a brand new way to
        store information: many values, together, in one variable.</p>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>input, booleans, and decision-making — four chapters of tools, all still in play as
          you head into Chapter 9.</p>
        </div>
      `,
      starterCode: `# Nothing to fix here — just press Next when you're ready to keep going.
print("Ready for Chapter 9!")`,
      practice: null,
    },
    {
      id: "9.2",
      title: "What's a List?",
      content: `
        <p>A <strong>list</strong> stores several values together, in order, inside one variable.
        You write one with square brackets <code>[ ]</code>, separating each item with a comma.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>pets = ["dog", "cat", "fish"]
print(pets)</code></pre>
          <p><code>pets</code> holds three strings, all in one list. Printing the whole list shows
          all of it at once, Python's own way: <code>['dog', 'cat', 'fish']</code> — brackets,
          commas, and quotes around each string.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>printing a list looks different from printing a single string — you'll see the
          brackets and quotes exactly like Python's own notation, not just the plain words like a
          normal <code>print()</code> would show.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Create a list called <code>colors</code> with exactly three strings:
          <code>"red"</code>, <code>"green"</code>, <code>"blue"</code> — then print it, so the
          output is exactly <code>['red', 'green', 'blue']</code></p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>a list is several values in one variable, written with <code>[ ]</code> and commas.</p>
        </div>
      `,
      starterCode: `colors = ["fix", "me"]
print(colors)`,
      practice: {
        instructions: "Create colors with exactly red, green, blue and print it, so the output is exactly: ['red', 'green', 'blue']",
        solution: `colors = ["red", "green", "blue"]
print(colors)`,
        check(actualOutput) {
          const got = actualOutput.trim();
          const want = "['red', 'green', 'blue']";
          if (got === want) {
            return { pass: true, message: "That's a list — three values, one variable." };
          }
          return {
            pass: false,
            message: `Not quite — we want the output to be "${want}". Check your spelling, order, and that each color is in quotes.`,
          };
        },
      },
    },
    {
      id: "9.3",
      title: "Getting Items by Index",
      content: `
        <p>Just like grabbing a single character from a string (Chapter 3.5), you can grab a
        single item from a list with square brackets — <code>list[0]</code> is the
        <em>first</em> item, since Python counts from 0.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>pets = ["dog", "cat", "fish"]
print(pets[0])</code></pre>
          <p><code>pets[0]</code> grabs the first item. Output: <code>dog</code> — no brackets or
          quotes this time, since you're printing just that one string, not the whole list.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>the same 0-based counting from string indexing applies here — <code>pets[1]</code> is
          the <em>second</em> item (<code>"cat"</code>), not the first.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Using <code>snacks</code>, print just the <em>third</em> item in the list, so the
          output is exactly <code>chips</code>.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>list[0]</code> grabs a list's first item — same 0-based indexing as strings.</p>
        </div>
      `,
      starterCode: `snacks = ["popcorn", "pretzels", "chips"]
print(snacks)`,
      practice: {
        instructions: "Print just the third item in snacks, so the output is exactly: chips",
        solution: `snacks = ["popcorn", "pretzels", "chips"]
print(snacks[2])`,
        check(actualOutput) {
          const got = actualOutput.trim();
          const want = "chips";
          if (got === want) {
            return { pass: true, message: "Right — the third item is at index 2, not 3." };
          }
          return {
            pass: false,
            message: `Not quite — we want the output to be "${want}". Remember the third item is snacks[2], since counting starts at 0.`,
          };
        },
      },
    },
    {
      id: "9.4",
      title: "Adding to a List: .append()",
      content: `
        <p><code>.append()</code> adds a new item onto the <em>end</em> of a list — no need to
        rebuild the whole list or reassign it, it changes the list directly.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>pets = ["dog", "cat"]
pets.append("fish")
print(pets)</code></pre>
          <p><code>pets.append("fish")</code> tacks <code>"fish"</code> onto the end of the
          existing list. Output: <code>['dog', 'cat', 'fish']</code></p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p><code>.append()</code> only adds <em>one</em> item at a time, and always at the
          <em>end</em> — there's no built-in way to add to the front with <code>.append()</code>
          alone.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Append <code>"eagle"</code> onto <code>birds</code>, then print the list, so the
          output is exactly <code>['robin', 'owl', 'eagle']</code></p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>list.append(item)</code> adds one new item onto the end of an existing list.</p>
        </div>
      `,
      starterCode: `birds = ["robin", "owl"]
print(birds)`,
      practice: {
        instructions: "Append \"eagle\" onto birds, then print it, so the output is exactly: ['robin', 'owl', 'eagle']",
        solution: `birds = ["robin", "owl"]
birds.append("eagle")
print(birds)`,
        check(actualOutput) {
          const got = actualOutput.trim();
          const want = "['robin', 'owl', 'eagle']";
          if (got === want) {
            return { pass: true, message: "That's append() — one new item, tacked on the end." };
          }
          return {
            pass: false,
            message: `Not quite — we want the output to be "${want}". Call birds.append("eagle") before printing.`,
          };
        },
      },
    },
    {
      id: "9.5",
      title: "Wrap-Up: Top 5 List",
      content: `
        <p>You can now build a list, grab an item out of it by index, and add new items onto the
        end. Time for a fun challenge instead of a new concept.</p>
        <p><strong>Top 5 List:</strong> build a list of your top 5 favorite anything — games,
        animals, foods, whatever you want — and print it out.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>top_games = ["Chess", "Minecraft", "Mario Kart", "Tetris", "Zelda"]
print(top_games)
print("My #1 pick:", top_games[0])</code></pre>
          <p>not something to copy — just to show the idea: one list of 5 items, printed whole,
          then a single favorite pulled out by index.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>there's no auto-check here, since there's no single right answer — pick whatever top
          5 you like.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Challenge</span>
          <p>Build your own top 5 list, print the whole thing, and print your #1 pick by index.
          There's nothing to auto-check here. Just have fun with it, and show a parent what you
          made when you're happy with it.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>lists hold many values in order, indexing grabs one, and <code>.append()</code> adds
          more — Chapter 9, complete!</p>
        </div>
      `,
      starterCode: `top_games = ["Chess", "Minecraft", "Mario Kart", "Tetris", "Zelda"]
print(top_games)
print("My #1 pick:", top_games[0])`,
      practice: null,
    },
  ],
};
