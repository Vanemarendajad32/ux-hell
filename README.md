# UX Hell

## Project Context

UX Hell is an application built as a series of intentional UX-challenge games.
Users are guided through playful but difficult interaction flows where some behaviors (including certain forms) may be intentionally confusing, broken, or non-standard.
The goal is for users to complete tasks through this game-like journey while completion and interaction time are measured.

When reviewing or extending the app, do not automatically fix unusual UX behavior.
Some odd patterns are intentional by design; flag them and confirm with the team before changing them.

## Repository Structure

- `frontend/`: Next.js 16 + React 19 + TypeScript + Biome.
- `backend/`: Spring Boot 4 (Java 21) + PostgreSQL + Flyway.

## AI Agent Guidance

This repository includes agent instructions in [`AGENTS.md`](./AGENTS.md).

Team-shared skills are stored in `.agents/skills/`:
- `react-next-best-practices` for Next.js/React work in `frontend/`.

When working with AI tools, reference the skill name explicitly (for example: `use react-next-best-practices`) for frontend writing, review, refactor, and debugging tasks.

Changes to `AGENTS.md` and `.agents/skills/**` should be reviewed in PRs like code changes.

## Prerequisites

### Frontend

This project uses `pnpm` as the only supported package manager.

If `pnpm` is not available in your shell, activate it with Corepack:

```bash
corepack enable
corepack prepare pnpm@10.32.1 --activate
hash -r
pnpm -v
```

Make sure `frontend/package.json` has:

```json
{
  "packageManager": "pnpm@10.32.1"
}
```

### Backend

- Java 21
- Docker / Docker Compose

## Setup and Run

### Frontend

Run all commands from `frontend/`:

```bash
cd frontend
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

You can start editing by modifying `frontend/app/page.tsx`; the page auto-updates as you edit.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to optimize and load [Geist](https://vercel.com/font).

### Backend

Run all commands from `backend/`.

1. Create `.env` in `backend/`.
2. Copy content from `backend/.example_env` into `.env` and follow the instructions in that file.
3. Start backend + database:

```bash
cd backend
docker compose up --build
```

(`docker-compose up --build` also works.)

The Maven clean/package step is included in the backend Dockerfile, so building the Docker image sets it up.

#### Monitoring

1. Specify new values for the PROMETHEUS_BASIC_AUTH_PASSWORD and GRAFANA_ADMIN_PASSWORD values within the `.env` file.
2. Also create a file [monitoring/secrets/prometheus_basic_auth_password](monitoring/secrets/prometheus_basic_auth_password) and add a single line within that file containing the PROMETHEUS_BASIC_AUTH_PASSWORD value

## Common Commands

### Frontend (`frontend/`)

- `pnpm dev`: start local Next.js development server with hot reload.
- `pnpm build`: create optimized production build.
- `pnpm start`: start production server.
- `pnpm lint`: run Biome checks (quality + formatting validation) without modifying files.
- `pnpm format`: apply Biome formatting fixes.

### Backend (`backend/`)

- `docker compose up --build`: run backend + PostgreSQL in containers.
- `./mvnw test`: run backend tests locally.
- `./mvnw clean package`: build backend locally.

## API and Local Endpoints

- Backend base URL: `http://localhost:8080`
- Health check: `http://localhost:8080/health`
- Swagger UI: `http://localhost:8080/swagger-ui.html`

## Frontend Tracking Foundation (Sprint 1)

- Tracking functions: `frontend/lib/tracking`
- Payload validation schema: `frontend/schemas/tracking-schema.ts`
- Demo UI route: `/tracking-demo`
- Demo API endpoint: `POST /api/tracking`
- Additional details: `frontend/docs/tracking-foundation.md`

## Troubleshooting

If you see:

`ENOTFOUND registry.npmjs.org`

this is a network/DNS issue (not a pnpm config issue). Check internet/VPN/firewall and retry:

```bash
cd frontend
pnpm install
```
