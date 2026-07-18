# 0002 — Three-pane lesson layout, plain-JS/textarea editor

## Status
Accepted (2026-07-17)

## Context
James's sons had been partway through a paid site's Python course that used a three-pane layout: lesson text on the left, an editable code box in the middle, and program output on the right, all on one screen with no page navigation to run code. James liked that layout specifically and wants Code School's lesson screen to work the same way — one glance covers "what am I learning," "what am I writing," and "did it work."

This is a UI *pattern* (a common one across many coding-education tools), not proprietary content — no text, code, branding, or assets from any other product are being reused. The lesson content, exercises, and code are all original to this project.

Separately, the app needs a widget for the middle pane where kids type Python, and a decision on whether the frontend uses a framework or plain HTML/JS/CSS.

## Decision
- **Layout: three fixed panes** on one screen — Lesson (left), Code editor (middle), Output (right) — with a Run button that executes the middle pane's code via Pyodide and streams the result into the right pane. No page reload, no navigation away from the lesson to see output.
- **Code editor widget: plain HTML `<textarea>`.** No editor library/dependency. Chosen specifically because this project is a father-and-sons build: a textarea's behavior is fully visible in the page source, with nothing "magic" for the boys to either take on faith or need explained. It can be swapped for something richer (e.g. CodeMirror) later without touching the surrounding architecture, if the lack of syntax highlighting becomes a real friction point.
- **Frontend stack: plain HTML/CSS/JS, no framework.** No build step, no bundler, no framework concepts (components, state management, JSX, etc.) standing between the boys and the code that runs the app. Matches the project's own teaching goal — everything on screen should be something a beginner could eventually read and understand.

## Alternatives considered
- **CodeMirror or Monaco for the editor** — rejected for v1: real syntax highlighting and auto-indent are nice, but both are dependencies that add a layer of "how does this work" that doesn't serve the family-learning goal right now. Revisit if the plain textarea proves genuinely limiting once there's real usage.
- **A lightweight JS framework (e.g. Alpine, or React via CDN)** — rejected for v1: buys some convenience in wiring state between panes, but adds a concept the boys would eventually need explained on top of Python itself, which is out of scope (see CLAUDE.md's "explicitly out of scope" list — no "how real projects are structured" lessons in v1).

## Consequences
- All state (current lesson, code in the textarea, last output) lives in plain JS variables/DOM — no framework reactivity to lean on. Fine at this scale (15 chapters, a few dozen lessons); would need revisiting if the app's interactivity grows significantly more complex.
- Upgrading the editor or adopting a framework later are both isolated, additive changes — this decision doesn't lock those doors, it just declines them for v1.

## Addendum (2026-07-17) — fourth panel: Errors, plain (not tabbed)
Decided: add a fourth panel — **Errors**, spanning the full width beneath the three main panes — separate from Output. A test run surfaced the motivating case directly: a `NameError` was rendering inline inside the Output pane, visually indistinguishable from normal `print()` output.

Considered making the bottom area a tabbed panel (Errors / Output / other future tabs) instead of a single dedicated Errors panel. Rejected for v1: with only one real second tenant (Output, which already has its own pane) and everything else purely speculative (a notes/scratch tab, a multi-check test-results tab, an on-demand hints tab), tabs add a click at exactly the moment a confused kid needs less friction, not more. A plain panel that's empty/hidden when there's no error, and appears with a red border the moment there is one, needs no explanation beyond "if that shows up, something went wrong."

Implementation: the Errors panel is `hidden` (collapses out of the grid) whenever there's nothing to show, and reappears with the traceback text whenever a Python exception occurs. Revisit tabs only if a second genuine (non-speculative) tenant for that space shows up later.
