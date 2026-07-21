import { chapters } from "../curriculum/python/chapters/index.js";
import { fetchProgress, markLessonComplete, markProjectDone } from "./progress.js";
import { getErrorHint } from "./errorHints.js";

const WELCOME = "welcome"; // currentIndex sentinel for the chapter welcome page
const PROJECT = "project"; // currentIndex sentinel for the chapter's end-of-chapter Project

const lessonStepLabel = document.getElementById("lesson-step-label");
const lessonContent = document.getElementById("lesson-content");
const practiceBox = document.getElementById("practice-box");
const practiceInstructions = document.getElementById("practice-instructions");
const projectBox = document.getElementById("project-box");
const projectDoneBtn = document.getElementById("project-done-btn");
const practiceFeedback = document.getElementById("practice-feedback");
const practiceFeedbackText = document.getElementById("practice-feedback-text");
const practiceFeedbackActions = document.getElementById("practice-feedback-actions");
const codeInput = document.getElementById("code-input");
const outputContent = document.getElementById("output-content");
const errorsPane = document.getElementById("errors-pane");
const errorsContent = document.getElementById("errors-content");
const errorHintText = document.getElementById("error-hint-text");
const errorHintActions = document.getElementById("error-hint-actions");
const helpBtn = document.getElementById("help-btn");
const resetBtn = document.getElementById("reset-btn");
const helpBtnError = document.getElementById("help-btn-error");
const resetBtnError = document.getElementById("reset-btn-error");
const runBtn = document.getElementById("run-btn");
const prevBtn = document.getElementById("prev-lesson-btn");
const nextBtn = document.getElementById("next-lesson-btn");
const lessonSelect = document.getElementById("lesson-select");
const lessonTitle = document.getElementById("lesson-title");

let pyodide = null;
let currentChapterIndex = 0; // index into `chapters`
let chapter = chapters[0];
let currentIndex = WELCOME; // WELCOME, or a 0-based index into chapter.lessons
let lastOutput = "";
let currentProfile = null;
let completedByChapter = new Map(); // chapter.number -> Set of 1-based completed lesson numbers
let completedLessons = new Set(); // same Set as completedByChapter.get(chapter.number), for the active chapter
let projectDoneByChapter = new Map(); // chapter.number -> true, once the kid has self-marked its Project done
let projectRanCleanly = false; // whether the current Project's code has run with no error since last entering this page
let preHelpCode = null; // snapshot of code-input right before Help overwrote it, or null if unused

// The active lesson object, or null on the Welcome/Project pages where
// `chapter.lessons[currentIndex]` wouldn't make sense.
function currentLesson() {
  if (currentIndex === WELCOME || currentIndex === PROJECT) return null;
  return chapter.lessons[currentIndex];
}

function completedFor(chapterMeta) {
  if (!completedByChapter.has(chapterMeta.number)) {
    completedByChapter.set(chapterMeta.number, new Set());
  }
  return completedByChapter.get(chapterMeta.number);
}

// A chapter counts as done once every lesson is complete and — if it has a
// Project — the kid has self-marked that Project done too (see the "Parent
// gate" principle in CLAUDE.md: Projects aren't auto-graded, and this is
// deliberately kid-driven, not a parent approval step).
function isChapterDone(chapterMeta) {
  const lessonsDone = completedFor(chapterMeta).size >= chapterMeta.lessons.length;
  const projectDone = !chapterMeta.project || projectDoneByChapter.get(chapterMeta.number);
  return lessonsDone && projectDone;
}

// A chapter is locked until the chapter before it is done. The first
// chapter is always unlocked.
function isChapterLocked(chapterIdx) {
  if (chapterIdx === 0) return false;
  return !isChapterDone(chapters[chapterIdx - 1]);
}

// A lesson is locked until the lesson before it is completed. The first
// lesson (index 0) is always unlocked; the welcome page is always unlocked.
function isLessonLocked(index) {
  return index > 0 && !completedLessons.has(index);
}

function switchToChapter(chapterIdx) {
  currentChapterIndex = chapterIdx;
  chapter = chapters[chapterIdx];
  completedLessons = completedFor(chapter);
}

