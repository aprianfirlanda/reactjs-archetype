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
