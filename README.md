# 📦 DevOps Multi-Tier Inventory System (Docker + FastAPI + React + PostgreSQL)

## 📖 Project Description

This project is a **multi-tier inventory management system** developed using:

- **Frontend:** React + Nginx  
- **Backend:** FastAPI (Python)  
- **Database:** PostgreSQL  
- **Containerization:** Docker & Docker Compose  

The goal of the project is to demonstrate:

- Multi-container architecture  
- Service isolation using Docker networks  
- Persistent storage with Docker volumes  
- Health check configuration  
- Resource limitation (CPU & Memory)  
- Backend ↔ Database communication  
- Frontend ↔ Backend API integration  

---

# 🧠 Features Implemented

## 1️⃣ Multi-Tier Architecture

We created:

### 🔹 Frontend Service

- Served using **React**
- Exposed on port `8080`
- Connected only to `frontend-network`
- Fetches data from backend API

### 🔹 Backend Service

- Built with **FastAPI**
- Exposed on port `8000`
- Connected to:
  - `frontend-network`
  - `backend-network`
- Includes Docker **health check**
- Handles inventory CRUD operations

### 🔹 Database Service

- PostgreSQL container
- Uses persistent Docker volume
- Connected only to `backend-network`
- Isolated from frontend

---

## 2️⃣ Docker Networking

Two custom networks were created:

- `frontend-network`
- `backend-network`

This ensures:

- Frontend ❌ cannot access database directly  
- Backend ✅ can access database  
- Database is not publicly exposed  

---

## 3️⃣ Persistent Storage

### 🔹 Volume: `postgres-data`

This guarantees:

- Data is preserved after container restart  
- No data loss during rebuild  

---

# 🧪 Tests & Validation

## ✅ Test 1 — Services Status

### Command

```bash
docker-compose ps
```

### Expected Result

- All services show **Up**
- Backend shows **(healthy)**

📸 <img width="1552" height="208" alt="40" src="https://github.com/user-attachments/assets/a0fc54c7-56eb-477b-a48f-6c6b3e2db2b7" />

### Verify connectivity between backend and databse

### Command

```bash
docker logs inventory_backend
```

```bash
docker exec -it inventory_backend sh
```
```bash
ping database
```
📸 <img width="827" height="322" alt="2" src="https://github.com/user-attachments/assets/edfa2897-e6da-4e4b-8c91-d6465f81ce45" />

---

## ✅ Test 2 — Docker Networks

### Command

```bash
docker network ls
```

### Expected Result

- `frontend-network`
- `backend-network`

📸 *(Insert Screenshot #2 here)*

---

## ✅ Test 3 — Docker Volume

### Command

```bash
docker volume ls
```

### Expected Result

- `multi-tear-application_postgres-data`

📸 *(Insert Screenshot #3 here)*

---

## ✅ Test 4 — Resource Limits

### Command

```bash
docker stats
```

### Expected Result

- CPU limits visible  
- Memory limits visible  

📸 *(Insert Screenshot #4 here)*

---

## ✅ Test 5 — Working Frontend Interface

### Access in Browser

```
http://localhost:8080
```

### Expected Result

- Inventory items displayed from backend

📸 *(Insert Screenshot #5 here)*

---

## ✅ Test 6 — Add Inventory Item

### Steps

- Add new item via frontend  
- Verify item appears  
- Confirm data stored in PostgreSQL  

📸 *(Insert Screenshot #6 here)*

---

## ✅ Test 7 — Backend → Database Logs

### Command

```bash
docker logs inventory_backend
```

### Expected Result

- Successful database connection logs

📸 *(Insert Screenshot #7 here)*

---

## ✅ Test 8 — Network Isolation

### Command

```bash
docker exec -it inventory_frontend ping inventory_db
```

### Expected Result

- Connection fails  
- Confirms frontend cannot access database  

📸 *(Insert Screenshot #8 here)*

---

# 🗂️ Project Structure

```bash
multi-tear-application/
│
├── backend/
├── frontend/
├── docker-compose.yml
├── .env
├── .gitignore
└── README.md
```

---

# 🏗️ How to Run the Project

## 1️⃣ Clone Repository

```bash
git clone <your-repository-url>
cd multi-tear-application
```

## 2️⃣ Start Services

```bash
docker-compose up -d --build
```

## 3️⃣ Verify Containers

```bash
docker-compose ps
```

## 4️⃣ Access Application

```
http://localhost:8080
```

---

# 🛠️ Useful Commands

### 🔹 Stop containers

```bash
docker-compose down
```

### 🔹 Remove containers + volumes

```bash
docker-compose down -v
```

### 🔹 Rebuild backend

```bash
docker-compose build backend
```

### 🔹 View logs

```bash
docker logs inventory_backend
docker logs inventory_db
```

---

# 🧯 Common Troubleshooting

## ❌ Backend shows "unhealthy"

- Ensure database container is running
- Verify environment variables
- Check logs:

```bash
docker logs inventory_backend
```

---

## ❌ Port already in use

Modify exposed ports inside `docker-compose.yml`.

---

## ❌ Database connection refused

- Ensure backend and database share `backend-network`
- Confirm DB container is running

---

# 🎯 DevOps Concepts Demonstrated

- Container orchestration with Docker Compose  
- Multi-tier application design  
- Network segmentation  
- Persistent volumes  
- Health monitoring  
- Resource control  
- Secure service communication  
