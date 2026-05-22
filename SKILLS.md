# Project Skills

Small, repeatable workflows for this repository.

The repo-local skill source lives at:

```text
.codex/skills/reactjs-archetype/SKILL.md
```

This file is repo documentation. To make the skill auto-discoverable by Codex across sessions, copy or symlink the repo-local skill folder into `~/.codex/skills/reactjs-archetype`.

## Add A New App

Use this when adding another React app under `apps/*`.

1. Create the app from the Vite React TypeScript template.
2. Set the app package name to `@reactjs-archetype/<app-name>`.
3. Add internal dependencies with `workspace:*`.
4. Configure the Vite `base`.
5. Add app-local `.env`, `.env.example`, and `Dockerfile`.
6. Add root dev, build, and preview scripts.
7. Add a smoke test.
8. Run `bun install` and the full validation suite.

## Frontend App Baseline

Use this when creating or updating frontend apps.

1. Use React Router for routes.
2. Use Tailwind CSS through `@tailwindcss/vite`.
3. Use Headless UI for accessible dialogs, menus, and disclosure patterns.
4. Use Heroicons for standard app icons.
5. Use `clsx` for conditional class names.
6. Declare these dependencies in each app that imports them.
7. Move reusable UI primitives into `packages/ui`; keep app-specific layouts inside the app until reused.

## Dashboard Admin Module

Use this when changing the `apps/dashboard` module template.

1. Keep `/login` as the public template login route.
2. Keep protected module routes under the admin layout.
3. Keep `/modules` as the post-login module menu/list page.
4. Store `access_token` and `refresh_token` in browser `localStorage`.
5. Protect routes by checking for `access_token`.
6. Keep real refresh-token execution out of the template unless backend auth is being implemented.

## Backend Service Calls

Use this when adding backend integrations.

1. Put fetch wrappers and resource services under app-local `src/services`.
2. Use native `fetch`.
3. Call relative `/backend/*` URLs from frontend code.
4. Configure development reverse proxy with `VITE_API_PROXY_TARGET` and Vite `server.proxy['/backend']`.
5. Attach `Authorization: Bearer <access_token>` when an access token exists.
6. Add focused tests for service helpers and error handling.

## Add A New Package

Use this when adding shared code under `packages/*`.

1. Create `packages/<package-name>/src`.
2. Add a package named `@reactjs-archetype/<package-name>`.
3. Export from `src/index.ts`.
4. Add `tsconfig.json` extending `../../tsconfig.base.json`.
5. Add `build`, `typecheck`, and `test` scripts.
6. Add a smoke test.
7. Add the package to any consuming app with `workspace:*`.

## Rename An App

Use this when changing app names after the template is copied.

1. Rename the folder under `apps/`.
2. Rename the package in that app's `package.json`.
3. Update root scripts and all `bun --filter` references.
4. Update URLs, labels, tests, and README files.
5. Run `bun install`.
6. Run `bun run typecheck`, `bun run lint`, `bun run test`, and `bun run build`.

## Change Module Base Path

Use this when the module app should deploy somewhere other than `/dashboard/`.

1. Change the default in the module app's `vite.config.ts`.
2. Update shared URLs in `packages/shared/src/index.ts`.
3. Update tests that assert the old URL.
4. Verify with the matching root build script, for example `env VITE_BASE_PATH=/new-path/ bun run build:dashboard`.
