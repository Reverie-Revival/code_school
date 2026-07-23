// Chapter 10 — Classes & OOP II: Inheritance
// Project: Enemies -- an Enemy base class with subclasses that each fight differently.

export const chapter = {
  number: 10,
  title: "Classes & OOP II: Inheritance",
  welcome: {
    content: `
      <p><strong>Chapter 10: Inheritance.</strong> The goblin fight from Chapter 8 was one
      function that only ever worked one way. Real games have different enemies that behave
      differently. <strong>Inheritance</strong> lets a class share behavior with another class,
      while still customizing exactly the parts that should be different.</p>

      <p>This chapter's Project — <strong>Enemies</strong> — builds an <code>Enemy</code> base
      class, then a <code>Goblin</code> and a <code>Dragon</code> that each inherit from it but
      fight in their own way.</p>
    `,
  },
  lessons: [
    {
      id: "10.1",
      title: "Sharing Behavior: Inheritance",
      content: `
        <p>A goblin and a dragon are both still "an enemy" — they should both have a name, both be
        fightable, both follow the same basic shape. Writing that shared shape twice (or three
        times, or ten) would mean fixing the same bug in multiple places later.
        <strong>Inheritance</strong> lets one class share its attributes and methods with another,
        so the shared parts only need to be written once. A class can inherit from another class
        by putting the parent class's name in parentheses: <code>class Child(Parent):</code>. The
        child automatically gets every attribute and method the parent has, without rewriting any
        of it.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        print(f"{self.name} makes a sound.")

class Dog(Animal):
    pass

rex = Dog("Rex")
rex.speak()</code></pre>
          <p>Output: <code>Rex makes a sound.</code> <code>Dog</code> never defines
          <code>__init__</code> or <code>speak</code> itself — it inherits both from
          <code>Animal</code> automatically, just by listing <code>Animal</code> in parentheses.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p><code>Animal</code> here is called the <strong>base class</strong> (or parent/
          superclass); <code>Dog</code> is the <strong>subclass</strong> (or child). Get the
          direction right — a subclass inherits from its base class, never the other way around.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>A base class <code>Creature</code> is given. Create a subclass <code>Wolf</code> that
          inherits from it (no changes needed inside), make an instance named <code>"Fang"</code>,
          and call <code>.speak()</code> on it.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>class Child(Parent):</code> — the subclass gets everything the base class has,
          automatically, for free.</p>
        </div>
      `,
      starterCode: `class Creature:
    def __init__(self, name):
        self.name = name

    def speak(self):
        print(f"{self.name} makes a sound.")

# define Wolf as a subclass of Creature, create "Fang", call speak()`,
      practice: {
        instructions: "Print exactly: Fang makes a sound.",
        solution: `class Creature:
    def __init__(self, name):
        self.name = name

    def speak(self):
        print(f"{self.name} makes a sound.")

class Wolf(Creature):
    pass

fang = Wolf("Fang")
fang.speak()`,
        check(actualOutput) {
          const got = actualOutput.trim();
          if (got === "Fang makes a sound.") {
            return { pass: true, message: "Wolf inherited speak() from Creature without redefining it." };
          }
          return { pass: false, message: 'Not quite — we want exactly "Fang makes a sound."' };
        },
      },
    },
    {
      id: "10.2",
      title: "Overriding a Method",
      content: `
        <p>Inheritance shares behavior, but a goblin and a dragon obviously shouldn't fight in
        exactly the same way — sharing everything identically defeats the purpose of having
        different enemy types at all. A subclass can <strong>override</strong> a method by
        defining its own version with the same name — Python uses the subclass's version instead
        of the parent's, for objects of that subclass, while everything else it didn't override
        still comes from the parent as normal.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        print(f"{self.name} makes a sound.")

class Dog(Animal):
    def speak(self):
        print(f"{self.name} barks!")

rex = Dog("Rex")
rex.speak()</code></pre>
          <p>Output: <code>Rex barks!</code> — <code>Dog</code>'s own <code>speak</code> replaces
          <code>Animal</code>'s for any <code>Dog</code> object. <code>__init__</code> is still
          inherited unchanged, since <code>Dog</code> doesn't redefine it.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>overriding <code>__init__</code> itself (not just a regular method) needs
          <code>super().__init__(...)</code> to still run the parent's setup — the next lesson
          covers exactly that.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Create a <code>Cat</code> subclass of <code>Creature</code> that overrides
          <code>speak(self)</code> to print <code>f"{self.name} meows!"</code> instead. Make one
          named <code>"Whiskers"</code> and call <code>.speak()</code>.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>Redefining a method in a subclass overrides the parent's version — same method name,
          different behavior for that specific subclass.</p>
        </div>
      `,
      starterCode: `class Creature:
    def __init__(self, name):
        self.name = name

    def speak(self):
        print(f"{self.name} makes a sound.")

# define Cat as a subclass that overrides speak() to print "{name} meows!"`,
      practice: {
        instructions: "Print exactly: Whiskers meows!",
        solution: `class Creature:
    def __init__(self, name):
        self.name = name

    def speak(self):
        print(f"{self.name} makes a sound.")

class Cat(Creature):
    def speak(self):
        print(f"{self.name} meows!")

whiskers = Cat("Whiskers")
whiskers.speak()`,
        check(actualOutput) {
          const got = actualOutput.trim();
          if (got === "Whiskers meows!") {
            return { pass: true, message: "Overrode speak() so Cat behaves differently than the base Creature." };
          }
          return { pass: false, message: 'Not quite — we want exactly "Whiskers meows!"' };
        },
      },
    },
    {
      id: "10.3",
      title: "Adding to a Method with super()",
      content: `
        <p>Sometimes you don't want to fully replace a parent's method — you want to run the
        parent's version <em>and then</em> add something extra. <code>super()</code> gives you
        access to the parent class from inside a subclass, so you can call its original method
        before (or after) your own additions.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>class Creature:
    def __init__(self, name):
        self.name = name
        self.hp = 10

class Dragon(Creature):
    def __init__(self, name):
        super().__init__(name)
        self.hp = 30
        self.can_fly = True

smaug = Dragon("Smaug")
print(smaug.name)
print(smaug.hp)
print(smaug.can_fly)</code></pre>
          <p>Output: <code>Smaug</code>, then <code>30</code>, then <code>True</code>.
          <code>super().__init__(name)</code> runs <code>Creature</code>'s own
          <code>__init__</code> first (which sets <code>self.name</code> and a starting
          <code>self.hp</code> of 10) — then <code>Dragon</code>'s own code overwrites
          <code>hp</code> to 30 and adds a brand-new attribute, <code>can_fly</code>, that plain
          <code>Creature</code> objects don't have at all.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>without calling <code>super().__init__(...)</code>, a subclass that defines its own
          <code>__init__</code> completely replaces the parent's — none of the parent's setup
          would run automatically. <code>super()</code> is how you opt back into it.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Create a <code>Dragon</code> subclass of the given <code>Creature</code> whose
          <code>__init__(self, name)</code> calls <code>super().__init__(name)</code>, then sets
          <code>self.hp = 30</code>. Create one named <code>"Smaug"</code> and print its
          <code>.name</code> and <code>.hp</code>.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>super().method(...)</code> calls the parent class's version of a method — the
          way to extend behavior instead of fully replacing it.</p>
        </div>
      `,
      starterCode: `class Creature:
    def __init__(self, name):
        self.name = name
        self.hp = 10

# define Dragon(Creature) whose __init__ calls super().__init__(name), then sets hp to 30

smaug = Dragon("Smaug")
print(smaug.name)
print(smaug.hp)`,
      practice: {
        instructions: "Print Smaug then 30.",
        solution: `class Creature:
    def __init__(self, name):
        self.name = name
        self.hp = 10

class Dragon(Creature):
    def __init__(self, name):
        super().__init__(name)
        self.hp = 30

smaug = Dragon("Smaug")
print(smaug.name)
print(smaug.hp)`,
        check(actualOutput) {
          const lines = actualOutput.trim().split("\n").map((l) => l.trim());
          if (lines.length === 2 && lines[0] === "Smaug" && lines[1] === "30") {
            return { pass: true, message: "super().__init__() ran the parent setup, then Dragon added its own." };
          }
          return { pass: false, message: "Not quite — we want \"Smaug\" then \"30\"." };
        },
      },
    },
    {
      id: "10.4",
      title: "Chapter 10 Wrap-Up",
      content: `
        <p>Inheritance shares code, overriding customizes exactly the parts that should differ,
        and <code>super()</code> lets you extend a parent's behavior instead of fully replacing
        it. Time to give your game more than one kind of enemy.</p>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>Chapter 10 complete. Next: real enemy classes, each fighting their own way.</p>
        </div>
      `,
      starterCode: `# Nothing to fix here — press Next for the Project.
print("Chapter 10 complete!")`,
      practice: null,
    },
  ],
  project: {
    title: "Enemies",
    content: `
      <p><strong>The Challenge:</strong> replace the single <code>fight_goblin()</code> function
      with a real <code>Enemy</code> base class and two subclasses — <code>Goblin</code> and
      <code>Dragon</code> — that each fight differently by overriding an <code>attack()</code>
      method.</p>
      <div class="lesson-recap">
        <span class="lesson-label">What You'll Use</span>
        <ul>
          <li><code>class Child(Parent):</code> and method overriding (this chapter)</li>
          <li>Everything from Chapter 9's class-based rooms</li>
        </ul>
      </div>
      <div class="lesson-turn">
        <span class="lesson-label">Step-By-Step</span>
        <ol>
          <li>The starter code defines an <code>Enemy</code> base class with a name and a
          <code>fight(self)</code> method that rolls a d20 for the player and calls
          <code>self.attack()</code> to get the enemy's own roll.</li>
          <li><code>Goblin</code> overrides <code>attack(self)</code> to roll a d20 (same as
          before). <code>Dragon</code> overrides it to roll <em>two</em> d20s and use the higher
          one — a tougher fight.</li>
          <li>The tower now holds a <code>Goblin</code> object instead of just triggering a
          function; fighting it calls <code>.fight()</code> on whichever <code>Enemy</code> object
          is there.</li>
          <li>Run it and fight the goblin a few times. Then add a <code>Dragon</code> in a new
          room of your own, and fight it too — notice it's harder to beat, purely because of its
          overridden <code>attack()</code>.</li>
        </ol>
      </div>
      <div class="lesson-tip">
        <span class="lesson-label">Watch Out For</span>
        <p><code>Enemy.fight()</code> calls <code>self.attack()</code>, not
        <code>Enemy.attack()</code> directly — using <code>self</code> is exactly what makes
        Python automatically use <code>Goblin</code>'s or <code>Dragon</code>'s <em>own</em>
        <code>attack()</code> depending on which one <code>self</code> actually is.</p>
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

current_room = "cave"
inventory = []


def parse_command(text):
    words = text.split()
    verb = words[0].lower() if len(words) > 0 else ""
    argument = words[1].lower() if len(words) > 1 else None
    return verb, argument


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
