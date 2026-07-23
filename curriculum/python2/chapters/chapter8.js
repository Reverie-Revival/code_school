// Chapter 8 — Modules & the Standard Library
// Project: Dice & Loot -- random loot drops and a dice-roll combat mechanic.

export const chapter = {
  number: 8,
  title: "Modules & the Standard Library",
  welcome: {
    content: `
      <p><strong>Chapter 8: Modules & the Standard Library.</strong> Every real Python program
      uses code other people already wrote. Python ships with a huge collection of ready-to-use
      modules — the <strong>standard library</strong> — and <code>import</code> is how you bring
      one into your own program.</p>

      <p>This chapter's Project — <strong>Dice & Loot</strong> — adds real chance to your game:
      random loot drops, and a dice-roll combat mechanic, both powered by the <code>random</code>
      module.</p>
    `,
  },
  lessons: [
    {
      id: "8.1",
      title: "Importing Code Other People Wrote",
      content: `
        <p><code>import module_name</code> brings in a whole module; after that, its functions are
        available as <code>module_name.function_name()</code>.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>import math

print(math.sqrt(16))
print(math.pi)</code></pre>
          <p>Output: <code>4.0</code>, then <code>3.141592653589793</code>. <code>math</code> is
          part of the standard library — no installation needed, just <code>import</code> it and
          use it.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p><code>import</code> statements go at the very top of a file, before anything else —
          not because Python strictly requires it everywhere, but because it's the standard
          convention every real codebase follows, so anyone reading your file immediately knows
          what it depends on.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Import <code>math</code> and print <code>math.floor(7.9)</code> (rounds down to the
          nearest whole number).</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>import module_name</code>, then <code>module_name.something</code> — that's the
          whole pattern for using the standard library.</p>
        </div>
      `,
      starterCode: `# import math, then print math.floor(7.9)`,
      practice: {
        instructions: "Print exactly: 7",
        solution: `import math
print(math.floor(7.9))`,
        check(actualOutput) {
          const got = actualOutput.trim();
          if (got === "7") {
            return { pass: true, message: "Imported math and used one of its functions." };
          }
          return { pass: false, message: "Not quite — import math and print math.floor(7.9), which is 7." };
        },
      },
    },
    {
      id: "8.2",
      title: "random: Adding Chance to the Game",
      content: `
        <p>The <code>random</code> module adds actual unpredictability: <code>random.randint(a,
        b)</code> picks a whole number from <code>a</code> to <code>b</code> (inclusive on both
        ends), and <code>random.choice(a_list)</code> picks one item from a list at random.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>import random

roll = random.randint(1, 6)
loot = random.choice(["gold", "gem", "nothing"])
print(f"You rolled a {roll} and found {loot}.")</code></pre>
          <p>Output changes every run — that's the point. <code>randint(1, 6)</code> simulates a
          six-sided die; <code>choice(...)</code> picks unpredictably from whatever list you give
          it.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p><code>random.randint(1, 6)</code> can return <code>6</code> — both ends are included,
          unlike some other random functions in other languages that exclude the upper bound.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Import <code>random</code> and print a random number from <code>1</code> to
          <code>20</code> using <code>random.randint(...)</code>.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>random.randint(a, b)</code> and <code>random.choice(a_list)</code> are the two
          you'll reach for most for dice rolls and random picks.</p>
        </div>
      `,
      starterCode: `# import random, then print a random number from 1 to 20`,
      practice: {
        instructions: "Print a random whole number between 1 and 20 (inclusive) using random.randint.",
        solution: `import random
print(random.randint(1, 20))`,
        check(actualOutput) {
          const got = actualOutput.trim();
          const n = Number(got);
          if (Number.isInteger(n) && n >= 1 && n <= 20 && got === String(n)) {
            return { pass: true, message: `Rolled a ${got} — random.randint(1, 20) is working.` };
          }
          return { pass: false, message: "Not quite — print a single whole number between 1 and 20 using random.randint(1, 20)." };
        },
      },
    },
    {
      id: "8.3",
      title: "Chapter 8 Wrap-Up",
      content: `
        <p><code>import</code> unlocks the standard library, and <code>random</code> specifically
        unlocks real chance — dice rolls, random loot, anything that shouldn't be the same every
        time.</p>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>Chapter 8 complete. Next: dice-roll combat and random loot drops.</p>
        </div>
      `,
      starterCode: `# Nothing to fix here — press Next for the Project.
print("Chapter 8 complete!")`,
      practice: null,
    },
  ],
  project: {
    title: "Dice & Loot",
    content: `
      <p><strong>The Challenge:</strong> add a <code>"fight"</code> command that rolls dice to
      determine the outcome, and make room items drop randomly instead of always being in the same
      place.</p>
      <div class="lesson-recap">
        <span class="lesson-label">What You'll Use</span>
        <ul>
          <li><code>random.randint()</code>, for dice rolls (this chapter)</li>
          <li><code>random.choice()</code>, for picking random loot (this chapter)</li>
          <li>Everything from Chapter 7's bulletproofed game</li>
        </ul>
      </div>
      <div class="lesson-turn">
        <span class="lesson-label">Step-By-Step</span>
        <ol>
          <li>The starter code adds a <code>"fight"</code> command, only usable in the
          <code>"tower"</code> room (a goblin lives there): it rolls a d20 for the player and a
          d20 for the goblin, and whoever rolls higher wins.</li>
          <li>It also adds a one-time random loot drop: the first time the player enters the
          tower, there's a 50% chance a <code>"gem"</code> appears there to be taken.</li>
          <li>Run it a few times — since it's random, try it enough times to see both a win and a
          loss in combat, and both a gem appearing and not appearing.</li>
        </ol>
      </div>
      <div class="lesson-tip">
        <span class="lesson-label">Watch Out For</span>
        <p>a tie (both rolls equal) needs its own message — don't let it silently fall into either
        the "you win" or "you lose" branch, since neither is actually true.</p>
      </div>
    `,
    starterCode: `import random

ITEM_DATA = {
    "torch": ("Torch", 2),
    "coin": ("Gold Coin", 1),
    "gem": ("Sparkling Gem", 1),
}

rooms = {
    "cave": {
        "description": "A damp stone passage leads deeper into the dark.",
        "exits": {"north": "forest"},
    },
    "forest": {
        "description": "Sunlight filters through tall trees.",
        "exits": {"south": "cave", "east": "tower"},
    },
    "tower": {
        "description": "A crumbling stone tower rises above the trees. A goblin blocks the way!",
        "exits": {"west": "forest"},
    },
}

room_items = {
    "cave": ["coin"],
    "forest": ["torch"],
    "tower": [],
}

current_room = "cave"
inventory = []
tower_visited = False


def describe_room(room_name):
    print(rooms[room_name]["description"])
    if room_items[room_name]:
        print("Items here: " + ", ".join(room_items[room_name]))


def move_player(room_name, direction):
    exits = rooms[room_name]["exits"]
    if direction in exits:
        return exits[direction]
    return None


def parse_command(text):
    words = text.split()
    verb = words[0].lower() if len(words) > 0 else ""
    argument = words[1].lower() if len(words) > 1 else None
    return verb, argument


def fight_goblin():
    player_roll = random.randint(1, 20)
    goblin_roll = random.randint(1, 20)
    print(f"You roll a {player_roll}. The goblin rolls a {goblin_roll}.")
    if player_roll > goblin_roll:
        print("You defeat the goblin!")
    elif goblin_roll > player_roll:
        print("The goblin gets the better of you this time. You retreat.")
    else:
        print("A tie! You both back off, shaken.")


print("You are standing at the entrance of a small cave.")
print("Type 'help' to see what you can do.")

while True:
    try:
        command = input("> ")
        verb, argument = parse_command(command)

        if verb == "":
            print("Type something! Try 'help'.")
        elif verb == "look":
            describe_room(current_room)
        elif verb == "go":
            if argument:
                new_room = move_player(current_room, argument)
                if new_room:
                    current_room = new_room
                    print(f"You head {argument}, into the {current_room}.")
                    if current_room == "tower" and not tower_visited:
                        tower_visited = True
                        if random.choice([True, False]):
                            room_items["tower"].append("gem")
                            print("Something glints on the ground — a gem!")
                else:
                    print("You can't go that way.")
            else:
                print("Go where? Try 'go north'.")
        elif verb == "take":
            if argument and argument in room_items[current_room]:
                room_items[current_room].remove(argument)
                inventory.append(argument)
                print(f"You take the {ITEM_DATA[argument][0]}.")
            else:
                print("That's not here.")
        elif verb == "drop":
            if argument and argument in inventory:
                inventory.remove(argument)
                room_items[current_room].append(argument)
                print(f"You drop the {ITEM_DATA[argument][0]}.")
            else:
                print("You're not carrying that.")
        elif verb == "inventory":
            if inventory:
                names = [ITEM_DATA[item][0] for item in sorted(inventory)]
                print("You are carrying: " + ", ".join(names))
            else:
                print("Your bag is empty.")
        elif verb == "fight":
            if current_room == "tower":
                fight_goblin()
            else:
                print("There's nothing to fight here.")
        elif verb == "help":
            print("Commands: look, go <direction>, take <item>, drop <item>, inventory, fight, help, quit")
        elif verb == "quit":
            print("Goodbye!")
            break
        else:
            print("I don't understand that command.")
    except Exception as e:
        print(f"Something went wrong, but the game keeps running: {e}")`,
  },
};
