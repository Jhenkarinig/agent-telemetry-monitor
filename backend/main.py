from typing import List, Literal
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from datetime import datetime
from sqlalchemy.orm import Session

import models
from database import engine, get_db

# Create SQLite database tables if they do not exist
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Agentic System Telemetry & Performance Monitor API")

# Configure CORS Middleware to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic validation schemas
class TelemetryCreate(BaseModel):
    agent_name: str = Field(..., min_length=1, description="Name of the autonomous agent")
    execution_status: Literal["Thinking", "Executing", "Error Loop"] = Field(
        ..., description="Current execution state of the agent"
    )
    tokens_used: int = Field(0, ge=0, description="Total LLM tokens consumed")
    cost: float = Field(0.0, ge=0.0, description="Financial cost in USD")

class TelemetryResponse(BaseModel):
    id: int
    agent_name: str
    execution_status: str
    tokens_used: int
    cost: float
    timestamp: datetime

    class Config:
        orm_mode = True  # Pydantic v1 support
        from_attributes = True  # Pydantic v2 support

@app.post("/api/logs", response_model=TelemetryResponse, status_code=201)
def create_log(log_in: TelemetryCreate, db: Session = Depends(get_db)):
    db_log = models.TelemetryLog(
        agent_name=log_in.agent_name,
        execution_status=log_in.execution_status,
        tokens_used=log_in.tokens_used,
        cost=log_in.cost
    )
    db.add(db_log)
    db.commit()
    db.refresh(db_log)
    return db_log

@app.get("/api/logs", response_model=List[TelemetryResponse])
def get_logs(db: Session = Depends(get_db)):
    # Retrieve logs in reverse chronological order (newest first)
    logs = db.query(models.TelemetryLog).order_by(models.TelemetryLog.timestamp.desc()).all()
    return logs
