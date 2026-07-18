import { chapter } from "../content/chapters/chapter1.js";
import { fetchProgress, markLessonComplete } from "./progress.js";

const lessonStepLabel = document.getElementById("lesson-step-label");
const lessonContent = document.getElementById("lesson-content");
const practiceBox = document.getElementById("practice-box");
const practiceInstructions = document.getElementById("practice-instructions");
const practiceFeedback = document.getElementById("practice-feedback");
const codeInput = document.getElementById("code-input");
const outputContent = document.getElementById("output-content");
const errorsPane = document.getElementById("errors-pane");
const errorsContent = document.getElementById("errors-content");
const runBtn = document.getElementById("run-btn");
const checkBtn = document.getElementById("check-btn");
const prevBtn = document.getElementById("prev-lesson-btn");
const nextBtn = document.getElementById("next-lesson-btn");
const lessonTitle = document.getElementById("lesson-title");

let pyodide = null;
let currentIndex = 0;
let lastOutput = "";
let currentProfile = null;
let completedLessons = new Set(); // 1-based lesson numbers completed by currentProfile in this chapter

function renderLesson() {
  const lesson = chapter.lessons[currentIndex];
  const lessonNumber = currentIndex + 1;

  lessonTitle.textContent = `Chapter ${chapter.number}: ${chapter.title} — ${lesson.title}`;
  lessonStepLabel.textContent = `Lesson ${lesson.id}${completedLessons.has(lessonNumber) ? " ✓" : ""}`;
  lessonContent.innerHTML = lesson.content;
  codeInput.value = lesson.starterCode;
  outputContent.textContent = "";
  errorsContent.textContent = "";
  errorsPane.hidden = true;
  lastOutput = "";

  practiceFeedback.hidden = true;
  practiceFeedback.className = "practice-feedback";

  if (lesson.practice) {
    practiceBox.hidden = false;
    practiceInstructions.textContent = lesson.practice.instructions;
  } else {
    practiceBox.hidden = true;
  }

  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === chapter.lessons.length - 1;
}

async function runCurrentCode() {
  if (!pyodide) return;

  runBtn.disabled = true;
  outputContent.textContent = "Running…";
  errorsContent.textContent = "";
  errorsPane.hidden = true;

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
      errorsPane.hidden = false;
    }
  } catch (err) {
    // Pyodide/JS-level failure (not a Python exception) — should be rare.
    lastOutput = "";
    outputContent.textContent = "(no output)";
    errorsContent.textContent = `Something went wrong running your code: ${err}`;
    errorsPane.hidden = false;
  } finally {
    runBtn.disabled = false;
  }
}

async function checkPractice() {
  const lesson = chapter.lessons[currentIndex];
  if (!lesson.practice) return;

  const result = lesson.practice.check(lastOutput);
  practiceFeedback.hidden = false;
  practiceFeedback.textContent = result.message;
  practiceFeedback.className = `practice-feedback ${result.pass ? "success" : "failure"}`;

  if (result.pass) {
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
    if (lessonNumber === currentIndex + 1) {
      lessonStepLabel.textContent = `Lesson ${chapter.lessons[currentIndex].id} ✓`;
    }
  } catch (err) {
    // Low-stakes: a failed progress save shouldn't interrupt the kid's flow.
    console.warn("Couldn't save progress:", err);
  }
}

runBtn.addEventListener("click", runCurrentCode);
checkBtn.addEventListener("click", checkPractice);
prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex -= 1;
    renderLesson();
  }
});
nextBtn.addEventListener("click", async () => {
  if (currentIndex >= chapter.lessons.length - 1) return;

  const lesson = chapter.lessons[currentIndex];
  if (!lesson.practice) {
    await recordCompletion(currentIndex + 1);
  }

  currentIndex += 1;
  renderLesson();
});

export async function startApp(profile) {
  currentProfile = profile;

  try {
    const rows = await fetchProgress(currentProfile.id, chapter.number);
    completedLessons = new Set(rows.map((row) => row.lesson_number));
  } catch (err) {
    console.warn("Couldn't load progress:", err);
    completedLessons = new Set();
  }

  renderLesson();
  outputContent.textContent = "Loading Python (first load only takes a few seconds)…";
  runBtn.disabled = true;

  pyodide = await loadPyodide();

  outputContent.textContent = "Ready! Press Run to try the code.";
  runBtn.disabled = false;
}
