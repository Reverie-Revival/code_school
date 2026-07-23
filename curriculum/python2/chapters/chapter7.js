// Chapter 7 — Error Handling
// Project: Bulletproofing -- the game survives bad input instead of crashing.

export const chapter = {
  number: 7,
  title: "Error Handling",
  welcome: {
    content: `
      <p><strong>Chapter 7: Error Handling.</strong> Every crash you've hit so far in this course
      was Python telling you something was wrong, then stopping cold. That's fine while you're
      learning — but a real program shouldn't crash just because someone typed something
      unexpected. This chapter is about catching problems and recovering gracefully instead.</p>

      <p>This chapter's Project — <strong>Bulletproofing</strong> — doesn't add new commands. It
      makes the existing ones survive bad input: typos, empty commands, nonsense — all without
      the game crashing on the player.</p>
    `,
  },
  lessons: [
    {
      id: "7.1",
      title: "When Code Breaks: try / except",
      content: `
        <p><code>try</code>/<code>except</code> lets your program attempt something risky, and
        recover instead of crashing if it fails. Code inside <code>try:</code> runs normally
        unless it raises an error — if it does, Python jumps straight to <code>except:</code>
        instead of stopping the whole program.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>text = "not a number"
try:
    amount = int(text)
    print(amount)
except ValueError:
    print("That's not a valid number.")</code></pre>
          <p><code>int("not a number")</code> raises a <code>ValueError</code>. Instead of
          crashing, Python jumps to the matching <code>except ValueError:</code> block. Output:
          <code>That's not a valid number.</code></p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>naming the specific error type (<code>except ValueError:</code>) is better than a
          bare <code>except:</code> — a bare <code>except</code> silently swallows <em>every</em>
          kind of error, including ones you didn't expect and would actually want to know about.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Wrap the conversion in <code>try</code>/<code>except ValueError</code> so that instead
          of crashing, it prints <code>Invalid input.</code></p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>try:</code> attempts risky code; <code>except SomeError:</code> catches that
          specific kind of failure and lets the program keep going.</p>
        </div>
      `,
      starterCode: `text = "abc"
amount = int(text)
print(amount)`,
      practice: {
        instructions: "Fix this so instead of crashing, it prints: Invalid input.",
        solution: `text = "abc"
try:
    amount = int(text)
    print(amount)
except ValueError:
    print("Invalid input.")`,
        check(actualOutput) {
          const got = actualOutput.trim();
          if (got === "Invalid input.") {
            return { pass: true, message: "Caught the ValueError instead of letting it crash the program." };
          }
          return { pass: false, message: 'Not quite — we want exactly "Invalid input." printed, no crash.' };
        },
      },
    },
    {
      id: "7.2",
      title: "Catching Different Errors Differently",
      content: `
        <p>A <code>try</code> can have more than one <code>except</code> block, each catching a
        different kind of error — Python checks them in order and runs the first one that
        matches. This lets you respond differently depending on exactly what went wrong.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>items = {"torch": 2}
name = "sword"

try:
    weight = items[name]
    doubled = weight * "x"
except KeyError:
    print(f"No item called {name}.")
except TypeError:
    print("Can't do that math.")</code></pre>
          <p>Output: <code>No item called sword.</code> — <code>items["sword"]</code> raises a
          <code>KeyError</code> (since <code>"sword"</code> isn't in the dictionary), so Python
          matches the first <code>except</code> and skips the second entirely. If
          <code>name</code> had been <code>"torch"</code> instead, the <code>KeyError</code>
          wouldn't happen, but multiplying a number by a string a few lines later would raise a
          <code>TypeError</code> and match the second block instead.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>only the <em>first</em> matching <code>except</code> runs — Python doesn't check the
          rest once it finds a match, the same way <code>elif</code> chains stop at the first
          <code>True</code> condition.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>The given code looks up <code>"sword"</code> in <code>prices</code> (which doesn't
          have that key) and would also crash with a <code>TypeError</code> if the lookup had
          succeeded. Add two <code>except</code> blocks: one for <code>KeyError</code> printing
          <code>"Item not found."</code>, one for <code>TypeError</code> printing
          <code>"Bad price."</code></p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>Stack multiple <code>except</code> blocks to handle different error types
          differently — Python runs whichever one matches first.</p>
        </div>
      `,
      starterCode: `prices = {"torch": 5}

try:
    cost = prices["sword"]
    total = cost * "oops"
    print(total)
# add except KeyError and except TypeError blocks here`,
      practice: {
        instructions: "Print exactly: Item not found.",
        solution: `prices = {"torch": 5}

try:
    cost = prices["sword"]
    total = cost * "oops"
    print(total)
except KeyError:
    print("Item not found.")
except TypeError:
    print("Bad price.")`,
        check(actualOutput) {
          const got = actualOutput.trim();
          if (got === "Item not found.") {
            return { pass: true, message: "Matched the KeyError to its own specific message." };
          }
          return { pass: false, message: 'Not quite — "sword" isn\'t in prices, so we want exactly "Item not found."' };
        },
      },
    },
    {
      id: "7.3",
      title: "Raising Your Own Exceptions",
      content: `
        <p>Python raises built-in errors automatically, but you can also raise your own with
        <code>raise</code> — useful for rejecting bad input on your own terms, with your own
        message.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>def set_health(hp):
    if hp < 0:
        raise ValueError("HP can't be negative")
    return hp

try:
    set_health(-5)
except ValueError as e:
    print(f"Rejected: {e}")</code></pre>
          <p>Output: <code>Rejected: HP can't be negative</code>. <code>raise</code> stops the
          function immediately and hands control to the nearest matching <code>except</code> —
          <code>as e</code> captures the error so you can read its message.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>an unhandled <code>raise</code> — one with no surrounding <code>try</code>/<code>except</code>
          anywhere that calls it — crashes the program exactly like a built-in error would.
          Raising only helps if something's actually catching it.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Write <code>set_gold(amount)</code> that raises <code>ValueError("Gold can't be
          negative")</code> if <code>amount</code> is negative, otherwise returns it. Call it with
          <code>-10</code> inside a <code>try</code>/<code>except</code> that prints
          <code>f"Rejected: {e}"</code>.</p>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>raise SomeError("message")</code> rejects bad input on your own terms —
          catch it the same way you'd catch any built-in error.</p>
        </div>
      `,
      starterCode: `def set_gold(amount):
    # raise ValueError("Gold can't be negative") if amount < 0
    return amount

try:
    set_gold(-10)
except ValueError as e:
    print(f"Rejected: {e}")`,
      practice: {
        instructions: "Print exactly: Rejected: Gold can't be negative",
        solution: `def set_gold(amount):
    if amount < 0:
        raise ValueError("Gold can't be negative")
    return amount

try:
    set_gold(-10)
except ValueError as e:
    print(f"Rejected: {e}")`,
        check(actualOutput) {
          const got = actualOutput.trim();
          if (got === "Rejected: Gold can't be negative") {
            return { pass: true, message: "Raised your own error with your own message, and caught it." };
          }
          return { pass: false, message: `Not quite — we want exactly "Rejected: Gold can't be negative".` };
        },
      },
    },
    {
      id: "7.4",
      title: "Chapter 7 Wrap-Up",
      content: `
        <p><code>try</code>/<code>except</code> catches failures instead of crashing, multiple
        <code>except</code> blocks handle different problems differently, and <code>raise</code>
        lets you reject bad input on your own terms. Time to make the whole game this sturdy.</p>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>Chapter 7 complete. Next: bulletproof everything you've built so far.</p>
        </div>
      `,
      starterCode: `# Nothing to fix here — press Next for the Project.
print("Chapter 7 complete!")`,
      practice: null,
    },
  ],
  project: {
    title: "Bulletproofing",
    content: `
      <p><strong>The Challenge:</strong> no new commands this time — make the existing ones
      survive bad input instead of crashing. An empty command, an unknown item, garbage typed at
      any prompt: all of it should get a friendly message, never a crash.</p>
      <div class="lesson-recap">
        <span class="lesson-label">What You'll Use</span>
        <ul>
          <li><code>try</code>/<code>except</code>, to catch anything that could still slip
          through (this chapter)</li>
          <li>Everything from Chapter 6's inventory system</li>
        </ul>
      </div>
      <div class="lesson-turn">
        <span class="lesson-label">Step-By-Step</span>
        <ol>
          <li>The starter code is your Chapter 6 game, with one deliberately fragile spot: typing
          just <code>go</code> with no direction, or an empty command, is already handled — but
          try breaking it further first. Type nothing at all, or a command with extra spaces.</li>
          <li>The whole command loop is now wrapped in a <code>try</code>/<code>except
          Exception</code> — a broad catch-all specifically because this is the outermost safety
          net of the whole program: whatever goes wrong, print a message and keep the loop going,
          rather than let one bad turn crash the entire session.</li>
          <li>Run it and genuinely try to break it — empty input, weird spacing, unknown commands,
          nonsense directions. Nothing should crash the program.</li>
        </ol>
      </div>
      <div class="lesson-tip">
        <span class="lesson-label">Watch Out For</span>
        <p>this is the one place in the whole course where a broad <code>except Exception</code>
        is the right call, not a bare <code>except</code> — it still names <em>which</em> broad
        category it's catching, and it's specifically because this loop is the last line of
        defense for the entire program, not because naming specific errors doesn't matter
        elsewhere (it still does, as Chapter 7.2 showed).</p>
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
    verb = words[0].lower() if len(words) > 0 else ""
    argument = words[1].lower() if len(words) > 1 else None
    return verb, argument


print("You are standing at the entrance of a small cave.")
print("Type 'help' to see what you can do.")

while True:
    try:
        command = input("> ")
        verb, argument = parse_command(command)

        if verb == "":
            print("Type something! Try 'help'.")
        elif verb == "look":
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
            print("I don't understand that command.")
    except Exception as e:
        print(f"Something went wrong, but the game keeps running: {e}")`,
  },
};
