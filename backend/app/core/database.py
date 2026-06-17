from sqlalchemy import create_engine, event, pool
from sqlalchemy.orm import sessionmaker, Session
from app.core.config import get_settings

settings = get_settings()

# Create database engine
engine = create_engine(
    settings.database_url,
    poolclass=pool.NullPool if settings.environment == "development" else pool.QueuePool,
    echo=settings.debug,
)

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db() -> Session:
    """Get a database session for dependency injection."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Enable foreign keys for SQLite (not needed for PostgreSQL, but good practice)
@event.listens_for(engine, "connect")
def set_sqlite_pragma(dbapi_conn, connection_record):
    """Enable foreign key support for SQLite."""
    cursor = dbapi_conn.cursor()
    cursor.execute("PRAGMA foreign_keys=ON")
    cursor.close()
