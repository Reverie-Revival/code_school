import { fetchProfiles, createProfile, updateProfile, deleteProfile, AVATAR_COLORS, AVATAR_EMOJIS } from "./profiles.js";
import { startApp, flushSavedCode } from "./app.js";
import { fetchProgress } from "./progress.js";
import { TRACKS, isCourseComplete, courseProgress, courseCompletedDate } from "./courses.js";
import { showCertificate } from "./certificate.js";

const profilePicker = document.getElementById("profile-picker");
const profileList = document.getElementById("profile-list");
const addProfileBtn = document.getElementById("add-profile-btn");

const newProfileForm = document.getElementById("new-profile-form");
const profileFormHeading = document.getElementById("profile-form-heading");
const newProfileName = document.getElementById("new-profile-name");
const colorSwatches = document.getElementById("color-swatches");
const avatarEmojiPicker = document.getElementById("avatar-emoji-picker");
const newProfilePin = document.getElementById("new-profile-pin");
const removePinLabel = document.getElementById("remove-pin-label");
const removePinCheckbox = document.getElementById("remove-pin-checkbox");
const createProfileBtn = document.getElementById("create-profile-btn");
const deleteProfileBtn = document.getElementById("delete-profile-btn");
const cancelNewProfileBtn = document.getElementById("cancel-new-profile-btn");

const pinPrompt = document.getElementById("pin-prompt");
const pinPromptName = document.getElementById("pin-prompt-name");
const pinInput = document.getElementById("pin-input");
const pinCancelBtn = document.getElementById("pin-cancel-btn");
const pinError = document.getElementById("pin-error");
const pinForgotBtn = document.getElementById("pin-forgot-btn");

const lessonGrid = document.querySelector("main.lesson-grid");
const lessonTitle = document.getElementById("lesson-title");
const lessonSelect = document.getElementById("lesson-select");
const currentProfileBadge = document.getElementById("current-profile-badge");
const currentProfileAvatar = document.getElementById("current-profile-avatar");
const currentProfileName = document.getElementById("current-profile-name");
const editProfileBtn = document.getElementById("edit-profile-btn");
const switchProfileBtn = document.getElementById("switch-profile-btn");
const changeCourseBtn = document.getElementById("change-course-btn");

const homeScreen = document.getElementById("home-screen");
const homeAvatarWrap = document.getElementById("home-avatar-wrap");
const homeProfileName = document.getElementById("home-profile-name");
const homeTracks = document.getElementById("home-tracks");

const EDIT_PROFILE_STORAGE_KEY = "codeSchoolEditProfileId";

let profiles = [];
let selectedColor = AVATAR_COLORS[0];
let selectedEmoji = null; // null = fall back to the display name's initial
let pendingProfile = null;
let editingProfileId = null; // profile.id being edited, or null when creating
let currentProfileId = null;
let currentProfileProgress = []; // raw progress rows for currentProfileId, across all courses -- fetched once when a profile is picked, used to lock/badge courses without re-querying per card

function showPickerView(view) {
  profileList.hidden = view !== "list";
  addProfileBtn.hidden = view !== "list";
  newProfileForm.hidden = view !== "form";
  pinPrompt.hidden = view !== "pin";
}

function renderAvatar(el, profile) {
  el.style.background = profile.avatar_color;
  el.textContent = profile.avatar_emoji || profile.display_name.charAt(0).toUpperCase();
}

function renderColorSwatches() {
  colorSwatches.innerHTML = "";
  AVATAR_COLORS.forEach((color) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "color-swatch" + (color === selectedColor ? " selected" : "");
    btn.style.background = color;
    btn.setAttribute("aria-label", `Choose color ${color}`);
    btn.addEventListener("click", () => {
      selectedColor = color;
      renderColorSwatches();
    });
    colorSwatches.appendChild(btn);
  });
}

function renderEmojiPicker() {
  avatarEmojiPicker.innerHTML = "";

  const letterBtn = document.createElement("button");
  letterBtn.type = "button";
  letterBtn.className = "emoji-swatch" + (selectedEmoji === null ? " selected" : "");
  letterBtn.textContent = "Aa";
  letterBtn.setAttribute("aria-label", "Use my initial instead of an emoji");
  letterBtn.addEventListener("click", () => {
    selectedEmoji = null;
    renderEmojiPicker();
  });
  avatarEmojiPicker.appendChild(letterBtn);

  AVATAR_EMOJIS.forEach((emoji) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "emoji-swatch" + (emoji === selectedEmoji ? " selected" : "");
    btn.textContent = emoji;
    btn.setAttribute("aria-label", `Choose avatar ${emoji}`);
    btn.addEventListener("click", () => {
      selectedEmoji = emoji;
      renderEmojiPicker();
    });
    avatarEmojiPicker.appendChild(btn);
  });
}

