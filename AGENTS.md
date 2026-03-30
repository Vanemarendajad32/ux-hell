# AGENTS.md

## Purpose
Operational instructions for coding agents working in this repository.
The goal is to make safe, focused changes in a split frontend/backend codebase.

## Product Context (UX Hell)
- This repository powers **UX Hell**, an application built as a series of intentional UX-challenge games.
- Users move through playful but difficult interaction flows where some UI behaviors (including certain forms) may be intentionally confusing, broken, or non-standard.
- The product goal is to let users complete tasks through this game-like journey while measuring completion and interaction time.

### Important Development Rule
- If you notice unusual behavior in forms or user flows, do not immediately fix it.
- Many odd patterns are intentional and part of the experience design.
- You should flag the behavior, explain why it appears non-standard, and ask whether it should be fixed or kept as intentional behavior.
- Only implement a fix after confirmation that the behavior is not intentional.

## Repo Layout
- `frontend/`: Next.js 16 + React 19 + TypeScript + Biome.
- `backend/`: Spring Boot 4 (Java 21) + PostgreSQL + Flyway.
- Root: coordination docs only (no root `package.json`).

## Team Skills
- Shared repository skills live under `.agents/skills/`.
- React/Next.js frontend work should use:
  - `.agents/skills/react-next-best-practices/SKILL.md`
- Trigger this skill for tasks in `frontend/` involving React components, hooks, App Router pages/layouts, forms, async data flow, rendering issues, and frontend code review.

## Setup
- Frontend prerequisites:
  - `corepack enable`
  - `corepack prepare pnpm@10.32.1 --activate`
  - Run all frontend package commands from `frontend/`.
- Backend prerequisites:
  - Java 21 for local Maven runs.
  - Docker Desktop for containerized backend+db startup.

## Run Commands
- Frontend:
  - Install: `cd frontend && pnpm install`
  - Dev: `cd frontend && pnpm dev`
  - Build: `cd frontend && pnpm build`
  - Start production build: `cd frontend && pnpm start`
  - Lint/check: `cd frontend && pnpm lint`
  - Format: `cd frontend && pnpm format`
- Backend:
  - Run backend + postgres with Docker: `cd backend && docker compose up --build` (or `cd backend && docker-compose up --build`)
  - Run tests locally: `cd backend && ./mvnw test`
  - Package locally: `cd backend && ./mvnw clean package`

## Validation Before Finishing
- For frontend-only changes:
  - `cd frontend && pnpm lint`
  - `cd frontend && pnpm build` for non-trivial changes.
- For backend-only changes:
  - `cd backend && ./mvnw test`
- For full-stack changes touching both sides:
  - Run both checks above.

## Coding Conventions
- Respect `.editorconfig`:
  - UTF-8, LF, trim trailing whitespace, final newline.
  - Default indent 2 spaces, Java indent 4 spaces.
- Frontend:
  - TypeScript first.
  - Keep components in existing structure under `app/`, `components/`, and `lib/`.
  - Use existing Biome rules; do not add a second formatter/linter.
- Backend:
  - Preserve package structure under `com.uihell.backend`.
  - Keep controllers/services/repositories separated by responsibility.
  - Use Flyway migrations for schema changes in `backend/src/main/resources/db/migration/`.

## API and Data Notes
- Backend default URL: `http://localhost:8080`
- Health endpoint: `/health`
- Swagger UI: `/swagger-ui.html`
- Default local DB config points to PostgreSQL database `uihell` with `postgres/postgres`.

## Safety Rules
- Never commit or expose secrets from `.env*` or local config overrides.
- Never manually edit generated/build artifacts:
  - `frontend/.next/`, `frontend/dist/`, `backend/target/`
- Avoid broad refactors unrelated to the requested task.
- Do not change ports (`3000` frontend, `8080` backend, `5432` postgres) unless explicitly requested.
- Do not replace `pnpm` with `npm` or `yarn` in this repo.

## Change Scope Rules
- Keep edits minimal and task-focused.
- Preserve backward-compatible API behavior unless the task explicitly asks for a breaking change.
- If modifying contracts (DTOs, payloads, response shape), update both backend and frontend callsites in the same change.

## PR Checklist
- [ ] Change is limited to requested scope.
- [ ] Relevant checks pass (frontend lint/build, backend tests).
- [ ] No secrets or env files added.
- [ ] Documentation updated when behavior or commands changed.
