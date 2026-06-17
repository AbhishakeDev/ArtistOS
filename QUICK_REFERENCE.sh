#!/bin/bash
# Artist OS - Developer Quick Reference
# Save this file or copy commands for quick access

# ==========================================
# QUICK START
# ==========================================

# Full startup (all services)
cd /Volumes/MAC\ EXT\ II/CODE/Artist\ Dashboard\ V1
./start.sh

# Or start manually in separate terminals:

# Terminal 1 - Database
docker-compose up -d

# Terminal 2 - Backend
cd backend
source venv/bin/activate
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Terminal 3 - Frontend
cd frontend
npm run dev

# ==========================================
# ENVIRONMENT SETUP
# ==========================================

# Create .env from template
cp .env.example .env

# Edit .env with your API keys
open -a "Visual Studio Code" .env

# ==========================================
# BACKEND COMMANDS
# ==========================================

# Setup
cd backend
python3 -m venv venv
source venv/bin/activate
pip install poetry
poetry install

# Run tests
pytest

# Code quality
black app/                    # Format
isort app/                    # Sort imports
flake8 app/                   # Lint
mypy app/                     # Type check

# Database migrations
alembic revision --autogenerate -m "Description"
alembic upgrade head
alembic downgrade -1

# ==========================================
# FRONTEND COMMANDS
# ==========================================

# Setup
cd frontend
npm install

# Development
npm run dev                   # Start dev server
npm run build                 # Build for production
npm start                     # Run production build

# Code quality
npm run lint                  # Run ESLint
npm run type-check           # TypeScript check
npm run format               # Format with Prettier
npm run format:check         # Check if formatted

# ==========================================
# DATABASE COMMANDS
# ==========================================

# Start database
docker-compose up -d

# Stop database
docker-compose down

# View logs
docker-compose logs db

# Connect to database
docker exec -it artist_os_db psql -U artist_admin -d artist_os_db

# Inside psql:
\dt                          # List tables
\d table_name               # Describe table
SELECT * FROM table_name;   # Query
\q                          # Quit

# Backup database
docker exec artist_os_db pg_dump -U artist_admin artist_os_db > backup.sql

# Restore database
docker exec -i artist_os_db psql -U artist_admin artist_os_db < backup.sql

# ==========================================
# GIT COMMANDS
# ==========================================

# Create feature branch
git checkout -b feature/your-feature-name

# Commit with conventional commits
git add .
git commit -m "feat(scope): description"
git commit -m "fix(scope): description"
git commit -m "docs: description"

# Keep updated
git fetch origin
git rebase origin/develop

# Push and create PR
git push origin feature/your-feature-name

# View log
git log --oneline --graph --all

# ==========================================
# API ENDPOINTS
# ==========================================

# Health checks
curl http://localhost:8000/health
curl http://localhost:3000

# API Documentation
# Browser: http://localhost:8000/docs
# Browser: http://localhost:8000/redoc

# ==========================================
# TROUBLESHOOTING
# ==========================================

# Port in use (macOS/Linux)
lsof -i :3000               # Find process on port 3000
kill -9 <PID>               # Kill process

# Reset Python environment
cd backend
rm -rf venv
python3 -m venv venv
source venv/bin/activate
poetry install

# Reset Node environment
cd frontend
rm -rf node_modules package-lock.json
npm install

# Database reset (⚠️ deletes data)
docker-compose down
rm -rf db_data/
docker-compose up -d

# ==========================================
# USEFUL SHORTCUTS
# ==========================================

# Navigate to project
alias artist_cd="cd /Volumes/MAC\ EXT\ II/CODE/Artist\ Dashboard\ V1"

# Activate backend venv
alias artist_backend="cd backend && source venv/bin/activate"

# Quick start all services
alias artist_start="cd /Volumes/MAC\ EXT\ II/CODE/Artist\ Dashboard\ V1 && ./start.sh"

# ==========================================
# COMMON ISSUES
# ==========================================

# Backend won't start: Check port 8000
# Frontend won't start: Check port 3000
# Database won't connect: Check docker-compose.yml and .env
# Tests fail: Ensure database is running

# For more help:
# - Backend: backend/README.md
# - Frontend: frontend/README.md
# - Setup: docs/SETUP.md
# - Architecture: docs/ARCHITECTURE.md

# ==========================================
# DOCUMENTATION
# ==========================================

# Main README
open README.md

# Setup Guide
open docs/SETUP.md

# Architecture
open docs/ARCHITECTURE.md

# Contributing
open docs/CONTRIBUTING.md

# Project Structure
open docs/PROJECT_STRUCTURE.md

# ==========================================
# ACCESSING SERVICES
# ==========================================

# Frontend UI
# http://localhost:3000

# Backend API
# http://localhost:8000

# API Swagger Docs
# http://localhost:8000/docs

# API ReDoc
# http://localhost:8000/redoc

# Database (psql)
# docker exec -it artist_os_db psql -U artist_admin -d artist_os_db

# ==========================================
# IMPORTANT NOTES
# ==========================================

# 1. Never commit .env files
# 2. Database data is stored on external SSD (/db_data/)
# 3. Add API keys to .env before first run
# 4. Use conventional commits (feat:, fix:, docs:, etc.)
# 5. Run code quality checks before committing
# 6. Keep dependencies updated (poetry update, npm update)
# 7. Test locally before pushing to GitHub
# 8. Always work on feature branches, never directly on main/develop

# ==========================================
# QUICK STATUS CHECK
# ==========================================

echo "=== ARTIST OS STATUS CHECK ==="
echo ""
echo "Backend Health:"
curl -s http://localhost:8000/health | jq . || echo "❌ Backend not running"
echo ""
echo "Frontend Status:"
curl -s http://localhost:3000 > /dev/null && echo "✅ Frontend running" || echo "❌ Frontend not running"
echo ""
echo "Database Status:"
docker ps | grep artist_os_db > /dev/null && echo "✅ Database running" || echo "❌ Database not running"
echo ""
