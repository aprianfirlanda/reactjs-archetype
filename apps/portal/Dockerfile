# syntax=docker/dockerfile:1

FROM oven/bun:1.4.0-alpine AS deps
WORKDIR /app

COPY package.json bun.lock ./
COPY apps/portal/package.json apps/portal/package.json
COPY apps/dashboard/package.json apps/dashboard/package.json
COPY packages/shared/package.json packages/shared/package.json
COPY packages/ui/package.json packages/ui/package.json
RUN bun install --frozen-lockfile

FROM deps AS build
ARG VITE_BASE_PATH=/
ENV VITE_BASE_PATH=$VITE_BASE_PATH

COPY tsconfig.base.json ./
COPY apps/portal apps/portal
COPY packages packages
RUN bun run build:portal

FROM nginx:1.29-alpine AS runtime
COPY --from=build /app/apps/portal/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
