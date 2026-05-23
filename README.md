# Airbnb Clone

This repository contains a small Airbnb-style demo app with a TypeScript Express backend (SQLite) and a React + Vite frontend.

## Prerequisites

- Node.js (v16+ recommended)
- npm

## Install dependencies

Install dependencies for both subprojects:

```bash
cd backend
npm install

cd ../frontend
npm install
```

Or from the repository root:

```bash
npm --prefix backend install
npm --prefix frontend install
```

## Development

From the repository root you can run a single command which will:
- run the backend seeder
- start the backend on `PORT=5001`
- start the Vite frontend dev server

```bash
npm run dev
```

The runner script `scripts/dev.sh` seeds the DB first, starts the backend in the background, and then launches the frontend. When the frontend exits, the backend process will be stopped.

### Individual commands

- Seed the database:
  - `cd backend && npm run seed`
- Start backend dev server on port 5001:
  - `cd backend && PORT=5001 npm run dev`
- Start frontend dev server:
  - `cd frontend && npm run dev`

## Production build

Build frontend and backend:

```bash
npm run build
```

This runs the frontend build and compiles the backend TypeScript.

## Notes

- Backend listens on `process.env.PORT` (defaults to `5000`). The dev runner sets `PORT=5001` to avoid macOS reserved ports conflicts.
# airbnb-clone
