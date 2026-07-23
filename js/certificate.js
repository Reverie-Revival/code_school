// The certificate modal is shared between two callers: app.js pops it the
// moment a course is first completed, and main.js's Home screen reopens the
// same modal (read-only, from stored progress) whenever a kid taps an
// already-earned course's card. One module owns the DOM so neither caller
// has to duplicate the show/hide wiring.
const modal = document.getElementById("course-complete-modal");
const card = document.getElementById("certificate-card");
const badgeEl = document.getElementById("certificate-medal");
const nameEl = document.getElementById("certificate-name");
const courseEl = document.getElementById("certificate-course");
const dateEl = document.getElementById("certificate-date");
const closeBtn = document.getElementById("certificate-close-btn");
const printBtn = document.getElementById("certificate-print-btn");

let onClose = null;

// dateLabel is a pre-formatted string (callers decide "today" vs. a stored
// completion date). onClose is optional -- only the just-finished flow
// needs one, to route the kid to the Home screen after dismissing. color is
// the course's own highlight color (see courses.js), applied to the
// certificate's border/name so it matches that course's card and avatar
// ring rather than always looking the same.
export function showCertificate({ profileName, courseTitle, badgeEmoji, dateLabel, color, onClose: closeCallback }) {
  badgeEl.textContent = badgeEmoji;
  nameEl.textContent = profileName;
  courseEl.textContent = courseTitle;
  dateEl.textContent = dateLabel;
  card.style.setProperty("--course-color", color || "#caa53d");
  onClose = closeCallback || null;
  modal.hidden = false;
}

closeBtn.addEventListener("click", () => {
  modal.hidden = true;
  const callback = onClose;
  onClose = null;
  if (callback) callback();
});

// Print styling (see css/style.css's @media print block) hides everything
// on the page except the certificate card itself, so this just triggers
// the browser's normal print dialog -- no PDF generation or extra library
// needed for a kid to end up with a physical copy.
printBtn.addEventListener("click", () => {
  window.print();
});
