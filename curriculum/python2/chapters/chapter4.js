// Chapter 4 — Nested Data & Comprehensions
// Project: The World Map -- rooms as a dict of dicts, real movement between them.

export const chapter = {
  number: 4,
  title: "Nested Data & Comprehensions",
  welcome: {
    content: `
      <p><strong>Chapter 4: Nested Data & Comprehensions.</strong> Course 1's lists and
      dictionaries held simple things — numbers, strings. Real data is messier: a dictionary whose
      values are <em>other</em> dictionaries, a list full of dictionaries, dictionaries full of
      lists. That's how you'll model an entire game world.</p>

      <p>This chapter's Project — <strong>The World Map</strong> — is where your game stops being
      one room and becomes an actual map: rooms with real exits, connected to each other, that the
      player can walk between.</p>
    `,
  },
  lessons: [
    {
      id: "4.1",
      title: "Lists of Dicts, Dicts of Dicts",
      content: `
        <p>A dictionary's value can be anything — including another dictionary. Nesting them lets
        you model something with its own set of properties, like a room with a description
        <em>and</em> a list of exits <em>and</em> a list of items, all under one name.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>rooms = {
    "cave": {"description": "A damp stone passage.", "exits": ["north"]},
    "forest": {"description": "Sunlight through the trees.", "exits": ["south"]},
}
print(rooms["cave"]["description"])
print(rooms["forest"]["exits"])</code></pre>
          <p>Output: <code>A damp stone passage.</code>, then <code>['south']</code> — wait,
          <code>['south']</code> is <em>forest's</em> exits, printed with a second set of square
          brackets to reach inside the nested dictionary: <code>rooms["forest"]["exits"]</code>.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>each level of nesting needs its own set of square brackets —
          <code>rooms["cave", "description"]</code> isn't valid; it's
          <code>rooms["cave"]["description"]</code>, one key lookup at a time.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>A nested dictionary <code>players</code> is given, with <code>"robin"</code> mapping
          to a dict containing <code>"hp"</code> and <code>"gold"</code>. Print Robin's
          <code>"hp"</code> value.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>Chain square brackets to reach into nested dictionaries:
          <code>outer["key1"]["key2"]</code> gets the inner dictionary's value.</p>
        </div>
      `,
      starterCode: `players = {
    "robin": {"hp": 40, "gold": 15},
    "sam": {"hp": 35, "gold": 20},
}
# print robin's hp`,
      practice: {
        instructions: "Print exactly: 40",
        solution: `players = {
    "robin": {"hp": 40, "gold": 15},
    "sam": {"hp": 35, "gold": 20},
}
print(players["robin"]["hp"])`,
        check(actualOutput) {
          const got = actualOutput.trim();
          if (got === "40") {
            return { pass: true, message: "Reached straight into the nested dictionary." };
          }
          return { pass: false, message: 'Not quite — print players["robin"]["hp"], which should be 40.' };
        },
      },
    },
    {
      id: "4.2",
      title: "List Comprehensions",
      content: `
        <p>A <strong>list comprehension</strong> builds a new list from an existing one, in one
        line, instead of writing a full <code>for</code> loop with <code>.append()</code>.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>hp_values = [40, 0, 35, 0, 12]
alive = [hp for hp in hp_values if hp > 0]
print(alive)</code></pre>
          <p>Output: <code>[40, 35, 12]</code>. Read it left to right: "give me <code>hp</code>,
          for each <code>hp</code> in <code>hp_values</code>, but only if <code>hp > 0</code>."
          The equivalent loop is four lines; this is one.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>comprehensions are for building a <em>new</em> list — if you're not collecting a
          result (just, say, printing each item), a normal <code>for</code> loop is clearer and
          that's fine.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Given <code>names = ["sword", "gold", "shield", "gem", "potion"]</code>, use a list
          comprehension to build a list of only the names with more than 4 characters, and print
          it.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>[expression for item in list if condition]</code> — the same shape every time,
          filtering and building a new list in one line.</p>
        </div>
      `,
      starterCode: `names = ["sword", "gold", "shield", "gem", "potion"]
# build and print a list of names with more than 4 characters`,
      practice: {
        instructions: "Print the list of names longer than 4 characters: ['sword', 'shield', 'potion']",
        solution: `names = ["sword", "gold", "shield", "gem", "potion"]
long_names = [name for name in names if len(name) > 4]
print(long_names)`,
        check(actualOutput) {
          const got = actualOutput.trim().replace(/'/g, '"');
          const want = '["sword", "shield", "potion"]';
          if (got === want) {
            return { pass: true, message: "Filtered and built the list in a single comprehension." };
          }
          return { pass: false, message: `Not quite — we want the list to print as ${want.replace(/"/g, "'")}` };
        },
      },
    },
    {
      id: "4.3",
      title: "Dict Comprehensions",
      content: `
        <p>Same idea, but for dictionaries: <code>{key: value for item in list}</code> builds a
        new dictionary in one line.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>items = ["sword", "shield", "potion"]
prices = {item: len(item) * 2 for item in items}
print(prices)</code></pre>
          <p>Output: <code>{'sword': 10, 'shield': 12, 'potion': 12}</code> — each item becomes a
          key, mapped to its own computed value (here, its length times 2).</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>dictionaries need a <code>key: value</code> pair before the <code>for</code> — leave
          out the colon and you've accidentally written a set comprehension instead, which is a
          different (and here, wrong) thing entirely.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Given <code>rooms = ["cave", "forest", "tower"]</code>, build a dictionary mapping
          each room name to <code>True</code> (meaning "not yet visited"), and print it.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>{key: value for item in list}</code> builds a dictionary the same way a list
          comprehension builds a list — one expression, one loop, one line.</p>
        </div>
      `,
      starterCode: `rooms = ["cave", "forest", "tower"]
# build and print a dict mapping each room to True`,
      practice: {
        instructions: "Print a dict mapping each room name to True: {'cave': True, 'forest': True, 'tower': True}",
        solution: `rooms = ["cave", "forest", "tower"]
visited = {room: True for room in rooms}
print(visited)`,
        check(actualOutput) {
          const got = actualOutput.trim().replace(/'/g, '"');
          const want = '{"cave": True, "forest": True, "tower": True}';
          if (got === want) {
            return { pass: true, message: "Built the dictionary in one line with a dict comprehension." };
          }
          return { pass: false, message: `Not quite — we want it to print as {'cave': True, 'forest': True, 'tower': True}` };
        },
      },
    },
    {
      id: "4.4",
      title: "Chapter 4 Wrap-Up",
      content: `
        <p>Nested dictionaries can model something with several properties at once; comprehensions
        build lists and dictionaries in a single line. Both are exactly what a real game map needs.</p>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>Chapter 4 complete. Next: turn one room into a real, connected map.</p>
        </div>
      `,
      starterCode: `# Nothing to fix here — press Next for the Project.
print("Chapter 4 complete!")`,
      practice: null,
    },
  ],
  project: {
    title: "The World Map",
    content: `
      <p><strong>The Challenge:</strong> replace the single hard-coded room from Chapters 2–3 with
      a real map — a dictionary of rooms, each one a dictionary of its own, connected by exits the
      player can actually walk through.</p>
      <div class="lesson-recap">
        <span class="lesson-label">What You'll Use</span>
        <ul>
          <li>A dict of dicts, to model each room's description and exits (this chapter)</li>
          <li>Everything from Chapters 2–3's Command Loop and command parsing</li>
        </ul>
      </div>
      <div class="lesson-turn">
        <span class="lesson-label">Step-By-Step</span>
        <ol>
          <li>The starter code defines <code>rooms</code> — a dictionary of three rooms, each with
          a <code>"description"</code> and an <code>"exits"</code> dictionary mapping a direction
          to the name of the room it leads to.</li>
          <li><code>current_room</code> tracks where the player is right now, starting at
          <code>"cave"</code>.</li>
          <li><code>"look"</code> now prints the <em>current</em> room's description, not a fixed
          message.</li>
          <li><code>"go &lt;direction&gt;"</code> checks whether that direction is a valid exit
          from the current room — if so, it updates <code>current_room</code>; if not, it prints a
          "you can't go that way" message instead of crashing.</li>
          <li>Run it and walk between all three rooms. Then add a fourth room of your own,
          connected to one of the existing three.</li>
        </ol>
      </div>
      <div class="lesson-tip">
        <span class="lesson-label">Watch Out For</span>
        <p>a new room needs to be reachable <em>and</em> reachable back — if you add an exit from
        room A to your new room B, don't forget an exit from B back to A (or wherever makes
        sense), or the player gets stuck.</p>
      </div>
    `,
    starterCode: `rooms = {
    "cave": {
        "description": "A damp stone passage leads deeper into the dark.",
        "exits": {"north": "forest"},
    },
    "forest": {
        "description": "Sunlight filters through tall trees.",
        "exits": {"south": "cave", "east": "tower"},
    },
    "tower": {
        "description": "A crumbling stone tower rises above the trees.",
        "exits": {"west": "forest"},
    },
}

current_room = "cave"

print("You are standing at the entrance of a small cave.")
print("Type 'help' to see what you can do.")

while True:
    command = input("> ")
    words = command.split()
    verb = words[0] if len(words) > 0 else ""

    if verb == "look":
        print(rooms[current_room]["description"])
    elif verb == "go":
        if len(words) > 1:
            direction = words[1]
            exits = rooms[current_room]["exits"]
            if direction in exits:
                current_room = exits[direction]
                print(f"You head {direction}, into the {current_room}.")
            else:
                print("You can't go that way.")
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
