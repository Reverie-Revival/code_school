// Chapter 4 — Nested Data & Comprehensions
// Project: The World Map -- rooms as a dict of dicts, real movement between them.

export const chapter = {
  number: 4,
  title: "Nested Data & Comprehensions",
  welcome: {
    content: `
      <p><strong>Chapter 4: Nested Data & Comprehensions.</strong> Course 1's lists and
      dictionaries held simple things — numbers, strings. Real data is messier: a dictionary whose
      values are <em>other</em> dictionaries, a list full of dictionaries, dictionaries built from
      a single compact line instead of a full loop. That's how you'll model an entire game world.</p>

      <p>This chapter's Project — <strong>The World Map</strong> — is where your game stops being
      one room and becomes an actual map: rooms with real exits, connected to each other, that the
      player can walk between.</p>
    `,
  },
  lessons: [
    {
      id: "4.1",
      title: "Dicts Inside Dicts",
      content: `
        <p>A dictionary's value can be anything — including another dictionary. Nesting them lets
        you model something with several properties at once, like a room with a description
        <em>and</em> a list of exits, all filed under one name.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>rooms = {
    "cave": {"description": "A damp stone passage.", "exits": ["north"]},
    "forest": {"description": "Sunlight through the trees.", "exits": ["south"]},
}
print(rooms["cave"]["description"])
print(rooms["forest"]["exits"])</code></pre>
          <p>Output: <code>A damp stone passage.</code>, then <code>['south']</code>. Reading it
          left to right: <code>rooms["forest"]</code> gets forest's whole inner dictionary
          (<code>{"description": ..., "exits": ["south"]}</code>), and the second
          <code>["exits"]</code> reaches one step further into <em>that</em> dictionary to get
          just its exits list.</p>
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
      title: "Lists of Dicts",
      content: `
        <p>The reverse shape — a <em>list</em> where each item is a dictionary — is just as
        common: think a party of characters, each one a dictionary of their own stats, all held
        in one list.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>party = [
    {"name": "Robin", "hp": 40},
    {"name": "Sam", "hp": 35},
]
print(party[0]["name"])
for member in party:
    print(f"{member['name']}: {member['hp']} HP")</code></pre>
          <p>Output: <code>Robin</code>, then <code>Robin: 40 HP</code> and <code>Sam: 35
          HP</code>. <code>party[0]</code> gets the <em>first dictionary</em> in the list, and
          then <code>["name"]</code> reaches into it. Looping with <code>for member in
          party</code> hands you each dictionary in turn, one at a time.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>inside an f-string, use single quotes for the dictionary key
          (<code>{member['name']}</code>) since the f-string itself is already wrapped in double
          quotes — mixing the same quote type in both places would end the string early.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p><code>enemies</code> is a list of two dictionaries, each with <code>"name"</code> and
          <code>"hp"</code>. Loop over it and print each one as <code>f"{name}: {hp} HP"</code>.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>A list of dicts is a collection of "things," each with its own properties —
          <code>list[index]["key"]</code> to grab one directly, or a <code>for</code> loop to walk
          through all of them.</p>
        </div>
      `,
      starterCode: `enemies = [
    {"name": "Goblin", "hp": 12},
    {"name": "Skeleton", "hp": 18},
]
# loop over enemies, printing each as "{name}: {hp} HP"`,
      practice: {
        instructions: "Print: Goblin: 12 HP then Skeleton: 18 HP",
        solution: `enemies = [
    {"name": "Goblin", "hp": 12},
    {"name": "Skeleton", "hp": 18},
]
for enemy in enemies:
    print(f"{enemy['name']}: {enemy['hp']} HP")`,
        check(actualOutput) {
          const lines = actualOutput.trim().split("\n").map((l) => l.trim());
          if (lines.length === 2 && lines[0] === "Goblin: 12 HP" && lines[1] === "Skeleton: 18 HP") {
            return { pass: true, message: "Looped through the list, reaching into each dict along the way." };
          }
          return { pass: false, message: "Not quite — we want \"Goblin: 12 HP\" then \"Skeleton: 18 HP\"." };
        },
      },
    },
    {
      id: "4.3",
      title: "List Comprehensions",
      content: `
        <p>A <strong>list comprehension</strong> builds a new list from an existing one, in one
        line, instead of writing a full <code>for</code> loop with <code>.append()</code>.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>names = ["sword", "gold", "shield"]
upper_names = [name.upper() for name in names]
print(upper_names)</code></pre>
          <p>Output: <code>['SWORD', 'GOLD', 'SHIELD']</code>. Read it left to right: "give me
          <code>name.upper()</code>, for each <code>name</code> in <code>names</code>." The
          equivalent loop is three lines (make an empty list, loop, append each result); this is
          one.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>a comprehension is for building a <em>new</em> list — if you're not collecting a
          result (just, say, printing each item), a normal <code>for</code> loop is clearer, and
          that's completely fine to use instead.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Given <code>hp_values = [40, 22, 35]</code>, use a list comprehension to build a new
          list where each value is doubled, and print it.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>[expression for item in list]</code> transforms every item into something new,
          collecting the results into a new list, all in one line.</p>
        </div>
      `,
      starterCode: `hp_values = [40, 22, 35]
# build and print a new list where each value is doubled`,
      practice: {
        instructions: "Print exactly: [80, 44, 70]",
        solution: `hp_values = [40, 22, 35]
doubled = [hp * 2 for hp in hp_values]
print(doubled)`,
        check(actualOutput) {
          const got = actualOutput.trim();
          if (got === "[80, 44, 70]") {
            return { pass: true, message: "Transformed every value in one line." };
          }
          return { pass: false, message: "Not quite — we want exactly [80, 44, 70]." };
        },
      },
    },
    {
      id: "4.4",
      title: "List Comprehensions with a Condition",
      content: `
        <p>Plenty of real filtering needs — which enemies are still alive, which items are light
        enough to carry, which rooms have already been visited — boil down to "give me only the
        ones matching some condition." Add an <code>if</code> to a comprehension to do exactly
        that: filter which items make it into the new list, so only items where the condition is
        <code>True</code> get included.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>hp_values = [40, 0, 35, 0, 12]
alive = [hp for hp in hp_values if hp > 0]
print(alive)</code></pre>
          <p>Output: <code>[40, 35, 12]</code>. Read it left to right: "give me <code>hp</code>,
          for each <code>hp</code> in <code>hp_values</code>, but only if <code>hp > 0</code>."
          The <code>if</code> at the end filters — it doesn't transform the value the way the
          expression at the front does.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>this filtering <code>if</code> (at the end) is a different thing from an
          <code>if</code>/<code>else</code> used to transform a value (which goes at the
          <em>front</em>, before the <code>for</code>) — mixing up the two positions is a common
          source of <code>SyntaxError</code>s when you're first getting used to comprehensions.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Given <code>names = ["sword", "gold", "shield", "gem", "potion"]</code>, use a list
          comprehension to build a list of only the names with more than 4 characters, and print
          it.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>[expression for item in list if condition]</code> — filtering and (optionally)
          transforming in one line.</p>
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
      id: "4.5",
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
          key, mapped to its own computed value (here, its length times 2). It follows exactly the
          same "expression, for, in" shape as a list comprehension, just with a
          <code>key: value</code> pair up front instead of a single expression.</p>
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
      id: "4.6",
      title: "Chapter 4 Wrap-Up",
      content: `
        <p>Nested dictionaries can model something with several properties at once, lists of
        dicts model a collection of "things," and comprehensions build both in a single line.
        Exactly what a real game map needs.</p>
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
