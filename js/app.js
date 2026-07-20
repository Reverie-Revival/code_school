import { chapter } from "../curriculum/python/chapters/chapter1.js";
import { fetchProgress, markLessonComplete } from "./progress.js";
import { getErrorHint } from "./errorHints.js";

const WELCOME = "welcome"; // currentIndex sentinel for the chapter welcome page

const lessonStepLabel = document.getElementById("lesson-step-label");
const lessonContent = document.getElementById("lesson-content");
const practiceBox = document.getElementById("practice-box");
const practiceInstructions = document.getElementById("practice-instructions");
const practiceFeedback = document.getElementById("practice-feedback");
const practiceFeedbackText = document.getElementById("practice-feedback-text");
const practiceFeedbackActions = document.getElementById("practice-feedback-actions");
const codeInput = document.getElementById("code-input");
const outputContent = document.getElementById("output-content");
const errorsPane = document.getElementById("errors-pane");
const errorsContent = document.getElementById("errors-content");
const errorHintText = document.getElementById("error-hint-text");
const helpBtn = document.getElementById("help-btn");
const resetBtn = document.getElementById("reset-btn");
const runBtn = document.getElementById("run-btn");
const prevBtn = document.getElementById("prev-lesson-btn");
const nextBtn = document.getElementById("next-lesson-btn");
const lessonSelect = document.getElementById("lesson-select");
const lessonTitle = document.getElementById("lesson-title");

let pyodide = null;
let currentIndex = WELCOME; // WELCOME, or a 0-based index into chapter.lessons
let lastOutput = "";
let currentProfile = null;
let completedLessons = new Set(); // 1-based lesson numbers completed by currentProfile in this chapter
let preHelpCode = null; // snapshot of code-input right before Help overwrote it, or null if unused

// A lesson is locked until the lesson before it is completed. The first
// lesson (index 0) is always unlocked; the welcome page is always unlocked.
function isLessonLocked(index) {
  return index > 0 && !completedLessons.has(index);
}

function renderLesson() {
  if (currentIndex === WELCOME) {
    renderWelcome();
    return;
  }

  const lesson = chapter.lessons[currentIndex];
  const lessonNumber = currentIndex + 1;

  lessonTitle.textContent = `Chapter ${chapter.number}: ${chapter.title} — ${lesson.title}`;
  lessonStepLabel.textContent = `Lesson ${lesson.id}${completedLessons.has(lessonNumber) ? " ✓" : ""}`;
  renderLessonSelect();
  lessonContent.innerHTML = lesson.content;
  codeInput.value = lesson.starterCode;
  outputContent.textContent = "";
  errorsContent.textContent = "";
  errorsPane.hidden = true;
  lastOutput = "";
  resetHelpState();

  practiceFeedback.hidden = true;
  practiceFeedback.className = "practice-feedback";
  practiceFeedbackActions.hidden = true;

  if (lesson.practice) {
    practiceBox.hidden = false;
    practiceInstructions.textContent = lesson.practice.instructions;
  } else {
    practiceBox.hidden = true;
  }

  prevBtn.disabled = false; // Prev from lesson 0 goes back to Welcome, so never disabled here
  // Next is blocked on a practice lesson until its check has passed - the
  // lock a kid would hit is exactly "finish this one first." Lessons
  // without practice complete themselves the moment Next is pressed, so
  // there's nothing to block.
  nextBtn.disabled =
    currentIndex === chapter.lessons.length - 1 ||
    (Boolean(lesson.practice) && !completedLessons.has(lessonNumber));
}

function renderWelcome() {
  lessonTitle.textContent = `Chapter ${chapter.number}: ${chapter.title} — Welcome`;
  lessonStepLabel.textContent = "Welcome";
  renderLessonSelect();
  lessonContent.innerHTML = chapter.welcome.content;
  codeInput.value = "# Pick a lesson above (or press Next) to start writing code!";
  outputContent.textContent = "";
  errorsContent.textContent = "";
  errorsPane.hidden = true;
  lastOutput = "";
  resetHelpState();

  practiceFeedback.hidden = true;
  practiceFeedback.className = "practice-feedback";
  practiceFeedbackActions.hidden = true;
  practiceBox.hidden = true;

  prevBtn.disabled = true;
  nextBtn.disabled = false;
}

function renderLessonSelect() {
  lessonSelect.innerHTML = "";

  // The chapter's own name doubles as the selectable entry for its welcome
  // page — no separate "Welcome" item. Lessons are visually nested under it
  // with a leading indent (a plain <select> has no real hierarchy to lean on).
  const chapterOption = document.createElement("option");
  chapterOption.value = WELCOME;
  chapterOption.textContent = `Chapter ${chapter.number}: ${chapter.title}`;
  lessonSelect.appendChild(chapterOption);

  chapter.lessons.forEach((lesson, i) => {
    const option = document.createElement("option");
    option.value = String(i);
    const locked = isLessonLocked(i);
    const doneMark = completedLessons.has(i + 1) ? " ✓" : "";
    option.textContent = `    ${lesson.id} — ${lesson.title}${doneMark}${locked ? " 🔒" : ""}`;
    option.disabled = locked;
    lessonSelect.appendChild(option);
  });

  lessonSelect.value = currentIndex === WELCOME ? WELCOME : String(currentIndex);
}

