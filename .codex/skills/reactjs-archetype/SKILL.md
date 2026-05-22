---
name: reactjs-archetype
description: Use when working in the reactjs-archetype repository, a Bun workspace monorepo for React templates with apps under apps/*, shared packages under packages/*, portal and dashboard admin example apps, Vite base/proxy behavior, Tailwind, React Router, Biome, and Bun test/typecheck/build workflows.
metadata:
  short-description: Work on the Bun React archetype repo
---

# ReactJS Archetype

Use this skill for work in `/Users/aprianfirlanda/Documents/Coding/Github/reactjs-archetype`.

## Project Shape

- Bun workspace monorepo.
- Apps live in `apps/*`.
- Shared packages live in `packages/*`.
- Internal packages use `workspace:*`.
- Root app: `apps/portal`, package `@reactjs-archetype/portal`, base `/`.
- Module admin example: `apps/dashboard`, package `@reactjs-archetype/dashboard`, default base `/dashboard/`.
- Shared constants/auth/fetch helpers: `packages/shared`.
- Shared UI, app shell layouts, login pages, not-found pages, and theme CSS: `packages/ui`.
- Frontend baseline: React Router, Tailwind CSS via `@tailwindcss/vite`, Headless UI, Heroicons, and `clsx`.

## Commands

Run from the repository root:

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

Use `bun run format` only when intentionally rewriting formatting.
Use `bun run build` for the full monorepo build, `bun run build:portal` for only the portal app, and `bun run build:dashboard` for only the dashboard app.

## App Workflow

When adding an app:

1. Create it under `apps/<app-name>`.
2. Name it `@reactjs-archetype/<app-name>`.
3. Add internal dependencies with `workspace:*`.
4. Configure Vite `base` from app-local `VITE_BASE_PATH`; module apps should support base path overrides.
5. Add app-local `.env.local`, `.env.example`, and `Dockerfile`.
6. Add root `dev:<app-name>`, `build:<app-name>`, and `preview:<app-name>` scripts using `bun --filter`.
7. Add a smoke test.
8. Run `bun install` and validation.

When building frontend app UI:

1. Use React Router for app routes.
2. Use Tailwind CSS through `@tailwindcss/vite`.
3. Use Headless UI for accessible app interactions such as dialogs and menus.
4. Use Heroicons for navigation and action icons.
5. Use `clsx` for conditional class names.
6. Declare each imported frontend library in the consuming workspace package.
7. Put reusable primitives, app shell layouts, login pages, not-found pages, and theme CSS in `packages/ui`.
8. Apps should import `@reactjs-archetype/ui/theme.css` from their entry CSS.
9. Keep app-specific route definitions, navigation data, and domain pages inside the app.

For the dashboard admin module:

1. Keep `/login` public.
2. Keep `/modules` as the post-login module menu/list page.
3. Keep protected pages under the admin layout.
4. Store `access_token` and `refresh_token` in browser `localStorage`.
5. Protect routes by checking for `access_token`.
6. Keep real refresh-token execution out of the template unless backend auth is being implemented.

For backend calls:

1. Put shared fetch wrappers in `packages/shared`.
2. Put app-specific resource services under app-local `src/services`.
3. Use native `fetch`.
4. Frontend code should call relative `/backend/*` URLs.
5. In development, use `VITE_API_PROXY_TARGET` with Vite `server.proxy['/backend']`; rewrite `/backend` to `/` only for `localhost` or `127.0.0.1` targets.
6. Attach `Authorization: Bearer <access_token>` when an access token exists.
7. Add focused tests for service helpers and error handling.

When renaming an app:

1. Rename `apps/<old-name>` to `apps/<new-name>`.
2. Update the package name.
3. Update root scripts and `bun --filter` references.
4. Update shared URLs/display names, tests, and README files.
5. Run `bun install` and validation.

## Package Workflow

When adding a package:

1. Create `packages/<package-name>/src`.
2. Name it `@reactjs-archetype/<package-name>`.
3. Export from `src/index.ts`.
4. Add `tsconfig.json` extending `../../tsconfig.base.json`.
5. Add `build`, `typecheck`, and `test` scripts.
6. Add a smoke test.
7. Add it to consumers with `workspace:*`.

## Validation

Before finishing code changes, run:

```sh
bun run typecheck
bun run lint
bun run test
bun run build
```

For module base path changes, also run:

```sh
env VITE_BASE_PATH=/reports/ bun run build:dashboard
```
