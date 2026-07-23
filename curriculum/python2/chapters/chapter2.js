// Chapter 2 — Recap Sprint: Logic & Loops
// The running project begins here: The Command Loop is the game engine's
// skeleton that every later chapter's project extends.

export const chapter = {
  number: 2,
  title: "Recap Sprint: Logic & Loops",
  welcome: {
    content: `
      <p><strong>Chapter 2: the last recap chapter.</strong> Conditionals, loops, lists, and
      functions — one more fast pass, each with its own quick lesson and its own practice, then
      this chapter's Project kicks off the game you'll be building for the rest of the course.</p>

      <p>That Project — <strong>The Command Loop</strong> — is small today: a loop that reads
      what the player types and reacts to it. But it's not a throwaway exercise. It's the actual
      skeleton of the game engine. Every project from here on adds onto this exact code.</p>
    `,
  },
  lessons: [
    {
      id: "2.1",
      title: "Decisions, Revisited",
      content: `
        <p><code>if</code>/<code>elif</code>/<code>else</code> picks exactly one path out of
        several, in order — Python checks each condition top to bottom and runs the first one
        that's <code>True</code>, skipping the rest entirely.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>hp = 45
if hp <= 0:
    print("Defeated!")
elif hp < 20:
    print("Critical — heal now!")
elif hp < 50:
    print("Wounded, but fighting.")
else:
    print("Full strength.")</code></pre>
          <p>Output: <code>Wounded, but fighting.</code> Python checks <code>hp <= 0</code>
          (false), then <code>hp < 20</code> (false), then <code>hp < 50</code> (true, stops
          here) — it never even looks at the <code>else</code>. Order matters: if the
          <code>hp < 50</code> check came before <code>hp < 20</code>, a critically low
          <code>hp</code> would incorrectly match "Wounded" first.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>put your <em>narrowest</em> conditions first — like <code>hp < 20</code> before
          <code>hp < 50</code> — since a wider check placed earlier will "steal" cases that
          should have matched a later, more specific one.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p><code>gold = 75</code> is given. Print <code>"Rich!"</code> if <code>gold</code> is
          100 or more, <code>"Comfortable"</code> if it's 50 or more, otherwise
          <code>"Broke"</code>.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>elif</code> chains check conditions in order and stop at the first match —
          order your conditions from narrowest to widest.</p>
        </div>
      `,
      starterCode: `gold = 75
# print "Rich!" / "Comfortable" / "Broke" based on gold`,
      practice: {
        instructions: "Print exactly: Comfortable",
        solution: `gold = 75
if gold >= 100:
    print("Rich!")
elif gold >= 50:
    print("Comfortable")
else:
    print("Broke")`,
        check(actualOutput) {
          const got = actualOutput.trim();
          if (got === "Comfortable") {
            return { pass: true, message: "Checked from narrowest to widest, and stopped at the right branch." };
          }
          return { pass: false, message: 'Not quite — with gold=75, we want exactly "Comfortable".' };
        },
      },
    },
    {
      id: "2.2",
      title: "While Loops, Revisited",
      content: `
        <p>A <code>while</code> loop keeps running as long as its condition stays
        <code>True</code> — which means something inside the loop has to eventually make that
        condition <code>False</code>, or it never stops.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>hp = 25
turns = 0
while hp > 0:
    hp = hp - 8
    turns = turns + 1
print(f"Defeated after {turns} turns.")</code></pre>
          <p>Output: <code>Defeated after 4 turns.</code> Each pass through the loop subtracts 8
          from <code>hp</code> (25 → 17 → 9 → 1 → -7) and counts the turn — the loop stops the
          instant <code>hp > 0</code> becomes false, right after the 4th hit.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p><code>while True:</code> loops forever unless something inside explicitly calls
          <code>break</code> — that's intentional for a game loop (Course 2's projects use this a
          lot), but it means you're responsible for making sure a <code>break</code> is actually
          reachable.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Write a <code>while</code> loop that starts <code>hp</code> at <code>30</code> and
          subtracts <code>7</code> each turn, printing <code>hp</code> every turn, stopping once
          <code>hp</code> is <code>0</code> or below.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>A <code>while</code> loop needs its condition to actually change inside the loop —
          otherwise it either never runs or never stops.</p>
        </div>
      `,
      starterCode: `hp = 30
# loop, subtracting 7 each turn and printing hp, until hp <= 0`,
      practice: {
        instructions: "Print hp each turn: 23, 16, 9, 2, -5",
        solution: `hp = 30
while hp > 0:
    hp = hp - 7
    print(hp)`,
        check(actualOutput) {
          const lines = actualOutput.trim().split("\n").map((l) => l.trim());
          const want = ["23", "16", "9", "2", "-5"];
          if (lines.length === want.length && lines.every((l, i) => l === want[i])) {
            return { pass: true, message: "Looped correctly until hp dropped to 0 or below." };
          }
          return { pass: false, message: "Not quite — we want 23, 16, 9, 2, -5, each on its own line." };
        },
      },
    },
    {
      id: "2.3",
      title: "Lists, Revisited",
      content: `
        <p>Lists hold multiple values in order, indexed starting at <code>0</code>, and
        <code>for</code> loops walk through every item without you needing to manage an index
        yourself.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>party = ["Robin", "Sam", "Jo"]
party.append("Max")
print(party[0])
print(len(party))
for member in party:
    print(f"- {member}")</code></pre>
          <p>Output: <code>Robin</code>, then <code>4</code>, then each name on its own line
          prefixed with <code>-</code>. <code>.append()</code> adds to the end;
          <code>len()</code> counts everything currently in the list, including what you just
          added.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p><code>party[4]</code> would crash with an <code>IndexError</code> even though
          <code>len(party)</code> is <code>4</code> — valid indexes only go up to
          <code>len(party) - 1</code>, since counting starts at <code>0</code>.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p><code>items = ["torch", "coin"]</code> is given. Append <code>"sword"</code>, then
          use a <code>for</code> loop to print each item prefixed with <code>"- "</code>.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>.append()</code> grows a list; a <code>for</code> loop is almost always the
          right tool once you're processing every item rather than one specific index.</p>
        </div>
      `,
      starterCode: `items = ["torch", "coin"]
# append "sword", then print each item prefixed with "- "`,
      practice: {
        instructions: "Print each item on its own line: - torch, - coin, - sword",
        solution: `items = ["torch", "coin"]
items.append("sword")
for item in items:
    print(f"- {item}")`,
        check(actualOutput) {
          const lines = actualOutput.trim().split("\n").map((l) => l.trim());
          const want = ["- torch", "- coin", "- sword"];
          if (lines.length === want.length && lines.every((l, i) => l === want[i])) {
            return { pass: true, message: "Appended, then looped over every item correctly." };
          }
          return { pass: false, message: "Not quite — we want - torch, - coin, - sword, each on its own line." };
        },
      },
    },
    {
      id: "2.4",
      title: "Defining and Calling Functions, Revisited",
      content: `
        <p>Without functions, "fight a goblin" or "describe a room" would mean copy-pasting the
        same block of code every single place your game needs to do that thing — and if you ever
        needed to fix a bug in it, you'd have to find and fix every copy. A function lets you
        write the logic <em>once</em>, give it a name, and run it from anywhere just by using that
        name. That's the whole point: one place to write it, unlimited places to use it.</p>
        <p>Writing a function (<code>def</code>) and <em>calling</em> it are two completely
        separate steps that happen at completely different times — this trips up almost everyone
        at first, so it's worth slowing down on.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>def greet(name):            # ① Python reads this and remembers the recipe —
    print(f"Hello, {name}!")   #    nothing runs yet, not even this print()

print("Before")              # ② this runs first
greet("Robin")                # ③ NOW the function actually runs, using "Robin"
print("After")                # ④ execution comes back here once greet() is done</code></pre>
          <p>Output: <code>Before</code>, then <code>Hello, Robin!</code>, then
          <code>After</code> — in that order. The <code>def</code> block itself doesn't run when
          Python first reads it; it just teaches Python the recipe and gives it a name. The
          <code>print()</code> <em>inside</em> <code>greet</code> only runs later, at step ③, the
          moment something actually calls <code>greet("Robin")</code>. <code>name</code> becomes
          <code>"Robin"</code> for just that one call — that's what a <strong>parameter</strong>
          is: a variable that only exists inside the function, set to whatever value was passed in
          when it was called.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>defining a function and never calling it does nothing at all — no error, no output,
          nothing. If you write a <code>def</code> and don't see the effect you expected, the very
          first thing to check is whether you actually called it anywhere.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Write a function <code>announce(item)</code> that prints
          <code>f"You found a {item}!"</code>. Call it once with <code>"torch"</code>.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>A <code>def</code> block is just a recipe until something calls it — calling is what
          actually jumps into the function body, with each parameter set to whatever was passed
          in for that specific call.</p>
        </div>
      `,
      starterCode: `# write announce(item) and call it with "torch"`,
      practice: {
        instructions: "Print exactly: You found a torch!",
        solution: `def announce(item):
    print(f"You found a {item}!")

announce("torch")`,
        check(actualOutput) {
          const got = actualOutput.trim();
          if (got === "You found a torch!") {
            return { pass: true, message: "Defined the function, then actually called it — both steps, in order." };
          }
          return { pass: false, message: 'Not quite — we want exactly "You found a torch!" printed.' };
        },
      },
    },
    {
      id: "2.5",
      title: "How Functions Return Values, Revisited",
      content: `
        <p>A function that just <code>print()</code>s something is useful for showing the player
        text, but it can't hand a result back to the rest of your program to use in more math or
        logic. <code>return</code> is how a function sends a value back out to exactly where it
        was called — completing the round trip that Lesson 2.4 started.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>def total_gold(amounts):       # ① recipe remembered, nothing runs yet
    total = 0
    for amount in amounts:
        total = total + amount
    return total                #  ③ sends this value back to the call site

winnings = total_gold([10, 25, 5])  # ② calling jumps in; amounts = [10, 25, 5]
print(winnings + 100)                # ④ resumes here — winnings is now 40</code></pre>
          <p>Output: <code>140</code>. At step ②, execution jumps into the function and
          <code>amounts</code> becomes <code>[10, 25, 5]</code>. The loop adds everything up to
          <code>40</code>. At step ③, <code>return total</code> doesn't just end the function —
          it sends <code>40</code> back out to <em>exactly</em> where <code>total_gold(...)</code>
          was called. At step ④, execution resumes on that same line, and
          <code>winnings</code> now holds <code>40</code>, ready to use in
          <code>winnings + 100</code>.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>a function with no <code>return</code> hands back <code>None</code>, not the last
          thing it printed — printing something inside a function and returning it are two
          completely different actions, and mixing them up is one of the most common beginner
          bugs with functions.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Write <code>count_potions(items)</code> that returns how many times the string
          <code>"potion"</code> appears in the list <code>items</code>. Call it with the given
          list and print the result.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>Loop inside the function, build up a result, and <code>return</code> it — the value
          travels back out to the exact spot the function was called from, ready for the caller
          to use.</p>
        </div>
      `,
      starterCode: `items = ["potion", "sword", "potion", "shield", "potion"]

def count_potions(items):
    # your code here
    pass

print(count_potions(items))`,
      practice: {
        instructions: "count_potions should return how many times \"potion\" appears in the list. It should print 3.",
        solution: `items = ["potion", "sword", "potion", "shield", "potion"]

def count_potions(items):
    count = 0
    for item in items:
        if item == "potion":
            count = count + 1
    return count

print(count_potions(items))`,
        check(actualOutput) {
          const got = actualOutput.trim();
          if (got === "3") {
            return { pass: true, message: "Correct count, returned from the function and printed by the caller." };
          }
          return { pass: false, message: 'Not quite — count_potions(items) should return 3 for this list.' };
        },
      },
    },
    {
      id: "2.6",
      title: "Chapter 2 Wrap-Up",
      content: `
        <p>Recap's over — every piece re-proven with its own practice. Time to start building.</p>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>Chapter 2 complete. Next: the Project that kicks off your game.</p>
        </div>
      `,
      starterCode: `# Nothing to fix here — press Next for the Project.
print("Chapter 2 complete!")`,
      practice: null,
    },
  ],
  project: {
    title: "The Command Loop",
    content: `
      <p><strong>The Challenge:</strong> build a loop that keeps asking the player what to do,
      and reacts differently depending on what they type. This is small on its own — but it's the
      actual skeleton of the game engine. Every Project for the rest of this course adds onto this
      exact code, so get comfortable with its shape.</p>
      <div class="lesson-recap">
        <span class="lesson-label">What You'll Use</span>
        <ul>
          <li><code>while</code>, to keep the game running until the player quits</li>
          <li><code>input()</code>, to read what the player typed</li>
          <li><code>if</code>/<code>elif</code>/<code>else</code>, to react differently to
          different commands</li>
        </ul>
      </div>
      <div class="lesson-turn">
        <span class="lesson-label">Step-By-Step</span>
        <ol>
          <li>The starter code has a <code>while True:</code> loop — one that runs forever unless
          something inside it explicitly stops it with <code>break</code>.</li>
          <li>Each time through the loop, it asks the player to type a command.</li>
          <li>An <code>if</code>/<code>elif</code>/<code>else</code> chain checks what they typed:
          <code>"look"</code> prints a short room description, <code>"help"</code> lists the
          available commands, <code>"quit"</code> ends the game with <code>break</code>, and
          anything else prints a "didn't understand that" message.</li>
          <li>Run it and try each command. Then add one more command of your own — maybe
          <code>"inventory"</code> that prints a message about an empty bag. You'll fill it with a
          real inventory system in a few chapters.</li>
        </ol>
      </div>
      <div class="lesson-tip">
        <span class="lesson-label">Watch Out For</span>
        <p>without <code>break</code> somewhere inside it, <code>while True:</code> never stops —
        that's exactly why the <code>"quit"</code> branch needs one.</p>
      </div>
    `,
    starterCode: `print("You are standing at the entrance of a small cave.")
print("Type 'help' to see what you can do.")

while True:
    command = input("> ")

    if command == "look":
        print("A damp stone passage leads deeper into the dark.")
    elif command == "help":
        print("Commands: look, help, quit")
    elif command == "quit":
        print("Goodbye!")
        break
    else:
        print("I don't understand that command.")`,
  },
};
