// Chapter 2 — Recap Sprint: Logic & Loops
// The running project begins here: The Command Loop is the game engine's
// skeleton that every later chapter's project extends.

export const chapter = {
  number: 2,
  title: "Recap Sprint: Logic & Loops",
  welcome: {
    content: `
      <p><strong>Chapter 2: the last recap chapter.</strong> Conditionals, lists, loops, and
      functions — one more fast pass, then this chapter's Project kicks off the game you'll be
      building for the rest of the course.</p>

      <p>That Project — <strong>The Command Loop</strong> — is small today: a loop that reads
      what the player types and reacts to it. But it's not a throwaway exercise. It's the actual
      skeleton of the game engine. Every project from here on adds onto this exact code.</p>
    `,
  },
  lessons: [
    {
      id: "2.1",
      title: "Decisions & Loops Speed Round",
      content: `
        <p><code>if</code>/<code>elif</code>/<code>else</code> picks one path out of several;
        <code>while</code> repeats as long as a condition stays <code>True</code>. Combined, they
        let a program keep reacting to input until something tells it to stop.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>count = 3
while count > 0:
    print(count)
    count = count - 1
print("Go!")</code></pre>
          <p>Output: <code>3</code>, <code>2</code>, <code>1</code>, <code>Go!</code> — one line
          each. The loop keeps running as long as <code>count > 0</code>, and stops the moment
          that's no longer true.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>forgetting to update the loop's variable (here, <code>count</code>) inside the loop —
          that's how you get an infinite loop that never stops on its own.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Write a <code>while</code> loop that counts <em>up</em> from <code>1</code> to
          <code>5</code> (inclusive), printing each number on its own line.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>A <code>while</code> loop keeps running until its condition turns <code>False</code>
          — make sure something inside the loop actually moves it toward that.</p>
        </div>
      `,
      starterCode: `# write a while loop counting 1 through 5 here`,
      practice: {
        instructions: "Print the numbers 1 through 5, each on its own line, using a while loop.",
        solution: `n = 1
while n <= 5:
    print(n)
    n = n + 1`,
        check(actualOutput) {
          const got = actualOutput.trim().split("\n").map((l) => l.trim());
          const want = ["1", "2", "3", "4", "5"];
          if (got.length === want.length && got.every((line, i) => line === want[i])) {
            return { pass: true, message: "Counted up correctly, one number per line." };
          }
          return { pass: false, message: "Not quite — we want exactly the lines 1, 2, 3, 4, 5, in order." };
        },
      },
    },
    {
      id: "2.2",
      title: "Lists & Functions, Revisited",
      content: `
        <p>Lists hold multiple values in order; <code>for</code> loops walk through them one at a
        time; functions package up code you want to reuse, with <code>return</code> handing a
        result back to whoever called it.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>def total_gold(amounts):
    total = 0
    for amount in amounts:
        total = total + amount
    return total

print(total_gold([10, 25, 5]))</code></pre>
          <p>Output: <code>40</code>. The function loops over whatever list it's given, adds
          everything up, and returns the total — the <code>print()</code> outside then shows
          whatever came back.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>a function with no <code>return</code> hands back <code>None</code>, not the last
          thing it printed. <code>return</code> and <code>print()</code> are not the same thing.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Write a function <code>count_potions(items)</code> that returns how many times the
          string <code>"potion"</code> appears in the list <code>items</code>. Call it with the
          given list and print the result.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>Loop over the list inside the function, count what you're looking for, and
          <code>return</code> the count — the caller decides what to do with it.</p>
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
      id: "2.3",
      title: "Chapter 2 Wrap-Up",
      content: `
        <p>Recap's over — everything from Course 1 is warmed back up. Time to start building.</p>
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
