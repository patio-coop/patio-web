# Patio Web

New Patio website implemented with Next.js, React, and TypeScript.

## Requirements

- Node.js 20 or newer
- npm
- Docker and Docker Compose, for production-like local runs and deploy builds

## Installation

From the project root:

```sh
cd /Users/martinvallone/dev/patio-web
npm install
```

## Local Development

```sh
cd /Users/martinvallone/dev/patio-web
npm run dev
```

Then open:

```text
http://localhost:3000
```

If port `3000` is already in use, Next.js may offer another port. You can also force the local host:

```sh
cd /Users/martinvallone/dev/patio-web/apps/web
npm run dev -- -H 127.0.0.1
```

The same workflow is available through `make`:

```sh
make install
make dev
```

## Production Build

The app is configured with Next.js `output: "standalone"` so it can be deployed as a small self-contained Node.js server.

Build locally:

```sh
make build
```

Run the production server after building:

```sh
make start
```

## Docker

Build the production Docker image:

```sh
make docker-build
```

Run it with Docker Compose:

```sh
make docker-up
```

Then open:

```text
http://localhost:3000
```

If port `3000` is already in use:

```sh
make WEB_PORT=3001 docker-up
```

Then open:

```text
http://localhost:3001
```

Stop the container:

```sh
make docker-down
```

Useful Docker targets:

```sh
make docker-logs
make docker-shell
```

## Validate Changes

Before shipping changes, run:

```sh
cd /Users/martinvallone/dev/patio-web
make validate
```

Available scripts from the root:

```sh
npm run dev
npm run build
npm run start
npm run typecheck
npm run lint
```

Available Makefile targets:

```sh
make help
make install
make dev
make build
make start
make typecheck
make lint
make validate
make clean
make docker-build
make docker-up
make docker-down
make docker-logs
make docker-shell
```

## Project Structure

```text
apps/web/
  app/                 Next.js routes
  components/          Main website components
  data/                Structured homepage content
  public/assets/       Images and resources exported from Figma
  public/fonts/        Local fonts
```

## Notes

- The homepage uses `cobe` for the animated hero globe.
- Community images are stored in `apps/web/public/assets/community`.
- Figma exports are stored in `apps/web/public/assets/figma`.
- The current legal pages are placeholders: `/privacy`, `/terms`, and `/cookies`.
- Docker is intended for production-like runs and deploys. For daily UI work, the local `npm run dev` or `make dev` workflow is faster.
