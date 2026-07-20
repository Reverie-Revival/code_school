-- Drop the parent_approved_at column from progress: it belonged to a
-- parent-approval "Parent gate" design for chapter-end Projects that was
-- rejected before shipping (James: "does NOT want a parent-gate blocking
-- chapter-to-chapter progression"). Project completion is now a kid
-- self-click ("I showed someone!") tracked entirely by completed_at on a
-- lesson_number-null row -- see js/progress.js's markProjectDone().

alter table code_school.progress drop column parent_approved_at;
