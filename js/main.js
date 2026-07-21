import { fetchProfiles, createProfile, updateProfile, deleteProfile, AVATAR_COLORS, AVATAR_EMOJIS } from "./profiles.js";
import { startApp, flushSavedCode } from "./app.js";

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
const currentProfileBadge = document.getElementById("current-profile-badge");
const currentProfileAvatar = document.getElementById("current-profile-avatar");
const currentProfileName = document.getElementById("current-profile-name");
const editProfileBtn = document.getElementById("edit-profile-btn");
const switchProfileBtn = document.getElementById("switch-profile-btn");

const EDIT_PROFILE_STORAGE_KEY = "codeSchoolEditProfileId";

let profiles = [];
let selectedColor = AVATAR_COLORS[0];
let selectedEmoji = null; // null = fall back to the display name's initial
let pendingProfile = null;
let editingProfileId = null; // profile.id being edited, or null when creating
let currentProfileId = null;

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

function renderProfileList() {
  profileList.innerHTML = "";
  profiles.forEach((profile) => {
    const card = document.createElement("div");
    card.className = "profile-card";

    const selectBtn = document.createElement("button");
    selectBtn.type = "button";
    selectBtn.className = "profile-select-btn";

    const avatar = document.createElement("span");
    avatar.className = "profile-avatar";
    renderAvatar(avatar, profile);

    const name = document.createElement("span");
    name.className = "profile-name";
    name.textContent = profile.display_name;

    selectBtn.appendChild(avatar);
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
    enterApp(profile);
  }
}

function enterApp(profile) {
  currentProfileId = profile.id;
  profilePicker.hidden = true;
  lessonGrid.hidden = false;
  currentProfileBadge.hidden = false;
  currentProfileName.textContent = profile.display_name;
  renderAvatar(currentProfileAvatar, profile);
  startApp(profile);
}

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
      enterApp(profile);
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
    enterApp(profile);
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
