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
      title: "Writing to a Text File",
      content: `
        <p>Every variable in every program you've written so far vanishes the moment the program
        stops — quit the game, and the player's progress is gone. Writing to a file is how a
        program leaves something behind that's still there the next time it runs.
        <code>open(filename, "w")</code> opens a file for writing — creating it if it doesn't
        exist, or erasing and overwriting it if it does. <code>with</code> makes sure the file
        gets closed automatically once you're done, even if something goes wrong.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>with open("notes.txt", "w") as f:
    f.write("Hello, file!")
    f.write(" More text.")</code></pre>
          <p>This creates <code>notes.txt</code> containing <code>Hello, file! More text.</code>
          — <code>.write()</code> doesn't add a newline automatically the way <code>print()</code>
          does, so multiple writes land right next to each other unless you add
          <code>"\\n"</code> yourself.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>opening a file with <code>"w"</code> <strong>erases</strong> whatever was already in
          it before writing anything new — use <code>"a"</code> (append) instead if you want to
          add on without erasing what's there.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Write <code>"Adventure awaits!"</code> to a file called <code>"story.txt"</code>,
          then print <code>"Saved!"</code> to confirm it ran.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>with open(filename, "w") as f: f.write(text)</code> — the standard shape for
          saving text to a file.</p>
        </div>
      `,
      starterCode: `# write "Adventure awaits!" to story.txt, then print "Saved!"`,
      practice: {
        instructions: "Print exactly: Saved!",
        solution: `with open("story.txt", "w") as f:
    f.write("Adventure awaits!")
print("Saved!")`,
        check(actualOutput) {
          const got = actualOutput.trim();
          if (got === "Saved!") {
            return { pass: true, message: "Wrote to the file and confirmed it ran." };
          }
          return { pass: false, message: 'Not quite — write to story.txt, then print exactly "Saved!"' };
        },
      },
    },
    {
      id: "11.2",
      title: "Reading from a Text File",
      content: `
        <p>Writing to a file is only half the round trip — a save file is useless if nothing can
        load it back. <code>open(filename, "r")</code> opens a file for reading.
        <code>.read()</code> gets the whole file's contents back as one string, exactly as it was
        written.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>with open("notes.txt", "w") as f:
    f.write("Hello, file!")

with open("notes.txt", "r") as f:
    contents = f.read()
    print(contents)</code></pre>
          <p>Output: <code>Hello, file!</code> — written in the first block, read back in the
          second. Each <code>with</code> block opens and closes its own file, so writing and
          reading are two completely separate steps.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>trying to <code>open(filename, "r")</code> a file that doesn't exist yet raises a
          <code>FileNotFoundError</code> — you'll see exactly this pattern handled with
          <code>try</code>/<code>except</code> in this chapter's Project, for a save file that
          might not exist on a player's first run.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p><code>story.txt</code> already contains <code>"Adventure awaits!"</code> (from the
          last lesson). Open it for reading and print its contents.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>with open(filename, "r") as f: f.read()</code> — the standard shape for loading
          text back out of a file.</p>
        </div>
      `,
      starterCode: `with open("story.txt", "w") as f:
    f.write("Adventure awaits!")

# open story.txt for reading and print its contents`,
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
            return { pass: true, message: "Read the file's contents back out correctly." };
          }
          return { pass: false, message: 'Not quite — we want exactly "Adventure awaits!" printed.' };
        },
      },
    },
    {
      id: "11.3",
      title: "Saving Structured Data with JSON",
      content: `
        <p>Text files are fine for plain text, but a dictionary or list needs
        <strong>JSON</strong> — a text format that can represent nested data. The
        <code>json</code> module's <code>json.dump(data, f)</code> writes any JSON-compatible
        Python data straight to a file.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>import json

player = {"name": "Robin", "hp": 40, "items": ["torch", "coin"]}

with open("save.json", "w") as f:
    json.dump(player, f)

print("Saved!")</code></pre>
          <p>Output: <code>Saved!</code> — but the real result is the file itself:
          <code>save.json</code> now contains the whole nested dictionary, written out as JSON
          text. <code>json.dump()</code> takes the data <em>and</em> the open file, in that
          order.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>only JSON-compatible types can be saved this way — dictionaries, lists, strings,
          numbers, <code>True</code>/<code>False</code>, and <code>None</code>. A custom class
          object can't be saved directly (Chapter 11's Project deals with exactly this).</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Import <code>json</code>. Save the given <code>game_state</code> dictionary to
          <code>"save.json"</code>, then print <code>"Saved!"</code>.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>json.dump(data, f)</code> saves nested Python data to a file, preserving its
          full structure.</p>
        </div>
      `,
      starterCode: `game_state = {"room": "forest", "gold": 15}
# import json, save game_state to save.json, then print "Saved!"`,
      practice: {
        instructions: "Print exactly: Saved!",
        solution: `import json

game_state = {"room": "forest", "gold": 15}

with open("save.json", "w") as f:
    json.dump(game_state, f)
print("Saved!")`,
        check(actualOutput) {
          const got = actualOutput.trim();
          if (got === "Saved!") {
            return { pass: true, message: "Saved a nested dictionary to a JSON file." };
          }
          return { pass: false, message: 'Not quite — save game_state to save.json, then print exactly "Saved!"' };
        },
      },
    },
    {
      id: "11.4",
      title: "Loading Structured Data with JSON",
      content: `
        <p><code>json.load(f)</code> is the reverse of <code>json.dump()</code> — it reads a JSON
        file back into real Python data, exactly the structure it was saved with.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>import json

player = {"name": "Robin", "items": ["torch", "coin"]}
with open("save.json", "w") as f:
    json.dump(player, f)

with open("save.json", "r") as f:
    loaded = json.load(f)
    print(loaded["name"])
    print(loaded["items"])</code></pre>
          <p>Output: <code>Robin</code>, then <code>['torch', 'coin']</code>. <code>loaded</code>
          is a real Python dictionary again, not just text — you can index into it, loop over it,
          anything you'd do with a dictionary built directly in code.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>trying to <code>json.load()</code> a file that isn't valid JSON (or doesn't exist)
          raises an error — always expect to wrap this in
          <code>try</code>/<code>except</code> in real code, exactly like this chapter's Project
          does.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p><code>save.json</code> already contains <code>{"room": "forest", "gold": 15}</code>
          (from the last lesson). Load it back and print its <code>"room"</code> value.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>json.load(f)</code> loads a JSON file back into real Python data — the natural
          partner to <code>json.dump()</code>.</p>
        </div>
      `,
      starterCode: `import json

game_state = {"room": "forest", "gold": 15}
with open("save.json", "w") as f:
    json.dump(game_state, f)

# open save.json, load it back, print loaded["room"]`,
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
      id: "11.5",
      title: "Chapter 11 Wrap-Up",
      content: `
        <p>Text files remember simple strings; JSON remembers whole nested structures — exactly
        what a save file needs, and now you know both halves: saving and loading each.</p>
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
