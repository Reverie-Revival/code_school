// Chapter 5 — Getting Input
// Content follows curriculum/python/template.md — see that file for the
// shape every Chapter Welcome / Lesson / Project should follow.
// Each lesson: { id, title, content (HTML string), starterCode, practice }
// practice.check(actualOutput) returns { pass: boolean, message: string }
//
// A note on checking input()-based practices: since the whole point of
// input() is that the output depends on whatever the kid types at runtime,
// these checks can't compare against one fixed string like earlier chapters
// did. Instead they check the *shape* of the output (a regex) and, where it
// matters, a relationship between the numbers/words in it — e.g. "is the
// second number exactly double the first" — rather than one exact answer.

export const chapter = {
  number: 5,
  title: "Getting Input",
  welcome: {
    content: `
      <p><strong>Chapter 5: Getting Input.</strong> Every program so far has done the exact same
      thing every time you ran it. This chapter changes that — you'll learn to ask the person
      running your program a question, and actually use whatever they type back.</p>

      <p><strong>Why this actually matters:</strong> think about any app that asks for your name,
      your age, or a search term — a login screen, a search bar, a game asking "what's your
      character's name?" None of those are hardcoded; the app is pausing, waiting for you to type
      something, and then using it. That's <code>input()</code> — the exact tool behind every one
      of those moments.</p>

      <p>By the end of this chapter, you'll build a real, interactive <strong>Pig Latin
      Translator</strong> — type in any word, and your program translates it on the spot.</p>

      <p>No clock here — take your time. Press <strong>Next</strong> or pick a lesson from the
      dropdown above whenever you're ready.</p>
    `,
  },
  lessons: [
    {
      id: "5.1",
      title: "Quick Recap: Chapters 1–4",
      content: `
        <p>Before diving into something new, a quick look back. So far you've learned:
        <code>print()</code> to show output (Chapter 1), variables to store and reuse values
        (Chapter 2), string skills like joining text, f-strings, and grabbing a character by index
        (Chapter 3), and doing real math with <code>+ - * /</code> (Chapter 4).</p>
        <p>Every one of those tools is about to get more useful, because this chapter adds the
        missing piece: getting information <em>from</em> the person running your program, instead
        of only ever using values you typed into the code yourself.</p>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>print, variables, strings, and math — four chapters of tools, all still in play as
          you head into Chapter 5.</p>
        </div>
      `,
      starterCode: `# Nothing to fix here — just press Next when you're ready to keep going.
print("Ready for Chapter 5!")`,
      practice: null,
    },
    {
      id: "5.2",
      title: "Asking the User a Question: input()",
      content: `
        <p><code>input()</code> pauses your program, shows a question (whatever text you put in
        its parentheses), and waits for the person running it to type an answer and press Enter.
        Whatever they typed comes back as the value of <code>input()</code> — usually you'll store
        it in a variable right away.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>color = input("What's your favorite color? ")
print("Nice, I like", color, "too!")</code></pre>
          <p>shows the question, waits for an answer, stores whatever was typed in
          <code>color</code>, then uses it in the very next line. If you'd typed
          <code>blue</code>, the output would be <code>Nice, I like blue too!</code></p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>the question text inside <code>input(...)</code> shows up in the popup box itself,
          not in the Output pane — the Output pane only shows what you actually
          <code>print()</code>. If you close the popup without typing anything, you'll get an
          error instead of an answer, since Python has nothing to work with.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Ask for the person's name with <code>input()</code>, store it in <code>name</code>,
          then print a greeting using it, so the output matches this shape exactly (with whatever
          name you typed in place of <code>&lt;name&gt;</code>):</p>
          <pre><code>Hello, &lt;name&gt;!</code></pre>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>input("question")</code> pauses your program, asks a question, and hands back
          whatever the person typed.</p>
        </div>
      `,
      starterCode: `name = input("What's your name? ")
print("fix me")`,
      practice: {
        instructions: 'Print a greeting using the name you asked for, shaped exactly like: Hello, <name>!',
        solution: `name = input("What's your name? ")
print(f"Hello, {name}!")`,
        check(actualOutput) {
          const got = actualOutput.trim();
          // No ^ anchor: input()'s own prompt text lands in this same output,
          // right before whatever gets printed afterward — match the greeting
          // wherever it ends up, not just at the very start of the string.
          const match = /Hello, (.+)!$/.exec(got);
          if (match && match[1].trim().length > 0) {
            return { pass: true, message: `Nice — you typed "${match[1]}" and Python greeted you right back.` };
          }
          return {
            pass: false,
            message: `We want the output shaped exactly like "Hello, <name>!" — check your f-string has the comma and exclamation point in the right spots.`,
          };
        },
      },
    },
    {
      id: "5.3",
      title: "Saving What They Typed",
      content: `
        <p>Once <code>input()</code>'s answer is stored in a variable, it behaves exactly like any
        other variable — you can print it, reuse it, or use it as many times as you want, not just
        once right after asking.</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>pet = input("What's your pet's name? ")
print("You picked:", pet)
print(pet, "is a great name!")</code></pre>
          <p><code>pet</code> only gets asked for once, but shows up in two separate
          <code>print()</code> lines afterward — that's the whole point of saving it in a
          variable instead of using <code>input()</code> again.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>calling <code>input()</code> a second time when you meant to reuse the first answer —
          that asks a brand new question and can overwrite what you already had, if you store it
          in the same variable.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Ask for a favorite animal with <code>input()</code>, store it in <code>animal</code>,
          then print these two lines using that same variable both times, matching this shape
          exactly (with your typed answer in place of <code>&lt;animal&gt;</code>):</p>
          <pre><code>You picked: &lt;animal&gt;
&lt;animal&gt; is a great choice!</code></pre>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p>a variable holding <code>input()</code>'s answer works exactly like any other
          variable — store it once, reuse it as many times as you need.</p>
        </div>
      `,
      starterCode: `animal = input("Favorite animal? ")
print("fix me")
print("fix me")`,
      practice: {
        instructions: "Print 'You picked: <animal>' then '<animal> is a great choice!' using the same variable both times.",
        solution: `animal = input("Favorite animal? ")
print(f"You picked: {animal}")
print(f"{animal} is a great choice!")`,
        check(actualOutput) {
          const got = actualOutput.trim();
          const lines = got.split("\n");
          if (lines.length !== 2) {
            return { pass: false, message: "We want exactly two lines of output — check you have two print() calls." };
          }
          // No ^ anchor on lines[0]: input()'s prompt text lands at the start
          // of this same line, right before "You picked: ...".
          const m1 = /You picked: (.+)$/.exec(lines[0]);
          const m2 = /^(.+) is a great choice!$/.exec(lines[1]);
          if (m1 && m2 && m1[1] === m2[1] && m1[1].trim().length > 0) {
            return { pass: true, message: `Same variable, used twice — exactly the idea. (You picked "${m1[1]}"!)` };
          }
          return {
            pass: false,
            message: `Not quite — line one should be "You picked: <animal>" and line two "<animal> is a great choice!", using the same animal both times.`,
          };
        },
      },
    },
    {
      id: "5.4",
      title: "The input() Gotcha: It's Always Text",
      content: `
        <p>Here's the catch: <code>input()</code> always hands back a <strong>string</strong> —
        even if the person types nothing but digits. If you want to do math with what they typed,
        you have to convert it first, using <code>int()</code> for whole numbers (or
        <code>float()</code> for decimals).</p>
        <div class="lesson-example">
          <span class="lesson-label">Example</span>
          <pre><code>age_text = input("How old are you? ")
age = int(age_text)
print("Next year you'll be", age + 1)</code></pre>
          <p><code>int(age_text)</code> converts the typed text into an actual number, stored in
          <code>age</code> — only after that conversion can <code>age + 1</code> work. Skip the
          <code>int()</code> and <code>age_text + 1</code> crashes with a <code>TypeError</code>,
          the same one you saw back in Chapter 4.4.</p>
        </div>
        <div class="lesson-tip">
          <span class="lesson-label">Watch Out For</span>
          <p>trying to do math directly on <code>input()</code>'s answer without converting it
          first — it's text until you explicitly say otherwise with <code>int()</code> or
          <code>float()</code>.</p>
        </div>
        <div class="lesson-turn">
          <span class="lesson-label">Your Turn</span>
          <p>Ask for a whole number with <code>input()</code>, convert it with <code>int()</code>,
          then print the number you entered and its double on two lines, matching this shape
          exactly (with your actual numbers in place of the placeholders):</p>
          <pre><code>You entered: &lt;number&gt;
Double that is: &lt;double&gt;</code></pre>
        </div>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>input()</code> always returns text — convert it with <code>int()</code> or
          <code>float()</code> before doing math on it.</p>
        </div>
      `,
      starterCode: `number_text = input("Type a whole number: ")
print("fix me")
print("fix me")`,
      practice: {
        instructions: "Convert the typed number with int(), then print it and its double, shaped exactly like: You entered: <number> / Double that is: <double>",
        solution: `number_text = input("Type a whole number: ")
number = int(number_text)
print(f"You entered: {number}")
print(f"Double that is: {number * 2}")`,
        check(actualOutput) {
          const got = actualOutput.trim();
          const lines = got.split("\n");
          if (lines.length !== 2) {
            return { pass: false, message: "We want exactly two lines of output — check you have two print() calls." };
          }
          // No ^ anchor on lines[0]: input()'s prompt text lands at the start
          // of this same line, right before "You entered: ...".
          const m1 = /You entered: (-?\d+)$/.exec(lines[0]);
          const m2 = /^Double that is: (-?\d+)$/.exec(lines[1]);
          if (m1 && m2 && Number(m2[1]) === Number(m1[1]) * 2) {
            return { pass: true, message: `That's it — ${m1[1]} converted with int(), then doubled with real math.` };
          }
          return {
            pass: false,
            message: `Not quite — check line one is "You entered: <number>", line two is "Double that is: <double>", and <double> is really double the first number.`,
          };
        },
      },
    },
    {
      id: "5.5",
      title: "Chapter 5 Wrap-Up",
      content: `
        <p>You can now ask a question with <code>input()</code>, save and reuse the answer, and
        convert it to a real number when you need to do math with it. That's everything you need
        to build something genuinely interactive.</p>
        <div class="lesson-recap">
          <span class="lesson-label">Recap</span>
          <p><code>input()</code> asks, variables remember, and <code>int()</code>/
          <code>float()</code> convert text into numbers — Chapter 5, complete! Up next: a real
          Pig Latin translator.</p>
        </div>
      `,
      starterCode: `# Nothing to fix here — just press Next when you're ready for the Project.
print("Chapter 5 complete!")`,
      practice: null,
    },
  ],
  project: {
    title: "Pig Latin Translator",
    content: `
      <p><strong>The Challenge:</strong> build a real Pig Latin translator — type in any word, and
      your program hands it back translated, on the spot. The rule you'll use is the simple
      version: take the first letter off the front, move it to the end, and add
      <code>"ay"</code>. (The playground version you might know has an extra rule for words that
      start with a vowel — you're skipping that on purpose for now, since branching between rules
      needs <code>if</code>/<code>else</code>, which is coming up in Chapter 7.)</p>
      <div class="lesson-recap">
        <span class="lesson-label">What You'll Use</span>
        <ul>
          <li><code>input()</code>, to get a word from the person playing (this chapter)</li>
          <li>Indexing, <code>word[0]</code>, to grab the first letter (Chapter 3.5)</li>
          <li>f-strings, to build the translated word (Chapter 3.2)</li>
        </ul>
      </div>
      <div class="lesson-turn">
        <span class="lesson-label">Step-By-Step</span>
        <p>One new trick you'll need: <code>word[1:]</code> (a colon inside the brackets) means
        "everything from index 1 to the end" — the whole word <em>except</em> the first letter.
        Same square-bracket idea as <code>word[0]</code>, just grabbing more than one character.</p>
        <ol>
          <li>Ask for a word with <code>input()</code>.</li>
          <li>Grab its first letter with <code>word[0]</code>.</li>
          <li>Grab everything <em>after</em> the first letter with <code>word[1:]</code>.</li>
          <li>Build the translated word: the rest of the word, then the first letter, then
          <code>"ay"</code>.</li>
          <li>Print it, then run your code again with a different word — that's the whole game,
          and it works on literally any word you type.</li>
        </ol>
      </div>
      <div class="lesson-tip">
        <span class="lesson-label">Watch Out For</span>
        <p>the order matters: it's <em>rest of the word</em> + <em>first letter</em> +
        <code>"ay"</code>, not the other way around. Run it and compare the output to what you
        expected if you're not sure.</p>
      </div>
    `,
    starterCode: `word = input("Type a word to translate: ")

first_letter = word[0]
rest_of_word = word[1:]  # everything except the first letter

pig_latin = rest_of_word + first_letter + "ay"
print(pig_latin)`,
  },
};
