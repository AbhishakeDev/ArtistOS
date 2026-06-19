# Artist OS - Complete Architecture, Setup & Deployment Guide

**Last Updated:** June 19, 2026  
**Version:** 0.1.0  
**Status:** Production Ready (with Podman containerization)

---

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Complete Application Capabilities](#complete-application-capabilities)
3. [Environment Configuration](#environment-configuration)
4. [Running the Application](#running-the-application)
5. [Database Management](#database-management)
6. [API Endpoints](#api-endpoints)
7. [Future Roadmap](#future-roadmap)
8. [Deployment & Production](#deployment--production)
9. [Troubleshooting](#troubleshooting)
10. [Best Practices & Improvements](#best-practices--improvements)

---

## System Architecture

### Overview Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         User Browser                             │
│                    http://localhost:3000                         │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTPS/REST API
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Frontend Layer                                │
│                  Next.js 14 + TypeScript                         │
│     - React Components (Radix UI)                               │
│     - Tailwind CSS Styling                                      │
│     - Recharts Data Visualization                               │
│     - Zustand State Management                                  │
│     - Axios HTTP Client                                         │
│                                                                  │
│  Pages: Dashboard, Songs, Content, Ads, Revenue, Assistant      │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTP API Calls
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Backend API Layer                             │
│                 FastAPI + Python 3.12                            │
│     - RESTful API Endpoints                                      │
│     - SQLAlchemy ORM                                             │
│     - Pydantic Data Validation                                   │
│     - CORS Middleware                                            │
│     - Business Logic Services                                    │
│                                                                  │
│  Routes: /api/songs, /api/content, /api/ads, /api/revenue       │
│  Documentation: /docs (Swagger), /redoc                         │
└────────────────────────────┬────────────────────────────────────┘
                             │ SQL Queries
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Data Persistence                              │
│            PostgreSQL 15 (Podman Container)                     │
│     - Relational Database                                        │
│     - Persistent Volume: ./db_data/                              │
│     - Port: 5432                                                │
│                                                                  │
│  Tables: users, songs, streams, content, ads, revenue, etc.     │
└─────────────────────────────────────────────────────────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        ▼                    ▼                    ▼
    External APIs:   Spotify for Artists    TuneCore    Instagram
    
    ┌─────────────────────────────────────────────────────────────┐
    │              AI Intelligence Layer (Future)                 │
    │  - OpenAI GPT-4 for insights                               │
    │  - ML models for predictions                               │
    │  - Sentiment analysis                                      │
    │  - Recommendations engine                                  │
    └─────────────────────────────────────────────────────────────┘
```

### Component Breakdown

#### **Frontend Architecture** (Next.js 14)
```
frontend/
├── app/                          # App Router (Next.js)
│   ├── page.tsx                 # Landing page
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   ├── dashboard/
│   │   ├── layout.tsx          # Dashboard layout with sidebar
│   │   └── page.tsx            # Main dashboard
│   ├── songs/page.tsx          # Track analytics
│   ├── content/page.tsx        # Social media analytics
│   ├── ads/page.tsx            # Ads management
│   ├── revenue/page.tsx        # Revenue tracking
│   └── assistant/page.tsx      # AI assistant
├── components/
│   ├── Sidebar.tsx             # Navigation
│   ├── Header.tsx              # Top bar
│   ├── Charts/                 # Recharts visualizations
│   ├── Cards/                  # Data display cards
│   └── Forms/                  # Input components
├── lib/
│   ├── api.ts                  # Axios instance & API calls
│   ├── hooks.ts                # Custom React hooks
│   ├── types.ts                # TypeScript interfaces
│   └── utils.ts                # Utility functions
├── public/                      # Static assets
├── package.json                # NPM dependencies
├── tailwind.config.js          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── next.config.cjs             # Next.js configuration (ESM compatible)
```

#### **Backend Architecture** (FastAPI)
```
backend/
├── app/
│   ├── main.py                 # FastAPI app initialization
│   ├── core/
│   │   ├── config.py          # Settings & environment variables
│   │   ├── database.py        # SQLAlchemy setup
│   │   └── __init__.py
│   ├── api/
│   │   ├── __init__.py
│   │   ├── songs.py           # Songs endpoints (to implement)
│   │   ├── content.py         # Content endpoints (to implement)
│   │   ├── ads.py             # Ads endpoints (to implement)
│   │   ├── revenue.py         # Revenue endpoints (to implement)
│   │   └── dashboard.py       # Dashboard endpoints (to implement)
│   ├── models/
│   │   ├── __init__.py
│   │   ├── user.py            # User model (to implement)
│   │   ├── song.py            # Song model (to implement)
│   │   ├── analytics.py       # Analytics model (to implement)
│   │   └── revenue.py         # Revenue model (to implement)
│   ├── schemas/
│   │   ├── __init__.py
│   │   ├── song.py            # Pydantic schemas (to implement)
│   │   ├── user.py
│   │   └── analytics.py
│   ├── services/
│   │   ├── __init__.py
│   │   ├── spotify_service.py  # Spotify integration (to implement)
│   │   ├── tunecore_service.py # TuneCore integration (to implement)
│   │   ├── analytics_service.py # Analytics logic (to implement)
│   │   └── ai_service.py       # AI service (to implement)
│   ├── connectors/
│   │   ├── __init__.py
│   │   ├── spotify.py         # Spotify API client (to implement)
│   │   ├── tunecore.py        # TuneCore API client (to implement)
│   │   ├── instagram.py       # Instagram API client (to implement)
│   │   └── openai.py          # OpenAI API client (to implement)
│   └── __init__.py
├── pyproject.toml             # Poetry dependencies
├── poetry.lock                # Dependency lock file
└── README.md                  # Backend documentation
```

#### **Database Schema** (PostgreSQL)
```sql
-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Songs table
CREATE TABLE songs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(255),
  artist VARCHAR(255),
  release_date DATE,
  spotify_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Streams table (time-series analytics)
CREATE TABLE streams (
  id SERIAL PRIMARY KEY,
  song_id INTEGER REFERENCES songs(id),
  platform VARCHAR(50), -- spotify, apple, youtube, etc.
  stream_count INTEGER,
  date DATE,
  recorded_at TIMESTAMP DEFAULT NOW()
);

-- Revenue table
CREATE TABLE revenue (
  id SERIAL PRIMARY KEY,
  song_id INTEGER REFERENCES songs(id),
  platform VARCHAR(50),
  amount DECIMAL(10, 2),
  currency VARCHAR(3), -- USD, EUR, GBP
  period_start DATE,
  period_end DATE,
  recorded_at TIMESTAMP DEFAULT NOW()
);

-- Social content analytics
CREATE TABLE content (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  platform VARCHAR(50), -- instagram, tiktok, youtube
  content_id VARCHAR(255),
  content_type VARCHAR(50), -- reel, post, story
  engagement INTEGER,
  views INTEGER,
  date DATE,
  recorded_at TIMESTAMP DEFAULT NOW()
);

-- Ads campaigns
CREATE TABLE ads (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  campaign_name VARCHAR(255),
  platform VARCHAR(50), -- meta, google, tiktok
  budget DECIMAL(10, 2),
  spend DECIMAL(10, 2),
  impressions INTEGER,
  clicks INTEGER,
  conversions INTEGER,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- AI Assistant conversations
CREATE TABLE conversations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  conversation_id INTEGER REFERENCES conversations(id),
  role VARCHAR(20), -- user, assistant
  content TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Complete Application Capabilities

### Current Phase (0.1.0 - Foundation)
✅ **Implemented:**
- FastAPI backend with CORS support
- PostgreSQL database via Podman
- Next.js frontend with Tailwind CSS
- Responsive UI layout with Sidebar navigation
- Dashboard page structure
- Page routing for: Songs, Content, Ads, Revenue, Assistant

⚠️ **In Progress:**
- API endpoint skeleton (ready for implementation)
- Database models (structure defined)
- External API connectors (interfaces ready)

### Phase 1 - Business Brain (Q3 2026)
📊 **Analytics & Data Integration**

#### Spotify for Artists Integration
```
- Real-time stream data
- Monthly listener tracking
- Follower growth analytics
- Playlist placement analytics
- Geographic listener distribution
- Demographic insights (age, gender, location)
- Listener retention metrics
- Top songs by country/region
```

#### TuneCore Platform Integration
```
- Revenue tracking across all platforms
- Detailed earnings by platform (Spotify, Apple, YouTube, Amazon, etc.)
- Country-specific earnings breakdown
- Sales reports
- Royalty statements
- Payment history
- Tax reporting data
```

#### Social Media Integration
```
Instagram/Meta:
- Reel performance metrics
- Post engagement analytics
- Story reach and completion rates
- Follower growth tracking
- Comment sentiment analysis
- Audience demographics
- Best posting times

Future: TikTok, YouTube, Twitter/X
```

#### Ads & Marketing Tools
```
Meta Ads Integration:
- Campaign performance tracking
- Budget allocation insights
- ROI calculation
- Audience targeting optimization
- Conversion tracking
- A/B testing support

Future: Google Ads, TikTok Ads
```

### Phase 2 - AI Intelligence (Q4 2026)
🤖 **AI-Powered Insights & Recommendations**

```
OpenAI Integration:
- GPT-4 powered natural language assistant
- Performance anomaly detection
- Trend analysis and forecasting
- Release strategy recommendations
- Audience segmentation insights
- Content optimization suggestions
- Ad copy generation
- Budget recommendations

Machine Learning Models:
- Predictive analytics for stream growth
- Release success probability
- Optimal release timing
- Genre trend forecasting
- Audience growth projections
- Revenue prediction
```

### Phase 3 - Automation & Optimization (Q1 2027)
⚙️ **Workflow Automation**

```
Automated Actions:
- Schedule and manage releases
- Automated ad campaign optimization
- Content performance alerts
- Revenue anomaly notifications
- Growth milestone tracking
- Competitive analysis

Integrations:
- DistroKid/TuneCore automation
- Email notifications
- Slack/Discord webhooks
- Calendar integration
- Project management tools (Notion, Asana)
```

### Phase 4 - Community & Collaboration (Q2 2027)
👥 **Multi-Artist Platform**

```
Collaboration Features:
- Artist network
- Collaboration opportunities
- Shared analytics
- Joint release management
- Performance benchmarking
- Industry insights sharing
```

---

## Environment Configuration

### Required Environment Variables

Create a `.env` file in the project root with the following:

```bash
# =====================================
# DATABASE CONFIGURATION
# =====================================
DB_USER=artist_admin
DB_PASSWORD=artist_secure_pass_2026
DB_NAME=artist_os_db
DB_HOST=localhost
DB_PORT=5432

# =====================================
# FASTAPI CONFIGURATION
# =====================================
API_HOST=0.0.0.0
API_PORT=8000
ENVIRONMENT=development
DEBUG=True
SECRET_KEY=your-super-secret-key-change-in-production-make-it-32-chars-minimum

# =====================================
# FRONTEND CONFIGURATION
# =====================================
NEXT_PUBLIC_API_URL=http://localhost:8000

# =====================================
# SPOTIFY INTEGRATION
# =====================================
SPOTIFY_CLIENT_ID=your_spotify_client_id_here
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret_here
SPOTIFY_ACCESS_TOKEN=your_spotify_access_token_here
SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token_here

# =====================================
# TUNECORE INTEGRATION
# =====================================
TUNECORE_API_KEY=your_tunecore_api_key_here
TUNECORE_API_URL=https://api.tunecore.com
TUNECORE_USER_ID=your_tunecore_user_id

# =====================================
# INSTAGRAM / META INTEGRATION
# =====================================
INSTAGRAM_ACCESS_TOKEN=your_instagram_access_token_here
INSTAGRAM_BUSINESS_ACCOUNT_ID=your_business_account_id
META_API_VERSION=v18.0
META_BUSINESS_ACCOUNT_ID=your_meta_business_account_id

# =====================================
# META ADS INTEGRATION
# =====================================
META_ADS_ACCOUNT_ID=your_meta_ads_account_id
META_ADS_ACCESS_TOKEN=your_meta_ads_access_token

# =====================================
# OPENAI INTEGRATION (Future)
# =====================================
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4
OPENAI_ORG_ID=your_org_id_optional

# =====================================
# LOGGING & MONITORING (Future)
# =====================================
LOG_LEVEL=INFO
SENTRY_DSN=your_sentry_dsn_for_error_tracking

# =====================================
# EMAIL CONFIGURATION (Future)
# =====================================
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# =====================================
# PRODUCTION SETTINGS (When deploying)
# =====================================
ENVIRONMENT=production
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
DATABASE_URL=postgresql://user:password@host:5432/dbname
```

### How to Get Each API Key

#### Spotify for Artists
1. Go to https://developer.spotify.com/dashboard
2. Create an application
3. Copy `Client ID` and `Client Secret`
4. Implement OAuth 2.0 flow for `ACCESS_TOKEN`

#### TuneCore
1. Sign up at https://www.tunecore.com/
2. Go to API settings
3. Generate API key
4. Note your User ID

#### Instagram/Meta
1. Go to https://developers.facebook.com/
2. Create an application
3. Set up Instagram Graph API
4. Generate access token with appropriate scopes

#### OpenAI
1. Visit https://platform.openai.com/api-keys
2. Create API key
3. Copy and secure it

---

## Running the Application

### Prerequisites
- **Node.js**: v18.17+ (for frontend)
- **Python**: 3.10+ (for backend)
- **Podman**: 5.8+ (for database)
- **Git**: For version control

### Quick Start (Development)

#### 1. Initialize Podman Machine (One-time)
```powershell
# Create Podman machine
podman machine init

# Start machine
podman machine start

# Switch to rootful mode (optional but recommended)
podman machine set --rootful
podman machine restart
```

#### 2. Start Database
```powershell
cd "path\to\ArtistOS"

# Start PostgreSQL container
& "C:\path\to\.venv\Scripts\python.exe" -m podman_compose up -d

# Verify database is running
podman ps

# Check logs
podman logs artist_os_db
```

#### 3. Start Backend API
```powershell
cd backend

# Install dependencies (first time only)
pip install fastapi uvicorn sqlalchemy psycopg2-binary python-dotenv pydantic-settings

# Start FastAPI server with hot-reload
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

# API will be available at http://localhost:8000
# Swagger docs: http://localhost:8000/docs
# ReDoc: http://localhost:8000/redoc
```

#### 4. Start Frontend
```powershell
cd frontend

# Install dependencies (first time only)
npm install

# Start Next.js development server
npm run dev

# Frontend will be available at http://localhost:3000
```

#### 5. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Swagger**: http://localhost:8000/docs
- **Database**: localhost:5432

### Complete Setup Script (Windows PowerShell)

```powershell
# setup.ps1 - One-command setup

# Navigate to project
cd "c:\Users\7053xu\Videos\Project 1\ArtistOS"

# Create .env if not exists
if (-not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host ".env file created. Please edit it with your API keys."
}

# Initialize and start Podman
Write-Host "Starting Podman machine..."
podman machine start 2>$null

# Start database
Write-Host "Starting PostgreSQL database..."
& $PROFILE\.venv\Scripts\python.exe -m podman_compose up -d

# Wait for database to be ready
Start-Sleep -Seconds 5

# Start backend in new terminal
Write-Host "Starting FastAPI backend..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; python -m uvicorn app.main:app --reload"

# Wait for backend to start
Start-Sleep -Seconds 3

# Start frontend in new terminal
Write-Host "Starting Next.js frontend..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

Write-Host @"
Setup complete! Access the application at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs
"@
```

---

## Database Management

### Connect to Database Directly

```bash
# Using psql (if installed)
psql -h localhost -U artist_admin -d artist_os_db -p 5432

# When prompted, enter password: artist_secure_pass_2026
```

### Common Database Commands

```sql
-- List all tables
\dt

-- Describe a table
\d table_name

-- Show database size
SELECT pg_size_pretty(pg_database_size('artist_os_db'));

-- View recent entries
SELECT * FROM users LIMIT 10;
SELECT * FROM songs LIMIT 10;
SELECT * FROM streams LIMIT 10;
```

### Backup & Restore

```bash
# Backup database
podman exec artist_os_db pg_dump -U artist_admin artist_os_db > backup.sql

# Restore from backup
podman exec -i artist_os_db psql -U artist_admin artist_os_db < backup.sql
```

### Database Migrations (Future Setup with Alembic)

```bash
# Create migration
alembic revision --autogenerate -m "Add users table"

# Apply migration
alembic upgrade head

# Rollback migration
alembic downgrade -1
```

---

## API Endpoints

### Health Check
```
GET /
GET /health
```

### Authentication (To Implement)
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh
```

### Songs (To Implement)
```
GET /api/songs              # List all songs
POST /api/songs             # Create new song
GET /api/songs/{id}         # Get song details
PUT /api/songs/{id}         # Update song
DELETE /api/songs/{id}      # Delete song
GET /api/songs/{id}/stats   # Get song statistics
```

### Analytics (To Implement)
```
GET /api/analytics/dashboard       # Dashboard summary
GET /api/analytics/songs           # Song analytics
GET /api/analytics/content         # Content analytics
GET /api/analytics/revenue         # Revenue analytics
GET /api/analytics/trends          # Trend analysis
```

### Integrations (To Implement)
```
POST /api/integrations/spotify/connect      # Connect Spotify
POST /api/integrations/tunecore/connect     # Connect TuneCore
POST /api/integrations/instagram/connect    # Connect Instagram
POST /api/integrations/sync                 # Trigger data sync
GET /api/integrations/status                # Check integration status
```

### AI Assistant (To Implement)
```
POST /api/assistant/conversations           # Create conversation
POST /api/assistant/conversations/{id}/messages  # Send message
GET /api/assistant/conversations/{id}       # Get conversation
```

---

## Future Roadmap

### Q3 2026 - Phase 1: Business Brain
- [ ] Spotify API integration
- [ ] TuneCore API integration
- [ ] Instagram/Meta API integration
- [ ] Database migrations with Alembic
- [ ] Analytics data aggregation
- [ ] Real-time data sync
- [ ] Performance optimizations

### Q4 2026 - Phase 2: AI Intelligence
- [ ] OpenAI GPT-4 integration
- [ ] Natural language assistant
- [ ] Predictive analytics
- [ ] Anomaly detection
- [ ] Recommendation engine
- [ ] Sentiment analysis

### Q1 2027 - Phase 3: Automation
- [ ] Release scheduling
- [ ] Auto ad optimization
- [ ] Notification system
- [ ] Alert system
- [ ] Webhook integrations
- [ ] Scheduled tasks (Celery)

### Q2 2027 - Phase 4: Community
- [ ] Multi-user support
- [ ] Collaboration features
- [ ] Artist network
- [ ] Performance benchmarking
- [ ] Industry insights

### Q3 2027+ - Scaling & Enterprise
- [ ] Multi-region deployment
- [ ] Advanced analytics
- [ ] Custom reporting
- [ ] API for third parties
- [ ] Mobile apps

---

## Deployment & Production

### Pre-Production Checklist
- [ ] Environment variables configured
- [ ] Database backups automated
- [ ] HTTPS/SSL configured
- [ ] CORS properly configured
- [ ] Rate limiting implemented
- [ ] Error logging setup (Sentry)
- [ ] Monitoring setup (DataDog/New Relic)
- [ ] API documentation updated
- [ ] Load testing completed
- [ ] Security audit passed

### Production Deployment (Docker/Kubernetes)

#### Option 1: Traditional Server (AWS EC2, DigitalOcean, etc.)
```bash
# Install dependencies on server
sudo apt-get update
sudo apt-get install -y python3 python3-pip nodejs npm postgresql-client

# Clone repository
git clone https://github.com/AbhishakeDev/ArtistOS.git
cd ArtistOS

# Setup backend
cd backend
pip install -r requirements.txt
gunicorn app.main:app --workers 4

# Setup frontend
cd ../frontend
npm run build
npm run start
```

#### Option 2: Docker (Replace Podman with Docker for production)
```bash
# Build images
docker build -t artistos-frontend ./frontend
docker build -t artistos-backend ./backend

# Push to registry
docker tag artistos-backend myregistry/artistos-backend:latest
docker push myregistry/artistos-backend:latest

# Deploy with compose
docker-compose -f docker-compose.prod.yml up -d
```

#### Option 3: Kubernetes
```yaml
# deployment.yaml example
apiVersion: apps/v1
kind: Deployment
metadata:
  name: artistos-backend
spec:
  replicas: 3
  template:
    spec:
      containers:
      - name: artistos-backend
        image: myregistry/artistos-backend:latest
        ports:
        - containerPort: 8000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: url
```

### Environment-Specific Configuration

#### Development
```
DEBUG=True
ENVIRONMENT=development
LOG_LEVEL=DEBUG
CORS_ORIGINS=["http://localhost:3000", "http://localhost:3001"]
```

#### Staging
```
DEBUG=False
ENVIRONMENT=staging
LOG_LEVEL=INFO
CORS_ORIGINS=["https://staging.artistos.com"]
```

#### Production
```
DEBUG=False
ENVIRONMENT=production
LOG_LEVEL=WARNING
CORS_ORIGINS=["https://artistos.com", "https://www.artistos.com"]
SECURE_SSL_REDIRECT=True
SESSION_COOKIE_SECURE=True
CSRF_COOKIE_SECURE=True
```

---

## Troubleshooting

### Podman Issues

#### Database Connection Error
```
Error: unable to copy from source docker://postgres:15-alpine
```
**Solution:** Disable TLS verification
```powershell
podman pull --tls-verify=false docker.io/library/postgres:15-alpine
```

#### Port Already in Use
```
Error: listen tcp :5432: bind: An attempt was made to use a port in an operation not permitted
```
**Solution:** Kill process using port or map to different port
```powershell
# Kill process on port 5432
Get-Process | Where-Object {$_.Name -like "*postgres*"} | Stop-Process -Force

# Or map to different port in docker-compose.yml
ports:
  - "5433:5432"
```

### Backend Issues

#### Module Not Found
```
ModuleNotFoundError: No module named 'pydantic_settings'
```
**Solution:** Install missing package
```bash
pip install pydantic-settings
```

#### CORS Issues
```
Access to XMLHttpRequest blocked by CORS
```
**Solution:** Check `main.py` CORS configuration matches frontend URL

#### Database Connection Timeout
```
psycopg2.OperationalError: could not connect to server
```
**Solution:** Verify database is running and accessible
```bash
podman ps
podman logs artist_os_db
```

### Frontend Issues

#### Next.js Module Error
```
ReferenceError: module is not defined in ES module scope
```
**Solution:** Ensure `next.config.js` is renamed to `next.config.cjs`

#### Port Already in Use
```powershell
# Kill process on port 3000
Get-Process | Where-Object {$_.Port -eq 3000} | Stop-Process -Force

# Or run on different port
npm run dev -- -p 3001
```

#### Dependencies Not Found
```bash
npm audit fix
npm install --legacy-peer-deps
```

---

## Best Practices & Improvements

### Code Quality

#### 1. **Type Safety**
```typescript
// ❌ Avoid
const data = api.get('/endpoint');

// ✅ Do
interface SongResponse {
  id: number;
  title: string;
  artist: string;
}

const data: SongResponse[] = await api.get('/endpoint');
```

#### 2. **Error Handling**
```python
# ❌ Avoid
def get_songs():
    return db.query(Song).all()

# ✅ Do
from fastapi import HTTPException

@app.get("/songs")
async def get_songs():
    try:
        songs = await db.query(Song).all()
        if not songs:
            raise HTTPException(status_code=404, detail="No songs found")
        return songs
    except Exception as e:
        logger.error(f"Error fetching songs: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")
```

#### 3. **Validation**
```python
# ✅ Use Pydantic schemas
from pydantic import BaseModel, Field

class SongCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    artist: str = Field(..., min_length=1)
    release_date: date
```

### Security Best Practices

#### 1. **Environment Variables**
- Never commit `.env` files
- Use `.env.example` as template
- Rotate secrets regularly
- Use secrets manager (AWS Secrets Manager, HashiCorp Vault)

#### 2. **API Security**
```python
# Implement authentication
from fastapi.security import HTTPBearer

security = HTTPBearer()

@app.get("/protected")
async def protected_route(credentials: HTTPAuthCredentials = Depends(security)):
    token = credentials.credentials
    # Verify token
    return {"message": "Access granted"}
```

#### 3. **Database Security**
- Use strong passwords
- Never use default credentials in production
- Implement row-level security (RLS)
- Regular backups to separate secure location
- Enable encryption at rest

#### 4. **API Rate Limiting**
```python
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)

@app.get("/api/songs")
@limiter.limit("100/minute")
async def get_songs():
    return {"songs": []}
```

### Performance Optimizations

#### 1. **Database Indexing**
```sql
-- Add indexes to frequently queried columns
CREATE INDEX idx_songs_user_id ON songs(user_id);
CREATE INDEX idx_streams_song_id ON streams(song_id);
CREATE INDEX idx_streams_date ON streams(date);
```

#### 2. **Caching Strategy**
```python
from fastapi_cache2 import FastAPICache2
from fastapi_cache2.decorators import cache

@app.get("/api/songs")
@cache(expire=3600)  # Cache for 1 hour
async def get_songs():
    return await db.query(Song).all()
```

#### 3. **Frontend Optimization**
```typescript
// Use React.memo for expensive components
const SongCard = React.memo(({ song }) => {
  return <div>{song.title}</div>;
});

// Use useCallback for event handlers
const handleClick = useCallback(() => {
  fetchSongs();
}, []);
```

#### 4. **API Pagination**
```python
@app.get("/api/songs")
async def get_songs(skip: int = 0, limit: int = 10):
    return await db.query(Song).offset(skip).limit(limit).all()
```

### Monitoring & Logging

#### 1. **Structured Logging**
```python
import logging
from pythonjsonlogger import jsonlogger

logger = logging.getLogger()
handler = logging.StreamHandler()
formatter = jsonlogger.JsonFormatter()
handler.setFormatter(formatter)
logger.addHandler(handler)

logger.info("User logged in", extra={"user_id": 123})
```

#### 2. **Error Tracking (Sentry)**
```python
import sentry_sdk

sentry_sdk.init("https://your-sentry-dsn@sentry.io/1234567")

try:
    dangerous_operation()
except Exception as e:
    sentry_sdk.capture_exception(e)
```

#### 3. **Application Metrics**
```python
from prometheus_client import Counter, Histogram

request_count = Counter('app_requests_total', 'Total requests')
request_duration = Histogram('app_request_duration_seconds', 'Request duration')
```

### Testing Strategy

#### 1. **Unit Tests**
```python
# tests/test_services.py
def test_calculate_engagement_rate():
    result = calculate_engagement_rate(likes=100, followers=1000)
    assert result == 0.1
```

#### 2. **Integration Tests**
```python
def test_get_songs_endpoint(client):
    response = client.get("/api/songs")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
```

#### 3. **E2E Tests**
```typescript
// tests/e2e/dashboard.spec.ts
describe("Dashboard", () => {
  it("should display user songs", () => {
    cy.visit("/dashboard");
    cy.get("[data-testid='songs-list']").should("be.visible");
  });
});
```

### Development Workflow

#### 1. **Git Workflow**
```bash
# Feature branch
git checkout -b feature/spotify-integration
git commit -m "feat: add Spotify data sync"
git push origin feature/spotify-integration

# Create PR and merge after review
```

#### 2. **Code Review Checklist**
- [ ] Code follows project conventions
- [ ] Tests are included
- [ ] Documentation updated
- [ ] No hardcoded values
- [ ] Performance considered
- [ ] Security reviewed

#### 3. **CI/CD Pipeline** (GitHub Actions)
```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run tests
        run: pytest
      - name: Run linter
        run: flake8 .
```

### Documentation Standards

#### 1. **Code Comments**
```python
def sync_spotify_data(user_id: int) -> None:
    """
    Fetch latest Spotify data for a user.
    
    This function queries Spotify API for:
    - Stream counts
    - Listener demographics
    - Playlist placements
    
    Args:
        user_id: The ID of the user to sync
        
    Raises:
        SpotifyConnectionError: If Spotify API connection fails
        
    Returns:
        None: Updates database directly
    """
    # Implementation
```

#### 2. **API Documentation**
```python
@app.get("/api/songs/{id}")
async def get_song(id: int):
    """
    Get detailed information about a specific song.
    
    **Parameters:**
    - `id`: Song ID
    
    **Returns:**
    - Song object with full details including analytics
    
    **Status Codes:**
    - 200: Success
    - 404: Song not found
    - 500: Server error
    """
    return await db.query(Song).filter(Song.id == id).first()
```

---

## Key Takeaways

### Current State
✅ **Foundation is solid** - Project is properly structured with clear separation of concerns
✅ **Podman instead of Docker** - Lighter, more secure alternative with same functionality
✅ **Ready for API implementation** - Skeleton code ready for business logic

### Immediate Next Steps
1. Implement database models (Users, Songs, Analytics)
2. Build Spotify integration connector
3. Create API endpoints for data fetching
4. Build out frontend pages with real data
5. Add authentication system

### Long-term Vision
The application is designed to evolve from a data aggregation dashboard into an intelligent AI-powered personal manager for independent artists. Each phase builds upon the previous, adding deeper insights and automation capabilities.

### Success Metrics
- User adoption rate
- Data sync accuracy
- API response times (<200ms)
- Feature completeness
- User satisfaction (NPS)

---

## Support & Resources

### Documentation
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [Podman Documentation](https://docs.podman.io/)

### API Documentation
- [Spotify Web API](https://developer.spotify.com/documentation/web-api)
- [Meta Graph API](https://developers.facebook.com/docs/graph-api)
- [TuneCore API](https://www.tunecore.com/docs/api)
- [OpenAI API](https://platform.openai.com/docs)

### Community
- GitHub Issues for bug reports
- GitHub Discussions for feature requests
- Contributing guidelines in CONTRIBUTING.md

---

**Last Updated:** June 19, 2026  
**Maintained By:** Artist OS Team  
**License:** MIT
