# Artist OS - Project Structure Overview

## Complete Directory Tree

```
Artist Dashboard V1/
├── 📄 README.md                          # Main project documentation
├── 📄 docker-compose.yml                 # Docker services configuration
├── 📄 .env.example                       # Environment variables template
├── 📄 .gitignore                         # Git ignore patterns
├── 📄 start.sh                           # Quick start script
│
├── 📁 backend/                           # FastAPI Backend
│   ├── 📄 README.md                      # Backend documentation
│   ├── 📄 pyproject.toml                 # Python dependencies (Poetry)
│   ├── 📄 start.sh                       # Backend startup script
│   │
│   └── 📁 app/
│       ├── 📄 __init__.py
│       ├── 📄 main.py                    # FastAPI app initialization
│       │
│       ├── 📁 core/
│       │   ├── 📄 __init__.py
│       │   ├── 📄 config.py              # Settings & configuration
│       │   └── 📄 database.py            # SQLAlchemy setup
│       │
│       ├── 📁 api/                       # API Endpoints (TODO)
│       │   ├── 📄 __init__.py
│       │   └── 📁 v1/
│       │       ├── dashboard.py
│       │       ├── songs.py
│       │       ├── content.py
│       │       ├── ads.py
│       │       ├── revenue.py
│       │       └── assistant.py
│       │
│       ├── 📁 models/                    # Database ORM Models (TODO)
│       │   ├── 📄 __init__.py
│       │   ├── song.py
│       │   ├── stream.py
│       │   ├── revenue.py
│       │   ├── content.py
│       │   ├── ad_campaign.py
│       │   └── user.py
│       │
│       ├── 📁 schemas/                   # Pydantic Schemas (TODO)
│       │   ├── 📄 __init__.py
│       │   ├── song.py
│       │   ├── dashboard.py
│       │   ├── revenue.py
│       │   └── ai.py
│       │
│       ├── 📁 services/                  # Business Logic (TODO)
│       │   ├── 📄 __init__.py
│       │   ├── spotify_service.py
│       │   ├── tunecore_service.py
│       │   ├── instagram_service.py
│       │   ├── meta_ads_service.py
│       │   ├── analytics_service.py
│       │   └── ai_service.py
│       │
│       ├── 📁 connectors/                # External API Clients (TODO)
│       │   ├── 📄 __init__.py
│       │   ├── spotify.py
│       │   ├── tunecore.py
│       │   ├── instagram.py
│       │   ├── meta_ads.py
│       │   └── openai.py
│
├── 📁 frontend/                          # Next.js Frontend
│   ├── 📄 README.md                      # Frontend documentation
│   ├── 📄 package.json                   # NPM dependencies
│   ├── 📄 tsconfig.json                  # TypeScript configuration
│   ├── 📄 tsconfig.node.json
│   ├── 📄 next.config.js                 # Next.js configuration
│   ├── 📄 tailwind.config.js             # Tailwind CSS configuration
│   ├── 📄 postcss.config.js              # PostCSS configuration
│   ├── 📄 .eslintrc.json                 # ESLint configuration
│   ├── 📄 .prettierrc                    # Prettier configuration
│   ├── 📄 .env.local.example             # Frontend env template
│   │
│   ├── 📁 app/                           # Next.js App Router
│   │   ├── 📄 layout.tsx                 # Root layout
│   │   ├── 📄 page.tsx                   # Home page
│   │   ├── 📄 globals.css                # Global styles
│   │   │
│   │   └── 📁 dashboard/
│   │       ├── 📄 layout.tsx             # Dashboard layout with sidebar
│   │       ├── 📄 page.tsx               # Dashboard home
│   │       │
│   │       ├── 📁 songs/
│   │       │   └── 📄 page.tsx
│   │       ├── 📁 content/
│   │       │   └── 📄 page.tsx
│   │       ├── 📁 ads/
│   │       │   └── 📄 page.tsx
│   │       ├── 📁 revenue/
│   │       │   └── 📄 page.tsx
│   │       └── 📁 assistant/
│   │           └── 📄 page.tsx
│   │
│   ├── 📁 components/                    # Reusable React Components
│   │   ├── 📄 Sidebar.tsx                # Navigation sidebar
│   │   └── 📁 Charts/                    # Chart components (TODO)
│   │   └── 📁 Cards/                     # Card components (TODO)
│   │   └── 📁 Forms/                     # Form components (TODO)
│   │
│   ├── 📁 lib/                           # Utilities
│   │   ├── 📄 api.ts                     # API client wrapper (TODO)
│   │   ├── 📄 hooks.ts                   # Custom hooks (TODO)
│   │   ├── 📄 types.ts                   # TypeScript types (TODO)
│   │   └── 📄 utils.ts                   # Utility functions (TODO)
│   │
│   └── 📁 public/                        # Static Assets
│       └── favicon.ico
│
├── 📁 docs/                              # Project Documentation
│   ├── 📄 ARCHITECTURE.md                # System design & architecture
│   ├── 📄 SETUP.md                       # Installation guide
│   └── 📄 CONTRIBUTING.md                # Branching & contribution guide
│
└── 📁 db_data/                           # PostgreSQL Data (on external SSD)
    ├── (PostgreSQL files - auto-generated)
    ├── (Data persists across restarts)
    └── (Excluded from git)
```

