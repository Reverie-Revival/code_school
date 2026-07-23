import { fetchProgress, markLessonComplete, markProjectDone } from "./progress.js";
import { fetchSavedCode, saveCode } from "./savedCode.js";
import { getErrorHint } from "./errorHints.js";
import { showCertificate } from "./certificate.js";

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
const courseCompleteModal = document.getElementById("course-complete-modal");

let pyodide = null;
let activeCourse = null; // the course object passed to startApp(); { id, chapters, ... }
let chapters = []; // activeCourse.chapters, kept as its own binding to match existing call sites
let currentChapterIndex = 0; // index into `chapters`
let chapter = null;
let currentIndex = WELCOME; // WELCOME, or a 0-based index into chapter.lessons
let lastOutput = "";
let currentProfile = null;
let completedByChapter = new Map(); // chapter.number -> Set of 1-based completed lesson numbers
let completedLessons = new Set(); // same Set as completedByChapter.get(chapter.number), for the active chapter
let projectDoneByChapter = new Map(); // chapter.number -> true, once the kid has self-marked its Project done
let projectRanCleanly = false; // whether the current Project's code has run with no error since last entering this page
let preHelpCode = null; // snapshot of code-input right before Help overwrote it, or null if unused
let savedCodeByKey = new Map(); // `${chapterNumber}:${lessonNumber ?? "project"}` -> last-saved code string
let saveCodeTimer = null; // debounce handle for saving as-you-type edits
let courseAlreadyComplete = false; // whether the active course was already 100% done as of startApp() -- guards the certificate from popping again on every visit after the first

// Storage key for the code currently on screen -- lessonNumber is 1-based
// (matching `progress`/`saved_code`'s convention), or null for a Project.
function savedCodeKey(chapterNumber, lessonNumber) {
  return `${chapterNumber}:${lessonNumber === null ? "project" : lessonNumber}`;
}

// The save key for whatever's currently on screen, or null on the Welcome
// page (its code box isn't editable, so there's nothing to save).
function currentSaveKey() {
  if (currentIndex === WELCOME) return null;
  return savedCodeKey(chapter.number, currentIndex === PROJECT ? null : currentIndex + 1);
}

// Debounced save, called as the kid types -- keeps writes off the network on
// every keystroke while still capturing edits fairly quickly.
function scheduleSaveCode() {
  if (!currentSaveKey()) return;
  clearTimeout(saveCodeTimer);
  saveCodeTimer = setTimeout(flushSaveCode, 800);
}

// Save immediately -- call before navigating away from a lesson/project so a
// debounce window in flight isn't lost. Returns the in-flight save promise
// (or undefined if there was nothing to save) so callers that are about to
// tear down the page (e.g. a reload) can await it first.
function flushSaveCode() {
  clearTimeout(saveCodeTimer);
  saveCodeTimer = null;
  const key = currentSaveKey();
  if (!key) return undefined;

  const code = codeInput.value;
  if (savedCodeByKey.get(key) === code) return undefined; // nothing changed since last save

  savedCodeByKey.set(key, code);
  const lessonNumber = currentIndex === PROJECT ? null : currentIndex + 1;
  return saveCode({ profileId: currentProfile.id, courseId: activeCourse.id, chapterNumber: chapter.number, lessonNumber, code }).catch((err) => {
    // Low-stakes: a failed save shouldn't interrupt the kid's flow.
    console.warn("Couldn't save code:", err);
  });
}

// The active lesson object, or null on the Welcome/Project pages where
// `chapter.lessons[currentIndex]` wouldn't make sense.
function currentLesson() {
  if (currentIndex === WELCOME || currentIndex === PROJECT) return null;
  return chapter.lessons[currentIndex];
}