const ALL_COURSES = TRACKS.flatMap((track) => track.courses);

function completedCoursesFor(progressRows) {
  return ALL_COURSES.filter((course) => isCourseComplete(course, progressRows));
}

// Draws one achievement ring per completed course directly around
// whatever element it's given -- innermost ring is the earliest completed
// course, each later one wider and in that course's own color (so one
// course done alone looks like a single gold ring; finish a second and a
// wider red ring appears around that gold one; a track with more courses
// just keeps growing outward). Pure box-shadow layering, no extra markup
// needed: a solid box-shadow with spread N and no blur reads as a ring of
// that color N pixels wide around the (opaque, same-shape) element it's
// attached to, and later, larger-spread shadows show through in the band
// beyond the smaller ones stacked in front of them.
function applyAchievementRings(el, completedCourses, ringWidth, ringGap) {
  if (completedCourses.length === 0) {
    el.style.boxShadow = "";
    return;
  }
  const shadows = [];
  let radius = 0;
  completedCourses.forEach((course, i) => {
    if (i > 0) radius += ringGap; // thin background groove separating each ring from the last
    shadows.push(`0 0 0 ${radius}px var(--bg)`);
    radius += ringWidth;
    shadows.push(`0 0 0 ${radius}px ${course.color || "#caa53d"}`);
  });
  // Deliberately no margin here: box-shadow spread is purely visual and
  // doesn't grow the element's own layout box, so every pin -- ringed or
  // not -- stays exactly the same height in the row, keeping every
  // profile's avatar aligned regardless of how many rings it's earned.
  // The pins row's own `gap` (see CSS) gives the rings room to bleed into
  // without touching a neighboring pin.
  el.style.boxShadow = shadows.join(", ");
}

// Builds the avatar circle (plain, no rings -- keeps it uncluttered no
// matter how many tracks/courses pile up) plus one small pinned icon per
// track the profile has made any progress toward. The rings live on each
// pin instead, scoped to just that track's completed courses -- so a
// second track (JavaScript, say) gets its own pin with its own independent
// ring stack, rather than every track's achievements competing for space
// around one already-crowded avatar. Returns a wrapper ready to drop into
// a card.
function renderAvatarWithAchievements(profile, completedCourses) {
  const wrap = document.createElement("span");
  wrap.className = "avatar-wrap";

  // Pins render above the avatar (not overlapping it) so they never
  // collide with the name text below, no matter how many tracks/rings. This
  // row is always present -- even with zero pins in it -- so every
  // profile's avatar sits at the same height, whether or not they've
  // earned anything yet, rather than the ones with pins sitting lower.
  const tracksWithProgress = TRACKS.filter((track) => track.courses.some((c) => completedCourses.includes(c)));
  const pins = document.createElement("span");
  pins.className = "avatar-track-pins";
  tracksWithProgress.forEach((track) => {
    const completedInTrack = track.courses.filter((c) => completedCourses.includes(c));
    const pin = document.createElement("span");
    pin.className = "avatar-track-pin";
    pin.textContent = track.emoji;
    applyAchievementRings(pin, completedInTrack, 3, 1);
    pins.appendChild(pin);
  });
  wrap.appendChild(pins);

  const avatar = document.createElement("span");
  avatar.className = "profile-avatar";
  renderAvatar(avatar, profile);
  wrap.appendChild(avatar);

  return wrap;
}

