# Artist OS - Architecture & Design

## System Architecture

### Overview

Artist OS is a full-stack application with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                    User Interface (Web)                      │
│                  Next.js + Tailwind CSS                      │
│              (localhost:3000 - Interactive UI)              │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTP/REST API
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                    Backend API Layer                         │
│                   FastAPI + SQLAlchemy                       │
│              (localhost:8000 - Business Logic)              │
└──────────────────────────┬──────────────────────────────────┘
                           │ SQL Queries
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                    Data Persistence                          │
│              PostgreSQL 15 (Docker Container)               │
│    Data Storage: ./db_data/ (External SSD - Persistent)    │
└─────────────────────────────────────────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        ↓                  ↓                  ↓
    External APIs:   Spotify for Artists  TuneCore  Meta/Instagram
```

## Frontend Architecture

### Technology Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Zustand (minimal, lightweight)
- **Charts**: Recharts for data visualization
- **HTTP Client**: Axios for API calls

### Directory Structure

```
frontend/
├── app/
│   ├── (root)
│   │   ├── page.tsx              # Landing page
│   │   ├── layout.tsx            # Root layout
│   │   └── globals.css           # Global styles
│   ├── dashboard/
│   │   ├── layout.tsx            # Dashboard layout with sidebar
│   │   ├── page.tsx              # Main dashboard
│   │   ├── songs/page.tsx        # Song analytics
│   │   ├── content/page.tsx      # Content analytics
│   │   ├── ads/page.tsx          # Ad analytics
│   │   ├── revenue/page.tsx      # Revenue tracking
│   │   └── assistant/page.tsx    # AI Assistant
├── components/
│   ├── Sidebar.tsx               # Navigation sidebar
│   ├── Header.tsx                # Top navigation
│   ├── Charts/                   # Chart components
│   ├── Cards/                    # Card components
│   └── Forms/                    # Form components
├── lib/
│   ├── api.ts                    # API client wrapper
│   ├── hooks.ts                  # Custom React hooks
│   ├── types.ts                  # TypeScript types
│   └── utils.ts                  # Utility functions
└── public/
    ├── favicon.ico
    └── images/
```

### Design System

**Color Palette:**
- **Artist (Primary)**: Purple - Creative identity
  - `#8b2be2` (main), `#5f1095` (dark), `#cbb0ff` (light)
- **Data (Secondary)**: Blue - Analytics
  - `#0ea5e9` (main), `#075985` (dark), `#bae6fd` (light)
- **Growth (Accent)**: Green - Success/Revenue
  - `#22c55e` (main), `#15803d` (dark), `#bbf7d0` (light)

**Components:**
- **Cards**: Rounded corners, subtle shadow, responsive
- **Buttons**: Primary (artist gradient), Secondary (neutral), Tertiary (text)
- **Input**: Consistent styling with focus states
- **Typography**: Inter font family, clear hierarchy

### Key Features

1. **Responsive Design**: Mobile-first approach
2. **Dark Mode Support**: Using Tailwind dark mode
3. **Data Visualization**: Interactive charts with Recharts
4. **Performance**: Code splitting, lazy loading, static generation
5. **Type Safety**: Full TypeScript coverage

## Backend Architecture

### Technology Stack
- **Framework**: FastAPI (async-capable, auto-generated docs)
- **Language**: Python 3.10+
- **ORM**: SQLAlchemy 2.0 with async support
- **Database**: PostgreSQL 15
- **Task Queue**: Celery (planned for data ingestion)
- **Authentication**: JWT tokens (to be implemented)

### Directory Structure

