// Chapter 3 — Strings, Deep Dive
// Project: Parsing the Player -- extends Chapter 2's Command Loop with real
// multi-word command parsing and formatted room descriptions.

export const chapter = {
  number: 3,
  title: "Strings, Deep Dive",
  welcome: {
    content: `
      <p><strong>Chapter 3: Strings, Deep Dive.</strong> Course 1 taught you <code>word[0]</code>
      to grab a single character. That's about to feel very limited — real programs slice out
      chunks of text, split sentences into words, and format output far beyond a single f-string.</p>

      <p>This chapter's Project teaches your Command Loop to understand commands with more than
      one word — <code>"go north"</code>, not just <code>"look"</code>. That's the difference
      between a toy and an actual game engine.</p>
    `,
  },
  lessons: [
    {
      id: "3.1",
      title: "Slicing Strings",
      content: `
        <p><code>word[0]</code> grabs one character. <strong>Slicing</strong> —
        <code>word[start:end]</code> — grabs a whole chunk, from index <code>start</code> up to
        (but not including) index <code>end</code>.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>command = "go north"
print(command[0:2])
print(command[3:])
print(command[:2])</code></pre>
          <p>Output: <code>go</code>, then <code>north</code>, then <code>go</code>. Leaving off
          the end (<code>[3:]</code>) means "to the end of the string"; leaving off the start
          (<code>[:2]</code>) means "from the beginning."</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>the character at <code>end</code> is <em>not</em> included — <code>command[0:2]</code>
          gets indexes 0 and 1 only, not 2. Off-by-one mistakes here are extremely common.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p><code>item = "healing potion"</code> is given. Print just <code>"healing"</code> using
          a slice (don't just type the word directly — use <code>item[...]</code>).</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>text[start:end]</code> slices out characters from <code>start</code> up to (not
          including) <code>end</code> — omit either side to slice to the beginning/end.</p>
        </div>
      `,
      starterCode: `item = "healing potion"
# print "healing" using a slice`,
      practice: {
        instructions: 'Print exactly "healing" by slicing item, not by typing the word directly.',
        solution: `item = "healing potion"
print(item[0:7])`,
        check(actualOutput) {
          const got = actualOutput.trim();
          if (got === "healing") {
            return { pass: true, message: "Sliced out exactly the right chunk." };
          }
          return { pass: false, message: 'Not quite — we want exactly "healing". Slice item with item[0:7].' };
        },
      },
    },
    {
      id: "3.2",
      title: "Splitting Input into Words",
      content: `
        <p><code>.split()</code> breaks a string into a list of words, splitting on spaces by
        default. It's exactly what you need to turn <code>"go north"</code> into separate pieces:
        the command and its argument.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>text = "go north"
words = text.split()
print(words)
print(words[0])
print(words[1])</code></pre>
          <p>Output: <code>['go', 'north']</code>, then <code>go</code>, then <code>north</code>.
          <code>.split()</code> always returns a <em>list</em>, even if there's only one word in
          it.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>if the player only types one word (like <code>"look"</code>), <code>words</code> only
          has one item — trying to access <code>words[1]</code> then crashes with an
          <code>IndexError</code>. You'll need to check the list's length first (Chapter 7 covers
          handling this gracefully).</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p><code>command = "take rusty sword"</code> is given. Split it, then print the first
          word and the rest of the words joined back together with spaces, on two separate lines:
          <code>take</code> then <code>rusty sword</code>.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>.split()</code> turns <code>"go north"</code> into <code>['go', 'north']</code>
          — the first word is the verb, the rest is the argument.</p>
        </div>
      `,
      starterCode: `command = "take rusty sword"
words = command.split()
# print words[0], then the remaining words joined with spaces`,
      practice: {
        instructions: "Print the verb on one line and the rest of the words (joined with spaces) on the next: take then rusty sword.",
        solution: `command = "take rusty sword"
words = command.split()
verb = words[0]
rest = " ".join(words[1:])
print(verb)
print(rest)`,
        check(actualOutput) {
          const lines = actualOutput.trim().split("\n").map((l) => l.trim());
          if (lines.length === 2 && lines[0] === "take" && lines[1] === "rusty sword") {
            return { pass: true, message: "Verb and argument split apart correctly." };
          }
          return { pass: false, message: 'Not quite — we want "take" on the first line and "rusty sword" on the second.' };
        },
      },
    },
    {
      id: "3.3",
      title: "Formatting Output Like a Real Program",
      content: `
        <p>Real programs format output more carefully than a bare <code>print()</code>. String
        methods like <code>.title()</code>, <code>.ljust()</code>, and repeating a character with
        <code>"-" * 20</code> go a long way toward output that looks intentional.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>room = "dusty cellar"
print(room.title())
print("-" * 20)
print("exits:".ljust(8) + "north, east")</code></pre>
          <p>Output: <code>Dusty Cellar</code>, then a line of 20 dashes, then
          <code>exits:  north, east</code> — <code>.ljust(8)</code> pads <code>"exits:"</code> out
          to 8 characters wide so things line up.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p><code>.title()</code> capitalizes every word, which can misfire on words like
          <code>"it's"</code> (becomes <code>"It'S"</code>) — fine for room names, not for every
          string.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Given <code>room = "ancient library"</code>, print the room name using
          <code>.title()</code>, then a line of exactly 15 <code>=</code> characters underneath.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>.title()</code> capitalizes each word; <code>"char" * n</code> repeats a
          character <code>n</code> times — both are cheap ways to make output look deliberate.</p>
        </div>
      `,
      starterCode: `room = "ancient library"
# print room.title(), then a line of 15 equals signs`,
      practice: {
        instructions: "Print Ancient Library, then a line of exactly 15 = characters underneath.",
        solution: `room = "ancient library"
print(room.title())
print("=" * 15)`,
        check(actualOutput) {
          const lines = actualOutput.trim().split("\n").map((l) => l.trim());
          if (lines.length === 2 && lines[0] === "Ancient Library" && lines[1] === "=".repeat(15)) {
            return { pass: true, message: "Title-cased name and a clean divider line." };
          }
          return { pass: false, message: 'Not quite — we want "Ancient Library" then exactly 15 "=" characters.' };
        },
      },
    },
    {
      id: "3.4",
      title: "Chapter 3 Wrap-Up",
      content: `
        <p>Slicing, splitting, and formatting — your program can now take apart what the player
        typed and present its own output cleanly. Time to put that to work.</p>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>Chapter 3 complete. Next: teach the Command Loop to understand multi-word commands.</p>
        </div>
      `,
      starterCode: `# Nothing to fix here — press Next for the Project.
print("Chapter 3 complete!")`,
      practice: null,
    },
  ],
  project: {
    title: "Parsing the Player",
    content: `
      <p><strong>The Challenge:</strong> extend the Command Loop from Chapter 2 so it understands
      commands with more than one word — <code>"go north"</code>, <code>"take sword"</code> — not
      just single words like <code>"look"</code>.</p>
      <div class="lesson-recap">
        <span class="lesson-label">What You'll Use</span>
        <ul>
          <li><code>.split()</code>, to break the typed command into words (this chapter)</li>
          <li>Formatted, <code>.title()</code>-cased output for the room description (this
          chapter)</li>
          <li>Everything from Chapter 2's Command Loop — <code>while</code>, <code>input()</code>,
          <code>if</code>/<code>elif</code>/<code>else</code></li>
        </ul>
      </div>
      <div class="lesson-turn">
        <span class="lesson-label">Step-By-Step</span>
        <ol>
          <li>The starter code is Chapter 2's Command Loop, extended: it splits whatever the
          player typed into <code>words</code>, then pulls out <code>verb = words[0]</code>.</li>
          <li>A new <code>"go"</code> branch checks if there's a second word (the direction) and
          prints a message using it.</li>
          <li>Run it and try <code>go north</code>, <code>go anywhere</code>, and plain
          <code>look</code>. Then add your own two-word command, like <code>"take sword"</code>,
          following the same pattern as <code>"go"</code>.</li>
        </ol>
      </div>
      <div class="lesson-tip">
        <span class="lesson-label">Watch Out For</span>
        <p>typing just <code>"go"</code> with nothing after it makes <code>words</code> only one
        item long — the starter code's <code>len(words) > 1</code> check exists specifically to
        avoid crashing on that case. Keep that check when you add your own command.</p>
      </div>
    `,
    starterCode: `print("You are standing at the entrance of a small cave.")
print("Type 'help' to see what you can do.")

while True:
    command = input("> ")
    words = command.split()
    verb = words[0] if len(words) > 0 else ""

    if verb == "look":
        print("A damp stone passage leads deeper into the dark.")
    elif verb == "go":
        if len(words) > 1:
            direction = words[1]
            print(f"You head {direction}, but the path is blocked by rubble.")
        else:
            print("Go where? Try 'go north'.")
    elif verb == "help":
        print("Commands: look, go <direction>, help, quit")
    elif verb == "quit":
        print("Goodbye!")
        break
    else:
        print("I don't understand that command.")`,
  },
};
