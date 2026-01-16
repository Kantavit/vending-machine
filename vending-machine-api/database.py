from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base
import os
from dotenv import load_dotenv

load_dotenv(".env.development.local")

DATABASE_URL = os.getenv("DATABASE_URL")

# Check if we are running locally or in docker
import socket
try:
    socket.gethostbyname("database")
except socket.error:
    # If 'database' cannot be resolved, assume we are running locally and fallback to localhost
    if DATABASE_URL and "database" in DATABASE_URL:
        DATABASE_URL = DATABASE_URL.replace("database", "localhost")

# Ensure using aiomysql driver
if DATABASE_URL and DATABASE_URL.startswith("mysql://"):
    DATABASE_URL = DATABASE_URL.replace("mysql://", "mysql+aiomysql://")

engine = create_async_engine(DATABASE_URL, echo=True)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autoflush=False,
)

Base = declarative_base()

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
