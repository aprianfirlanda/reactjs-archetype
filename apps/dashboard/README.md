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
docker build -f apps/dashboard/Dockerfile -t reactjs-archetype-dashboard .
```

Override the Docker image base path:

```sh
docker build -f apps/dashboard/Dockerfile --build-arg VITE_BASE_PATH=/reports/ -t reactjs-archetype-dashboard .
```
