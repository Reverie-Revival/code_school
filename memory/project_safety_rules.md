---
name: project-safety-rules
description: Safety/privacy rules for Code School — the app serves minors and stores per-kid progress data
metadata:
  type: project
---

This app serves minors (James's two sons) and stores per-kid progress data in Supabase.

- No real authentication — profile selection (name/avatar) is for separating progress records only, not identity verification. Never suggest adding password auth, email collection, or anything that treats the profile picker as real login; that's a deliberate scope choice, not an oversight.
- Row Level Security on the `python_learning` schema must keep each kid's progress rows isolated from the other's, even without real login — treat RLS policy correctness as a real requirement, not boilerplate.
- No PII beyond a display name/avatar should be collected or stored. If a feature idea would require collecting more (email, birthdate, location, etc.), flag it — that's outside what this app should be doing.
- Content (lessons, error messages, feedback copy) should stay age-appropriate and encouraging — this is being built for a total-beginner kid, tone matters as much as correctness.

**Why:** Minors + a database, even a low-stakes family one, means privacy defaults matter even without a formal compliance requirement.

**How to apply:** Apply this whenever touching the Supabase schema, RLS policies, profile picker, or any lesson/error-message copy aimed at the kids.
