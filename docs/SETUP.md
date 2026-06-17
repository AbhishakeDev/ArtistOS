# Artist OS - Setup Guide

## Complete Installation Instructions

This guide will walk you through setting up Artist OS for local development.

## System Requirements

- **OS**: macOS, Linux, or Windows (WSL2)
- **RAM**: 8GB minimum (16GB recommended)
- **Disk Space**: 10GB free (for dependencies and database)
- **Internet**: Required for API key generation and initial setup

## Prerequisites Installation

### 1. Homebrew (macOS)

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### 2. Node.js (18.17+)

**Using Homebrew:**
```bash
brew install node
node --version  # Verify installation
```

**Or download from**: https://nodejs.org/

### 3. Python 3.10+

**Using Homebrew:**
```bash
brew install python@3.10
python3 --version  # Verify installation
```

**Or download from**: https://www.python.org/downloads/

### 4. Docker & Docker Compose

**Using Homebrew:**
```bash
brew install docker
```

**Or download**: https://www.docker.com/products/docker-desktop

### 5. Git

**Using Homebrew:**
```bash
brew install git
git --version  # Verify installation
```

**Or download from**: https://git-scm.com/

## Step-by-Step Setup

### Step 1: Navigate to Project Directory

```bash
cd /Volumes/MAC\ EXT\ II/CODE/Artist\ Dashboard\ V1
```

### Step 2: Initialize Git (if not already done)

```bash
# Check if git is initialized
git status

# If not initialized:
git init
git add .
git commit -m "Initial commit: Artist OS boilerplate"
```

### Step 3: Create Environment File

```bash
# Copy the example environment file
cp .env.example .env

# Open and edit with your API keys
# On macOS:
open -a "Visual Studio Code" .env

# Add your API keys:
# - SPOTIFY_CLIENT_ID
# - SPOTIFY_CLIENT_SECRET
# - TUNECORE_API_KEY
# - INSTAGRAM_ACCESS_TOKEN
# - META_ADS_ACCOUNT_ID
# - OPENAI_API_KEY
```

### Step 4: Start PostgreSQL Database

```bash
# From project root directory
docker-compose up -d

# Verify database is running
docker-compose ps

# You should see:
# NAME                COMMAND                  SERVICE
# artist_os_db        "docker-entrypoint.s…"   db
```

Check database logs:
```bash
docker-compose logs db
```

### Step 5: Setup Backend

```bash
# Navigate to backend
cd backend

# Create Python virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Poetry
pip install poetry

# Install dependencies
poetry install

# Verify installation
python --version
pip list | grep fastapi
```

**Optional**: Create initial database tables (when ready)
```bash
alembic upgrade head
```

### Step 6: Setup Frontend

```bash
# Navigate to frontend
cd ../frontend

# Install Node dependencies
npm install

# Create environment file
cp .env.local.example .env.local

# Verify installation
node --version
npm --version
```

### Step 7: Start Services

**Option A: Individual Services**

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

**Terminal 3 - Database (if not using Docker):**
```bash
docker-compose up
```

**Option B: Quick Start Script (Recommended)**

From project root:
```bash
chmod +x start.sh
./start.sh
```

### Step 8: Verify Everything Works

#### Backend Health Check
```bash
curl http://localhost:8000/health
# Expected response: {"status": "ok"}
```

#### Frontend Access
Open browser: http://localhost:3000

#### API Documentation
Visit: http://localhost:8000/docs

#### Database Connection
```bash
# Connect to database
docker exec -it artist_os_db psql -U artist_admin -d artist_os_db

# List tables (initially empty)
\dt

# Quit
\q
```

## API Keys Setup

### Spotify for Artists

1. Go to: https://developer.spotify.com/dashboard
2. Create an application
3. Copy credentials:
   - Client ID → `SPOTIFY_CLIENT_ID`
   - Client Secret → `SPOTIFY_CLIENT_SECRET`
   - Generate access token

### TuneCore API

1. Visit: https://www.tunecore.com/developers
2. Generate API key
3. Add to `.env`: `TUNECORE_API_KEY`

### Instagram/Meta Graph API

1. Go to: https://developers.facebook.com/
2. Create app for Instagram
3. Generate access token
4. Add to `.env`: `INSTAGRAM_ACCESS_TOKEN`, `META_BUSINESS_ACCOUNT_ID`

