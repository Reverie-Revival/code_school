// Chapter 12 — Debugging & Testing Mindset
// Project: Bug Hunt -- planted bugs in the accumulated game code to find
// and fix, plus assert-based sanity checks.

export const chapter = {
  number: 12,
  title: "Debugging & Testing Mindset",
  welcome: {
    content: `
      <p><strong>Chapter 12: Debugging & Testing Mindset.</strong> You've hit plenty of errors by
      now — this chapter is about getting good at reading them on purpose, instead of just
      fixing things by trial and error. A traceback isn't your program failing you; it's your
      program telling you exactly where to look.</p>

      <p>This chapter's Project — <strong>Bug Hunt</strong> — hands you a version of your own game
      with a couple of real bugs planted in it. Find them using the traceback, fix them, then add
      a couple of <code>assert</code> checks of your own to catch anything like this in the
      future.</p>
    `,
  },
  lessons: [
    {
      id: "12.1",
      title: "Reading a Traceback Like a Detective",
      content: `
        <p>When Python hits an error it can't recover from, it prints a <strong>traceback</strong>
        — not random noise, but a map. Read it from the <em>bottom up</em>: the last line names the
        error and gives a message; the lines above it show exactly which line of your code was
        running when it happened.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>Traceback (most recent call last):
  File "game.py", line 12, in &lt;module&gt;
    print(player.hp)
AttributeError: 'Player' object has no attribute 'hp'</code></pre>
          <p>Bottom line first: <code>AttributeError</code>, and the object involved is a
          <code>Player</code> that has no <code>hp</code> attribute. The line above it points to
          exactly where — <code>line 12</code>, <code>print(player.hp)</code>. That's usually
          enough to know exactly what to go check: was <code>hp</code> ever actually set on this
          <code>Player</code>?</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>a long traceback with many "File..." lines just means the error happened several
          function calls deep — the <em>very last</em> "File" line is still the one that matters
          most, since that's where the actual failing line lives.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>This code has a bug — a typo'd attribute name. Read the error, find the mismatch
          between where <code>hp</code> is set and where it's read, and fix it so it prints
          <code>40</code>.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>Read a traceback bottom-up: error type and message first, then the line that caused
          it. That's almost always enough to know where to look.</p>
        </div>
      `,
      starterCode: `class Player:
    def __init__(self, name, hp):
        self.name = name
        self.hpp = hp

robin = Player("Robin", 40)
print(robin.hp)`,
      practice: {
        instructions: "Fix the typo'd attribute so this prints exactly: 40",
        solution: `class Player:
    def __init__(self, name, hp):
        self.name = name
        self.hp = hp

robin = Player("Robin", 40)
print(robin.hp)`,
        check(actualOutput) {
          const got = actualOutput.trim();
          if (got === "40") {
            return { pass: true, message: "Matched up the attribute name where it's set and where it's read." };
          }
          return { pass: false, message: "Not quite — the attribute is set as self.hpp but read as robin.hp. Make them match." };
        },
      },
    },
    {
      id: "12.2",
      title: "Sanity-Checking Your Own Code with assert",
      content: `
        <p><code>assert condition, "message"</code> checks that something you believe to be true
        actually is — if the condition is <code>False</code>, it crashes immediately with an
        <code>AssertionError</code> and your message, right where the wrong assumption was made,
        instead of somewhere confusing much later.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>def set_hp(hp):
    assert hp >= 0, "HP can't be negative"
    return hp

print(set_hp(40))</code></pre>
          <p>Output: <code>40</code> — the assertion passes silently when it's true, and only
          speaks up when something's actually wrong. Try changing <code>40</code> to
          <code>-5</code> and you'd get <code>AssertionError: HP can't be negative</code> instead
          of a confusing crash somewhere else, later, once negative HP caused some other problem.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p><code>assert</code> is for catching bugs <em>during development</em> — things that
          should never happen if your code is correct. It's not the same as
          <code>try</code>/<code>except</code>, which handles things that legitimately can go
          wrong (like bad player input) even in correct code.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Add an <code>assert</code> to <code>total_gold</code> that checks its result is never
          negative, with the message <code>"total can't be negative"</code>. Then call it with
          <code>[10, 25, 5]</code> and print the result.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>assert condition, "message"</code> — a cheap, permanent sanity check for things
          that should always be true if your code is working correctly.</p>
        </div>
      `,
      starterCode: `def total_gold(amounts):
    total = sum(amounts)
    # add an assert here checking total is never negative
    return total

print(total_gold([10, 25, 5]))`,
      practice: {
        instructions: "Add the assert, then print the total: 40",
        solution: `def total_gold(amounts):
    total = sum(amounts)
    assert total >= 0, "total can't be negative"
    return total

print(total_gold([10, 25, 5]))`,
        check(actualOutput) {
          const got = actualOutput.trim();
          if (got === "40") {
            return { pass: true, message: "Assertion passed silently, and the total printed correctly." };
          }
          return { pass: false, message: "Not quite — total_gold([10, 25, 5]) should still print 40 once the assert is added." };
        },
      },
    },
    {
      id: "12.3",
      title: "Chapter 12 Wrap-Up",
      content: `
        <p>Read tracebacks bottom-up, and use <code>assert</code> to catch broken assumptions
        early. Time to put both to work on your own game.</p>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>Chapter 12 complete. Next: hunt down real bugs in your own accumulated code.</p>
        </div>
      `,
      starterCode: `# Nothing to fix here — press Next for the Project.
print("Chapter 12 complete!")`,
      practice: null,
    },
  ],
  project: {
    title: "Bug Hunt",
    content: `
      <p><strong>The Challenge:</strong> this version of your game has two real bugs planted in
      it, on purpose. Find them using the traceback, fix them, then add a couple of
      <code>assert</code> sanity checks of your own.</p>
      <div class="lesson-recap">
        <span class="lesson-label">What You'll Use</span>
        <ul>
          <li>Reading tracebacks bottom-up (this chapter)</li>
          <li><code>assert</code>, for your own sanity checks (this chapter)</li>
          <li>Everything from Chapter 11's save/load system</li>
        </ul>
      </div>
      <div class="lesson-turn">
        <span class="lesson-label">Step-By-Step</span>
        <ol>
          <li>Run the code as-is and type <code>look</code>. Chapter 7's bulletproofing catches
          the crash and prints it as a message instead of a raw traceback — but it's the same
          information: an error type and a message, right there in the Output. Read it, find
          where that attribute was set (in <code>Room.__init__</code>), and fix the mismatch.</li>
          <li>Once that's fixed, run it again, go to the forest, and type <code>take torch</code>.
          A different error prints this time — read it the same way, and check
          <code>ITEM_DATA</code>'s keys against what <code>room.items</code> actually contains.</li>
          <li>Once both are fixed, the game should run start-to-finish without any error messages
          on a normal playthrough — look around, take items, go places, fight the goblin, save and
          load.</li>
          <li>Finally, add two <code>assert</code> statements near the top of the file: one
          checking that <code>current_room</code> starts as a key that actually exists in
          <code>rooms</code>, and one of your own choosing.</li>
        </ol>
      </div>
      <div class="lesson-tip">
        <span class="lesson-label">Watch Out For</span>
        <p>fix one bug at a time, and re-run after each fix — the second bug is still there even
        after you fix the first, it just hasn't come up yet since <code>take torch</code> hadn't
        been tried.</p>
      </div>
    `,
    starterCode: `import random
import json

ITEM_DATA = {
    "Torch": ("Torch", 2),
    "coin": ("Gold Coin", 1),
    "gem": ("Sparkling Gem", 1),
}


class Room:
    def __init__(self, description, exits, items):
        self.descriptions = description
        self.exits = exits
        self.items = items

    def describe(self):
        print(self.description)
        if self.items:
            print("Items here: " + ", ".join(self.items))

    def get_exit(self, direction):
        return self.exits.get(direction)


class Enemy:
    def __init__(self, name):
        self.name = name

    def attack(self):
        return random.randint(1, 20)

    def fight(self):
        player_roll = random.randint(1, 20)
        enemy_roll = self.attack()
        print(f"You roll a {player_roll}. The {self.name} rolls a {enemy_roll}.")
        if player_roll > enemy_roll:
            print(f"You defeat the {self.name}!")
        elif enemy_roll > player_roll:
            print(f"The {self.name} gets the better of you this time. You retreat.")
        else:
            print("A tie! You both back off, shaken.")


class Goblin(Enemy):
    pass


rooms = {
    "cave": Room(
        "A damp stone passage leads deeper into the dark.",
        {"north": "forest"},
        ["coin"],
    ),
    "forest": Room(
        "Sunlight filters through tall trees.",
        {"south": "cave", "east": "tower"},
        ["torch"],
    ),
    "tower": Room(
        "A crumbling stone tower rises above the trees. A goblin blocks the way!",
        {"west": "forest"},
        [],
    ),
}

enemies = {
    "tower": Goblin("goblin"),
}

# Add your own assert statements here once the bugs above are fixed.

current_room = "cave"
inventory = []


def parse_command(text):
    words = text.split()
    verb = words[0].lower() if len(words) > 0 else ""
    argument = words[1].lower() if len(words) > 1 else None
    return verb, argument


def save_game():
    state = {
        "current_room": current_room,
        "inventory": inventory,
        "room_items": {name: room.items for name, room in rooms.items()},
    }
    with open("save.json", "w") as f:
        json.dump(state, f)
    print("Game saved!")


def load_game():
    global current_room, inventory
    try:
        with open("save.json", "r") as f:
            state = json.load(f)
        current_room = state["current_room"]
        inventory = state["inventory"]
        for name, items in state["room_items"].items():
            rooms[name].items = items
        print("Game loaded!")
    except FileNotFoundError:
        print("No saved game found.")


print("You are standing at the entrance of a small cave.")
print("Type 'help' to see what you can do.")

while True:
    try:
        command = input("> ")
        verb, argument = parse_command(command)
        room = rooms[current_room]

        if verb == "":
            print("Type something! Try 'help'.")
        elif verb == "look":
            room.describe()
        elif verb == "go":
            if argument:
                destination = room.get_exit(argument)
                if destination:
                    current_room = destination
                    print(f"You head {argument}, into the {current_room}.")
                else:
                    print("You can't go that way.")
            else:
                print("Go where? Try 'go north'.")
        elif verb == "take":
            if argument and argument in room.items:
                room.items.remove(argument)
                inventory.append(argument)
                print(f"You take the {ITEM_DATA[argument][0]}.")
            else:
                print("That's not here.")
        elif verb == "drop":
            if argument and argument in inventory:
                inventory.remove(argument)
                room.items.append(argument)
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
            if current_room in enemies:
                enemies[current_room].fight()
            else:
                print("There's nothing to fight here.")
        elif verb == "save":
            save_game()
        elif verb == "load":
            load_game()
        elif verb == "help":
            print("Commands: look, go <direction>, take <item>, drop <item>, inventory, fight, save, load, help, quit")
        elif verb == "quit":
            print("Goodbye!")
            break
        else:
            print("I don't understand that command.")
    except Exception as e:
        print(f"Something went wrong, but the game keeps running: {e}")`,
  },
};
