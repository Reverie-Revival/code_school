// Chapter 5 — Functions, Deep Dive
// Project: The Refactor -- pulls the Command Loop's sprawling code into
// clean, named functions. No new game behavior, just better organized code.

export const chapter = {
  number: 5,
  title: "Functions, Deep Dive",
  welcome: {
    content: `
      <p><strong>Chapter 5: Functions, Deep Dive.</strong> Chapter 2 covered the core idea:
      calling a function jumps into its body, parameters receive whatever was passed in, and
      <code>return</code> sends a value back to exactly where it was called. Everything in this
      chapter builds directly on that round trip — it's about making the "values going in" side
      of that trip more flexible: optional values, calling by name, and even accepting an
      unknown number of values at once.</p>

      <p>Your game code has been growing for three chapters straight, and it's all still crammed
      into one giant loop. That's normal for now — but it won't scale. This chapter's Project —
      <strong>The Refactor</strong> — doesn't add a single new feature. Instead, you'll pull the
      sprawling code from Chapters 2–4 into clean, well-named functions. Same game, better
      organized. This is the first real lesson in <em>why</em> functions matter once a program
      gets big.</p>
    `,
  },
  lessons: [
    {
      id: "5.1",
      title: "Default Arguments",
      content: `
        <p>Most of the time, a function's parameter should have the <em>same</em> value on every
        call — but you still want the option to override it on the rare call where it needs to be
        different. Writing a separate parameter for "the usual case" and "the special case" is
        clunky. A <strong>default value</strong> solves this: the parameter fills itself in
        automatically when the caller doesn't provide one, and only needs to be mentioned on the
        calls where it's actually different.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Robin")
greet("Sam", "Welcome")</code></pre>
          <p>Output: <code>Hello, Robin!</code>, then <code>Welcome, Sam!</code>. Remember from
          Chapter 2: calling a function jumps in and sets each parameter to whatever was passed.
          The first call only passes <code>"Robin"</code>, so <code>name</code> gets that value —
          but there's nothing for <code>greeting</code>, so it falls back to its default,
          <code>"Hello"</code>, instead of that jump crashing. The second call passes both, in
          order, so <code>greeting</code> gets <code>"Welcome"</code> instead.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>parameters with a default value have to come <em>after</em> ones without a default —
          <code>def greet(greeting="Hello", name)</code> is a <code>SyntaxError</code>, since
          Python wouldn't be able to tell which positional value belongs to which parameter
          otherwise.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Write <code>describe_item(name, rarity="common")</code> that prints
          <code>f"{name} ({rarity})"</code>. Call it once with just <code>"Dagger"</code>, and
          once with <code>"Amulet"</code> and <code>"rare"</code>.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>A default value (<code>param=value</code>) makes an argument optional — leave it out
          and the default fills in automatically, on top of everything you already know about how
          parameters receive values from Chapter 2.</p>
        </div>
      `,
      starterCode: `def describe_item(name, rarity="common"):
    # your code here
    pass

describe_item("Dagger")
describe_item("Amulet", "rare")`,
      practice: {
        instructions: "Print: Dagger (common) then Amulet (rare)",
        solution: `def describe_item(name, rarity="common"):
    print(f"{name} ({rarity})")

describe_item("Dagger")
describe_item("Amulet", "rare")`,
        check(actualOutput) {
          const lines = actualOutput.trim().split("\n").map((l) => l.trim());
          if (lines.length === 2 && lines[0] === "Dagger (common)" && lines[1] === "Amulet (rare)") {
            return { pass: true, message: "Default used when skipped, overridden when provided." };
          }
          return { pass: false, message: 'Not quite — we want "Dagger (common)" then "Amulet (rare)".' };
        },
      },
    },
    {
      id: "5.2",
      title: "Keyword Arguments",
      content: `
        <p>So far, every argument has matched up to a parameter by <em>position</em> — the first
        value passed goes to the first parameter, and so on. Once a function has several
        parameters, remembering the exact order gets error-prone, and a call like
        <code>make_potion("Speed", 1, "green")</code> doesn't say which number means what. Any
        argument can instead be passed <strong>by name</strong> — <code>name=value</code> right
        in the call — which makes the call self-explanatory and lets you skip earlier optional
        arguments while still setting a later one.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>def make_potion(name, strength=1, color="red"):
    print(f"{name} (strength {strength}, {color})")

make_potion("Heal", color="blue")
make_potion(name="Poison", strength=3)</code></pre>
          <p>Output: <code>Heal (strength 1, blue)</code>, then <code>Poison (strength 3,
          red)</code>. The first call skips <code>strength</code> entirely (falls back to its
          default) while still overriding <code>color</code> by name — something position alone
          couldn't do, since you can't skip a middle argument positionally. The second call names
          every argument, in whatever order is clearest to read.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>once you use a keyword argument in a call, every argument after it must also be a
          keyword argument — you can't go back to plain positional after that point.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Using the given <code>make_potion</code> function, call it once passing only
          <code>name="Speed"</code> and <code>color="green"</code> by keyword, skipping
          <code>strength</code> entirely.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>Keyword arguments (<code>name=value</code> in the call) let you skip earlier optional
          arguments and set only the ones you actually care about, by name instead of position.</p>
        </div>
      `,
      starterCode: `def make_potion(name, strength=1, color="red"):
    print(f"{name} (strength {strength}, {color})")

# call it with name="Speed" and color="green", skipping strength`,
      practice: {
        instructions: "Print exactly: Speed (strength 1, green)",
        solution: `def make_potion(name, strength=1, color="red"):
    print(f"{name} (strength {strength}, {color})")

make_potion(name="Speed", color="green")`,
        check(actualOutput) {
          const got = actualOutput.trim();
          if (got === "Speed (strength 1, green)") {
            return { pass: true, message: "Skipped strength by name, kept its default." };
          }
          return { pass: false, message: 'Not quite — we want exactly "Speed (strength 1, green)".' };
        },
      },
    },
    {
      id: "5.3",
      title: "*args: Flexible Positional Arguments",
      content: `
        <p>Every function so far has had a fixed number of parameters — but sometimes you
        genuinely don't know ahead of time how many values a call needs to pass. Imagine totaling
        up damage from every hit in a single turn: sometimes that's one hit, sometimes five.
        Writing five separate parameters (most of them unused most of the time) is exactly the
        kind of clunky, inflexible code functions are supposed to help you avoid.
        <code>*args</code> solves this: it collects <em>any</em> number of extra positional
        arguments into a single tuple, so the function accepts as many or as few as a given call
        actually needs.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>def total_damage(*hits):
    print(hits)
    return sum(hits)

print(total_damage(5, 3, 8))
print(total_damage(10))</code></pre>
          <p>Output: <code>(5, 3, 8)</code>, then <code>16</code>, then <code>(10,)</code>, then
          <code>10</code>. Same as always: calling jumps into the function, but now instead of one
          value per parameter, <em>every</em> positional argument gets swept up together into one
          tuple called <code>hits</code> — <code>(5, 3, 8)</code> the first call,
          <code>(10,)</code> the second. <code>*args</code> works no matter how many arguments
          show up, including zero.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p><code>*args</code> is a name by convention, not a required keyword — you could call
          it <code>*hits</code> like above. It's the <code>*</code> that matters, not the word
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
          or pass straight to <code>sum()</code> — for exactly the situations where you can't know
          the number of arguments ahead of time.</p>
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
      id: "5.4",
      title: "**kwargs: Flexible Keyword Arguments",
      content: `
        <p><code>*args</code> solves "I don't know how many values are coming in."
        <code>**kwargs</code> solves a related but different problem: "I don't know how many
        <em>named</em> options are coming in." Think building a character with a genuinely
        open-ended set of stats — some characters might have <code>hp</code> and
        <code>gold</code>, others might also have <code>mana</code> or <code>armor</code>.
        Defining a parameter for every possible stat up front doesn't scale. <code>**kwargs</code>
        collects any number of extra <code>name=value</code> arguments into a
        <strong>dictionary</strong> instead, so the function accepts whatever named options a
        given call actually provides.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>def make_character(name, **stats):
    print(f"{name}:")
    for stat, value in stats.items():
        print(f"  {stat} = {value}")

make_character("Robin", hp=40, gold=15, level=3)</code></pre>
          <p>Output: <code>Robin:</code>, then <code>hp = 40</code>, <code>gold = 15</code>,
          <code>level = 3</code>, each on its own line. Calling jumps in as always, but every
          keyword argument beyond <code>name</code> gets swept into one dictionary,
          <code>stats</code> — <code>{"hp": 40, "gold": 15, "level": 3}</code> — which the
          function then loops over with <code>.items()</code>.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p><code>*args</code> (one star, positional, becomes a tuple) and
          <code>**kwargs</code> (two stars, keyword, becomes a dictionary) are genuinely different
          tools — mixing up which one a situation calls for is a common early mistake. If the
          extra values need names, it's <code>**kwargs</code>.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Write <code>describe_stats(**stats)</code> that loops over <code>stats.items()</code>
          and prints each as <code>f"{stat}: {value}"</code>. Call it with <code>hp=40</code> and
          <code>gold=15</code>.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>**kwargs</code> gathers extra keyword arguments into a dictionary — use
          <code>.items()</code> to loop over the names and values it collected.</p>
        </div>
      `,
      starterCode: `def describe_stats(**stats):
    # your code here
    pass

describe_stats(hp=40, gold=15)`,
      practice: {
        instructions: "Print: hp: 40 then gold: 15",
        solution: `def describe_stats(**stats):
    for stat, value in stats.items():
        print(f"{stat}: {value}")

describe_stats(hp=40, gold=15)`,
        check(actualOutput) {
          const lines = actualOutput.trim().split("\n").map((l) => l.trim());
          if (lines.length === 2 && lines[0] === "hp: 40" && lines[1] === "gold: 15") {
            return { pass: true, message: "**kwargs collected both named stats into a dictionary." };
          }
          return { pass: false, message: 'Not quite — we want "hp: 40" then "gold: 15".' };
        },
      },
    },
    {
      id: "5.5",
      title: "Scope: What a Function Can and Can't See",
      content: `
        <p>Functions are only safe to reuse everywhere because they're self-contained — a
        function's own variables don't leak out and interfere with the rest of your program, and
        it can't accidentally overwrite some unrelated variable elsewhere just because they happen
        to share a name. That isolation is called <strong>scope</strong>: a variable created
        <em>inside</em> a function only exists inside that function, for the duration of that one
        call, and disappears the moment the function returns.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>def take_damage():
    hp = 100
    hp = hp - 20
    print(hp)

take_damage()
print(hp)</code></pre>
          <p>The first <code>print(hp)</code> (inside the function) prints <code>80</code> just
          fine — <code>hp</code> exists there. The second one, outside the function, crashes with
          a <code>NameError</code>: once <code>take_damage()</code> finished and execution jumped
          back out (same round trip from Chapter 2), its local <code>hp</code> was gone — it never
          existed anywhere outside that one call.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>a function <em>can</em> read a variable defined outside it, but assigning to a
          same-named variable inside the function creates a brand-new local one instead of
          changing the outer one — a common source of confusing bugs, and exactly why
          <code>return</code> exists: it's the deliberate, explicit way to hand a value back out,
          instead of relying on scope leaking (which it doesn't).</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Fix the code so it doesn't crash: move the second <code>print(hp)</code> so it's
          printing a value that actually exists where it's printed.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>Variables created inside a function live only inside that function — use
          <code>return</code> to hand a value back out if you need it elsewhere, the same round
          trip you already know from Chapter 2.</p>
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
      id: "5.6",
      title: "Chapter 5 Wrap-Up",
      content: `
        <p>Default arguments, keyword arguments, <code>*args</code>, <code>**kwargs</code>, and
        scope — the tools that make functions genuinely flexible instead of just named blocks of
        code, all built on the same call → parameters → body → return round trip from Chapter 2.
        Time to use them to clean up everything you've built so far.</p>
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
        <code>current_room</code> directly from inside the function — the same scope rule from
        Lesson 5.5.</p>
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
