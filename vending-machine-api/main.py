from contextlib import asynccontextmanager
from fastapi import FastAPI
import redis.asyncio as redis
import models
import database
import os
import socket
from routers import users

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create tables on startup
    async with database.engine.begin() as conn:
        await conn.run_sync(models.Base.metadata.create_all)
    yield

app = FastAPI(lifespan=lifespan)

# Include routers
app.include_router(users.router)

# Initialize Redis connection
REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")
try:
    socket.gethostbyname("redis")
except socket.error:
    if "redis" in REDIS_URL and "//redis" in REDIS_URL:
        REDIS_URL = REDIS_URL.replace("//redis", "//localhost")

r = redis.from_url(REDIS_URL, decode_responses=True)

@app.get("/health")
async def health_check():
    return {"status": "ok"}

@app.get("/cache-test")
async def get_data():
    # Check if data exists in Redis
    cached_val = await r.get("my_key")
    if cached_val:
        return {"source": "cache", "data": cached_val}
    
    # If not, "fetch" it and save it to Redis for 60 seconds
    await r.set("my_key", "Hello from Redis!", ex=60)
    return {"source": "db", "data": "Hello from Redis!"}
