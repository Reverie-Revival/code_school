// Chapter 14 — Dictionaries
// Content follows curriculum/python/template.md — see that file for the
// shape every Chapter Welcome / Lesson / Project should follow.
// Each lesson: { id, title, content (HTML string), starterCode, practice }
// practice.check(actualOutput) returns { pass: boolean, message: string }

export const chapter = {
  number: 14,
  title: "Dictionaries",
  welcome: {
    content: `
      <p><strong>Chapter 14: Dictionaries.</strong> A list finds things by position — item 0,
      item 1, and so on. This chapter introduces the <strong>dictionary</strong>, which finds
      things by name instead — a value looked up by a key you choose, not a position you have to
      remember.</p>

      <p><strong>Why this actually matters:</strong> think about a player profile in a game —
      name, level, health, favorite weapon. You wouldn't want to remember "level is item number 2"
      the way you would with a list; you want to just ask for <code>"level"</code> by name. That's
      exactly what a dictionary gives you.</p>

      <p>By the end of this chapter, you'll build a tiny <strong>Word Lookup</strong> — your own
      slang or nickname dictionary you can build and query.</p>

      <p>No clock here — take your time. Press <strong>Next</strong> or pick a lesson from the
      dropdown above whenever you're ready.</p>
    `,
  },
  lessons: [
    {
      id: "14.1",
      title: "What's a Dictionary?",
      content: `
        <p>A <strong>dictionary</strong> stores values in <strong>key-value pairs</strong> —
        instead of finding something by its position like a list, you look it up by a name you
        choose, called a <strong>key</strong>. You write one with curly braces
        <code>{ }</code>, each pair written as <code>key: value</code>.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>player = {"name": "Ash", "level": 12}
print(player)</code></pre>
          <p><code>player</code> holds two key-value pairs: <code>"name"</code> maps to
          <code>"Ash"</code>, and <code>"level"</code> maps to <code>12</code>. Printing the whole
          dictionary shows all of it at once: <code>{'name': 'Ash', 'level': 12}</code></p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>dictionaries use curly braces <code>{ }</code>, not the square brackets
          <code>[ ]</code> a list uses — and each pair needs a colon between the key and its
          value, with commas between pairs.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Create a dictionary called <code>pet</code> with two pairs: <code>"name"</code>
          mapping to <code>"Rex"</code>, and <code>"age"</code> mapping to <code>3</code> — then
          print it, so the output is exactly <code>{'name': 'Rex', 'age': 3}</code></p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>a dictionary stores key-value pairs with <code>{ }</code> — look things up by name
          (the key), not by position.</p>
        </div>
      `,
      starterCode: `pet = {"fix": "me"}
print(pet)`,
      practice: {
        instructions: 'Create pet with "name": "Rex" and "age": 3, then print it, so the output is exactly: {\'name\': \'Rex\', \'age\': 3}',
        solution: `pet = {"name": "Rex", "age": 3}
print(pet)`,
        check(actualOutput) {
          const got = actualOutput.trim();
          const want = "{'name': 'Rex', 'age': 3}";
          if (got === want) {
            return { pass: true, message: "That's a dictionary — two key-value pairs, in one variable." };
          }
          return {
            pass: false,
            message: `Not quite — we want the output to be "${want}". Check your keys, values, and order.`,
          };
        },
      },
    },
    {
      id: "14.2",
      title: "Getting and Setting Values by Key",
      content: `
        <p>Grab a value out of a dictionary with square brackets and its key —
        <code>dictionary[key]</code> — not an index number like a list. You can change an
        existing value, or add a brand new key, the exact same way, using <code>=</code>.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>player = {"name": "Ash", "level": 12}
print(player["name"])
player["level"] = 13
print(player["level"])</code></pre>
          <p><code>player["name"]</code> looks up the value stored under <code>"name"</code>.
          <code>player["level"] = 13</code> then changes <code>"level"</code>'s value. Output:
          <code>Ash</code>, then <code>13</code>.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>looking up a key that doesn't exist (like <code>player["health"]</code> when there's
          no <code>"health"</code> key) causes a <code>KeyError</code>. Setting a new key with
          <code>=</code>, though, is completely fine — it just adds it.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Print <code>hero["weapon"]</code>, then change <code>hero["level"]</code> to
          <code>10</code> and print it, so the output is exactly:</p>
          <pre><code>Bow
10</code></pre>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>dictionary[key]</code> gets a value by name — the same square brackets with
          <code>=</code> sets or changes one.</p>
        </div>
      `,
      starterCode: `hero = {"weapon": "Bow", "level": 8}
print(hero["weapon"])
print(hero["level"])`,
      practice: {
        instructions: 'Print hero["weapon"], then change hero["level"] to 10 and print it, so the output is exactly: Bow / 10',
        solution: `hero = {"weapon": "Bow", "level": 8}
print(hero["weapon"])
hero["level"] = 10
print(hero["level"])`,
        check(actualOutput) {
          const got = actualOutput.trim();
          const want = "Bow\n10";
          if (got === want) {
            return { pass: true, message: "Right — one lookup, one change, both by key." };
          }
          return {
            pass: false,
            message: `Not quite — we want "Bow" then "10". Check you set hero["level"] = 10 before printing it.`,
          };
        },
      },
    },
    {
      id: "14.3",
      title: "Wrap-Up: Word Lookup",
      content: `
        <p>You can now build a dictionary, look up a value by key, and change or add entries.
        Time for a fun challenge instead of a new concept.</p>
        <p><strong>Word Lookup:</strong> build your own tiny slang, nickname, or translation
        dictionary — a few words mapped to their meanings — then look a couple of them up.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>slang = {"GOAT": "Greatest Of All Time", "IRL": "In Real Life"}
print(slang["GOAT"])
print(slang["IRL"])</code></pre>
          <p>not something to copy — just to show the idea: a small dictionary of terms, looked
          up one at a time by key.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>there's no auto-check here, since there's no single right answer — use whatever
          words and meanings you like.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Challenge</span>
          <p>Build your own word-lookup dictionary with at least three entries, then print a
          couple of lookups. There's nothing to auto-check here. Just have fun with it, and show
          a parent what you made when you're happy with it.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>dictionaries store key-value pairs, looked up by name — Chapter 14, complete! Next
          up: the capstone, putting everything together.</p>
        </div>
      `,
      starterCode: `slang = {"GOAT": "Greatest Of All Time", "IRL": "In Real Life", "BRB": "Be Right Back"}
print(slang["GOAT"])
print(slang["IRL"])`,
      practice: null,
    },
  ],
};
