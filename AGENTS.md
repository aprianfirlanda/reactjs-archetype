# AGENTS.md

Guidance for coding agents working in this repository.

Also use the repo-local Codex skill at `.codex/skills/reactjs-archetype/SKILL.md` when available. The human-readable workflow copy is in `SKILLS.md`.

## Project Shape

This is a Bun workspace monorepo for React app templates.

- Apps live in `apps/*`.
- Shared packages live in `packages/*`.
- Internal dependencies use `workspace:*`.
- The root app is `@reactjs-archetype/portal` in `apps/portal`.
- The module admin example app is `@reactjs-archetype/dashboard` in `apps/dashboard`.

## Commands

Run commands from the repository root.

```sh
bun install
bun run dev:portal
bun run dev:dashboard
bun run build:portal
bun run build:dashboard
bun run preview:portal
bun run preview:dashboard
bun run typecheck
bun run lint
bun run test
bun run build
```

Use `bun run lint` to check formatting and lint rules. Use `bun run format` only when intentionally rewriting formatting.
Use `bun run build` for the full monorepo build, `bun run build:portal` for only the portal app, and `bun run build:dashboard` for only the dashboard app.

## Conventions

- Keep app workspace package names under `@reactjs-archetype/*`.
- Keep app folders lowercase and URL-friendly, for example `portal`, `dashboard`, or `reports`.
- Each app should have its own `package.json`, `vite.config.ts`, `tsconfig*.json`, `src`, and `public`.
- Each app should have its own `.env`, `.env.example`, and `Dockerfile`.
- Vite app base paths should come from `VITE_BASE_PATH` through app-local env files.
- Frontend apps use React Router, Tailwind CSS, Headless UI, Heroicons, and `clsx`.
- Declare frontend libraries in every workspace that imports them; do not rely on root-only undeclared imports.
- Shared runtime constants, auth/token helpers, and fetch helpers belong in `packages/shared`.
- Shared UI building blocks, app shell layouts, login pages, and not-found pages belong in `packages/ui`.
- Shared theme CSS belongs in `packages/ui`; apps should import `@reactjs-archetype/ui/theme.css` from their entry CSS.
- App-specific route definitions, navigation data, resource services, and domain pages should stay inside the app.
- Frontend code should call relative `/backend/*` URLs. In development, configure Vite `server.proxy['/backend']` using `VITE_API_PROXY_TARGET`.
- Template auth uses `access_token` and `refresh_token` in browser `localStorage`; protected routes only check for `access_token` unless real auth is implemented.
- Prefer adding a smoke test for each new app/package so `bun run test` stays meaningful.
- After renaming, adding, or removing a workspace, run `bun install` to refresh `bun.lock`.

## Validation

Before handing work back, run:

```sh
bun run typecheck
bun run lint
bun run test
bun run build
```

If changing the dashboard/module base path behavior, also verify a custom base:

```sh
env VITE_BASE_PATH=/reports/ bun run build:dashboard
```

Build Docker images from the repository root so workspace packages are available:

```sh
docker build -f apps/portal/Dockerfile -t reactjs-archetype-portal .
docker build -f apps/dashboard/Dockerfile -t reactjs-archetype-dashboard .
```

## Rename Checklist

When renaming an app, update all of these:

- `apps/<old-name>` folder to `apps/<new-name>`.
- The app package name in `apps/<new-name>/package.json`.
- Root scripts in `package.json`.
- Shared display names and URLs in `packages/shared/src/index.ts`.
- Tests in `packages/shared/src/index.test.ts` and affected app test files.
- App README files.
- Vite `base` defaults when the public URL path changes.