```
backend/
├── app/
│   ├── main.py                   # FastAPI app initialization
│   ├── api/
│   │   ├── v1/
│   │   │   ├── endpoints/
│   │   │   │   ├── dashboard.py  # Dashboard routes
│   │   │   │   ├── songs.py      # Song analytics routes
│   │   │   │   ├── content.py    # Content routes
│   │   │   │   ├── ads.py        # Ad analytics routes
│   │   │   │   ├── revenue.py    # Revenue routes
│   │   │   │   └── assistant.py  # AI Assistant routes
│   │   │   └── dependencies.py   # Shared dependencies
│   ├── models/
│   │   ├── __init__.py
│   │   ├── song.py              # Song ORM model
│   │   ├── stream.py            # Stream data model
│   │   ├── revenue.py           # Revenue tracking model
│   │   ├── content.py           # Social content model
│   │   ├── ad_campaign.py       # Ad campaign model
│   │   └── user.py              # User/artist model
│   ├── schemas/
│   │   ├── song.py              # Song Pydantic schemas
│   │   ├── dashboard.py         # Dashboard response schemas
│   │   ├── revenue.py           # Revenue schemas
│   │   └── ai.py                # AI response schemas
│   ├── services/
│   │   ├── spotify_service.py   # Spotify data sync
│   │   ├── tunecore_service.py  # TuneCore data sync
│   │   ├── instagram_service.py # Instagram data sync
│   │   ├── meta_ads_service.py  # Meta Ads data sync
│   │   ├── analytics_service.py # Analytics calculations
│   │   └── ai_service.py        # AI/OpenAI integration
│   ├── connectors/
│   │   ├── spotify.py           # Spotify API client
│   │   ├── tunecore.py          # TuneCore API client
│   │   ├── instagram.py         # Instagram API client
│   │   ├── meta_ads.py          # Meta Ads API client
│   │   └── openai.py            # OpenAI client
│   └── core/
│       ├── config.py            # Settings management
│       ├── database.py          # SQLAlchemy setup
│       ├── security.py          # Auth utilities
│       └── exceptions.py        # Custom exceptions
├── alembic/                     # Database migrations
├── pyproject.toml               # Poetry dependencies
└── tests/                       # Test suite
```

### API Design

**RESTful Endpoints:**

```
GET    /api/v1/dashboard                    # Dashboard metrics
GET    /api/v1/dashboard/summary            # Key metrics
GET    /api/v1/songs                        # All songs
GET    /api/v1/songs/{id}                   # Song details
GET    /api/v1/songs/{id}/analytics         # Song analytics
GET    /api/v1/content                      # Content posts
GET    /api/v1/content/{id}/analytics       # Post analytics
GET    /api/v1/ads/campaigns                # Ad campaigns
GET    /api/v1/ads/campaigns/{id}/stats     # Campaign stats
GET    /api/v1/revenue/summary              # Revenue overview
GET    /api/v1/revenue/by-platform          # Revenue by source
POST   /api/v1/assistant/query              # AI query
POST   /api/v1/sync/spotify                 # Manual Spotify sync
POST   /api/v1/sync/tunecore                # Manual TuneCore sync
```

### Data Models

**Core Entities:**

1. **Artist/User**
   - Profile information
   - Connected accounts (Spotify, TuneCore, etc.)
   - API credentials

2. **Song**
   - Metadata (title, artist, release date)
   - Performance metrics
   - Revenue data
   - Playlist information

3. **Stream Data**
   - Daily/weekly/monthly metrics
   - By platform (Spotify, Apple Music, etc.)
   - By country/region
   - Listener demographics

4. **Revenue**
   - Earnings by platform
   - By country/region
   - By time period
   - Associated song

5. **Content**
   - Instagram posts/reels/stories
   - Engagement metrics
   - Posting schedule
   - Performance trends

6. **Ad Campaign**
   - Campaign metadata
   - Spending data
   - Audience targeting
   - Performance metrics

### Data Flow

#### 1. Data Ingestion
```
External APIs (Spotify, TuneCore, etc.)
    ↓
API Connectors (fetch data)
    ↓
Services (transform data)
    ↓
Database (store)
```

