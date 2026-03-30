# UX Hell
Training project

## Project Context

UX Hell is an application built as a series of intentional UX-challenge games.
Users are guided through playful but difficult interaction flows where some behaviors (including certain forms) may be intentionally confusing, broken, or non-standard.
The goal is for users to complete tasks through this game-like journey while completion and interaction time are measured.

When reviewing or extending the app, do not automatically fix unusual UX behavior.
Some odd patterns are intentional by design; flag them and confirm with the team before changing them.

## AI Agent Guidance

This repository includes agent instructions in [`AGENTS.md`](./AGENTS.md).

Team-shared skills are stored in `.agents/skills/`:
- `react-next-best-practices` for Next.js/React work in `frontend/`.

When working with AI tools, reference the skill name explicitly (for example: "use `react-next-best-practices`") for frontend writing, review, refactor, and debugging tasks.

Changes to `AGENTS.md` and `.agents/skills/**` should be reviewed in PRs like code changes.