function renderLesson() {
  if (currentIndex === WELCOME) {
    renderWelcome();
    return;
  }
  if (currentIndex === PROJECT) {
    renderProject();
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
  projectBox.hidden = true;

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
  // there's nothing to block here even at the last lesson of a chapter —
  // the click handler itself decides whether that press also completes the
  // lesson and/or crosses into the next chapter (a no-op if there's nowhere
  // to go yet, e.g. the last chapter the app knows about).
  nextBtn.disabled = Boolean(lesson.practice) && !completedLessons.has(lessonNumber);
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
  projectBox.hidden = true;

  prevBtn.disabled = true;
  nextBtn.disabled = false;
}

function renderProject() {
  const project = chapter.project;

  lessonTitle.textContent = `Chapter ${chapter.number}: ${chapter.title} — Project: ${project.title}`;
  renderLessonSelect();
  lessonContent.innerHTML = project.content;
  codeInput.value = project.starterCode;
  outputContent.textContent = "";
  errorsContent.textContent = "";
  errorsPane.hidden = true;
  lastOutput = "";
  resetHelpState();

  practiceFeedback.hidden = true;
  practiceFeedback.className = "practice-feedback";
  practiceFeedbackActions.hidden = true;
  practiceBox.hidden = true;

  projectBox.hidden = false;
  // Require a fresh clean run each time the Project page is (re)entered —
  // encourages actually running the code again, not just remembering an
  // old run from before an edit.
  projectRanCleanly = false;
  updateProjectDoneButton();

  prevBtn.disabled = false; // Prev goes back to the chapter's last lesson
}

// Keeps the "I showed someone!" button and its label in sync with whether
// this chapter's Project is already done, and whether the code has run
// cleanly (no error) since the Project page was last entered.
function updateProjectDoneButton() {
  const done = Boolean(projectDoneByChapter.get(chapter.number));
  lessonStepLabel.textContent = `Project${done ? " ✓" : ""}`;
  projectDoneBtn.disabled = done || !projectRanCleanly;
  projectDoneBtn.textContent = done ? "Chapter Complete ✓" : "I showed someone! ✓";
  // Next only crosses into the next chapter once this Project is done —
  // that's the whole point of the (kid-driven) gate.
  nextBtn.disabled = !done || currentChapterIndex + 1 >= chapters.length;
}

function renderLessonSelect() {
  lessonSelect.innerHTML = "";

  chapters.forEach((chapterMeta, chapterIdx) => {
    const locked = isChapterLocked(chapterIdx);
    const chCompleted = completedFor(chapterMeta);

    const group = document.createElement("optgroup");
    group.label = `Chapter ${chapterMeta.number}: ${chapterMeta.title}${locked ? " 🔒" : ""}`;
    group.disabled = locked;

    const welcomeOption = document.createElement("option");
    welcomeOption.value = `${chapterIdx}:${WELCOME}`;
    welcomeOption.textContent = "Welcome";
    group.appendChild(welcomeOption);

    chapterMeta.lessons.forEach((lesson, i) => {
      const option = document.createElement("option");
      option.value = `${chapterIdx}:${i}`;
      const lessonLocked = locked || (i > 0 && !chCompleted.has(i));
      const doneMark = chCompleted.has(i + 1) ? " ✓" : "";
      option.textContent = `    ${lesson.id} — ${lesson.title}${doneMark}${lessonLocked ? " 🔒" : ""}`;
      option.disabled = lessonLocked;
      group.appendChild(option);
    });

    if (chapterMeta.project) {
      const projectOption = document.createElement("option");
      projectOption.value = `${chapterIdx}:${PROJECT}`;
      const allLessonsDone = chCompleted.size >= chapterMeta.lessons.length;
      const projectLocked = locked || !allLessonsDone;
      const projectDone = projectDoneByChapter.get(chapterMeta.number);
      projectOption.textContent = `    Project: ${chapterMeta.project.title}${projectDone ? " ✓" : ""}${projectLocked ? " 🔒" : ""}`;
      projectOption.disabled = projectLocked;
      group.appendChild(projectOption);
    }

    lessonSelect.appendChild(group);
  });

  lessonSelect.value = `${currentChapterIndex}:${currentIndex}`;
}

async function runCurrentCode() {
  if (!pyodide) return;

  runBtn.disabled = true;
  outputContent.textContent = "Running…";
  errorsContent.textContent = "";
  errorHintText.textContent = "";
  errorsPane.hidden = true;
  errorHintActions.hidden = true;
  practiceFeedback.hidden = true;
  practiceFeedback.className = "practice-feedback";
  practiceFeedbackActions.hidden = true;

  try {
    pyodide.globals.set("__user_code", codeInput.value);
    await pyodide.runPythonAsync(`
import io, contextlib

def _browser_input(prompt=""):
    answer = _browser_prompt(prompt)
    if answer is None:
        raise EOFError("EOF when reading a line")
    return answer

_buf = io.StringIO()
_error = None
try:
    with contextlib.redirect_stdout(_buf):
        exec(__user_code, {"input": _browser_input})
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
      // An error means there's no output to show pass/fail feedback next to,
      // so put Help/Reset here instead — otherwise a lesson that errors out
      // (e.g. a SyntaxError) leaves a stuck kid with no way to get help.
      const lesson = currentLesson();
      errorHintActions.hidden = !(lesson && lesson.practice && lesson.practice.solution);
    } else {
      // Every successful run doubles as a practice check when the lesson
      // has one — not graded/punitive, just tells the kid whether this run
      // matched what was expected. They can keep re-running freely.
      await checkPractice();
    }

    if (currentIndex === PROJECT) {
      projectRanCleanly = !error;
      updateProjectDoneButton();
    }
  } catch (err) {
    // Pyodide/JS-level failure (not a Python exception) — should be rare.
    lastOutput = "";
    outputContent.textContent = "(no output)";
    errorsContent.textContent = `Something went wrong running your code: ${err}`;
    errorHintText.textContent = getErrorHint(String(err));
    errorsPane.hidden = false;
    const lesson = currentLesson();
    errorHintActions.hidden = !(lesson && lesson.practice && lesson.practice.solution);
    if (currentIndex === PROJECT) {
      projectRanCleanly = false;
      updateProjectDoneButton();
    }
  } finally {
    runBtn.disabled = false;
  }
}

function resetHelpState() {
  preHelpCode = null;
  resetBtn.disabled = true;
  resetBtnError.disabled = true;
  errorHintActions.hidden = true;
}

async function checkPractice() {
  if (currentIndex === WELCOME || currentIndex === PROJECT) return;

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
      nextBtn.disabled = false;
    }
  } catch (err) {
    // Low-stakes: a failed progress save shouldn't interrupt the kid's flow.
    console.warn("Couldn't save progress:", err);
  }
}

function applyHelp() {
  const lesson = currentLesson();
  if (!lesson || !lesson.practice || !lesson.practice.solution) return;

  // Only snapshot the first time Help is pressed for this lesson, so a
  // second press doesn't overwrite the snapshot with the already-helped
  // code (which would make Reset a no-op).
  if (preHelpCode === null) {
    preHelpCode = codeInput.value;
    resetBtn.disabled = false;
    resetBtnError.disabled = false;
  }
  codeInput.value = lesson.practice.solution;
}

function applyReset() {
  if (preHelpCode === null) return;
  codeInput.value = preHelpCode;
  resetHelpState();
}

runBtn.addEventListener("click", runCurrentCode);
helpBtn.addEventListener("click", applyHelp);
helpBtnError.addEventListener("click", applyHelp);
resetBtn.addEventListener("click", applyReset);
resetBtnError.addEventListener("click", applyReset);
prevBtn.addEventListener("click", () => {
  if (currentIndex === WELCOME) return;
  if (currentIndex === PROJECT) {
    currentIndex = chapter.lessons.length - 1;
    renderLesson();
    return;
  }
  currentIndex = currentIndex === 0 ? WELCOME : currentIndex - 1;
  renderLesson();
});
nextBtn.addEventListener("click", async () => {
  if (currentIndex === WELCOME) {
    currentIndex = 0;
    renderLesson();
    return;
  }

  // From the Project page (or a project-less chapter's last lesson once
  // done), advance into the next chapter's Welcome, if it exists and is
  // unlocked. A no-op otherwise — e.g. the Project isn't marked done yet, or
  // this is the last chapter the app knows about.
  const advanceToNextChapter = () => {
    const nextChapterIdx = currentChapterIndex + 1;
    if (nextChapterIdx < chapters.length && !isChapterLocked(nextChapterIdx)) {
      switchToChapter(nextChapterIdx);
      currentIndex = WELCOME;
      renderLesson();
    }
  };

  if (currentIndex === PROJECT) {
    advanceToNextChapter();
    return;
  }

  const lesson = chapter.lessons[currentIndex];
  if (!lesson.practice) {
    await recordCompletion(currentIndex + 1);
  }

  if (currentIndex >= chapter.lessons.length - 1) {
    if (chapter.project) {
      currentIndex = PROJECT;
      renderLesson();
      return;
    }
    advanceToNextChapter();
    return;
  }

  currentIndex += 1;
  renderLesson();
});
lessonSelect.addEventListener("change", () => {
  const [chapterIdxStr, sel] = lessonSelect.value.split(":");
  const chapterIdx = Number(chapterIdxStr);

  if (isChapterLocked(chapterIdx)) {
    // Shouldn't be reachable since locked optgroups are disabled, but guard
    // against it anyway rather than silently jumping ahead.
    renderLessonSelect();
    return;
  }

  switchToChapter(chapterIdx);

  if (sel === WELCOME) {
    currentIndex = WELCOME;
    renderLesson();
    return;
  }

  if (sel === PROJECT) {
    const allLessonsDone = completedLessons.size >= chapter.lessons.length;
    if (!chapter.project || !allLessonsDone) {
      // Shouldn't be reachable since a locked Project option is disabled,
      // but guard against it anyway rather than silently jumping ahead.
      renderLessonSelect();
      return;
    }
    currentIndex = PROJECT;
    renderLesson();
    return;
  }

  const index = Number(sel);
  if (isLessonLocked(index)) {
    renderLessonSelect();
    return;
  }

  currentIndex = index;
  renderLesson();
});
projectDoneBtn.addEventListener("click", async () => {
  if (currentIndex !== PROJECT || !projectRanCleanly) return;
  try {
    await markProjectDone({ profileId: currentProfile.id, chapterNumber: chapter.number });
    projectDoneByChapter.set(chapter.number, true);
    updateProjectDoneButton();
    renderLessonSelect();
  } catch (err) {
    // Low-stakes: a failed save shouldn't block the kid from moving on;
    // they can just click again.
    console.warn("Couldn't save project completion:", err);
  }
});

export async function startApp(profile) {
  currentProfile = profile;
  lessonTitle.hidden = false;
  lessonSelect.hidden = false;

  completedByChapter = new Map();
  projectDoneByChapter = new Map();
  try {
    const rows = await fetchProgress(currentProfile.id);
    rows.forEach((row) => {
      // A null lesson_number is a chapter-level Project checkpoint row, not
      // a lesson (see the progress table's own comment).
      if (row.lesson_number === null) {
        if (row.completed_at) {
          projectDoneByChapter.set(row.chapter_number, true);
        }
        return;
      }
      completedFor({ number: row.chapter_number }).add(row.lesson_number);
    });
  } catch (err) {
    console.warn("Couldn't load progress:", err);
  }

  // Resume at the first chapter that isn't fully complete, defaulting to
  // the last chapter if everything the app knows about is done.
  const resumeChapterIndex = chapters.findIndex((chapterMeta) => !isChapterDone(chapterMeta));
  switchToChapter(resumeChapterIndex === -1 ? chapters.length - 1 : resumeChapterIndex);

  if (completedLessons.size === 0) {
    currentIndex = WELCOME;
  } else {
    // Resume at the first not-yet-completed lesson, rather than always
    // restarting at lesson 1 regardless of prior progress. If every lesson
    // is done, resume at the Project (if this chapter has one).
    const resumeIndex = chapter.lessons.findIndex((_, i) => !completedLessons.has(i + 1));
    if (resumeIndex !== -1) {
      currentIndex = resumeIndex;
    } else {
      currentIndex = chapter.project ? PROJECT : chapter.lessons.length - 1;
    }
  }

  renderLesson();
  outputContent.textContent = "Loading Python (first load only takes a few seconds)…";
  runBtn.disabled = true;

  pyodide = await loadPyodide();
  // input() has no stdin to read from otherwise (it'd throw an OSError).
  // Bridge it to the browser's native prompt() instead — runCurrentCode
  // shadows the input() builtin with a wrapper that calls this, passing the
  // prompt text straight into the dialog rather than letting it leak into
  // the captured Output (which is what Python's own input() would do).
  pyodide.globals.set("_browser_prompt", (promptText) => window.prompt(promptText));

  outputContent.textContent = "Ready! Press Run to try the code.";
  runBtn.disabled = false;
}
