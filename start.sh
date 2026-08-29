#!/bin/bash
# Local Lens Start Script

echo "=========================================="
echo "Starting Local Lens Full-Stack Application"
echo "=========================================="

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# 1. Start FastAPI Backend on Port 8000
echo "Starting FastAPI Backend on http://localhost:8000..."
cd "$DIR/backend"
python3 -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload &
BACKEND_PID=$!

# 2. Start Next.js Frontend on Port 3000
echo "Starting Next.js Frontend on http://localhost:3000..."
cd "$DIR/frontend"
npm run dev -- -p 3000 &
FRONTEND_PID=$!

echo "=========================================="
echo "Backend running on http://localhost:8000"
echo "Frontend running on http://localhost:3000"
echo "Press Ctrl+C to stop all servers."
echo "=========================================="

wait $BACKEND_PID $FRONTEND_PID