#### 2. Data Retrieval & Analytics
```
Database Query
    ↓
Services (aggregate, calculate trends)
    ↓
Schemas (format response)
    ↓
API Response → Frontend
```

#### 3. AI Insights
```
Database (raw data)
    ↓
Analytics Service (compute metrics)
    ↓
AI Service (query OpenAI)
    ↓
Response with insights
```

## Database Design

### PostgreSQL Schema

**Key Tables:**

```sql
-- Artists/Users
artists (id, name, email, spotify_id, tunecore_id, ...)

-- Songs
songs (id, artist_id, title, release_date, spotify_id, tunecore_id, ...)

-- Stream/Performance Data
streams (id, song_id, date, platform, count, listeners, ...)
streams_by_country (id, stream_id, country, count, ...)
streams_by_city (id, stream_id, city, country, count, ...)

-- Revenue
revenue (id, song_id, date, platform, amount, country, ...)

-- Content
content_posts (id, artist_id, platform, post_id, type, engagement_metrics, ...)

-- Ads
ad_campaigns (id, artist_id, campaign_id, name, budget, status, ...)
ad_performance (id, campaign_id, date, spend, impressions, clicks, ...)

-- API Credentials (Encrypted)
api_credentials (id, artist_id, service, encrypted_key, ...)
```

**Indexes:**
- `songs(artist_id, release_date)`
- `streams(song_id, date)`
- `revenue(song_id, date)`
- `content_posts(artist_id, created_at)`
- `ad_campaigns(artist_id, created_at)`

**Foreign Keys:** Maintain referential integrity across tables

## Security Considerations

1. **API Keys**: Encrypted storage in database
2. **Environment Variables**: Never commit `.env` files
3. **Authentication**: JWT tokens (to implement)
4. **CORS**: Restricted to known origins
5. **Input Validation**: Pydantic schemas for all inputs
6. **SQL Injection**: Protected by SQLAlchemy ORM
7. **Rate Limiting**: To be added for API protection

## Scalability Plan

### Phase 1 (Current)
- Single backend instance
- PostgreSQL on local SSD
- Synchronous processing

### Phase 2 (Planned)
- Async task queue (Celery)
- Background job scheduling
- Caching layer (Redis)
- Webhook support for real-time data

### Phase 3 (Future)
- Microservices architecture
- Cloud database (AWS RDS, etc.)
- Auto-scaling
- CDN for static content

## Performance Optimization

### Frontend
- Code splitting per route
- Image optimization
- Static site generation where possible
- Client-side caching with SWR/React Query

### Backend
- Database query optimization
- Response caching
- Pagination for large datasets
- Async/await for I/O operations

### Database
- Strategic indexing
- Query optimization
- Partitioning for large tables
- Regular vacuum/analyze

## Development Workflow

### Local Development
1. Docker starts PostgreSQL automatically
2. Backend runs with hot reload (uvicorn)
3. Frontend runs with hot reload (Next.js)
4. Database migrations with Alembic

### Testing
- Unit tests for services
- Integration tests for APIs
- E2E tests with Playwright

### Deployment
- Docker containers
- Environment-specific configs
- Database migrations on deploy
- Health checks and monitoring

## Monitoring & Logging

### Planned Implementation
- Application logging (Python logging, Winston)
- Error tracking (Sentry)
- Performance monitoring (Prometheus)
- Database query logging
- API request/response logging

## Future Enhancements

1. **Creative AI Brain**
   - Music analysis and generation suggestions
   - Lyric analysis and sentiment
   - Trend prediction for music styles

2. **Advanced Analytics**
   - Cohort analysis
   - Churn prediction
   - Audience lifetime value

3. **Automation**
   - Auto-posting to social media
   - Automated reporting
   - Smart budget allocation

4. **Integrations**
   - YouTube Analytics
   - Apple Music for Artists
   - SoundCloud
   - Bandcamp

5. **Collaboration**
   - Team management
   - Role-based access control
   - Shared insights and reports
