#!/bin/bash
# Backend startup script

echo "Starting Artist OS Backend..."

# Check if .env file exists, if not copy from .env.example
if [ ! -f ../.env ]; then
    echo "Creating .env file from .env.example..."
    cp ../.env.example ../.env
    echo "⚠️  Please update ../.env with your API keys!"
fi

# Install dependencies if needed
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
    source venv/bin/activate
    pip install --upgrade pip
    pip install poetry
    poetry install
else
    source venv/bin/activate
fi

# Run migrations (Alembic) - uncomment when DB is set up
# alembic upgrade head

# Start the server
echo "Starting FastAPI server on http://localhost:8000"
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
