#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "Running backend seeder..."
cd backend
npm run seed

echo "Starting backend (PORT=5001)..."
PORT=5001 npm run dev &
BACKEND_PID=$!

# Ensure we kill backend on exit
cleanup() {
  echo "Stopping backend (pid $BACKEND_PID)..."
  kill "$BACKEND_PID" 2>/dev/null || true
}
trap cleanup EXIT

echo "Starting frontend..."
cd "$ROOT_DIR/frontend"
npm run dev

# When frontend exits, script will exit and cleanup trap will run
