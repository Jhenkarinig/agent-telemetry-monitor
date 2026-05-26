from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime
from database import Base

class TelemetryLog(Base):
    __tablename__ = "telemetry_logs"

    id = Column(Integer, primary_key=True, index=True)
    agent_name = Column(String, index=True, nullable=False)
    execution_status = Column(String, nullable=False)  # "Thinking", "Executing", "Error Loop"
    tokens_used = Column(Integer, default=0, nullable=False)
    cost = Column(Float, default=0.0, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow, nullable=False)
