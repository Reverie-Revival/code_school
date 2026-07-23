import { chapters as python1Chapters } from "../curriculum/python/chapters/index.js";
import { chapters as python2Chapters } from "../curriculum/python2/chapters/index.js";

// Course catalog. course_id values in the progress/saved_code tables are
// track-namespaced strings ("python-1", "python-2", later "javascript-1",
// etc.) -- a future track is just another entry in this array, no
// screen-flow or schema change required.
//
// `color` is a course's highlight color -- used for its card border/
// progress bar, its certificate, and as one ring in the stack of
// achievement rings drawn around a profile's avatar (one ring per
// completed course, innermost = earliest course, so finishing more courses
// in the same track adds more rings rather than changing the icon). The
// icon itself (course-card token, certificate badge, avatar pin) always
// comes from the parent *track*, not the course -- two Python courses are
// still both Python, so they show the same 🐍, just in different colors.
export const TRACKS = [
  {
    id: "python",
    label: "Python",
    emoji: "🐍",
    courses: [
      { id: "python-1", number: 1, title: "Python Course 1", color: "#caa53d", chapters: python1Chapters },
      { id: "python-2", number: 2, title: "Python Course 2", color: "#c0392b", chapters: python2Chapters },
    ],
  },
];

// Attach each course's parent-track emoji directly onto it (trackEmoji) so
// callers never need a separate lookup -- single source of truth stays
// track.emoji, courses just carry a convenient reference to it.
TRACKS.forEach((track) => {
  track.courses.forEach((course) => {
    course.trackEmoji = track.emoji;
  });
});

// Given a course and a profile's raw, unfiltered progress rows, how many of
// its lessons+projects are done out of the total? A course with no chapters
// yet (still a content stub) reports 0/0.
export function courseProgress(course, progressRows) {
  const rows = progressRows.filter((r) => r.course_id === course.id);
  let total = 0;
  let done = 0;
  course.chapters.forEach((ch) => {
    total += ch.lessons.length + (ch.project ? 1 : 0);
    done += rows.filter((r) => r.chapter_number === ch.number && r.lesson_number !== null).length;
    if (ch.project && rows.some((r) => r.chapter_number === ch.number && r.lesson_number === null)) {
      done += 1;
    }
  });
  return { done, total };
}

// Is every chapter (all lessons, plus its project if it has one) complete?
// Kept as a question distinct from app.js's own isChapterDone (which reads
// live in-app Maps for the *active* course) since this needs to answer it
// for any course, including ones the kid isn't currently inside -- for
// locking the Home screen's cards and computing profile badges/certificates.
export function isCourseComplete(course, progressRows) {
  if (course.chapters.length === 0) return false;
  const { done, total } = courseProgress(course, progressRows);
  return done >= total;
}

// The most recent completed_at among a course's progress rows -- used as
// the "date earned" on a reopened certificate (as opposed to "today," which
// is only correct at the moment the course is first finished).
export function courseCompletedDate(course, progressRows) {
  const rows = progressRows.filter((r) => r.course_id === course.id && r.completed_at);
  if (rows.length === 0) return null;
  const latest = rows.reduce((max, r) => (r.completed_at > max ? r.completed_at : max), rows[0].completed_at);
  return new Date(latest);
}
