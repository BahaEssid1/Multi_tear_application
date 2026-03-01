📦 Multi-Tier Inventory Application (Dockerized)
📖 Project Description

This project is a multi-tier inventory management system built using:

Frontend: HTML / Nginx

Backend: FastAPI (Python)

Database: PostgreSQL

Containerization: Docker & Docker Compose

Networking: Isolated Docker networks

Healthchecks & Resource Limits

The objective of this project is to demonstrate:

Multi-container architecture

Service isolation using Docker networks

Persistent volumes

Health checks

Resource limitations

Backend ↔ Database communication

Frontend ↔ Backend API communication

🏗️ Architecture Overview

The application consists of:

🔹 Frontend Service

Served via Nginx

Connected only to backend network

Exposed on port 8080

🔹 Backend Service

Built with FastAPI

Exposed on port 8000

Connected to:

frontend network

database network

Includes health check

🔹 Database Service

PostgreSQL container

Uses persistent Docker volume

Isolated from frontend

🌐 Docker Networks

Two custom networks were created:

frontend-network

backend-network

This ensures:

Frontend ❌ cannot access database directly

Backend ✅ can access database

💾 Docker Volume

Persistent volume used:

postgres-data

This ensures database data remains even if containers are restarted.

📂 Project Structure
multi-tear-application/
│
├── backend/
├── frontend/
├── docker-compose.yml
├── .env
├── .gitignore
└── README.md

🧪 Tests & Validation
✅ Test 1 — All Services Running

Command:

docker-compose ps

Expected Result:

All services show Up

Backend shows (healthy)

📸 Screenshot required here
(Add screenshot #1)

✅ Test 2 — Docker Networks

Command:

docker network ls

Expected Result:

Two custom networks visible

📸 Screenshot required here
(Add screenshot #2)

✅ Test 3 — Docker Volume

Command:

docker volume ls

Expected Result:

multi-tear-application_postgres-data volume exists

📸 Screenshot required here
(Add screenshot #3)

✅ Test 4 — Resource Limits

Command:

docker stats

Expected Result:

CPU and memory limits applied to containers

📸 Screenshot required here
(Add screenshot #4)

✅ Test 5 — Frontend Functionality

Open browser:

http://localhost:8080

Expected Result:

Inventory items displayed from backend

📸 Screenshot required here
(Add screenshot #5)

✅ Test 6 — Add Data via Interface

Add a new inventory item

Verify it appears in list

Confirm stored in database

📸 Screenshot required here
(Add screenshot #6)

✅ Test 7 — Backend → Database Connection Logs

Command:

docker logs inventory_backend

Expected Result:

Logs showing successful connection to PostgreSQL

📸 Screenshot required here
(Add screenshot #7)

✅ Test 8 — Network Isolation Test

Attempt to access database from frontend container:

docker exec -it inventory_frontend ping inventory_db

Expected Result:

Connection fails

Confirms network isolation

📸 Screenshot required here
(Add screenshot #8)

🚀 How to Run the Project
1️⃣ Clone Repository
git clone <your-repository-url>
cd multi-tear-application
2️⃣ Start Services
docker-compose up -d --build
3️⃣ Verify
docker-compose ps
🛠️ Useful Commands
🔹 Stop containers
docker-compose down
🔹 Remove everything (including volumes)
docker-compose down -v
🔹 Rebuild backend
docker-compose build backend
🔹 View logs
docker logs inventory_backend
docker logs inventory_db
🧯 Common Troubleshooting
❌ Backend not healthy

Check database container is running

Verify environment variables

Run:

docker logs inventory_backend
❌ Port already in use

Change exposed port in docker-compose.yml.

❌ Database connection refused

Ensure backend and database share the same network.
