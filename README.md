# agent-telemetry-monitor
Telemetry and devops monitor for autonomous AI Agents
# Agentic System Telemetry & DevOps Performance Monitor

An end-to-end telemetry observability engine and real-time dashboard built using **Jetro.ai** and **Antigravity** workflows. This platform intercepts, profiles, and visualizes live background operational flows, financial LLM token expenditures, and logical execution states across autonomous multi-agent engineering pipelines.

## 🚀 Core Features
* **Live Telemetry Metrics**: Real-time aggregation of cumulative API costs, total LLM tokens emitted, and active concurrent agent workflow instances.
* **Anomalous Loop Detection**: Automated color-coded warning stream components that instantly flag and highlight agents locked in destructive `Error Loop` states.
* **Dynamic Cost Tracking**: Continuous time-series charting of cost accumulation trends utilizing fully reactive component layers to prevent budgeting surprises.
* **AI Workspace Archetype**: Native deployment framework including pre-configured environment boundaries (`.jetro`, `.cursor`, `.agents`, `.mcp.json`).

---

## 🛠️ System Architecture & Tech Stack
* **Backend Data Engine**: FastAPI, SQLAlchemy, SQLite local database tracking, Pydantic validation modeling.
* **Frontend Analytics Panel**: Next.js (Turbopack native compilation), Tailwind CSS layout tracking, Recharts vector graphing, Lucide React.
* **Development Workspace Operations**: Jetro.ai canvas synchronization, Google Antigravity 2.0 multi-agent tracking layers.

---

## 💻 Local Setup & Execution Guide

Follow these sequential terminal deployment steps to run the full-stack application on your machine.

### 1. Prerequisites
Ensure you have **Python 3.10+** and **Node.js 18+** installed on your operating system.

### 2. Run the Backend API Engine
Open your terminal panel inside the root repository workspace directory and execute:
```bash
# Navigate to the backend service engine folder
cd backend

# Activate the local virtual environment workspace
.\venv\Scripts\activate

# Launch the FastAPI live application server instance
uvicorn main:app --reload --port 8000
```
*The core API gateway endpoint will run actively on `http://localhost:8000`.*

### 3. Run the Frontend Dashboard Panel
Open a second, split terminal workspace panel and execute the following commands:
```bash
# Navigate to the user interface folder from the root
cd frontend

# Launch the Next.js local development instance
npm run dev
```
*The interactive telemetry dashboard will compile and run actively on `http://localhost:3000`.*

### 4. Inject Active Simulation Streams (Optional)
To pump live mock multi-agent system operational data onto your charts and logs stream, open a third terminal pane and trigger:
```bash
python simulator.py
```

---

## 🧠 Jetro.ai Workspace Engineering Approach
Rather than utilizing generative AI tools as basic textual code autocompletion helper chat prompts, this project was architected by treating **Jetro.ai** as a live, goal-oriented system engineering canvas:
* **Contextual Intent Boundaries**: Configured explicit tool context bounds via `.mcp.json` mapping rules, directing workspace engines to cleanly handle database modeling schemas, multi-folder architecture layouts, and secure Cross-Origin Resource Sharing (CORS) protocol states.
* **Inline Canvas Visual Profiling**: Leveraged localized Python diagnostic analytics blocks straight inside the IDE canvas pane to track pipeline bottlenecks, reduce multi-pane context-switching friction, and verify complex query logic trees cleanly.
* **Front-to-Back Data Synthesis**: Coordinated schema definitions between backend SQLAlchemy relational states and frontend charting layers, speeding up integration testing and frontend dashboard construction loops.
