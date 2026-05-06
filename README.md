# Containerized Task Manager (Full-Stack DevOps Project)

A modern full-stack **task management application** built using **React, Flask, and MongoDB**, fully containerized using **Docker** and orchestrated with **Docker Compose**.

This project demonstrates real-world **DevOps workflows**, including multi-service architecture, API integration, and container-based deployment.

---

## Project Highlights

- Full-stack architecture (React + Flask + MongoDB)
- Containerized using Docker (frontend & backend separated)
- Service orchestration using Docker Compose
- REST API integration with real-time UI updates
- External database integration using MongoDB Atlas
- Environment-based configuration (.env support)
- API testing performed using Thunder Client

---

## Tech Stack

**Frontend:**
- React.js
- Bootstrap
- Axios

**Backend:**
- Flask (Python)
- Flask-CORS
- PyMongo

**Database:**
- MongoDB Atlas (Cloud Database)

**DevOps:**
- Docker
- Docker Compose

---

## 🏗 Architecture Overview
React Frontend (Docker Container)
↓ REST API calls (Axios)
Flask Backend (Docker Container)
↓ Database queries (PyMongo)
MongoDB Atlas (Cloud Database)


### 🔗 Service Communication Flow

1. React frontend sends HTTP requests to backend API
2. Flask backend processes business logic and handles requests
3. Backend interacts with MongoDB Atlas for data storage/retrieval
4. Response is sent back to frontend for real-time UI updates

👉 Docker Compose ensures all services run together and communicate seamlessly through a shared internal network.

---

## ⚙️ Docker Architecture

Each service is containerized independently:

| Service   | Description                   | Port |
|----------|------------------------------|------|
| Frontend | React UI served via Nginx     | 3000 |
| Backend  | Flask REST API               | 5000 |
| Database  | MongoDB Atlas (Cloud-hosted) | External |

---

## Features

- Create new tasks
- View all tasks from database
- Update existing tasks
- Delete tasks
- Real-time synchronization between UI and backend
- Persistent storage using MongoDB Atlas
- Fully containerized application using Docker Compose

---

## How to Run the Project

### Clone the repository

```bash
git clone https://github.com/your-username/containerized-task-manager.git
cd containerized-task-manager
