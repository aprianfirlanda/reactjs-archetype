# Portal App

Root application example for the ReactJS archetype.

```sh
bun run dev:portal
bun run build:portal
bun run preview:portal
```

Default base path is configured in `.env.local` as `/`.

Build the Docker image from the repository root:

```sh
bun run build:portal
docker build -f apps/portal/Dockerfile -t reactjs-archetype-portal .
```

This app is served at `/` and demonstrates the primary login boundary.
