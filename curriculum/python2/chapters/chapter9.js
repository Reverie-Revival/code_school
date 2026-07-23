// Chapter 9 — Classes & OOP I
// Project: From Dicts to Classes -- the course's biggest structural leap:
// refactor Player/Room/Item from dicts into real classes.

export const chapter = {
  number: 9,
  title: "Classes & OOP I",
  welcome: {
    content: `
      <p><strong>Chapter 9: Classes & OOP I.</strong> Everything so far has kept a room's data in
      a dictionary, and functions that operate on that dictionary from the outside. A
      <strong>class</strong> bundles data and the code that works on it into one thing. This is
      the single biggest idea in this entire course.</p>

      <p>This chapter's Project — <strong>From Dicts to Classes</strong> — takes your game's rooms
      and rewrites them as a <code>Room</code> class instead of a dictionary. Same game, from the
      player's point of view — completely different architecture underneath.</p>
    `,
  },
  lessons: [
    {
      id: "9.1",
      title: "What's a Class? (Bundling Data and Behavior)",
      content: `
        <p>A <strong>class</strong> is a blueprint for creating objects that carry their own data
        (called <strong>attributes</strong>) and their own functions (called
        <strong>methods</strong>). An <strong>object</strong> — also called an
        <strong>instance</strong> — is one specific thing built from that blueprint.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>class Player:
    pass

robin = Player()
robin.name = "Robin"
robin.hp = 40
print(robin.name)
print(robin.hp)</code></pre>
          <p>Output: <code>Robin</code>, then <code>40</code>. <code>Player()</code> creates a new
          object; <code>.name</code> and <code>.hp</code> are attributes attached to that specific
          object with dot notation — the same dot notation you've used all along for method calls
          like <code>.append()</code>.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>class names conventionally start with a capital letter (<code>Player</code>, not
          <code>player</code>) — not required by Python, but a convention strong enough that
          breaking it will confuse anyone reading your code, including future you.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Create a class <code>Item</code> (just <code>pass</code> in its body), make an
          instance called <code>sword</code>, set <code>sword.name = "Iron Sword"</code> and
          <code>sword.weight = 8</code>, then print both.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>A class is a blueprint; <code>ClassName()</code> creates an object from it; dot
          notation attaches and reads that object's own attributes.</p>
        </div>
      `,
      starterCode: `class Item:
    pass

# create a sword instance, set its name and weight, then print both`,
      practice: {
        instructions: "Print Iron Sword then 8.",
        solution: `class Item:
    pass

sword = Item()
sword.name = "Iron Sword"
sword.weight = 8
print(sword.name)
print(sword.weight)`,
        check(actualOutput) {
          const lines = actualOutput.trim().split("\n").map((l) => l.trim());
          if (lines.length === 2 && lines[0] === "Iron Sword" && lines[1] === "8") {
            return { pass: true, message: "Created an object and attached attributes to it directly." };
          }
          return { pass: false, message: 'Not quite — we want "Iron Sword" then "8".' };
        },
      },
    },
    {
      id: "9.2",
      title: "Writing __init__ and Methods",
      content: `
        <p>Setting attributes one by one after creating an object (like last lesson) works, but
        it's clunky. <code>__init__</code> is a special method that runs automatically when an
        object is created, so you can set everything up in one step. <code>self</code> refers to
        the specific object being built or used.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>class Player:
    def __init__(self, name, hp):
        self.name = name
        self.hp = hp

    def take_damage(self, amount):
        self.hp = self.hp - amount

robin = Player("Robin", 40)
robin.take_damage(12)
print(robin.hp)</code></pre>
          <p>Output: <code>28</code>. <code>Player("Robin", 40)</code> calls <code>__init__</code>
          automatically, with <code>self</code> bound to the new object — you never pass
          <code>self</code> yourself, Python does it for you. <code>take_damage</code> is a
          <strong>method</strong>: a function that lives inside the class and acts on
          <code>self</code>.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>every method needs <code>self</code> as its first parameter, even ones that don't
          take any other arguments — leave it off and you'll get a confusing
          <code>TypeError</code> about the wrong number of arguments.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Write a class <code>Item</code> with <code>__init__(self, name, weight)</code> and a
          method <code>describe(self)</code> that prints <code>f"{self.name} ({self.weight}
          lbs)"</code>. Create a sword weighing 8 and call <code>.describe()</code> on it.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>__init__</code> sets up a new object's attributes automatically;
          <code>self</code> inside any method refers to that specific object.</p>
        </div>
      `,
      starterCode: `class Item:
    def __init__(self, name, weight):
        # your code here
        pass

    def describe(self):
        # your code here
        pass

sword = Item("Iron Sword", 8)
sword.describe()`,
      practice: {
        instructions: "Print exactly: Iron Sword (8 lbs)",
        solution: `class Item:
    def __init__(self, name, weight):
        self.name = name
        self.weight = weight

    def describe(self):
        print(f"{self.name} ({self.weight} lbs)")

sword = Item("Iron Sword", 8)
sword.describe()`,
        check(actualOutput) {
          const got = actualOutput.trim();
          if (got === "Iron Sword (8 lbs)") {
            return { pass: true, message: "__init__ set up the object, describe() read from self correctly." };
          }
          return { pass: false, message: 'Not quite — we want exactly "Iron Sword (8 lbs)".' };
        },
      },
    },
    {
      id: "9.3",
      title: "Chapter 9 Wrap-Up",
      content: `
        <p>Classes bundle data and behavior together — <code>__init__</code> sets an object up,
        methods act on it through <code>self</code>. This is the architecture shift your whole
        game is about to go through.</p>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>Chapter 9 complete. Next: rebuild the game's rooms as a real class.</p>
        </div>
      `,
      starterCode: `# Nothing to fix here — press Next for the Project.
print("Chapter 9 complete!")`,
      practice: null,
    },
  ],
  project: {
    title: "From Dicts to Classes",
    content: `
      <p><strong>The Challenge:</strong> the biggest refactor yet. Replace the <code>rooms</code>
      dictionary with a real <code>Room</code> class — same game, from the player's point of view,
      built on a completely different foundation.</p>
      <div class="lesson-recap">
        <span class="lesson-label">What You'll Use</span>
        <ul>
          <li><code>class</code>, <code>__init__</code>, and methods (this chapter)</li>
          <li>Everything the game already does — same behavior, new architecture</li>
        </ul>
      </div>
      <div class="lesson-turn">
        <span class="lesson-label">Step-By-Step</span>
        <ol>
          <li>The starter code defines a <code>Room</code> class with
          <code>__init__(self, description, exits, items)</code>, plus methods
          <code>describe(self)</code> and <code>get_exit(self, direction)</code>.</li>
          <li><code>rooms</code> is now a dictionary of <code>Room</code> <em>objects</em> instead
          of a dictionary of dictionaries — <code>rooms["cave"]</code> is a whole
          <code>Room</code>, and <code>rooms["cave"].description</code> reaches its attribute
          directly.</li>
          <li>The main loop's functions now call methods on the current <code>Room</code> object
          instead of looking things up with square brackets.</li>
          <li>Run it and confirm it plays <em>identically</em> to before. Then add a fourth room as
          a new <code>Room(...)</code> object, the same way the other three are built.</li>
        </ol>
      </div>
      <div class="lesson-tip">
        <span class="lesson-label">Watch Out For</span>
        <p><code>self.items</code> being a mutable list means <code>take</code>/<code>drop</code>
        can call <code>.append()</code>/<code>.remove()</code> straight on
        <code>rooms[current_room].items</code>, exactly like it did on the old dictionary version
        — the object's attribute is just as changeable as the dict value was.</p>
      </div>
    `,
    starterCode: `import random

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

current_room = "cave"
inventory = []
tower_visited = False


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
                    if current_room == "tower" and not tower_visited:
                        tower_visited = True
                        if random.choice([True, False]):
                            rooms["tower"].items.append("gem")
                            print("Something glints on the ground — a gem!")
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
