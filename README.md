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

## ✅ Test 2 — API Backend with swagger

<img width="957" height="867" alt="4" src="https://github.com/user-attachments/assets/ac46568a-7f15-4cc3-8981-5d53d80bbe9f" />


### Health check endpoint test

<img width="903" height="822" alt="5" src="https://github.com/user-attachments/assets/91198276-ad9e-4018-9889-f9d40934d0e8" />

### Get products endpoint test

<img width="942" height="918" alt="6" src="https://github.com/user-attachments/assets/6fe01314-6f2d-4a68-885f-8e0f85a2d040" />

### Create product endpoint test

<img width="942" height="518" alt="7" src="https://github.com/user-attachments/assets/0ae73ce3-6104-43d2-a4fa-c8aed077e300" />

<img width="937" height="917" alt="8" src="https://github.com/user-attachments/assets/1bc32272-9453-402f-8d01-78ae3e21d4d3" />

###  Get product by id endpoint test

<img width="942" height="445" alt="9" src="https://github.com/user-attachments/assets/dcf5f77d-36d1-446b-8273-b240403d7c08" />

<img width="935" height="907" alt="10" src="https://github.com/user-attachments/assets/2cf088f1-c1c6-4d47-b99a-fad647fe4bdb" />

###  Update product endpoint test

<img width="957" height="575" alt="11" src="https://github.com/user-attachments/assets/a4e3ed6f-a2f3-43cf-9d7c-4655e92e51a1" />

<img width="913" height="912" alt="12" src="https://github.com/user-attachments/assets/11c0fc57-b76d-4c95-a32f-3d79778e07b0" />

###  Delete product endpoint test

<img width="930" height="493" alt="13" src="https://github.com/user-attachments/assets/af9866ce-8315-41ce-a297-ea8f46c406de" />

<img width="937" height="728" alt="14" src="https://github.com/user-attachments/assets/99d6ebd6-ef69-4b31-b1c3-83a519e288b7" />

## ✅ Test 3 — Working Frontend Interface

### Access in Browser

```
http://localhost:8080
```

### Expected Result

- Inventory items displayed from backend

<img width="958" height="728" alt="15" src="https://github.com/user-attachments/assets/32452eaf-ad3e-4712-8cab-8eb60eba6260" />

### Crud test ( Edit product )

<img width="957" height="775" alt="16" src="https://github.com/user-attachments/assets/3c9fedff-9cdc-4b57-81b4-f270d299b8fc" />

### Crud test ( Add product )

<img width="956" height="651" alt="17" src="https://github.com/user-attachments/assets/c83612ba-e3ab-4a93-8df4-4b335ccee476" />

<img width="955" height="702" alt="18" src="https://github.com/user-attachments/assets/69a87aad-e84c-431f-8e55-7da005ae3f98" />

### Crud test ( Delete product )

<img width="956" height="715" alt="19" src="https://github.com/user-attachments/assets/a681e220-7756-4f30-b9cd-fdf81fb2dbb0" />

<img width="956" height="693" alt="20" src="https://github.com/user-attachments/assets/a5cfb193-e765-4b7f-b27d-9cc2f47d5cd8" />

<img width="958" height="651" alt="21" src="https://github.com/user-attachments/assets/cea73037-bc1b-4139-8b16-310e8f5d88aa" />

## ✅ Test 4 — Network Isolation

### Command

```bash
docker exec -it inventory_frontend ping inventory_db
```

### Expected Result

- Connection fails  
- Confirms frontend cannot access database  

<img width="1026" height="82" alt="41" src="https://github.com/user-attachments/assets/992a72a6-e304-4383-8750-f21d74f9145f" />


---

## ✅ Test 5 — Docker Volume

### Command

```bash
docker volume ls
```

### Expected Result

- `multi-tear-application_postgres-data`

<img width="763" height="142" alt="42" src="https://github.com/user-attachments/assets/03084c53-364d-4767-b678-898fe332540a" />

### Stop all the containers and launch them again to verify the persistence of the data

<img width="837" height="331" alt="23" src="https://github.com/user-attachments/assets/90087b96-4135-49f3-8d38-bee5ee4a9c69" />

<img width="960" height="702" alt="24" src="https://github.com/user-attachments/assets/200f05b9-5995-4cc0-b00e-b425494b8e3f" />

### After refresh the data stays the same

<img width="957" height="722" alt="25" src="https://github.com/user-attachments/assets/980c08bf-caf6-4966-a6fb-b560ced8c23f" />

---

## ✅ Test 4 — Resource Limits

### Command

```bash
docker stats
```

### Expected Result

- CPU limits visible  
- Memory limits visible  

<img width="620" height="38" alt="26" src="https://github.com/user-attachments/assets/60f1f1b2-a92f-4528-aab3-96c404693de1" />

<img width="1082" height="102" alt="27" src="https://github.com/user-attachments/assets/cb8148da-499c-4542-9f9e-ca9e57bbe60d" />



---

## ✅ Test 7 — Health checks

### 🎯 Objective

- Verify that all containers reach the **"healthy"** state  
- Document the time required to reach this state  
- Test failure behavior by stopping the database  

---

### 🔹 Step 1 — Verify Healthy Status

#### Command

```bash
docker-compose ps
```

#### Expected Result

- All services show **Up**
- Backend container shows **(healthy)**

<img width="1606" height="267" alt="28" src="https://github.com/user-attachments/assets/50f53a44-ced4-4801-958a-030d9475b300" />


---

### 🔹 Step 2 — Measure Time to Healthy

After running:

```bash
docker-compose up -d
```

Use:

```bash
docker-compose ps
```

Observe:

- Initial state: `starting`
- Final state: `healthy`
- Document the time required to reach **healthy**

<img width="1606" height="267" alt="28" src="https://github.com/user-attachments/assets/50f53a44-ced4-4801-958a-030d9475b300" />

<img width="797" height="137" alt="32" src="https://github.com/user-attachments/assets/6b3a1238-7442-495f-b0d6-ffe64c24e76a" />


---

### 🔹 Step 3 — Failure Simulation (Database Stop)

Stop the database container:

```bash
docker stop database
```
Then verify health status:

```bash
docker-compose ps
```

#### Expected Behavior

- Backend container eventually becomes **unhealthy**
- Health check fails because database is unreachable

<img width="1562" height="221" alt="35" src="https://github.com/user-attachments/assets/6be92530-b655-4d7d-bf7f-804df521fd6f" />


---

### 🔹 Step 4 — Recovery Test

Restart the database:

```bash
docker start database
```

Wait a few seconds and verify again:

```bash
docker-compose ps
```

#### Expected Behavior

- Backend returns to **healthy** state

<img width="1557" height="477" alt="36" src="https://github.com/user-attachments/assets/083d2689-c0f1-450a-96ee-bcc4d49708a0" />


---

#### Other necessary commands 

### 🔹1 — Display networks

```bash
docker network ls
```
<img width="797" height="210" alt="37" src="https://github.com/user-attachments/assets/04edfcb6-0290-42d2-9d20-b953d1f22892" />

### 🔹2 — Display volumes

```bash
docker volume ls
```

<img width="707" height="153" alt="38" src="https://github.com/user-attachments/assets/426257d4-f4c5-4404-ad09-681fbcff00cc" />

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
git clone https://github.com/BahaEssid1/Multi_tear_application.git
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
