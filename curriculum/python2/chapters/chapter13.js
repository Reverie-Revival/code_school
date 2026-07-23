// Chapter 13 — Capstone: Finish the Game
// Open-ended: everything from Ch. 1-12, in one self-directed final project.

export const chapter = {
  number: 13,
  title: "Capstone: Finish the Game",
  welcome: {
    content: `
      <p><strong>Chapter 13: the capstone.</strong> There's no new Python syntax in this chapter —
      just two short lessons on planning and testing your own work, then the biggest, most
      open-ended project in either course.</p>

      <p>You've built a real game engine over twelve chapters: rooms, movement, an inventory,
      enemies with different behaviors, save/load, error handling that keeps it running, and
      <code>assert</code> checks watching your assumptions. This chapter, you design and build
      something new for it — your own choice, using whatever combination of everything you've
      learned the idea calls for.</p>

      <p>This is the closest thing in either course to real, self-directed project work — and
      it's the deliberate on-ramp to starting an actual project with your dad once you're done.</p>
    `,
  },
  lessons: [
    {
      id: "13.1",
      title: "Planning Your Addition",
      content: `
        <p>Real projects start with a plan, not code. Before you touch the starter code below,
        decide what you're adding — and write it down, even just a few lines of comments, before
        you write the code that does it.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example Ideas</span>
          <ul>
            <li>A new room (or several) with its own item and its own enemy — maybe a
            <code>Skeleton</code> subclass of <code>Enemy</code> with an attack pattern that's
            different from the <code>Goblin</code> and <code>Dragon</code> you already have.</li>
            <li>A shop room where the player can spend gold (you'd need to add a gold count to
            track) to buy an item.</li>
            <li>A locked door that needs a specific item (a "key") in the player's inventory
            before <code>go</code> will let them through.</li>
            <li>A win condition — reaching a specific room, or defeating a specific enemy, prints a
            "You win!" message and ends the game.</li>
          </ul>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>picking something too big. A locked door and a new room is plenty for one project —
          you can always come back and add more once it's working.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>No practice check for this one — just think it through. What are you adding? What
          existing pieces of the code (a class, a command, a data structure) will it reuse, and
          what's genuinely new? Jot down a few lines as comments before you start the Project.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>A little planning before coding — deciding what you're building and what it reuses —
          is exactly the habit that makes a real project manageable instead of overwhelming.</p>
        </div>
      `,
      starterCode: `# Jot down your plan here as comments, then press Next for the Project.
# What are you adding? What existing code will it reuse?
print("Planning complete!")`,
      practice: null,
    },
    {
      id: "13.2",
      title: "Testing As You Go",
      content: `
        <p>Chapter 12 was about finding bugs after the fact. On a project this size, the better
        habit is not letting them pile up in the first place — test each small piece the moment
        you write it, before moving on to the next.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example Workflow</span>
          <ul>
            <li>Adding a new room? Run the game and <code>go</code> there immediately — don't
            write three more features first and test everything at once.</li>
            <li>Adding a new <code>Enemy</code> subclass? Fight it right away and confirm
            <code>attack()</code> actually behaves differently than the base class before building
            anything else on top of it.</li>
            <li>Something not working? Reach for Chapter 12's tools — read the error bottom-up,
            recognize the error type, add an <code>assert</code> if you catch yourself assuming
            something's true without checking.</li>
          </ul>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>the temptation to write your whole addition before running it even once — the bigger
          the untested chunk, the harder it is to tell which part of it actually broke.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>No practice check for this one either — just keep it in mind as you build. Small
          step, run it, confirm it works, next small step.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>Test each piece as you add it, not all at once at the end — the single most useful
          habit for any project bigger than a few lines.</p>
        </div>
      `,
      starterCode: `# Nothing to fix here — press Next for the Project.
print("Ready to build!")`,
      practice: null,
    },
  ],
  project: {
    title: "Your Game, Your Addition",
    content: `
      <p><strong>The Challenge:</strong> add something genuinely your own to the game — a new
      room, a new enemy, a shop, a locked door, a win condition, or a combination. No fixed spec.
      Use whatever combination of everything from Chapters 1–12 your idea calls for.</p>
      <div class="lesson-recap">
        <span class="lesson-label">What You'll Use</span>
        <ul>
          <li>Whatever your plan from 13.1 calls for — that's the point</li>
          <li>The full accumulated game from Chapter 12, as your starting point</li>
        </ul>
      </div>
      <div class="lesson-turn">
        <span class="lesson-label">Step-By-Step</span>
        <ol>
          <li>The starter code is your complete game, bugs fixed, exactly where Chapter 12 left
          it.</li>
          <li>Build your addition from 13.1's plan. If you're adding a new <code>Room</code>,
          follow the same pattern as the existing three. A new enemy type: subclass
          <code>Enemy</code> and override <code>attack()</code>, same as <code>Dragon</code> did.
          A new command: add another <code>elif</code> branch to the main loop, same shape as
          <code>"fight"</code> or <code>"save"</code>.</li>
          <li>Test it thoroughly — this is the last project in the course, and the whole game
          should still run start-to-finish without errors, old features and all.</li>
          <li>Once it's working, you've finished Course 2. You're ready to start a real project —
          talk to your dad about what's next.</li>
        </ol>
      </div>
      <div class="lesson-tip">
        <span class="lesson-label">Watch Out For</span>
        <p>whatever you add, make sure it's still reachable from the existing map and commands —
        a new room with no exit connecting it to the rest is a room nobody will ever see.</p>
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


class Dragon(Enemy):
    def attack(self):
        return max(random.randint(1, 20), random.randint(1, 20))


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

assert "cave" in rooms, "starting room must exist"

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


# --- Your addition goes here (and/or wherever else in the code it belongs) ---


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
