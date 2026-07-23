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
      chunks of text, split sentences into words, and format output far beyond a single f-string.
      This is genuinely new territory, not a recap, so it gets a full lesson-by-lesson treatment.</p>

      <p>This chapter's Project teaches your Command Loop to understand commands with more than
      one word — <code>"go north"</code>, not just <code>"look"</code>. That's the difference
      between a toy and an actual game engine.</p>
    `,
  },
  lessons: [
    {
      id: "3.1",
      title: "Basic Slicing",
      content: `
        <p><code>word[0]</code> grabs one character. <strong>Slicing</strong> —
        <code>word[start:end]</code> — grabs a whole chunk at once, from index <code>start</code>
        up to (but not including) index <code>end</code>. Think of the colon as "through, but
        stop before."</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>command = "go north"
print(command[0:2])
print(command[3:8])</code></pre>
          <p>Output: <code>go</code>, then <code>north</code>. <code>command[0:2]</code> grabs
          index <code>0</code> and <code>1</code> — two characters, <code>g</code> and
          <code>o</code> — but stops before index <code>2</code>. Count the letters:
          <code>g-o-space-n-o-r-t-h</code> puts indexes <code>0</code> through <code>7</code>,
          so <code>[3:8]</code> covers indexes 3, 4, 5, 6, 7 — exactly <code>north</code>.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>the character at <code>end</code> is <em>not</em> included — <code>command[0:2]</code>
          gets indexes 0 and 1 only, not 2. The number of characters you get back is always
          <code>end - start</code>. Off-by-one mistakes here are extremely common — when in doubt,
          count on your fingers.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p><code>item = "healing potion"</code> is given. Print just <code>"healing"</code> using
          a slice (don't just type the word directly — use <code>item[...]</code>).</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>text[start:end]</code> slices out characters from <code>start</code> up to (not
          including) <code>end</code> — the slice's length is always <code>end - start</code>.</p>
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
      title: "Omitting Start or End",
      content: `
        <p>Counting out the exact length of a command just to slice "everything after the first
        word" would be tedious and error-prone — Python lets you skip a slice boundary entirely
        instead. You don't need to write both numbers every time. Leaving off <code>end</code>
        means "to the end of the string"; leaving off <code>start</code> means "from the
        beginning."</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>command = "go north"
print(command[3:])
print(command[:2])
print(command[:])</code></pre>
          <p>Output: <code>north</code>, then <code>go</code>, then <code>go north</code> (the
          whole string — a full copy, occasionally useful when you specifically want a duplicate
          rather than the original list or string). <code>command[3:]</code> reads as "everything
          from index 3 onward"; <code>command[:2]</code> reads as "everything up to index 2."</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>it's easy to misread <code>[:2]</code> as "the first two characters starting at
          index 2" — it's the opposite: it's everything <em>before</em> index 2, i.e. indexes 0
          and 1.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p><code>weapon = "iron sword"</code> is given. Print everything from index
          <code>5</code> onward, then everything up to index <code>4</code>, on two lines.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>Omit <code>start</code> or <code>end</code> to slice from the beginning or to the
          end — you rarely need to write out the full length by hand.</p>
        </div>
      `,
      starterCode: `weapon = "iron sword"
# print weapon[5:], then weapon[:4]`,
      practice: {
        instructions: "Print: sword then iron",
        solution: `weapon = "iron sword"
print(weapon[5:])
print(weapon[:4])`,
        check(actualOutput) {
          const lines = actualOutput.trim().split("\n").map((l) => l.trim());
          if (lines.length === 2 && lines[0] === "sword" && lines[1] === "iron") {
            return { pass: true, message: "Both open-ended slices came out right." };
          }
          return { pass: false, message: "Not quite — we want \"sword\" then \"iron\"." };
        },
      },
    },
    {
      id: "3.3",
      title: "Negative Indices",
      content: `
        <p>Grabbing "the last character" or "the last few characters" by counting forward from 0
        means knowing the string's exact length first — which you often don't, especially with
        something like player-typed text. A negative index sidesteps that entirely by counting
        from the <em>end</em> of the string instead of the beginning — <code>-1</code> is the last
        character, <code>-2</code> is second-to-last, and so on. This works inside slices too.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>item = "rusty sword"
print(item[-1])
print(item[-5:])</code></pre>
          <p>Output: <code>d</code>, then <code>sword</code>. <code>item[-1]</code> is the very
          last character; <code>item[-5:]</code> means "the last 5 characters, to the end" —
          handy when you don't know (or don't want to count) exactly how long a string is.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>there's no <code>item[-0]</code> that means "last character from the other
          direction" — <code>-0</code> is just <code>0</code>, the very first character.
          Negative indexing starts at <code>-1</code>, not <code>-0</code>.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p><code>filename = "save_slot_1.json"</code> is given. Print the last 5 characters
          (the file extension part) using a negative-index slice.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>Negative indexes count backward from the end — <code>-1</code> is last,
          <code>[-n:]</code> grabs the last <code>n</code> characters without needing to know the
          string's length.</p>
        </div>
      `,
      starterCode: `filename = "save_slot_1.json"
# print the last 5 characters`,
      practice: {
        instructions: "Print exactly: .json",
        solution: `filename = "save_slot_1.json"
print(filename[-5:])`,
        check(actualOutput) {
          const got = actualOutput.trim();
          if (got === ".json") {
            return { pass: true, message: "Negative-index slice grabbed the last 5 characters correctly." };
          }
          return { pass: false, message: 'Not quite — we want exactly ".json", the last 5 characters.' };
        },
      },
    },
    {
      id: "3.4",
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
          it — <code>"look".split()</code> is <code>['look']</code>, a list with one item, not
          just the string <code>"look"</code>.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>if the player only types one word (like <code>"look"</code>), <code>words</code> only
          has one item — trying to access <code>words[1]</code> then crashes with an
          <code>IndexError</code>. You'll need to check the list's length first (Chapter 7 covers
          handling this gracefully with <code>try</code>/<code>except</code>).</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p><code>command = "take rusty sword"</code> is given. Split it, then print the first
          word and the second word on two separate lines: <code>take</code> then
          <code>rusty</code>.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>.split()</code> turns <code>"go north"</code> into <code>['go', 'north']</code>
          — the first word is usually the verb, the rest is the argument.</p>
        </div>
      `,
      starterCode: `command = "take rusty sword"
words = command.split()
# print words[0], then words[1]`,
      practice: {
        instructions: "Print take then rusty.",
        solution: `command = "take rusty sword"
words = command.split()
print(words[0])
print(words[1])`,
        check(actualOutput) {
          const lines = actualOutput.trim().split("\n").map((l) => l.trim());
          if (lines.length === 2 && lines[0] === "take" && lines[1] === "rusty") {
            return { pass: true, message: "Split correctly and indexed into the resulting list." };
          }
          return { pass: false, message: 'Not quite — we want "take" on the first line and "rusty" on the second.' };
        },
      },
    },
    {
      id: "3.5",
      title: "Joining Words Back Together",
      content: `
        <p><code>.join()</code> is the reverse of <code>.split()</code> — it glues a list of
        strings back into one string, with whatever separator you choose placed between them.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>words = ["take", "rusty", "sword"]
print(" ".join(words))
print("-".join(words))
print("".join(words))</code></pre>
          <p>Output: <code>take rusty sword</code>, then <code>take-rusty-sword</code>, then
          <code>takerustysword</code>. Notice the separator string comes <em>first</em>, and
          <code>.join()</code> is called <em>on the separator</em>, with the list passed in —
          backwards from how you might expect at first.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p><code>.join()</code> only works on a list of strings — <code>"-".join([1, 2,
          3])</code> crashes with a <code>TypeError</code>, since <code>1</code>, <code>2</code>,
          and <code>3</code> are numbers, not strings.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p><code>words = ["take", "rusty", "sword"]</code> is given. Join everything
          <em>after</em> the first word (<code>words[1:]</code>) back together with spaces, and
          print it.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>"separator".join(list_of_strings)</code> glues a list back into one string —
          the natural partner to <code>.split()</code>.</p>
        </div>
      `,
      starterCode: `words = ["take", "rusty", "sword"]
# join words[1:] with spaces and print it`,
      practice: {
        instructions: "Print exactly: rusty sword",
        solution: `words = ["take", "rusty", "sword"]
print(" ".join(words[1:]))`,
        check(actualOutput) {
          const got = actualOutput.trim();
          if (got === "rusty sword") {
            return { pass: true, message: "Sliced off the first word, then joined the rest back together." };
          }
          return { pass: false, message: 'Not quite — we want exactly "rusty sword".' };
        },
      },
    },
    {
      id: "3.6",
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
          to 8 characters wide (adding spaces on the right) so things line up, the same way a
          real menu or scoreboard would.</p>
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
      id: "3.7",
      title: "Chapter 3 Wrap-Up",
      content: `
        <p>Slicing, splitting, joining, and formatting — your program can now take apart what the
        player typed and present its own output cleanly. Time to put that to work.</p>
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
