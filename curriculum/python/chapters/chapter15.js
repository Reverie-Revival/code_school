// Chapter 15 — Putting It Together
// Content follows curriculum/python/template.md — see that file for the
// shape every Chapter Welcome / Lesson / Project should follow.
// Each lesson: { id, title, content (HTML string), starterCode, practice }
// practice.check(actualOutput) returns { pass: boolean, message: string }

export const chapter = {
  number: 15,
  title: "Putting It Together",
  welcome: {
    content: `
      <p><strong>Chapter 15: Putting It Together.</strong> This is it — the last chapter. No new
      syntax to learn here, just everything you already know, combined into one real program.</p>

      <p><strong>Why this actually matters:</strong> every real program you've ever used —
      not just games, but the apps on your parents' phones, the software running at a store's
      checkout, all of it — is really just print, variables, strings, math, input, decisions,
      lists, loops, functions, and dictionaries, combined in different ways. You now know every
      single one of those pieces. The only thing left is putting them together.</p>

      <p>By the end of this chapter, you'll build <strong>The Dice Dungeon</strong> — a
      text-based dungeon crawl where dice rolls decide what happens to you at every turn. It uses
      everything from this entire course.</p>

      <p>No clock here — take your time. Press <strong>Next</strong> or pick a lesson from the
      dropdown above whenever you're ready.</p>
    `,
  },
  lessons: [
    {
      id: "15.1",
      title: "Everything You've Learned",
      content: `
        <p>Take a moment to look back at everything you've built up to now:</p>
        <ul>
          <li><strong>print(), variables, strings, and comments</strong> (Chapters 1–3) — showing
          output, storing and naming values, and joining or formatting text.</li>
          <li><strong>Math</strong> (Chapter 4) — real arithmetic, order of operations, and
          converting between numbers and text.</li>
          <li><strong>input()</strong> (Chapter 5) — getting information from the person running
          your program.</li>
          <li><strong>Comparisons and decisions</strong> (Chapters 6–8) — booleans,
          <code>if</code>/<code>elif</code>/<code>else</code>, and combining conditions with
          <code>and</code>/<code>or</code>.</li>
          <li><strong>Lists and loops</strong> (Chapters 9–11) — storing many values together, and
          repeating code with <code>for</code>, <code>range()</code>, and <code>while</code>.</li>
          <li><strong>Functions</strong> (Chapters 12–13) — reusable code that can take in
          information and hand back a result.</li>
          <li><strong>Dictionaries</strong> (Chapter 14) — looking values up by name instead of
          position.</li>
        </ul>
        <p>That's the entire toolkit. The capstone project ahead uses every single piece of it.</p>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>fifteen chapters of tools, all still in play — nothing left to learn before the
          capstone, just everything to combine.</p>
        </div>
      `,
      starterCode: `# Nothing to fix here — just press Next when you're ready to keep going.
print("Ready for the capstone!")`,
      practice: null,
    },
    {
      id: "15.2",
      title: "Planning Before You Code",
      content: `
        <p>Before writing a big program, it helps to plan first — sketch out, in plain English,
        what your program needs to do, step by step, before diving into the actual code. Real
        programmers do this constantly, often as <code>#</code> comments (Chapter 3.6) that get
        filled in with real code underneath, one step at a time.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code># Step 1: roll a random number from 1 to 6
# Step 2: if it's a 6, print a win message
# Step 3: otherwise, print a try-again message

import random
roll = random.randint(1, 6)

if roll == 6:
    print("You win!")
else:
    print("Try again!")</code></pre>
          <p>the comments at the top were written <em>first</em>, as a plan — the code
          underneath just fills in each step, in the same order. Output varies (it's random!),
          but it's always either <code>You win!</code> or <code>Try again!</code></p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>skipping the planning step on something as big as the capstone project ahead usually
          leads to confusing, tangled code. Sketch the steps first — even just a few
          <code>#</code> comments — then fill in each one.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>The plan is already written as comments below. Fill in the two messages so they
          match the plan — a win message if the roll is 6, a try-again message otherwise.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>plan first, in plain English (or comments), then fill in the code one step at a
          time — especially for anything bigger than a few lines.</p>
        </div>
      `,
      starterCode: `# Step 1: roll a random number from 1 to 6
# Step 2: if it's a 6, print a win message
# Step 3: otherwise, print a try-again message

import random
roll = random.randint(1, 6)

if roll == 6:
    print("fix me")
else:
    print("fix me")`,
      practice: {
        instructions: 'Fill in the win message ("You win!") and the try-again message ("Try again!") to match the plan.',
        solution: `# Step 1: roll a random number from 1 to 6
# Step 2: if it's a 6, print a win message
# Step 3: otherwise, print a try-again message

import random
roll = random.randint(1, 6)

if roll == 6:
    print("You win!")
else:
    print("Try again!")`,
        check(actualOutput) {
          const got = actualOutput.trim();
          if (got === "You win!" || got === "Try again!") {
            return { pass: true, message: "Right — that's exactly what the plan called for, whichever way the dice landed." };
          }
          return {
            pass: false,
            message: `Not quite — the if branch should print exactly "You win!" and the else branch exactly "Try again!"`,
          };
        },
      },
    },
  ],
  project: {
    title: "The Dice Dungeon",
    content: `
      <p><strong>The Capstone Challenge:</strong> a text-based dungeon crawl. You'll explore a
      series of rooms, and a dice roll decides what happens in each one — a monster fight, a
      trap, or a treasure chest. This is the biggest project in the whole course, and it uses
      every tool you've built up along the way.</p>
      <div class="lesson-recap">
        <span class="lesson-label">What You'll Use</span>
        <ul>
          <li><code>input()</code>, to name your character (Chapter 5)</li>
          <li>A dictionary, to track your health and gold by name (Chapter 14)</li>
          <li>A list, to hold the rooms you'll explore (Chapter 9)</li>
          <li>A <code>for</code> loop, to move through the rooms one at a time (Chapter 10)</li>
          <li><code>random.randint()</code>, to roll the dice for each room (Chapter 12.2)</li>
          <li><code>if</code>/<code>elif</code>/<code>else</code>, to react to the roll (Chapters
          7–8)</li>
          <li>Functions with parameters and <code>return</code>, one per type of encounter
          (Chapters 12–13)</li>
          <li><code>break</code>, to end the adventure early if you run out of health (Chapter
          11.2)</li>
        </ul>
      </div>
      <div class="lesson-turn">
        <span class="lesson-label">Step-By-Step</span>
        <ol>
          <li>The starter code asks for your character's name and sets up a
          <code>player</code> dictionary with <code>health</code> and <code>gold</code>.</li>
          <li>A <code>rooms</code> list holds a few room descriptions, looped over one at a
          time.</li>
          <li>Each room, a dice roll (<code>random.randint(1, 6)</code>) decides what happens —
          low rolls trigger <code>fight_monster()</code>, middle rolls trigger
          <code>hit_trap()</code>, high rolls trigger <code>find_treasure()</code>. Each of those
          is its own function that takes <code>player</code> in and returns the updated version.</li>
          <li>If health drops to 0 or below, the loop <code>break</code>s early — the adventure
          ends there. After the loop, an <code>if</code>/<code>else</code> checks whether you
          survived, so the ending message actually matches what happened.</li>
          <li>Run it a few times — the randomness means no two runs play out the same way.</li>
          <li>Once it's working, make it yours: add more rooms, add a new type of encounter (your
          own function), or change the odds by adjusting the dice-roll ranges.</li>
        </ol>
      </div>
      <div class="lesson-tip">
        <span class="lesson-label">Watch Out For</span>
        <p>each encounter function takes <code>player</code> in as a parameter <em>and</em>
        returns the updated version — make sure you store the result back
        (<code>player = fight_monster(player)</code>), or your changes won't stick.</p>
      </div>
    `,
    starterCode: `import random

name = input("Enter your character's name: ")
print(f"Welcome, {name}! Your adventure begins...")

player = {"health": 20, "gold": 0}
rooms = ["a dusty crypt", "a flooded chamber", "a collapsed tunnel"]


def fight_monster(player):
    damage = random.randint(1, 8)
    player["health"] = player["health"] - damage
    print(f"A monster attacks! You lose {damage} health.")
    return player


def hit_trap(player):
    damage = random.randint(1, 5)
    player["health"] = player["health"] - damage
    print(f"A trap springs! You lose {damage} health.")
    return player


def find_treasure(player):
    gold_found = random.randint(5, 20)
    player["gold"] = player["gold"] + gold_found
    print(f"You find a chest with {gold_found} gold!")
    return player


for room in rooms:
    print(f"\\nYou enter {room}...")
    roll = random.randint(1, 6)

    if roll <= 2:
        player = fight_monster(player)
    elif roll <= 4:
        player = hit_trap(player)
    else:
        player = find_treasure(player)

    print(f"Health: {player['health']}  Gold: {player['gold']}")

    if player["health"] <= 0:
        print("You have been defeated... Game over!")
        break

if player["health"] > 0:
    print("\\nYou made it through the dungeon!")
    print(f"Final stats — Health: {player['health']}  Gold: {player['gold']}")
else:
    print("\\nBetter luck next time!")`,
  },
};
