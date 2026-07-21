// Plain-English translations of common Python errors, shown alongside the
// raw traceback in the Errors panel. Matched against the "TypeName: message"
// string produced in app.js's runCurrentCode. Not lesson-specific — this is
// meant to generalize across every future chapter, not just Chapter 1.
const HINTS = [
  {
    match: /unterminated string literal/i,
    hint: "Looks like a quote is missing somewhere. Every string needs a matching pair of quotes — one to open it, one to close it.",
  },
  {
    match: /unexpected EOF|EOL while scanning/i,
    hint: "Python ran out of code before it expected to — usually a missing closing quote or parenthesis somewhere above.",
  },
  {
    match: /^SyntaxError/i,
    hint: "This is a SyntaxError — Python couldn't understand how your code is written. Check for a missing quote, parenthesis, or comma.",
  },
  {
    match: /^NameError/i,
    hint: "This is a NameError — Python doesn't recognize a word in your code. That's usually a typo, or forgetting quotes around a piece of text (so Python thinks it's a variable name instead of a string).",
  },
  {
    match: /^IndentationError/i,
    hint: "This is an IndentationError — the spacing at the start of a line doesn't match what Python expects. For now, your code should start at the very left with no extra spaces.",
  },
  {
    match: /^TypeError/i,
    hint: "This is a TypeError — you're combining things Python can't mix directly, like text and a number, without converting one first.",
  },
  {
    match: /^EOFError/i,
    hint: "This means the input box popped up and got closed (or Cancel got clicked) before anything was typed into it. Press Run again, and type an answer into the popup this time before pressing OK.",
  },
];

const FALLBACK_HINT =
  "Read the error message above slowly — it usually points at exactly what Python got stuck on. Compare your code closely to the example in the lesson.";

export function getErrorHint(errorText) {
  const hit = HINTS.find((h) => h.match.test(errorText));
  return hit ? hit.hint : FALLBACK_HINT;
}