async function renderProfileList() {
  profileList.innerHTML = "";

  // Small, family-scale profile count -- one progress fetch per profile up
  // front is cheap, and lets each card show a token per completed course.
  const completedByProfile = await Promise.all(
    profiles.map(async (profile) => {
      try {
        return completedCoursesFor(await fetchProgress(profile.id));
      } catch (err) {
        console.warn(`Couldn't load progress for ${profile.display_name}:`, err);
        return [];
      }
    })
  );

  profiles.forEach((profile, i) => {
    const card = document.createElement("div");
    card.className = "profile-card";

    const selectBtn = document.createElement("button");
    selectBtn.type = "button";
    selectBtn.className = "profile-select-btn";

    selectBtn.appendChild(renderAvatarWithAchievements(profile, completedByProfile[i]));

    const name = document.createElement("span");
    name.className = "profile-name";
    name.textContent = profile.display_name;
    selectBtn.appendChild(name);

    selectBtn.addEventListener("click", () => selectProfile(profile));

    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.className = "profile-edit-btn";
    editBtn.textContent = "Edit";
    editBtn.setAttribute("aria-label", `Edit ${profile.display_name}'s profile`);
    editBtn.addEventListener("click", () => openProfileForm(profile));

    card.appendChild(selectBtn);
    card.appendChild(editBtn);
    profileList.appendChild(card);
  });
}

function selectProfile(profile) {
  if (profile.pin) {
    pendingProfile = profile;
    pinPromptName.textContent = profile.display_name;
    pinInput.value = "";
    pinError.hidden = true;
    showPickerView("pin");
    pinInput.focus();
  } else {
    chooseProfile(profile);
  }
}

// Profile chosen -- show the header badge and hand off to Home (not
// straight into the lesson grid; the kid picks a course from there first).
async function chooseProfile(profile) {
  currentProfileId = profile.id;
  profilePicker.hidden = true;
  currentProfileBadge.hidden = false;
  currentProfileName.textContent = profile.display_name;
  renderAvatar(currentProfileAvatar, profile);

  try {
    currentProfileProgress = await fetchProgress(profile.id);
  } catch (err) {
    console.warn("Couldn't load progress:", err);
    currentProfileProgress = [];
  }

  showHome(profile);
}

// Hides everything the lesson-grid screen adds to the header (chapter/lesson
// title + jump dropdown, "Change Course") -- called whenever navigating away
// from it back to a picker screen, so the header just reads "Code School"
// plus the profile badge.
function hideLessonGridChrome() {
  lessonGrid.hidden = true;
  changeCourseBtn.hidden = true;
  lessonTitle.hidden = true;
  lessonSelect.hidden = true;
}

// Home is both the course selector and the profile's dashboard: profile
// header up top, then one section per track, each listing that track's
// courses with a progress bar / lock state / "coming soon" / earned token.
function showHome(profile) {
  hideLessonGridChrome();
  homeScreen.hidden = false;
  homeAvatarWrap.innerHTML = "";
  homeAvatarWrap.appendChild(renderAvatarWithAchievements(profile, completedCoursesFor(currentProfileProgress)));
  homeProfileName.textContent = `${profile.display_name}'s Courses`;
  renderHomeTracks();
}

function renderHomeTracks() {
  homeTracks.innerHTML = "";
  TRACKS.forEach((track) => {
    const section = document.createElement("section");
    section.className = "home-track-section";

    const heading = document.createElement("h3");
    heading.className = "home-track-heading";
    heading.textContent = `${track.emoji} ${track.label}`;
    section.appendChild(heading);

    const list = document.createElement("div");
    list.className = "home-course-list";
    track.courses.forEach((course, i) => {
      list.appendChild(renderCourseCard(track, course, track.courses[i - 1] || null));
    });
    section.appendChild(list);

    homeTracks.appendChild(section);
  });
}

