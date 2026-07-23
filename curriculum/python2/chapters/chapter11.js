// Chapter 11 — File I/O
// Project: Save & Load -- persist player position, inventory, and world
// state to a file.

export const chapter = {
  number: 11,
  title: "File I/O",
  welcome: {
    content: `
      <p><strong>Chapter 11: File I/O.</strong> Every program you've written so far forgets
      everything the moment it stops running. Reading and writing files is how a program
      remembers something between runs — this is the one piece Course 1 explicitly left out, and
      it's essential groundwork for any real project.</p>

      <p>This chapter's Project — <strong>Save & Load</strong> — lets the player save their
      progress to a file and pick up right where they left off.</p>
    `,
  },
  lessons: [
    {
      id: "11.1",
      title: "Reading and Writing Text Files",
      content: `
        <p><code>open(filename, mode)</code> opens a file — <code>"w"</code> for writing (creates
        or overwrites), <code>"r"</code> for reading. <code>with</code> makes sure the file gets
        closed automatically when you're done with it, even if something goes wrong.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>with open("notes.txt", "w") as f:
    f.write("Hello, file!")

with open("notes.txt", "r") as f:
    contents = f.read()
    print(contents)</code></pre>
          <p>Output: <code>Hello, file!</code> — written to the file in the first block, read back
          in the second. Each <code>with</code> block closes the file automatically once its
          indented code finishes.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>opening a file with <code>"w"</code> <strong>erases</strong> whatever was already in
          it — use <code>"a"</code> (append) instead if you want to add on without erasing.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Write <code>"Adventure awaits!"</code> to a file called <code>"story.txt"</code>,
          then open it again and print its contents.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>with open(filename, "w") as f: f.write(...)</code> to save,
          <code>with open(filename, "r") as f: f.read()</code> to load it back.</p>
        </div>
      `,
      starterCode: `# write "Adventure awaits!" to story.txt, then read and print it back`,
      practice: {
        instructions: "Print exactly: Adventure awaits!",
        solution: `with open("story.txt", "w") as f:
    f.write("Adventure awaits!")

with open("story.txt", "r") as f:
    contents = f.read()
    print(contents)`,
        check(actualOutput) {
          const got = actualOutput.trim();
          if (got === "Adventure awaits!") {
            return { pass: true, message: "Wrote to a file, then read the same text back out of it." };
          }
          return { pass: false, message: 'Not quite — write "Adventure awaits!" to story.txt, then read and print it.' };
        },
      },
    },
    {
      id: "11.2",
      title: "Saving Structured Data with JSON",
      content: `
        <p>Text files are fine for plain text, but a dictionary or list needs
        <strong>JSON</strong> — a text format that can represent nested data. The
        <code>json</code> module converts between Python data and JSON text:
        <code>json.dump()</code> writes, <code>json.load()</code> reads.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>import json

player = {"name": "Robin", "hp": 40, "items": ["torch", "coin"]}

with open("save.json", "w") as f:
    json.dump(player, f)

with open("save.json", "r") as f:
    loaded = json.load(f)
    print(loaded["name"])
    print(loaded["items"])</code></pre>
          <p>Output: <code>Robin</code>, then <code>['torch', 'coin']</code>. The whole nested
          dictionary survives the round trip through the file — exactly the structure it was
          saved with.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p><code>json.dump(data, f)</code> takes the data <em>and</em> the open file — a common
          mistake is calling it like <code>json.dump(data)</code> and forgetting the file, or
          mixing up the argument order.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Import <code>json</code>. Save the given <code>game_state</code> dictionary to
          <code>"save.json"</code>, then load it back into a new variable and print its
          <code>"room"</code> value.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>json.dump(data, f)</code> saves nested Python data to a file;
          <code>json.load(f)</code> loads it back exactly as it was.</p>
        </div>
      `,
      starterCode: `game_state = {"room": "forest", "gold": 15}
# import json, save game_state to save.json, load it back, print loaded["room"]`,
      practice: {
        instructions: "Print exactly: forest",
        solution: `import json

game_state = {"room": "forest", "gold": 15}

with open("save.json", "w") as f:
    json.dump(game_state, f)

with open("save.json", "r") as f:
    loaded = json.load(f)
    print(loaded["room"])`,
        check(actualOutput) {
          const got = actualOutput.trim();
          if (got === "forest") {
            return { pass: true, message: "Round-tripped a dictionary through JSON correctly." };
          }
          return { pass: false, message: 'Not quite — we want exactly "forest" printed after loading save.json back.' };
        },
      },
    },
    {
      id: "11.3",
      title: "Chapter 11 Wrap-Up",
      content: `
        <p>Text files remember simple strings; JSON remembers whole nested structures — exactly
        what a save file needs.</p>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>Chapter 11 complete. Next: let the player save and load their game.</p>
        </div>
      `,
      starterCode: `# Nothing to fix here — press Next for the Project.
print("Chapter 11 complete!")`,
      practice: null,
    },
  ],
  project: {
    title: "Save & Load",
    content: `
      <p><strong>The Challenge:</strong> add <code>"save"</code> and <code>"load"</code> commands
      that persist the player's room, inventory, and which rooms have items in them, using JSON.</p>
      <div class="lesson-recap">
        <span class="lesson-label">What You'll Use</span>
        <ul>
          <li><code>json.dump()</code> and <code>json.load()</code> (this chapter)</li>
          <li>Everything from Chapter 10's enemy classes</li>
        </ul>
      </div>
      <div class="lesson-turn">
        <span class="lesson-label">Step-By-Step</span>
        <ol>
          <li>The starter code adds <code>save_game()</code> and <code>load_game()</code>
          functions. <code>save_game()</code> builds a plain dictionary out of
          <code>current_room</code>, <code>inventory</code>, and each room's <code>.items</code>,
          then writes it to <code>"save.json"</code>.</li>
          <li><code>load_game()</code> reads that file back and restores all three, wrapped in a
          <code>try</code>/<code>except FileNotFoundError</code> in case <code>"save"</code> was
          never used.</li>
          <li>Run it: move around, pick something up, type <code>save</code>, then
          <code>quit</code> and run the program again. Type <code>load</code> and confirm you're
          back where you saved, with the same inventory.</li>
        </ol>
      </div>
      <div class="lesson-tip">
        <span class="lesson-label">Watch Out For</span>
        <p>only plain data (dictionaries, lists, strings, numbers) can go into
        <code>json.dump()</code> — the <code>Room</code> and <code>Enemy</code> <em>objects</em>
        themselves can't be saved directly, which is exactly why <code>save_game()</code> pulls
        out just their <code>.items</code> lists into a plain dictionary first.</p>
      </div>
    `,
    starterCode: `import random
import json

ITEM_DATA = {
    "torch": ("Torch", 2),
    "coin": ("Gold Coin", 1),
    "gem": ("Sparkling Gem", 1),
}


class Room:
    def __init__(self, description, exits, items):
        self.description = description
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