### Meta Ads API

1. In Facebook Developer console
2. Generate ads API token
3. Add to `.env`: `META_ADS_ACCOUNT_ID`

### OpenAI API

1. Visit: https://platform.openai.com/
2. Create API key
3. Add to `.env`: `OPENAI_API_KEY`

## Troubleshooting

### Port Already in Use

**Port 3000 (Frontend):**
```bash
# macOS/Linux
lsof -i :3000
kill -9 <PID>

# Or use different port
npm run dev -- -p 3001
```

**Port 8000 (Backend):**
```bash
# macOS/Linux
lsof -i :8000
kill -9 <PID>

# Or use different port
uvicorn app.main:app --port 8001
```

**Port 5432 (Database):**
```bash
docker-compose stop
docker-compose ps
# Make sure no containers are stuck
docker ps -a
```

### Database Connection Error

```bash
# Check database logs
docker-compose logs db

# Restart database
docker-compose restart db

# Full reset (⚠️ deletes data)
docker-compose down
rm -rf db_data/
docker-compose up -d
```

### Python Virtual Environment Issues

```bash
# Verify venv is activated
which python  # Should show venv path

# If not activated
cd backend
source venv/bin/activate

# Reinstall dependencies
poetry install --no-cache
```

### Node Modules Issues

```bash
# Clear cache and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Permission Denied on Scripts

```bash
# Make scripts executable
chmod +x start.sh
chmod +x backend/start.sh
```

## Common Commands

### Database Operations

```bash
# Access database shell
docker exec -it artist_os_db psql -U artist_admin -d artist_os_db

# Backup database
docker exec artist_os_db pg_dump -U artist_admin artist_os_db > backup.sql

# Restore database
docker exec -i artist_os_db psql -U artist_admin artist_os_db < backup.sql

# View database size
docker exec artist_os_db psql -U artist_admin -d artist_os_db -c "\l+"
```

### Backend Development

```bash
# Run tests
cd backend
pytest

# Format code
black app/

# Sort imports
isort app/

# Lint
flake8 app/

# Type check
mypy app/
```

### Frontend Development

```bash
# Format code
cd frontend
npm run format

# Check formatting
npm run format:check

# Lint
npm run lint

# Type check
npm run type-check

# Build for production
npm run build

# Start production build
npm start
```

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/amazing-feature

# Make changes and commit
git add .
git commit -m "feat: add amazing feature"

# Push to GitHub
git push origin feature/amazing-feature

# Create Pull Request on GitHub
```

## IDE Setup (VS Code)

### Recommended Extensions

```bash
# Frontend Development
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin (Volar)
- ESLint
- Prettier - Code formatter

# Backend Development
- Python
- Pylance
- FastAPI
- SQLAlchemy
- Rest Client
```

### Launch Configurations

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "FastAPI Backend",
      "type": "python",
      "request": "launch",
      "program": "${workspaceFolder}/backend/app/main.py",
      "console": "integratedTerminal",
      "cwd": "${workspaceFolder}/backend",
      "env": {
        "PYTHONPATH": "${workspaceFolder}/backend"
      }
    },
    {
      "name": "Next.js Frontend",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/frontend/node_modules/.bin/next",
      "args": ["dev"],
      "cwd": "${workspaceFolder}/frontend",
      "console": "integratedTerminal"
    }
  ]
}
```

## Next Steps

1. **Generate API Keys**: Follow the "API Keys Setup" section
2. **Create Sample Data**: Run backend migrations
3. **Test Integration**: Verify all APIs are communicating
4. **Start Development**: Begin building features!

## Getting Help

- **Backend Issues**: Check backend logs
  ```bash
  cd backend
  uvicorn app.main:app --reload --log-level debug
  ```

- **Frontend Issues**: Check browser console (F12) and terminal

- **Database Issues**: Access container shell
  ```bash
  docker-compose exec db bash
  ```

- **General Issues**: Review logs in project directories

## Documentation

- Backend API: http://localhost:8000/docs
- Frontend Code: See `/frontend/README.md`
- Backend Code: See `/backend/README.md`
- Architecture: See `/docs/ARCHITECTURE.md`

---

**Happy coding! 🎵**
