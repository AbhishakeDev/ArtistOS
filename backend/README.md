# Artist OS - Backend

FastAPI backend for Artist OS, an AI-powered operating system for managing independent music careers.

## Project Structure

```
backend/
├── app/
│   ├── api/              # API route handlers
│   ├── models/           # SQLAlchemy ORM models
│   ├── schemas/          # Pydantic request/response schemas
│   ├── services/         # Business logic
│   ├── connectors/       # External API integrations (Spotify, TuneCore, etc.)
│   ├── core/             # Core configuration and database setup
│   ├── main.py           # FastAPI app initialization
│   └── __init__.py
├── pyproject.toml        # Poetry dependencies
├── start.sh              # Startup script
└── README.md             # This file
```

## Setup

### Prerequisites
- Python 3.10+
- Poetry
- PostgreSQL 15 (via Docker Compose)
- Docker & Docker Compose

### Installation

1. **Start PostgreSQL using Docker Compose** (from project root):
   ```bash
   docker-compose up -d
   ```

2. **Create and activate virtual environment**:
   ```bash
   cd backend
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install poetry
   poetry install
   ```

4. **Set up environment variables**:
   ```bash
   cp ../.env.example ../.env
   # Edit ../.env with your API keys and credentials
   ```

5. **Run migrations** (when DB schema is ready):
   ```bash
   alembic upgrade head
   ```

6. **Start the server**:
   ```bash
   ./start.sh
   # Or directly:
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

The API will be available at `http://localhost:8000`

## API Documentation

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Development

### Code Quality
```bash
# Format code
black app/

# Sort imports
isort app/

# Lint
flake8 app/

# Type checking
mypy app/
```

### Testing
```bash
pytest
pytest -v  # Verbose
pytest --cov=app  # With coverage
```

## Environment Variables

See `.env.example` for all available environment variables. Key integrations:
- Spotify for Artists API
- TuneCore API
- Instagram Graph API
- Meta Ads API
- OpenAI API

## Database

The project uses PostgreSQL with SQLAlchemy ORM. Database data is stored in `./db_data/` on the external SSD.

### Database Management

```bash
# Create a new migration
alembic revision --autogenerate -m "Description"

# Apply migrations
alembic upgrade head

# Revert last migration
alembic downgrade -1
```
