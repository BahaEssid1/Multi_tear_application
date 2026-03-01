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

<img width="1552" height="208" alt="40" src="https://github.com/user-attachments/assets/a0fc54c7-56eb-477b-a48f-6c6b3e2db2b7" />

### Verify connectivity between backend and databse

### Command

```bash
docker logs inventory_backend
```
<img width="827" height="322" alt="2" src="https://github.com/user-attachments/assets/edfa2897-e6da-4e4b-8c91-d6465f81ce45" />

```bash
docker exec -it inventory_backend sh
```
```bash
ping database
```
<img width="801" height="287" alt="3" src="https://github.com/user-attachments/assets/48ba2d12-d13d-4260-88c2-5f4d71dc0111" />


---

## ✅ Test 2 — API Backend

<img width="957" height="867" alt="4" src="https://github.com/user-attachments/assets/ac46568a-7f15-4cc3-8981-5d53d80bbe9f" />


### Health check enpoint test

<img width="903" height="822" alt="5" src="https://github.com/user-attachments/assets/91198276-ad9e-4018-9889-f9d40934d0e8" />

### All endpoints test

<img width="942" height="918" alt="6" src="https://github.com/user-attachments/assets/6fe01314-6f2d-4a68-885f-8e0f85a2d040" />

<img width="942" height="518" alt="7" src="https://github.com/user-attachments/assets/0ae73ce3-6104-43d2-a4fa-c8aed077e300" />

<img width="937" height="917" alt="8" src="https://github.com/user-attachments/assets/1bc32272-9453-402f-8d01-78ae3e21d4d3" />

<img width="942" height="445" alt="9" src="https://github.com/user-attachments/assets/dcf5f77d-36d1-446b-8273-b240403d7c08" />

<img width="935" height="907" alt="10" src="https://github.com/user-attachments/assets/2cf088f1-c1c6-4d47-b99a-fad647fe4bdb" />

<img width="957" height="575" alt="11" src="https://github.com/user-attachments/assets/a4e3ed6f-a2f3-43cf-9d7c-4655e92e51a1" />

<img width="913" height="912" alt="12" src="https://github.com/user-attachments/assets/11c0fc57-b76d-4c95-a32f-3d79778e07b0" />

<img width="930" height="493" alt="13" src="https://github.com/user-attachments/assets/af9866ce-8315-41ce-a297-ea8f46c406de" />

<img width="937" height="728" alt="14" src="https://github.com/user-attachments/assets/99d6ebd6-ef69-4b31-b1c3-83a519e288b7" />











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