function renderCourseCard(track, course, previousCourse) {
  const complete = isCourseComplete(course, currentProfileProgress);
  const lockedByPrerequisite = previousCourse && !isCourseComplete(previousCourse, currentProfileProgress);
  const comingSoon = course.chapters.length === 0;
  const locked = !complete && (lockedByPrerequisite || comingSoon);
  const { done, total } = courseProgress(course, currentProfileProgress);

  const card = document.createElement("div");
  card.className = "course-card home-course-card" + (complete ? " course-complete" : "");
  if (complete) card.style.setProperty("--course-color", course.color || "#caa53d");

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "course-select-btn";
  btn.disabled = locked;

  const icon = document.createElement("span");
  icon.className = "course-icon";
  icon.textContent = complete ? course.trackEmoji : locked ? "🔒" : "📘";

  const title = document.createElement("span");
  title.className = "course-title";
  title.textContent = course.title;

  btn.appendChild(icon);
  btn.appendChild(title);

  if (total > 0) {
    const bar = document.createElement("div");
    bar.className = "course-progress-bar";
    const fill = document.createElement("div");
    fill.className = "course-progress-fill";
    fill.style.width = `${Math.round((done / total) * 100)}%`;
    bar.appendChild(fill);
    btn.appendChild(bar);

    const label = document.createElement("span");
    label.className = "course-progress-label";
    label.textContent = complete ? "Complete!" : `${done}/${total}`;
    btn.appendChild(label);
  }

  const subtitle = document.createElement("span");
  subtitle.className = "course-subtitle";
  subtitle.textContent = comingSoon ? "Coming soon" : lockedByPrerequisite ? `Finish Course ${previousCourse.number} to Unlock` : "";
  if (subtitle.textContent) btn.appendChild(subtitle);

  // The card itself always re-enters the course, complete or not -- a
  // finished course should still be freely revisitable, not sealed behind
  // its own certificate. Reopening the certificate is a separate, small
  // link below the card so neither action blocks the other.
  if (!locked) {
    btn.addEventListener("click", () => enterApp(course));
  }
  card.appendChild(btn);

  if (complete) {
    const viewCertBtn = document.createElement("button");
    viewCertBtn.type = "button";
    viewCertBtn.className = "view-certificate-btn";
    viewCertBtn.textContent = "🎓 View Certificate";
    viewCertBtn.addEventListener("click", () => {
      const profile = profiles.find((p) => p.id === currentProfileId);
      const earnedDate = courseCompletedDate(course, currentProfileProgress);
      showCertificate({
        profileName: profile.display_name,
        courseTitle: course.title,
        badgeEmoji: course.trackEmoji,
        color: course.color,
        dateLabel: earnedDate
          ? earnedDate.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })
          : "",
      });
    });
    card.appendChild(viewCertBtn);
  }

  return card;
}

changeCourseBtn.addEventListener("click", async () => {
  await flushSavedCode();
  const profile = profiles.find((p) => p.id === currentProfileId);
  showHome(profile);
});

function enterApp(course) {
  const profile = profiles.find((p) => p.id === currentProfileId);
  homeScreen.hidden = true;
  lessonGrid.hidden = false;
  changeCourseBtn.hidden = false;
  startApp(profile, course);
}

// Fired by app.js's certificate modal when a kid dismisses it right after
// finishing a course -- rather than leaving them sitting on the lesson they
// just finished, send them back to Home, which now naturally shows what's
// next (unlocked, "coming soon," or another earned token).
window.addEventListener("codeschool:course-complete-closed", async () => {
  await flushSavedCode();
  try {
    currentProfileProgress = await fetchProgress(currentProfileId);
  } catch (err) {
    console.warn("Couldn't refresh progress:", err);
  }
  const profile = profiles.find((p) => p.id === currentProfileId);
  showHome(profile);
});

// Shared by "+ New Profile" and each card's "Edit" link -- pass a profile to
// prefill the form and switch it into edit mode, or nothing to start blank.
function openProfileForm(profile) {
  editingProfileId = profile ? profile.id : null;
  profileFormHeading.textContent = profile ? "Edit Profile" : "New Profile";
  createProfileBtn.textContent = profile ? "Save Changes" : "Create";
  newProfileName.value = profile ? profile.display_name : "";
  // An existing PIN is never shown back in the clear -- the field starts
  // empty with a masked placeholder, and stays untouched on save unless the
  // kid actually types a new one (or checks "Remove PIN").
  newProfilePin.value = "";
  newProfilePin.placeholder = profile && profile.pin ? "•••• (leave blank to keep it)" : "";
  removePinLabel.hidden = !(profile && profile.pin);
  removePinCheckbox.checked = false;
  selectedColor = profile ? profile.avatar_color : AVATAR_COLORS[0];
  selectedEmoji = profile ? profile.avatar_emoji || null : null;
  deleteProfileBtn.hidden = !profile;
  renderColorSwatches();
  renderEmojiPicker();
  showPickerView("form");
  newProfileName.focus();
}

addProfileBtn.addEventListener("click", () => openProfileForm(null));

cancelNewProfileBtn.addEventListener("click", () => {
  editingProfileId = null;
  showPickerView("list");
});