// Is there anything Help could fill in right now? A lesson's practice.solution
// is a full worked answer to that lesson's tiny snippet. A Project has no
// separate "solution" (see curriculum/*/chapters -- project objects are just
// { title, content, starterCode }) -- but its starterCode is itself a
// complete, runnable version of the project, so Help falls back to that:
// restoring a known-working starting point beats leaving a kid stuck on a
// Project with an error and no way to recover except undoing by hand.
function currentHelpCode() {
  const lesson = currentLesson();
  if (lesson && lesson.practice && lesson.practice.solution) return lesson.practice.solution;
  if (currentIndex === PROJECT && chapter.project) return chapter.project.starterCode;
  return null;
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

// Pops the certificate the moment every chapter in the active course first
// becomes done -- not on every subsequent visit, hence the
// courseAlreadyComplete guard (set once here, and pre-seeded in startApp for
// a course that was already finished coming in).
function maybeShowCourseComplete() {
  if (courseAlreadyComplete || chapters.length === 0) return;
  if (!chapters.every(isChapterDone)) return;
  courseAlreadyComplete = true;
  showCourseCompleteModal();
}

function showCourseCompleteModal() {
  showCertificate({
    profileName: currentProfile.display_name,
    courseTitle: activeCourse.title,
    badgeEmoji: activeCourse.trackEmoji || "🏅",
    color: activeCourse.color,
    dateLabel: new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }),
    // app.js doesn't know about the Home screen (that's main.js's), so hand
    // off via a custom event rather than importing main.js back into
    // app.js -- main.js listens for this to send the kid to Home, naturally
    // pointing at whatever's unlocked next.
    onClose: () => {
      window.dispatchEvent(new CustomEvent("codeschool:course-complete-closed", { detail: { courseId: activeCourse.id } }));
    },
  });
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
  codeInput.value = savedCodeByKey.get(savedCodeKey(chapter.number, lessonNumber)) ?? lesson.starterCode;
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
  codeInput.value = savedCodeByKey.get(savedCodeKey(chapter.number, null)) ?? project.starterCode;
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
import io, contextlib, ast

# A plain synchronous exec() of a script with a "while True: input()" loop
# runs the whole thing as one uninterrupted call from JS's point of view --
# any DOM update made along the way sits queued, never actually painted,
# until the entire script finishes (that's the bug this replaced: output
# only ever appearing all at once, after the game was quit). The fix is to
# make each input() call a genuine await, which lets Pyodide's own
# top-level-await support hand control back to the browser for a real
# paint before the (still synchronous, still a native popup) prompt shows.
#
# Kids write plain "command = input('> ')", never "await input(...)" -- so
# this AST-transforms every bare call to input() into an awaited one, then
# wraps the whole script in an async function to make that legal. It
# deliberately does not descend into ordinary (non-async) "def" bodies --
# await is only valid inside an async function, and no lesson/project today
# calls input() from inside a nested def -- so those are left untouched
# rather than risk producing invalid code for a pattern nothing uses yet.
class _InputAwaiter(ast.NodeTransformer):
    def visit_FunctionDef(self, node):
        return node

    def visit_Call(self, node):
        self.generic_visit(node)
        if isinstance(node.func, ast.Name) and node.func.id == "input":
            return ast.Await(value=node)
        return node

async def _browser_input(prompt=""):
    # Show whatever's been printed so far, actually let the browser paint it
    # (the double rAF -- one before, one after a real frame is committed --
    # is what _yield_to_browser does), *then* pop the native prompt. That's
    # what makes an interactive loop read as "prompt, see the result, prompt
    # again" instead of one long silent wait.
    _flush_output(_buf.getvalue())
    await _yield_to_browser()
    answer = _browser_prompt(prompt)
    if answer is None:
        raise EOFError("EOF when reading a line")
    return answer

_buf = io.StringIO()
_error = None
try:
    _tree = ast.parse(__user_code, mode="exec")
    _tree = _InputAwaiter().visit(_tree)
    _main = ast.parse("async def __main(): pass", mode="exec").body[0]
    _main.body = _tree.body if _tree.body else [ast.Pass()]
    _module = ast.fix_missing_locations(ast.Module(body=[_main], type_ignores=[]))
    _code = compile(_module, "<student_code>", "exec")
    _user_globals = {"input": _browser_input}
    with contextlib.redirect_stdout(_buf):
        exec(_code, _user_globals)
        await _user_globals["__main"]()
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
      errorHintActions.hidden = !currentHelpCode();
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
    errorHintActions.hidden = !currentHelpCode();
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
      courseId: activeCourse.id,
      chapterNumber: chapter.number,
      lessonNumber,
    });
    completedLessons.add(lessonNumber);
    if (currentIndex !== WELCOME && lessonNumber === currentIndex + 1) {
      lessonStepLabel.textContent = `Lesson ${chapter.lessons[currentIndex].id} ✓`;
      renderLessonSelect();
      nextBtn.disabled = false;
    }
    maybeShowCourseComplete();
  } catch (err) {
    // Low-stakes: a failed progress save shouldn't interrupt the kid's flow.
    console.warn("Couldn't save progress:", err);
  }
}

