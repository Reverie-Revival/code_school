// Chapter 6 — Lists in Practice
// Project: The Inventory System -- pick up/drop/list items, sorted, with a
// tuple for fixed item data.

export const chapter = {
  number: 6,
  title: "Lists in Practice",
  welcome: {
    content: `
      <p><strong>Chapter 6: Lists in Practice.</strong> You know how to build a list — now it's
      about doing real work with one: sorting it, searching it, and knowing when a
      <strong>tuple</strong> (a list that can't change) is actually the better tool.</p>

      <p>This chapter's Project gives your player an <strong>inventory</strong> — the first real
      list your game actually manages as the player plays, not just fixed data set up once at the
      start.</p>
    `,
  },
  lessons: [
    {
      id: "6.1",
      title: "Sorting Lists",
      content: `
        <p>An inventory listed in whatever random order items were picked up in is hard for a
        player to scan — alphabetical order is what makes a list actually readable at a glance.
        <code>sorted(a_list)</code> returns a new, sorted list without changing the original;
        <code>a_list.sort()</code> sorts the list in place, changing it directly.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>items = ["shield", "potion", "amulet"]
print(sorted(items))
print(items)

items.sort()
print(items)</code></pre>
          <p>Output: <code>['amulet', 'potion', 'shield']</code>, then <code>['shield', 'potion',
          'amulet']</code> (unchanged — <code>sorted()</code> made a new list without touching
          the original), then <code>['amulet', 'potion', 'shield']</code> (now <code>items</code>
          itself is sorted, because <code>.sort()</code> changes it directly).</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p><code>items.sort()</code> returns <code>None</code>, not the sorted list — writing
          <code>items = items.sort()</code> throws away your entire list. If you want to keep
          using the original variable name, either use <code>sorted(items)</code> and store the
          result, or call <code>.sort()</code> on its own line with no assignment.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Given <code>bag = ["sword", "gem", "torch"]</code>, print a sorted <em>copy</em> of
          the list (leaving <code>bag</code> itself unchanged).</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>sorted(a_list)</code> is non-destructive and hands back a new list;
          <code>a_list.sort()</code> changes it in place and returns nothing useful.</p>
        </div>
      `,
      starterCode: `bag = ["sword", "gem", "torch"]
# print a sorted copy of bag`,
      practice: {
        instructions: "Print the sorted list: ['gem', 'sword', 'torch']",
        solution: `bag = ["sword", "gem", "torch"]
print(sorted(bag))`,
        check(actualOutput) {
          const got = actualOutput.trim().replace(/'/g, '"');
          if (got === '["gem", "sword", "torch"]') {
            return { pass: true, message: "Sorted correctly, without disturbing the original list." };
          }
          return { pass: false, message: "Not quite — we want the sorted list ['gem', 'sword', 'torch']." };
        },
      },
    },
    {
      id: "6.2",
      title: "Searching Lists",
      content: `
        <p>Before you can drop an item or check whether a player already has something, your code
        needs to answer "is this actually in the list?" — and sometimes, "exactly where?"
        <code>in</code> checks whether something is present in a list at all, returning
        <code>True</code> or <code>False</code>. <code>.index()</code> goes further and tells you
        <em>where</em> — the position of the first match.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>party = ["Robin", "Sam", "Jo"]
print("Sam" in party)
print(party.index("Sam"))</code></pre>
          <p>Output: <code>True</code>, then <code>1</code>. <code>"Sam" in party</code> just
          answers "is it here?"; <code>party.index("Sam")</code> answers "where, exactly?" — its
          position, counting from 0.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p><code>.index()</code> crashes with a <code>ValueError</code> if the item isn't in the
          list at all — always check with <code>in</code> first if you're not sure it's there.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p><code>party = ["Robin", "Sam", "Jo"]</code> is given. Print whether
          <code>"Max"</code> is in the party, then print <code>Jo</code>'s position using
          <code>.index()</code>.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>in</code> answers whether something's present; <code>.index()</code> answers
          where — check with <code>in</code> first if you're not certain <code>.index()</code>
          would find a match.</p>
        </div>
      `,
      starterCode: `party = ["Robin", "Sam", "Jo"]
# print whether "Max" is in party, then Jo's index`,
      practice: {
        instructions: "Print False then 2.",
        solution: `party = ["Robin", "Sam", "Jo"]
print("Max" in party)
print(party.index("Jo"))`,
        check(actualOutput) {
          const lines = actualOutput.trim().split("\n").map((l) => l.trim());
          if (lines.length === 2 && lines[0] === "False" && lines[1] === "2") {
            return { pass: true, message: "Checked membership, then found the exact position." };
          }
          return { pass: false, message: "Not quite — we want False then 2." };
        },
      },
    },
    {
      id: "6.3",
      title: "Tuples: When Not to Use a List",
      content: `
        <p>A <strong>tuple</strong> — written with parentheses, <code>(1, 2, 3)</code> — looks like
        a list but can't be changed after it's created. That's a feature, not a limitation: it's
        the right choice for data that shouldn't ever be edited, like an item's fixed name and
        weight.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>sword = ("Iron Sword", 8)
print(sword[0])
print(sword[1])
sword[1] = 10</code></pre>
          <p>The first two lines print <code>Iron Sword</code> then <code>8</code> just like a
          list would. The third line crashes with a <code>TypeError</code> — tuples don't support
          item assignment, on purpose.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>a one-item tuple needs a trailing comma — <code>(8)</code> is just the number 8 in
          parentheses, but <code>(8,)</code> is a tuple containing 8.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Create a tuple <code>gem = ("Ruby", 2)</code> and print it as
          <code>f"{name}: {weight} lbs"</code> using its two values.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>Use a tuple for fixed data that shouldn't change — indexing works the same as a list,
          but the values are locked in.</p>
        </div>
      `,
      starterCode: `gem = ("Ruby", 2)
# print "Ruby: 2 lbs" using gem's values`,
      practice: {
        instructions: "Print exactly: Ruby: 2 lbs",
        solution: `gem = ("Ruby", 2)
name = gem[0]
weight = gem[1]
print(f"{name}: {weight} lbs")`,
        check(actualOutput) {
          const got = actualOutput.trim();
          if (got === "Ruby: 2 lbs") {
            return { pass: true, message: "Read both values straight out of the tuple." };
          }
          return { pass: false, message: 'Not quite — we want exactly "Ruby: 2 lbs".' };
        },
      },
    },
    {
      id: "6.4",
      title: "Chapter 6 Wrap-Up",
      content: `
        <p>Sorting, searching, and tuples for data that shouldn't change — everything an inventory
        system needs.</p>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>Chapter 6 complete. Next: give the player a real inventory.</p>
        </div>
      `,
      starterCode: `# Nothing to fix here — press Next for the Project.
print("Chapter 6 complete!")`,
      practice: null,
    },
  ],
  project: {
    title: "The Inventory System",
    content: `
      <p><strong>The Challenge:</strong> add a real inventory to your game — the player can pick
      up items, drop them, and list what they're carrying, sorted alphabetically. Each item's
      fixed data (name and weight) lives in a tuple.</p>
      <div class="lesson-recap">
        <span class="lesson-label">What You'll Use</span>
        <ul>
          <li><code>.append()</code> and <code>.remove()</code>, to pick up and drop items
          (Course 1 + this chapter's sorting)</li>
          <li>Tuples, for each item's fixed name/weight data (this chapter)</li>
          <li>Everything from Chapter 5's refactored functions</li>
        </ul>
      </div>
      <div class="lesson-turn">
        <span class="lesson-label">Step-By-Step</span>
        <ol>
          <li>The starter code adds an <code>ITEM_DATA</code> dictionary mapping item names to
          <code>(display_name, weight)</code> tuples, a <code>room_items</code> dict listing which
          items sit in which room, and an <code>inventory</code> list — empty at first.</li>
          <li><code>"take &lt;item&gt;"</code> moves an item from the current room into
          <code>inventory</code>. <code>"drop &lt;item&gt;"</code> does the reverse.
          <code>"inventory"</code> prints the bag's contents, sorted.</li>
          <li>Run it: go to the forest, <code>take torch</code>, check <code>inventory</code>,
          then <code>drop torch</code> and confirm it's back in the room.</li>
          <li>Add one more item somewhere on the map, with its own entry in
          <code>ITEM_DATA</code> and <code>room_items</code>.</li>
        </ol>
      </div>
      <div class="lesson-tip">
        <span class="lesson-label">Watch Out For</span>
        <p>trying to <code>take</code> an item that isn't in the current room, or
        <code>drop</code> one you're not carrying, should print a message instead of crashing —
        the starter code already checks for this with <code>in</code> before acting.</p>
      </div>
    `,
    starterCode: `ITEM_DATA = {
    "torch": ("Torch", 2),
    "coin": ("Gold Coin", 1),
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
        "description": "A crumbling stone tower rises above the trees.",
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
    verb = words[0] if len(words) > 0 else ""
    argument = words[1] if len(words) > 1 else None
    return verb, argument


print("You are standing at the entrance of a small cave.")
print("Type 'help' to see what you can do.")

while True:
    command = input("> ")
    verb, argument = parse_command(command)

    if verb == "look":
        describe_room(current_room)
    elif verb == "go":
        if argument:
            new_room = move_player(current_room, argument)
            if new_room:
                current_room = new_room
                print(f"You head {argument}, into the {current_room}.")
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
    elif verb == "help":
        print("Commands: look, go <direction>, take <item>, drop <item>, inventory, help, quit")
    elif verb == "quit":
        print("Goodbye!")
        break
    else:
        print("I don't understand that command.")`,
  },
};
