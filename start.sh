#!/bin/bash

# Artist OS - Complete Startup Script
# This script starts all services: Database, Backend, and Frontend

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}"
echo "╔════════════════════════════════════════════════════════════╗"
echo "║           🎵 Artist OS - Complete Startup 🎵              ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Check prerequisites
echo -e "${YELLOW}Checking prerequisites...${NC}"

if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed${NC}"
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    exit 1
fi

if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Python 3 is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Prerequisites OK${NC}"

# Check .env file
if [ ! -f .env ]; then
    echo -e "${YELLOW}Creating .env file from .env.example...${NC}"
    cp .env.example .env
    echo -e "${YELLOW}⚠️  Please update .env with your API keys!${NC}"
    echo -e "${YELLOW}⚠️  Required keys: SPOTIFY_*, TUNECORE_*, INSTAGRAM_*, META_*, OPENAI_*${NC}"
fi

# Start Database
echo -e "${YELLOW}Starting PostgreSQL database...${NC}"
docker-compose up -d

# Wait for database to be ready
echo -e "${YELLOW}Waiting for database to be ready...${NC}"
sleep 5

# Check database connection
if docker-compose exec db pg_isready -U $(grep DB_USER .env | cut -d '=' -f2) &> /dev/null; then
    echo -e "${GREEN}✓ Database is ready${NC}"
else
    echo -e "${RED}❌ Database failed to start${NC}"
    exit 1
fi

# Start Backend
echo -e "${YELLOW}Starting FastAPI backend...${NC}"
cd backend

if [ ! -d "venv" ]; then
    echo -e "${YELLOW}Creating Python virtual environment...${NC}"
    python3 -m venv venv
    source venv/bin/activate
    pip install --upgrade pip
    pip install poetry
    poetry install
else
    source venv/bin/activate
fi

# Start backend in background
echo -e "${YELLOW}Starting backend server (http://localhost:8000)...${NC}"
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!

cd ..

# Start Frontend
echo -e "${YELLOW}Starting Next.js frontend...${NC}"
cd frontend

if [ ! -f ".env.local" ]; then
    echo -e "${YELLOW}Creating .env.local file...${NC}"
    cp .env.local.example .env.local
fi

if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing frontend dependencies...${NC}"
    npm install
fi

# Start frontend in background
echo -e "${YELLOW}Starting frontend server (http://localhost:3000)...${NC}"
npm run dev &
FRONTEND_PID=$!

cd ..

# Success message
echo ""
echo -e "${GREEN}"
echo "╔════════════════════════════════════════════════════════════╗"
echo "║             🎵 Artist OS is running! 🎵                   ║"
echo "├════════════════════════════════════════════════════════════┤"
echo "║ Frontend:   http://localhost:3000                         ║"
echo "║ Backend:    http://localhost:8000                         ║"
echo "║ API Docs:   http://localhost:8000/docs                    ║"
echo "║ Database:   localhost:5432                                 ║"
echo "├════════════════════════════════════════════════════════════┤"
echo "║ Press Ctrl+C to stop all services                         ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Keep script running and handle signals
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; docker-compose down" EXIT INT TERM

wait