function applyHelp() {
  const helpCode = currentHelpCode();
  if (!helpCode) return;

  // Only snapshot the first time Help is pressed for this lesson/project, so
  // a second press doesn't overwrite the snapshot with the already-helped
  // code (which would make Reset a no-op).
  if (preHelpCode === null) {
    preHelpCode = codeInput.value;
    resetBtn.disabled = false;
    resetBtnError.disabled = false;
  }
  codeInput.value = helpCode;
  scheduleSaveCode();
}

function applyReset() {
  if (preHelpCode === null) return;
  codeInput.value = preHelpCode;
  resetHelpState();
  scheduleSaveCode();
}

codeInput.addEventListener("input", scheduleSaveCode);
// Covers a browser refresh/tab-close, or the OS killing a backgrounded tab —
// cases with no button click to hang a flushSaveCode() call off of. Not
// airtight (the request can be cut off mid-flight if the page closes fast
// enough), but it turns "lost the last few keystrokes" into a rare edge case
// instead of the norm.
window.addEventListener("beforeunload", flushSaveCode);
window.addEventListener("pagehide", flushSaveCode);
runBtn.addEventListener("click", runCurrentCode);
helpBtn.addEventListener("click", applyHelp);
helpBtnError.addEventListener("click", applyHelp);
resetBtn.addEventListener("click", applyReset);
resetBtnError.addEventListener("click", applyReset);
prevBtn.addEventListener("click", () => {
  flushSaveCode();
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
  flushSaveCode();
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
  flushSaveCode();
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
    await markProjectDone({ profileId: currentProfile.id, courseId: activeCourse.id, chapterNumber: chapter.number });
    projectDoneByChapter.set(chapter.number, true);
    updateProjectDoneButton();
    renderLessonSelect();
    maybeShowCourseComplete();
  } catch (err) {
    // Low-stakes: a failed save shouldn't block the kid from moving on;
    // they can just click again.
    console.warn("Couldn't save project completion:", err);
  }
});

// Exposed so callers outside this module (e.g. main.js's "Switch Profile"
// button, which does a full page reload) can flush a pending debounced save
// before that happens.
export async function flushSavedCode() {
  await flushSaveCode();
}

export async function startApp(profile, course) {
  currentProfile = profile;
  activeCourse = course;
  chapters = course.chapters;
  lessonTitle.hidden = false;
  lessonSelect.hidden = false;
  courseCompleteModal.hidden = true;

  completedByChapter = new Map();
  projectDoneByChapter = new Map();
  try {
    const rows = await fetchProgress(currentProfile.id);
    rows
      .filter((row) => row.course_id === activeCourse.id)
      .forEach((row) => {
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
  courseAlreadyComplete = chapters.length > 0 && chapters.every(isChapterDone);

  savedCodeByKey = new Map();
  try {
    const rows = await fetchSavedCode(currentProfile.id);
    rows
      .filter((row) => row.course_id === activeCourse.id)
      .forEach((row) => {
        savedCodeByKey.set(savedCodeKey(row.chapter_number, row.lesson_number), row.code);
      });
  } catch (err) {
    console.warn("Couldn't load saved code:", err);
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
  // Called right before each prompt so the Output pane shows every turn's
  // result as it happens, not just once at the very end.
  pyodide.globals.set("_flush_output", (partialOutput) => {
    outputContent.textContent = partialOutput || "(no output yet)";
  });
  // Awaited (via Python's async input() wrapper) right before each prompt.
  // Two rAFs, not one: the first fires before the browser paints the
  // current frame, the second fires after that paint has actually landed —
  // that gap is what guarantees the just-flushed output is genuinely on
  // screen before the blocking prompt() dialog appears next.
  pyodide.globals.set(
    "_yield_to_browser",
    () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
  );

  outputContent.textContent = "Ready! Press Run to try the code.";
  runBtn.disabled = false;
}
