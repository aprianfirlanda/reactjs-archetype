# Dashboard Module App

Module application example for the ReactJS archetype.

```sh
bun run dev:dashboard
bun run build:dashboard
bun run preview:dashboard
```

Default base path is `/dashboard/`.

Override it with `VITE_BASE_PATH=/reports/ bun run build:dashboard`.

Build the Docker image from the repository root:

```sh
bun run build:dashboard
docker build -f apps/dashboard/Dockerfile -t reactjs-archetype-dashboard .
```

Override the Docker image base path by building the Vite artifact first:

```sh
env VITE_BASE_PATH=/reports/ bun run build:dashboard
docker build -f apps/dashboard/Dockerfile -t reactjs-archetype-dashboard .
```