deleteProfileBtn.addEventListener("click", async () => {
  if (!editingProfileId) return;
  const profile = profiles.find((p) => p.id === editingProfileId);
  if (!profile) return;

  // The PIN is a UX nicety, not real security (see CLAUDE.md), but for
  // something this destructive it's still worth asking for -- keeps a
  // sibling from wiping someone else's progress by mistake.
  if (profile.pin) {
    const entered = window.prompt(`Enter ${profile.display_name}'s PIN to delete this profile:`);
    if (entered === null) return; // cancelled
    if (entered !== profile.pin) {
      alert("Wrong PIN.");
      return;
    }
  }

  const confirmed = confirm(
    `Delete ${profile.display_name}'s profile? This also deletes all of their saved progress and code, and can't be undone.`
  );
  if (!confirmed) return;

  deleteProfileBtn.disabled = true;
  try {
    await deleteProfile(profile.id);
    profiles = profiles.filter((p) => p.id !== profile.id);
    editingProfileId = null;
    renderProfileList();
    showPickerView("list");
  } catch (err) {
    alert(`Couldn't delete profile: ${err.message}`);
  } finally {
    deleteProfileBtn.disabled = false;
  }
});

newProfileForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const displayName = newProfileName.value.trim();
  if (!displayName) return;

  const typedPin = newProfilePin.value.trim();
  createProfileBtn.disabled = true;

  try {
    if (editingProfileId) {
      // The PIN field starts blank on edit (see openProfileForm) rather than
      // showing the real value, so blank here means "unchanged," not "clear
      // it" -- clearing is the separate, explicit "Remove PIN" checkbox.
      const original = profiles.find((p) => p.id === editingProfileId);
      const pin = removePinCheckbox.checked ? "" : typedPin || original.pin || "";
      const updated = await updateProfile({
        id: editingProfileId,
        displayName,
        avatarColor: selectedColor,
        avatarEmoji: selectedEmoji,
        pin,
      });
      const idx = profiles.findIndex((p) => p.id === editingProfileId);
      if (idx !== -1) profiles[idx] = updated;
      editingProfileId = null;
      renderProfileList();
      showPickerView("list");
    } else {
      const profile = await createProfile({ displayName, avatarColor: selectedColor, avatarEmoji: selectedEmoji, pin: typedPin });
      profiles.push(profile);
      renderProfileList();
      chooseProfile(profile);
    }
  } catch (err) {
    // Low-stakes family app: a plain alert is enough here, no need for a
    // dedicated error-banner component for a rare/unlikely failure path.
    alert(`Couldn't save profile: ${err.message}`);
  } finally {
    createProfileBtn.disabled = false;
  }
});

pinPrompt.addEventListener("submit", (e) => {
  e.preventDefault();
  if (pinInput.value === pendingProfile.pin) {
    const profile = pendingProfile;
    pendingProfile = null;
    chooseProfile(profile);
  } else {
    pinError.hidden = false;
    pinInput.value = "";
    pinInput.focus();
  }
});

pinCancelBtn.addEventListener("click", () => {
  pendingProfile = null;
  showPickerView("list");
});

pinForgotBtn.addEventListener("click", () => {
  // Editing a profile never requires its current PIN (only Delete does) --
  // so "forgot PIN" is just a shortcut straight into that profile's own
  // Edit form, where a new PIN can be set (or removed) without knowing the
  // old one. Matches the "parent-recoverable, not a real secret" design.
  const profile = pendingProfile;
  pendingProfile = null;
  openProfileForm(profile);
});

switchProfileBtn.addEventListener("click", async () => {
  // Flush any pending debounced code save first -- otherwise a reload right
  // after typing (before the debounce timer fires) silently drops the last
  // few keystrokes.
  await flushSavedCode();
  // Full reload is the simplest correct reset: clears Pyodide/lesson state
  // and returns to the picker, same as picking a different save file.
  location.reload();
});

editProfileBtn.addEventListener("click", async () => {
  await flushSavedCode();
  // A full reload is the simplest way back to the picker (same as Switch
  // Profile); stash which profile to open the edit form for so init() can
  // jump straight to it instead of landing on the profile list.
  sessionStorage.setItem(EDIT_PROFILE_STORAGE_KEY, currentProfileId);
  location.reload();
});

async function init() {
  try {
    profiles = await fetchProfiles();
  } catch (err) {
    profileList.textContent = `Couldn't load profiles: ${err.message}`;
    return;
  }
  renderProfileList();
  renderColorSwatches();
  renderEmojiPicker();

  const editId = sessionStorage.getItem(EDIT_PROFILE_STORAGE_KEY);
  sessionStorage.removeItem(EDIT_PROFILE_STORAGE_KEY);
  const editProfile = editId && profiles.find((p) => p.id === editId);
  if (editProfile) {
    openProfileForm(editProfile);
    return;
  }

  showPickerView("list");
}

init();