## Quick Reference

### Configuration Files

| File | Purpose |
|------|---------|
| `.env.example` | Template for environment variables |
| `.env` | Local secrets (not in git) |
| `.gitignore` | Files to exclude from git |
| `docker-compose.yml` | Database service configuration |
| `backend/pyproject.toml` | Python dependencies |
| `frontend/package.json` | Node.js dependencies |

### Key Files

| Path | Purpose |
|------|---------|
| `backend/app/main.py` | FastAPI app entry point |
| `backend/app/core/config.py` | Settings management |
| `backend/app/core/database.py` | SQLAlchemy ORM setup |
| `frontend/app/page.tsx` | Home page |
| `frontend/app/layout.tsx` | Root layout |
| `frontend/app/dashboard/page.tsx` | Main dashboard |
| `frontend/components/Sidebar.tsx` | Navigation component |
| `frontend/app/globals.css` | Global styles |
| `README.md` | Project overview |

## Module Organization

### Backend Modules

**Core**
- `config.py` - Environment & settings
- `database.py` - Database connection

**API Routes** (To implement)
- `dashboard.py` - Dashboard endpoints
- `songs.py` - Song analytics
- `content.py` - Content analytics
- `ads.py` - Ad analytics
- `revenue.py` - Revenue tracking
- `assistant.py` - AI endpoints

**Data Models** (To implement)
- `song.py` - Song data
- `stream.py` - Streaming data
- `revenue.py` - Revenue data
- `content.py` - Social content
- `ad_campaign.py` - Ad campaigns
- `user.py` - Artist/User data

**Services** (To implement)
- `spotify_service.py` - Spotify sync
- `tunecore_service.py` - TuneCore sync
- `instagram_service.py` - Instagram sync
- `meta_ads_service.py` - Meta Ads sync
- `analytics_service.py` - Analytics calculations
- `ai_service.py` - AI/OpenAI

**Connectors** (To implement)
- `spotify.py` - Spotify client
- `tunecore.py` - TuneCore client
- `instagram.py` - Instagram client
- `meta_ads.py` - Meta Ads client
- `openai.py` - OpenAI client

### Frontend Modules

**Pages**
- `dashboard/` - Main dashboard
- `songs/` - Song analytics page
- `content/` - Content analytics page
- `ads/` - Ad analytics page
- `revenue/` - Revenue page
- `assistant/` - AI assistant page

**Components**
- `Sidebar.tsx` - Navigation sidebar
- `Charts/` - Chart components
- `Cards/` - Card components
- `Forms/` - Form components

**Utilities**
- `lib/api.ts` - Backend API calls
- `lib/hooks.ts` - Custom React hooks
- `lib/types.ts` - TypeScript interfaces
- `lib/utils.ts` - Helper functions

## Development Workflows

### Adding a New Feature

```
1. Create feature branch: git checkout -b feature/new-feature
2. Implement backend:
   - Add model in models/
   - Add schema in schemas/
   - Add service logic in services/
   - Add API endpoint in api/
3. Implement frontend:
   - Create page or component
   - Add to navigation
   - Connect to API
4. Test locally
5. Create PR with conventional commit message
6. Code review
7. Merge to develop
```

### Database Changes

```
1. Modify SQLAlchemy model in models/
2. Create migration: alembic revision --autogenerate -m "Description"
3. Review migration in alembic/versions/
4. Run migration: alembic upgrade head
```

### Adding Dependencies

**Backend:**
```bash
cd backend
poetry add package-name
```

**Frontend:**
```bash
cd frontend
npm install package-name
```

## Git Commands Reference

```bash
# Clone repository
git clone <repo-url>
cd Artist\ Dashboard\ V1

# Create feature branch
git checkout -b feature/name

# Commit changes
git add .
git commit -m "feat(scope): description"

# Push to GitHub
git push origin feature/name

# Update from develop
git fetch origin
git rebase origin/develop

# View log
git log --oneline --graph --all
```

## Running Services

### Start All Services
```bash
./start.sh
```

### Start Individual Services

**Database:**
```bash
docker-compose up -d
```

**Backend:**
```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Frontend:**
```bash
cd frontend
npm run dev
```

### Access Points

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:3000 | Main UI |
| Backend | http://localhost:8000 | API server |
| API Docs | http://localhost:8000/docs | Swagger UI |
| Database | localhost:5432 | PostgreSQL |

## Status & Progress

### ✅ Completed
- Project structure
- Docker configuration
- Backend boilerplate (FastAPI, SQLAlchemy)
- Frontend boilerplate (Next.js, TypeScript, Tailwind)
- Documentation
- Git configuration

### 🔄 In Progress
- Database models
- API endpoints
- Frontend components
- Data connectors (Spotify, TuneCore, etc.)

### ⏳ TODO
- API integrations
- Data sync services
- AI/ML features
- Testing suite
- Deployment configuration
- Production database setup

---

**Last Updated**: 2026-06-17

**Version**: 0.1.0

**Maintained By**: Artist OS Team
