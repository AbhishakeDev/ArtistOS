# Artist OS

> AI-powered operating system for managing independent music careers

## Vision

Artist OS is a personal AI-powered operating system for managing and growing an independent music career. The goal is not to build a dashboard, but to build an intelligent decision-support platform that combines creative data, business analytics, audience insights, marketing performance, and AI recommendations into a single system.

The platform functions as a personal artist manager, music analyst, marketing strategist, and creative assistant.

## Core Capabilities

### Data Integration
- **Spotify for Artists**: Streams, monthly listeners, followers, saves, playlist adds, listener demographics
- **TuneCore**: Revenue, streams by platform, country performance, earnings by month
- **Instagram**: Reels, posts, stories metrics (reach, views, likes, comments, saves, shares)
- **Meta Ads**: Campaign performance, audience targeting, spend analytics

### Analytics Modules
- **Dashboard**: Executive summary of key metrics
- **Songs**: Track-level performance analysis
- **Content**: Instagram and social media analytics
- **Ads**: Meta Ads optimization
- **Revenue**: Earnings tracking across platforms
- **AI Assistant**: Natural language insights and recommendations

### AI Capabilities
- Performance insights and anomaly detection
- Audience intelligence and segmentation
- Smart recommendations for releases and targeting
- Predictive analytics for growth forecasting
- Comment sentiment analysis

## Tech Stack

### Frontend
- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + Custom Components
- **Charts**: Recharts
- **State Management**: Zustand

### Backend
- **Framework**: FastAPI
- **Language**: Python 3.10+
- **ORM**: SQLAlchemy 2.0
- **Database**: PostgreSQL 15
- **Package Manager**: Poetry

### Infrastructure
- **Database**: PostgreSQL (Docker Compose)
- **Environment**: Local development with Docker
- **Storage**: External SSD (./db_data)

## Project Structure

```
artist-os/
├── frontend/              # Next.js application
│   ├── app/              # App directory (pages, layouts)
│   ├── components/       # Reusable components
│   ├── lib/              # Utilities and helpers
│   ├── public/           # Static assets
│   └── README.md         # Frontend documentation
├── backend/              # FastAPI application
│   ├── app/              # Main application
│   │   ├── api/          # API routes
│   │   ├── models/       # ORM models
│   │   ├── schemas/      # Pydantic schemas
│   │   ├── services/     # Business logic
│   │   ├── connectors/   # External API clients
│   │   └── core/         # Configuration and database
│   ├── pyproject.toml    # Poetry dependencies
│   └── README.md         # Backend documentation
├── docker-compose.yml    # Docker services
├── .env.example          # Environment template
├── .gitignore            # Git ignore patterns
└── README.md             # This file
```

## Quick Start

### Prerequisites
- Node.js 18.17+
- Python 3.10+
- Docker & Docker Compose
- Git

### 1. Clone and Setup Repository

```bash
# Navigate to project directory
cd /Volumes/MAC\ EXT\ II/CODE/Artist\ Dashboard\ V1

# Create local environment file
cp .env.example .env

# Edit .env with your API keys
# SPOTIFY_CLIENT_ID=...
# TUNECORE_API_KEY=...
# INSTAGRAM_ACCESS_TOKEN=...
# META_ADS_ACCOUNT_ID=...
# OPENAI_API_KEY=...
```

### 2. Start PostgreSQL Database

```bash
# From project root
docker-compose up -d

# Verify database is running
docker-compose ps
```

Database will be available at `localhost:5432` with credentials from `.env`.

Data is stored in `./db_data/` on your external SSD.

### 3. Start Backend

```bash
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install poetry
poetry install

# Start FastAPI server
./start.sh
# or
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at `http://localhost:8000`

**API Documentation:**
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### 4. Start Frontend

```bash
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local

# Start development server
npm run dev
```

Frontend will be available at `http://localhost:3000`

### Verify Everything is Running

```bash
# Check all services
curl http://localhost:8000/health        # Backend health
curl http://localhost:3000               # Frontend
docker-compose ps                         # Database
```

## Environment Variables

### Backend (.env)

```bash
# Database
DB_USER=artist_admin
DB_PASSWORD=artist_secure_pass_2026
DB_NAME=artist_os_db
DB_HOST=localhost
DB_PORT=5432

# API Keys
SPOTIFY_CLIENT_ID=...
SPOTIFY_CLIENT_SECRET=...
TUNECORE_API_KEY=...
INSTAGRAM_ACCESS_TOKEN=...
META_ADS_ACCOUNT_ID=...
OPENAI_API_KEY=...

# Application
ENVIRONMENT=development
DEBUG=true
SECRET_KEY=...
```

### Frontend (.env.local)

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_CHAT=true
```

**Important**: 
- All `.env` files are ignored by Git
- Never commit API keys or secrets
- Use `.env.example` as a template for new developers

## Git Workflow

### Branching Strategy

```
main                 # Production-ready code
├── develop         # Development branch
│   ├── feature/    # Feature branches
│   ├── bugfix/     # Bug fix branches
│   └── docs/       # Documentation branches
└── release/        # Release preparation
```

### Commits

Use conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Testing
- `chore:` Build/dependency updates

## Development

### Backend Development

```bash
cd backend

# Run tests
pytest

# Run with debugging
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Code quality
black app/              # Format
isort app/              # Sort imports
flake8 app/             # Lint
mypy app/               # Type check
```

### Frontend Development

```bash
cd frontend

# Development server
npm run dev

# Run linting
npm run lint

# Type checking
npm run type-check

# Format code
npm run format
```

## Database Migrations

```bash
cd backend

# Create migration
alembic revision --autogenerate -m "Description"

# Apply migrations
alembic upgrade head

# Revert last migration
alembic downgrade -1
```

## Deployment

### Local Development
Development setup is complete! The application runs on your local machine with all data stored on your external SSD.

### Future Deployment
Instructions will be added when deployment targets (cloud hosting, production database, etc.) are determined.

## CI/CD

### Planned Pipeline

- Automated tests on each commit
- Code quality checks (linting, type checking)
- Build verification
- Automated deployments to staging

See `.github/workflows/` for workflow configurations.

## API Documentation

### Backend Endpoints (Planned)

```
GET    /                          # Health check
GET    /health                    # Status
GET    /api/dashboard             # Dashboard metrics
GET    /api/songs                 # Song analytics
GET    /api/content               # Content analytics
GET    /api/ads                   # Ad performance
GET    /api/revenue               # Revenue data
POST   /api/assistant/query       # AI queries
```

## Troubleshooting

### Database Connection Issues

```bash
# Check if PostgreSQL is running
docker-compose ps

# View logs
docker-compose logs db

# Restart database
docker-compose restart db
```

### Frontend Not Connecting to Backend

Check in `.env.local`:
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Python Virtual Environment Issues

```bash
# Recreate virtual environment
cd backend
rm -rf venv
python3 -m venv venv
source venv/bin/activate
poetry install
```

## Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'feat: add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open a Pull Request

## License

See LICENSE file for details.

## Support

For issues and questions, please create a GitHub issue or contact the development team.

---

**Current Phase**: Phase 1 - Business Brain Development

**Version**: 0.1.0

**Last Updated**: 2026-06-17