async function runCurrentCode() {
  if (!pyodide) return;

  runBtn.disabled = true;
  outputContent.textContent = "Running…";
  errorsContent.textContent = "";
  errorHintText.textContent = "";
  errorsPane.hidden = true;
  practiceFeedback.hidden = true;
  practiceFeedback.className = "practice-feedback";
  practiceFeedbackActions.hidden = true;

  try {
    pyodide.globals.set("__user_code", codeInput.value);
    await pyodide.runPythonAsync(`
import io, contextlib

_buf = io.StringIO()
_error = None
try:
    with contextlib.redirect_stdout(_buf):
        exec(__user_code, {})
except Exception as e:
    _error = f"{type(e).__name__}: {e}"
_output = _buf.getvalue()
`);
    const output = pyodide.globals.get("_output");
    const error = pyodide.globals.get("_error");

    lastOutput = output;
    outputContent.textContent = output || "(no output)";

    if (error) {
      errorsContent.textContent = error;
      errorHintText.textContent = getErrorHint(error);
      errorsPane.hidden = false;
    } else {
      // Every successful run doubles as a practice check when the lesson
      // has one — not graded/punitive, just tells the kid whether this run
      // matched what was expected. They can keep re-running freely.
      await checkPractice();
    }
  } catch (err) {
    // Pyodide/JS-level failure (not a Python exception) — should be rare.
    lastOutput = "";
    outputContent.textContent = "(no output)";
    errorsContent.textContent = `Something went wrong running your code: ${err}`;
    errorHintText.textContent = getErrorHint(String(err));
    errorsPane.hidden = false;
  } finally {
    runBtn.disabled = false;
  }
}

function resetHelpState() {
  preHelpCode = null;
  resetBtn.disabled = true;
}

async function checkPractice() {
  if (currentIndex === WELCOME) return;

  const lesson = chapter.lessons[currentIndex];
  if (!lesson.practice) return;

  const result = lesson.practice.check(lastOutput);
  practiceFeedback.hidden = false;
  practiceFeedbackText.textContent = result.message;
  practiceFeedback.className = `practice-feedback ${result.pass ? "success" : "failure"}`;

  // Help/Reset only make sense on a failed attempt, and only when this
  // lesson has a known-correct solution to offer.
  practiceFeedbackActions.hidden = result.pass || !lesson.practice.solution;

  if (result.pass) {
    resetHelpState();
    await recordCompletion(currentIndex + 1);
  }
}

async function recordCompletion(lessonNumber) {
  if (completedLessons.has(lessonNumber)) return;

  try {
    await markLessonComplete({
      profileId: currentProfile.id,
      chapterNumber: chapter.number,
      lessonNumber,
    });
    completedLessons.add(lessonNumber);
    if (currentIndex !== WELCOME && lessonNumber === currentIndex + 1) {
      lessonStepLabel.textContent = `Lesson ${chapter.lessons[currentIndex].id} ✓`;
      renderLessonSelect();
      nextBtn.disabled = currentIndex === chapter.lessons.length - 1;
    }
  } catch (err) {
    // Low-stakes: a failed progress save shouldn't interrupt the kid's flow.
    console.warn("Couldn't save progress:", err);
  }
}

runBtn.addEventListener("click", runCurrentCode);
helpBtn.addEventListener("click", () => {
  if (currentIndex === WELCOME) return;
  const lesson = chapter.lessons[currentIndex];
  if (!lesson.practice || !lesson.practice.solution) return;

  // Only snapshot the first time Help is pressed for this lesson, so a
  // second press doesn't overwrite the snapshot with the already-helped
  // code (which would make Reset a no-op).
  if (preHelpCode === null) {
    preHelpCode = codeInput.value;
    resetBtn.disabled = false;
  }
  codeInput.value = lesson.practice.solution;
});
resetBtn.addEventListener("click", () => {
  if (preHelpCode === null) return;
  codeInput.value = preHelpCode;
  resetHelpState();
});
prevBtn.addEventListener("click", () => {
  if (currentIndex === WELCOME) return;
  currentIndex = currentIndex === 0 ? WELCOME : currentIndex - 1;
  renderLesson();
});
nextBtn.addEventListener("click", async () => {
  if (currentIndex === WELCOME) {
    currentIndex = 0;
    renderLesson();
    return;
  }
  if (currentIndex >= chapter.lessons.length - 1) return;

  const lesson = chapter.lessons[currentIndex];
  if (!lesson.practice) {
    await recordCompletion(currentIndex + 1);
  }

  currentIndex += 1;
  renderLesson();
});
lessonSelect.addEventListener("change", () => {
  if (lessonSelect.value === WELCOME) {
    currentIndex = WELCOME;
    renderLesson();
    return;
  }

  const index = Number(lessonSelect.value);
  if (isLessonLocked(index)) {
    // Shouldn't be reachable since locked options are disabled, but guard
    // against it anyway rather than silently jumping ahead.
    renderLessonSelect();
    return;
  }

  currentIndex = index;
  renderLesson();
});

export async function startApp(profile) {
  currentProfile = profile;
  lessonTitle.hidden = false;
  lessonSelect.hidden = false;

  try {
    const rows = await fetchProgress(currentProfile.id, chapter.number);
    completedLessons = new Set(rows.map((row) => row.lesson_number));
  } catch (err) {
    console.warn("Couldn't load progress:", err);
    completedLessons = new Set();
  }

  if (completedLessons.size === 0) {
    currentIndex = WELCOME;
  } else {
    // Resume at the first not-yet-completed lesson, rather than always
    // restarting at 1.1 regardless of prior progress.
    const resumeIndex = chapter.lessons.findIndex((_, i) => !completedLessons.has(i + 1));
    currentIndex = resumeIndex === -1 ? chapter.lessons.length - 1 : resumeIndex;
  }

  renderLesson();
  outputContent.textContent = "Loading Python (first load only takes a few seconds)…";
  runBtn.disabled = true;

  pyodide = await loadPyodide();

  outputContent.textContent = "Ready! Press Run to try the code.";
  runBtn.disabled = false;
}
