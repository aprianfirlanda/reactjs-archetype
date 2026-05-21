# ReactJS Archetype

Bun workspace monorepo for React app templates.

## Structure

```text
apps/
  portal/      Root app served at /
  dashboard/   Example module app served at /dashboard/
packages/
  shared/      Shared constants, helpers, and types
  ui/          Shared UI package placeholder
```

## Requirements

- Bun `1.4.0`

Install dependencies:

```sh
bun install
```

## Development

Run the portal app:

```sh
bun run dev:portal
```

Portal URL:

```text
http://localhost:5173/
```

Run the dashboard module app:

```sh
bun run dev:dashboard
```

Dashboard URL:

```text
http://localhost:5174/dashboard/
```

The dashboard app shows a local-only login in development. In production it renders the module directly and assumes the user already authenticated through the portal.

## Scripts

Build every app and package:

```sh
bun run build
```

Build one app:

```sh
bun run build:portal
bun run build:dashboard
```

Preview one built app:

```sh
bun run preview:portal
bun run preview:dashboard
```

Validate and format:

```sh
bun run typecheck
bun run lint
bun run test
bun run format
```

## Add A New App

Create a new Vite React TypeScript app:

```sh
bun create vite apps/reports --template react-ts
```

Update `apps/reports/package.json`:

```json
{
  "name": "@reactjs-archetype/reports",
  "private": true,
  "type": "module",
  "dependencies": {
    "@reactjs-archetype/shared": "workspace:*",
    "@reactjs-archetype/ui": "workspace:*"
  }
}
```

Add or keep the usual scripts in that app:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "typecheck": "tsc -b --noEmit",
    "test": "bun test",
    "preview": "vite preview"
  }
}
```

Configure the app base path in `apps/reports/vite.config.ts`:

```ts
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

function normalizeBasePath(path = '/reports/') {
  const prefixed = path.startsWith('/') ? path : `/${path}`
  return prefixed.endsWith('/') ? prefixed : `${prefixed}/`
}

export default defineConfig({
  base: normalizeBasePath(process.env.VITE_BASE_PATH),
  server: {
    port: 5175,
  },
  plugins: [react()],
})
```

Add a root script in `package.json`:

```json
{
  "scripts": {
    "dev:reports": "bun --filter @reactjs-archetype/reports dev",
    "build:reports": "bun --filter @reactjs-archetype/reports build",
    "preview:reports": "bun --filter @reactjs-archetype/reports preview"
  }
}
```

Refresh and validate:

```sh
bun install
bun run typecheck
bun run lint
bun run test
bun run build
```

## Add A New Package

Create package files:

```sh
mkdir -p packages/forms/src
```

Create `packages/forms/package.json`:

```json
{
  "name": "@reactjs-archetype/forms",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "exports": {
    ".": "./src/index.ts"
  },
  "scripts": {
    "build": "tsc --noEmit",
    "typecheck": "tsc --noEmit",
    "test": "bun test"
  },
  "devDependencies": {
    "@types/bun": "1.3.14",
    "typescript": "latest"
  }
}
```

Create `packages/forms/tsconfig.json`:

```json
{
  "extends": "../../tsconfig.base.json",
  "include": ["src"]
}
```

Create `packages/forms/src/index.ts`:

```ts
export const formsPackageName = '@reactjs-archetype/forms'
```

Add it to an app:

```sh
bun add @reactjs-archetype/forms@workspace:* --cwd apps/portal
```

Validate:

```sh
bun install
bun run typecheck
bun run lint
bun run test
bun run build
```

## Rename An App

Example: rename `dashboard` to `reports`.

Rename the folder:

```sh
mv apps/dashboard apps/reports
```

Update `apps/reports/package.json`:

```json
{
  "name": "@reactjs-archetype/reports"
}
```

Update root scripts in `package.json`:

```json
{
  "scripts": {
    "dev:reports": "bun --filter @reactjs-archetype/reports dev",
    "build:reports": "bun --filter @reactjs-archetype/reports build",
    "preview:reports": "bun --filter @reactjs-archetype/reports preview"
  }
}
```

Update any old name references:

```sh
rg "dashboard|@reactjs-archetype/dashboard|dev:dashboard|/dashboard"
```

Typical files to update:

- `packages/shared/src/index.ts`
- `packages/shared/src/index.test.ts`
- `apps/portal/src/App.tsx`
- `apps/portal/src/workspace.test.ts`
- `apps/reports/vite.config.ts`
- `apps/reports/README.md`

Refresh and validate:

```sh
bun install
bun run typecheck
bun run lint
bun run test
bun run build
```

## Change A Module Base Path

The dashboard module defaults to `/dashboard/`.

For a one-off build:

```sh
env VITE_BASE_PATH=/reports/ bun run build:dashboard
```

To permanently change the default, update:

- `apps/dashboard/vite.config.ts`
- `packages/shared/src/index.ts`
- related tests and README files
