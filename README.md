# Orbit (DevCollab) 🚀

> A developer collaboration and project management platform — your all-in-one alternative to Discord + Trello + Notion + GitHub.

---

## Table of Contents

- [About](#about)
- [Problem Statement](#problem-statement)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [Database Schema](#database-schema)
- [User Roles](#user-roles)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## About

**Orbit** (internally named DevCollab) is a full-stack developer collaboration platform built with React, Node.js, and MongoDB. It enables developers, students, freelancers, and teams to create workspaces, manage projects, assign tasks, and collaborate — all from a single platform.

No more switching between five different tools. Orbit brings it all together.

---

## Problem Statement

Developers often struggle with:

- Finding a centralized place to collaborate
- Managing multiple projects across different tools
- Tracking tasks and deadlines efficiently
- Communicating with team members in context
- Organizing project resources and documentation

Most teams juggle Discord, Trello, Notion, and GitHub simultaneously, creating friction and inefficiency. Orbit solves this by combining workspaces, projects, tasks, members, and real-time communication into one cohesive platform.

---

## Features

### ✅ MVP (Phase 1)

- 🔐 **Authentication** — Register, login, logout with JWT access & refresh tokens
- 👤 **User Profiles** — Bio, skills, GitHub, LinkedIn, and portfolio links
- 🏢 **Workspace Management** — Create and manage top-level team workspaces
- 📁 **Project Management** — Projects with status tracking (Planning → Active → On Hold → Completed)
- ✅ **Task Management** — Tasks with priorities (Low / Medium / High / Urgent) and statuses (Todo → In Progress → Review → Completed)
- 👥 **Member Management** — Add/remove members, assign roles (Owner / Admin / Member)

### 🔜 Coming Soon (Phase 2)

- 💬 **Real-time Project Chat** — Socket.IO powered chat rooms with typing indicators and online status
- 🔔 **In-App Notifications** — Task assignments, member additions, project updates

### 🔮 Future (Phase 3 & 4)

- GitHub Integration
- AI Project Suggestions
- Analytics Dashboard
- Video Meetings
- Sprint Planning & Kanban Board
- Calendar Integration

---

## Tech Stack

| Layer       | Technology                                      |
|-------------|-------------------------------------------------|
| Frontend    | React, Tailwind CSS, React Router, Axios        |
| State Mgmt  | Context API / Redux Toolkit                     |
| Backend     | Node.js, Express.js                             |
| Database    | MongoDB, Mongoose                               |
| Auth        | JWT (Access Token + Refresh Token), Bcrypt      |
| Real-time   | Socket.IO                                       |
| Deployment  | Vercel (Frontend), Render / Railway (Backend), MongoDB Atlas |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account or local MongoDB instance

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Yashmevada2807/Orbit.git
cd Orbit
```

2. Install dependencies for both frontend and backend:

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3. Set up environment variables (see below).

### Environment Variables

**Backend (`backend/.env`):**

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_ACCESS_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

**Frontend (`frontend/.env`):**

```env
VITE_API_URL=http://localhost:5000/api/v1
```

### Running the App

**Backend** (runs on `http://localhost:5000`):

```bash
cd backend
npm run dev
```

**Frontend** (runs on `http://localhost:5173`):

```bash
cd frontend
npm run dev
```

---

## Project Structure

```
Orbit/
├── backend/
│   ├── src/
│   │   ├── controllers/       # Route controllers (auth, workspace, project, task)
│   │   ├── models/            # Mongoose models (User, Profile, Workspace, Project, Task)
│   │   ├── routes/            # Express API routes
│   │   ├── middleware/        # Auth middleware, error handlers
│   │   └── index.js           # Entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Page-level components
│   │   ├── context/           # Context API / Redux store
│   │   ├── api/               # Axios API calls
│   │   └── App.jsx            # Root component
│   └── package.json
├── PRD.md                     # Full Product Requirements Document
└── .gitignore
```

---

## API Reference

Base URL: `/api/v1`

### Authentication

| Method | Endpoint               | Description               |
|--------|------------------------|---------------------------|
| POST   | `/auth/register`       | Register a new user       |
| POST   | `/auth/login`          | Login and get tokens      |
| POST   | `/auth/logout`         | Logout and invalidate token |
| POST   | `/auth/refresh-token`  | Refresh access token      |
| GET    | `/auth/me`             | Get current logged-in user |

### Profile

| Method | Endpoint              | Description               |
|--------|-----------------------|---------------------------|
| POST   | `/profiles`           | Create user profile       |
| GET    | `/profiles/me`        | Get my profile            |
| PUT    | `/profiles/me`        | Update my profile         |
| GET    | `/profiles/:userId`   | Get profile by user ID    |

### Workspaces

| Method | Endpoint                                      | Description                  |
|--------|-----------------------------------------------|------------------------------|
| POST   | `/workspaces`                                 | Create a workspace           |
| GET    | `/workspaces`                                 | Get all user workspaces      |
| GET    | `/workspaces/:workspaceId`                    | Get workspace by ID          |
| PUT    | `/workspaces/:workspaceId`                    | Update workspace             |
| DELETE | `/workspaces/:workspaceId`                    | Delete workspace             |
| POST   | `/workspaces/:workspaceId/members`            | Add member to workspace      |
| GET    | `/workspaces/:workspaceId/members`            | Get workspace members        |
| PATCH  | `/workspaces/:workspaceId/members/:memberId`  | Update member role           |
| DELETE | `/workspaces/:workspaceId/members/:memberId`  | Remove member                |

### Projects

| Method | Endpoint                                              | Description                  |
|--------|-------------------------------------------------------|------------------------------|
| POST   | `/workspaces/:workspaceId/projects`                   | Create a project             |
| GET    | `/workspaces/:workspaceId/projects`                   | List all projects in workspace |
| GET    | `/workspaces/:workspaceId/projects/:projectId`        | Get project by ID            |
| PUT    | `/workspaces/:workspaceId/projects/:projectId`        | Update project               |
| DELETE | `/workspaces/:workspaceId/projects/:projectId`        | Delete project               |
| POST   | `/projects/:projectId/members`                        | Add member to project        |
| GET    | `/projects/:projectId/members`                        | Get project members          |
| PATCH  | `/projects/:projectId/members/:memberId`              | Update project member role   |
| DELETE | `/projects/:projectId/members/:memberId`              | Remove project member        |

### Tasks

| Method | Endpoint                                              | Description                  |
|--------|-------------------------------------------------------|------------------------------|
| POST   | `/projects/:projectId/tasks`                          | Create a task                |
| GET    | `/projects/:projectId/tasks`                          | List all tasks in project    |
| GET    | `/projects/:projectId/tasks/:taskId`                  | Get task by ID               |
| PUT    | `/projects/:projectId/tasks/:taskId`                  | Update task                  |
| PATCH  | `/projects/:projectId/tasks/:taskId/status`           | Update task status only      |
| DELETE | `/projects/:projectId/tasks/:taskId`                  | Delete task                  |

---

## Database Schema

### User
```
_id | name | email | password | role
```

### Profile
```
_id | user | username | bio | phone | skills | github | linkedin | portfolio
```

### Workspace
```
_id | name | description | owner | members[]
```

### Project
```
_id | workspace | owner | name | description | status | startDate | endDate | members[]
```

### Task
```
_id | project | assignedTo | title | description | status | priority | dueDate
```

---

## User Roles

| Role            | Permissions                                                        |
|-----------------|--------------------------------------------------------------------|
| Workspace Owner | Create/delete workspace, manage members, create projects, set permissions |
| Project Owner   | Create/update tasks, manage project members, monitor progress      |
| Member          | View assigned projects, update assigned tasks, participate in chat |

---

## Roadmap

- [x] Authentication (JWT)
- [x] User Profiles
- [x] Workspace Management
- [x] Project Management
- [x] Task Management
- [x] Member Roles & Permissions
- [ ] Real-time Chat (Socket.IO)
- [ ] In-App Notifications
- [ ] Activity Feed
- [ ] File Uploads
- [ ] GitHub Integration
- [ ] AI Project Suggestions
- [ ] Analytics Dashboard
- [ ] Video Meetings
- [ ] Kanban Board & Sprint Planning

---

## Contributing

Contributions are welcome! To get started:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m "Add your feature"`
4. Push to your fork: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## License

This project is licensed under the [MIT License](LICENSE).

---

_Made with ❤️ by [Yash Mevada](https://github.com/Yashmevada2807)_
