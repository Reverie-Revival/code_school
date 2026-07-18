import { fetchProfiles, createProfile, AVATAR_COLORS } from "./profiles.js";
import { startApp } from "./app.js";

const profilePicker = document.getElementById("profile-picker");
const profileList = document.getElementById("profile-list");
const addProfileBtn = document.getElementById("add-profile-btn");

const newProfileForm = document.getElementById("new-profile-form");
const newProfileName = document.getElementById("new-profile-name");
const colorSwatches = document.getElementById("color-swatches");
const newProfilePin = document.getElementById("new-profile-pin");
const cancelNewProfileBtn = document.getElementById("cancel-new-profile-btn");

const pinPrompt = document.getElementById("pin-prompt");
const pinPromptName = document.getElementById("pin-prompt-name");
const pinInput = document.getElementById("pin-input");
const pinCancelBtn = document.getElementById("pin-cancel-btn");
const pinError = document.getElementById("pin-error");

const lessonGrid = document.querySelector("main.lesson-grid");
const currentProfileBadge = document.getElementById("current-profile-badge");
const currentProfileName = document.getElementById("current-profile-name");
const switchProfileBtn = document.getElementById("switch-profile-btn");

let profiles = [];
let selectedColor = AVATAR_COLORS[0];
let pendingProfile = null;

function showPickerView(view) {
  profileList.hidden = view !== "list";
  addProfileBtn.hidden = view !== "list";
  newProfileForm.hidden = view !== "form";
  pinPrompt.hidden = view !== "pin";
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

function renderProfileList() {
  profileList.innerHTML = "";
  profiles.forEach((profile) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "profile-card";

    const avatar = document.createElement("span");
    avatar.className = "profile-avatar";
    avatar.style.background = profile.avatar_color;
    avatar.textContent = profile.display_name.charAt(0).toUpperCase();

    const name = document.createElement("span");
    name.className = "profile-name";
    name.textContent = profile.display_name;

    card.appendChild(avatar);
    card.appendChild(name);
    card.addEventListener("click", () => selectProfile(profile));
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
  profilePicker.hidden = true;
  lessonGrid.hidden = false;
  currentProfileBadge.hidden = false;
  currentProfileName.textContent = profile.display_name;
  startApp(profile);
}

addProfileBtn.addEventListener("click", () => {
  newProfileName.value = "";
  newProfilePin.value = "";
  selectedColor = AVATAR_COLORS[0];
  renderColorSwatches();
  showPickerView("form");
  newProfileName.focus();
});

cancelNewProfileBtn.addEventListener("click", () => showPickerView("list"));

newProfileForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const displayName = newProfileName.value.trim();
  if (!displayName) return;

  const pin = newProfilePin.value.trim();
  const createBtn = document.getElementById("create-profile-btn");
  createBtn.disabled = true;

  try {
    const profile = await createProfile({ displayName, avatarColor: selectedColor, pin });
    profiles.push(profile);
    renderProfileList();
    enterApp(profile);
  } catch (err) {
    // Low-stakes family app: a plain alert is enough here, no need for a
    // dedicated error-banner component for a rare/unlikely failure path.
    alert(`Couldn't create profile: ${err.message}`);
  } finally {
    createBtn.disabled = false;
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

switchProfileBtn.addEventListener("click", () => {
  // Full reload is the simplest correct reset: clears Pyodide/lesson state
  // and returns to the picker, same as picking a different save file.
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
  showPickerView("list");
}

init();
