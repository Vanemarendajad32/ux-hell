# --- Build stage ---

FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
ENV CI=true
RUN corepack enable && corepack prepare pnpm@10.32.1 --activate && pnpm install --frozen-lockfile && pnpm build

# --- Production stage ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/package.json package.json
COPY --from=builder /app/pnpm-lock.yaml pnpm-lock.yaml
COPY --from=builder /app/next.config.ts next.config.ts
COPY --from=builder /app/tsconfig.json tsconfig.json
## .env is not required for all builds; skip if not present
# COPY --from=builder /app/.env .env
RUN corepack enable && corepack prepare pnpm@10.32.1 --activate && pnpm install --prod --frozen-lockfile

EXPOSE 3000
CMD ["pnpm", "start"]
