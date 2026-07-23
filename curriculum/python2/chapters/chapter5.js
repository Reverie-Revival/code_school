// Chapter 5 — Functions, Deep Dive
// Project: The Refactor -- pulls the Command Loop's sprawling code into
// clean, named functions. No new game behavior, just better organized code.

export const chapter = {
  number: 5,
  title: "Functions, Deep Dive",
  welcome: {
    content: `
      <p><strong>Chapter 5: Functions, Deep Dive.</strong> Your game code has been growing for
      three chapters straight, and it's all still crammed into one giant loop. That's normal for
      now — but it won't scale. This chapter is about writing functions that are actually
      flexible: default values, optional arguments, and understanding what a function can and
      can't see.</p>

      <p>This chapter's Project — <strong>The Refactor</strong> — doesn't add a single new
      feature. Instead, you'll pull the sprawling code from Chapters 2–4 into clean, well-named
      functions. Same game, better organized. This is the first real lesson in <em>why</em>
      functions matter once a program gets big.</p>
    `,
  },
  lessons: [
    {
      id: "5.1",
      title: "Default and Keyword Arguments",
      content: `
        <p>A parameter can have a <strong>default value</strong> — used automatically if the
        caller doesn't provide one. And any argument can be passed by name (<strong>keyword</strong>),
        not just by position, which makes calls with several arguments much easier to read.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Robin")
greet("Sam", greeting="Welcome")</code></pre>
          <p>Output: <code>Hello, Robin!</code>, then <code>Welcome, Sam!</code>. The first call
          skips <code>greeting</code> entirely, so it falls back to <code>"Hello"</code>; the
          second overrides it by name.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>parameters with a default value have to come <em>after</em> ones without a default —
          <code>def greet(greeting="Hello", name)</code> is a <code>SyntaxError</code>.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Write <code>describe_item(name, rarity="common")</code> that prints
          <code>f"{name} ({rarity})"</code>. Call it once with just a name, and once passing
          <code>rarity="rare"</code> by keyword.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>A default value (<code>param=value</code>) makes an argument optional; passing by
          keyword (<code>name=value</code> in the call) makes the call self-explanatory.</p>
        </div>
      `,
      starterCode: `def describe_item(name, rarity="common"):
    # your code here
    pass

describe_item("Dagger")
describe_item("Amulet", rarity="rare")`,
        practice: {
        instructions: "Print: Dagger (common) then Amulet (rare)",
        solution: `def describe_item(name, rarity="common"):
    print(f"{name} ({rarity})")

describe_item("Dagger")
describe_item("Amulet", rarity="rare")`,
        check(actualOutput) {
          const lines = actualOutput.trim().split("\n").map((l) => l.trim());
          if (lines.length === 2 && lines[0] === "Dagger (common)" && lines[1] === "Amulet (rare)") {
            return { pass: true, message: "Default used when skipped, overridden when passed by keyword." };
          }
          return { pass: false, message: 'Not quite — we want "Dagger (common)" then "Amulet (rare)".' };
        },
      },
    },
    {
      id: "5.2",
      title: "Flexible Functions: *args and **kwargs",
      content: `
        <p><code>*args</code> collects any number of extra positional arguments into a tuple;
        <code>**kwargs</code> collects any number of extra keyword arguments into a dictionary.
        Both let a function accept a variable amount of input.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>def total_damage(*hits):
    return sum(hits)

print(total_damage(5, 3, 8))
print(total_damage(10))</code></pre>
          <p>Output: <code>16</code>, then <code>10</code>. <code>hits</code> becomes
          <code>(5, 3, 8)</code> in the first call and <code>(10,)</code> in the second —
          <code>*args</code> works no matter how many arguments show up.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p><code>*args</code> is a name by convention, not a keyword — you could call it
          <code>*hits</code> like above. The <code>*</code> is what matters, not the word
          "args".</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Write <code>total_gold(*amounts)</code> that returns the sum of however many amounts
          it's given. Call it with <code>10, 25, 5</code> and print the result.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>*args</code> gathers extra positional arguments into a tuple you can loop over
          or pass straight to <code>sum()</code>.</p>
        </div>
      `,
      starterCode: `def total_gold(*amounts):
    # your code here
    pass

print(total_gold(10, 25, 5))`,
      practice: {
        instructions: "Print exactly: 40",
        solution: `def total_gold(*amounts):
    return sum(amounts)

print(total_gold(10, 25, 5))`,
        check(actualOutput) {
          const got = actualOutput.trim();
          if (got === "40") {
            return { pass: true, message: "*args collected all three amounts, sum() added them up." };
          }
          return { pass: false, message: "Not quite — total_gold(10, 25, 5) should print 40." };
        },
      },
    },
    {
      id: "5.3",
      title: "Scope: What a Function Can and Can't See",
      content: `
        <p>A variable created <em>inside</em> a function only exists inside that function — that's
        called its <strong>scope</strong>. Once the function returns, that variable is gone.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>def take_damage():
    hp = 100
    hp = hp - 20
    print(hp)

take_damage()
print(hp)</code></pre>
          <p>The first <code>print(hp)</code> (inside the function) prints <code>80</code> just
          fine. The second one — outside the function — crashes with a <code>NameError</code>:
          <code>hp</code> only ever existed inside <code>take_damage()</code>.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>a function <em>can</em> read a variable defined outside it, but assigning to a
          same-named variable inside the function creates a brand-new local one instead of
          changing the outer one — a common source of confusing bugs.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Fix the code so it doesn't crash: move the second <code>print(hp)</code> so it's
          printing a value that actually exists where it's printed.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>Variables created inside a function live only inside that function — use
          <code>return</code> to hand a value back out if you need it elsewhere.</p>
        </div>
      `,
      starterCode: `def take_damage():
    hp = 100
    hp = hp - 20
    print(hp)
    print(hp)

take_damage()`,
      practice: {
        instructions: "Fix the code so it prints 80 twice, without a NameError.",
        solution: `def take_damage():
    hp = 100
    hp = hp - 20
    print(hp)
    print(hp)

take_damage()`,
        check(actualOutput) {
          const lines = actualOutput.trim().split("\n").map((l) => l.trim());
          if (lines.length === 2 && lines[0] === "80" && lines[1] === "80") {
            return { pass: true, message: "Both prints now happen inside the function, where hp actually exists." };
          }
          return { pass: false, message: "Not quite — we want 80 printed twice, both from inside take_damage()." };
        },
      },
    },
    {
      id: "5.4",
      title: "Chapter 5 Wrap-Up",
      content: `
        <p>Default arguments, <code>*args</code>, and scope — the tools that make functions
        genuinely flexible instead of just named blocks of code. Time to use them to clean up
        everything you've built so far.</p>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>Chapter 5 complete. Next: The Refactor — same game, cleaner code.</p>
        </div>
      `,
      starterCode: `# Nothing to fix here — press Next for the Project.
print("Chapter 5 complete!")`,
      practice: null,
    },
  ],
  project: {
    title: "The Refactor",
    content: `
      <p><strong>The Challenge:</strong> no new features this time. Pull the sprawling code from
      Chapters 2–4 into three clean functions: <code>describe_room()</code>,
      <code>move_player(direction)</code>, and <code>parse_command(text)</code>. Same game,
      dramatically easier to read.</p>
      <div class="lesson-recap">
        <span class="lesson-label">What You'll Use</span>
        <ul>
          <li>Functions with parameters and <code>return</code> values (this chapter, and
          Course 1)</li>
          <li>Everything the game already does — you're reorganizing it, not rewriting its
          behavior</li>
        </ul>
      </div>
      <div class="lesson-turn">
        <span class="lesson-label">Step-By-Step</span>
        <ol>
          <li>The starter code already has the three functions defined, each holding one piece of
          the logic that used to be crammed into the main loop.</li>
          <li><code>describe_room()</code> prints the current room's description.
          <code>move_player(direction)</code> tries to move and returns <code>True</code> or
          <code>False</code> depending on whether it worked. <code>parse_command(text)</code>
          splits raw input into a <code>(verb, argument)</code> pair.</li>
          <li>The main loop is now much shorter — it just calls these functions instead of doing
          the work itself.</li>
          <li>Run it and confirm it behaves <em>exactly</em> like Chapter 4's version. Nothing
          about the gameplay should be different — only the code's shape.</li>
        </ol>
      </div>
      <div class="lesson-tip">
        <span class="lesson-label">Watch Out For</span>
        <p><code>current_room</code> is used by more than one function now — since it's read (not
        reassigned) inside <code>describe_room()</code> and <code>move_player()</code>, Python can
        see the outer variable just fine there. Reassigning it (like <code>move_player</code> does)
        is why <code>move_player</code> returns the new room name instead of trying to change
        <code>current_room</code> directly from inside the function.</p>
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


def describe_room(room_name):
    print(rooms[room_name]["description"])


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
    elif verb == "help":
        print("Commands: look, go <direction>, help, quit")
    elif verb == "quit":
        print("Goodbye!")
        break
    else:
        print("I don't understand that command.")`,
  },
};
