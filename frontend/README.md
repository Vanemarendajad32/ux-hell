This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

This project uses `pnpm` as the only supported package manager.

If `pnpm` is not available in your shell, activate it with Corepack:

```bash
corepack enable
corepack prepare pnpm@10.32.1 --activate
hash -r
pnpm -v
```

Make sure `package.json` has:

```json
{
  "packageManager": "pnpm@10.32.1"
}
```

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Scripts

Run these commands inside `frontend/`.

- `pnpm dev`
  - Starts the local Next.js development server with hot reload.
- `pnpm build`
  - Creates an optimized production build of the frontend.
- `pnpm lint`
  - Runs Biome checks (code quality + formatting validation) without changing files.
- `pnpm format`
  - Applies Biome formatting fixes to files in place.

## Tracking foundation (Sprint 1)

- Tracking functions are in `lib/tracking`.
- Payload validation schema is in `schemas/tracking-schema.ts`.
- Demo UI is available at `/tracking-demo`.
- Demo API endpoint is `POST /api/tracking`.

More details: `docs/tracking-foundation.md`.

## Troubleshooting install

If you see `ERR_PNPM_INVALID_WORKSPACE_CONFIGURATION packages field missing or empty`,
make sure `pnpm-workspace.yaml` contains:

```yaml
packages:
  - "."
```

If you see `ENOTFOUND registry.npmjs.org`, this is a network/DNS problem (not a pnpm config problem). Check internet/VPN/firewall and retry:

```bash
pnpm install
```
