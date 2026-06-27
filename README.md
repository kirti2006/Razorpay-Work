# Reimbursement Management System

A full-stack web application for managing employee reimbursement requests with role-based approval workflows.

## Overview

This system allows employees to submit reimbursement requests, managers to review and approve/reject them, and provides a complete authentication and role management layer.

## Architecture

```
Razorpay-Work/
├── Backend/       → REST API server (Express 5 + PostgreSQL)
├── Frontend/      → Web client (Vanilla HTML/CSS/JS)
└── README.md      → You are here
```

## Tech Stack

| Layer      | Technology                                     |
|------------|------------------------------------------------|
| **Frontend** | HTML, CSS, Vanilla JavaScript                |
| **Backend**  | Node.js, Express 5                           |
| **Database** | PostgreSQL + Drizzle ORM                     |
| **Auth**     | JWT (HttpOnly cookies)                       |
| **Validation** | Zod                                        |
| **Security** | Helmet, bcrypt, CORS                         |
| **Logging**  | Winston + Morgan                             |

## Features

- **User Registration & Login** — Cookie-based JWT authentication
- **Submit Reimbursements** — Employees can create reimbursement requests with title, description, and amount
- **View Reimbursements** — Dashboard showing all submitted requests with status (Pending / Approved / Rejected)
- **Role Management** — Assign roles (EMP, Manager, CFO) to users
- **Employee Assignment** — Assign employees to managers
- **Approval Workflow** — Managers can approve or reject reimbursement requests

## Getting Started

### Prerequisites

- Node.js ≥ 20.10.2
- PostgreSQL database

### 1. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Fill in your values:

```env
PORT=7002
DATABASE_URL=postgresql://user:password@localhost:5432/reimbursements
JWT_SECRET=your-secret-key
BCRYPT_SALT_ROUNDS=10
```

Run database migrations and seed:

```bash
npm run db:generate
npm run db:migrate
npm run db:seed-data
```

Start the server:

```bash
npm run dev
```

### 2. Frontend Setup

Serve the frontend files using a local server. You can use VS Code Live Server or:

```bash
cd Frontend
npx serve .
```

Open the app in your browser and make sure both the page and API use the same hostname (e.g., both on `localhost` or both on `127.0.0.1`).

## API Reference

Base URL: `http://localhost:7002/rest`

| Module           | Endpoint                        | Method | Auth | Description                     |
|------------------|---------------------------------|--------|------|---------------------------------|
| **Auth**         | `/onboardings/register`         | POST   | No   | Register a new user             |
|                  | `/onboardings/login`            | POST   | No   | Login & receive auth cookie     |
|                  | `/onboardings/logout`           | POST   | Yes  | Logout & clear cookie           |
| **Reimbursements** | `/reimbursements`             | POST   | Yes  | Create a reimbursement          |
|                  | `/reimbursements`               | GET    | Yes  | Get all reimbursements          |
|                  | `/reimbursements`               | PATCH  | Yes  | Update (approve/reject)         |
|                  | `/reimbursements/:userId`       | GET    | Yes  | Get reimbursements by user      |
| **Employees**    | `/employees`                    | GET    | Yes  | List all employees              |
|                  | `/employees/assign`             | POST   | Yes  | Assign employee to manager      |
|                  | `/employees/assign`             | DELETE | Yes  | Remove assignment               |
| **Roles**        | `/roles/assign`                 | POST   | Yes  | Assign role to a user           |
| **Health**       | `/health`                       | GET    | No   | Server health check             |

## Project Structure

```
Razorpay-Work/
│
├── Backend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── onboardings/       # Auth (register, login, logout)
│   │   │   ├── reimbursements/    # Reimbursement CRUD
│   │   │   ├── employees/         # Employee management
│   │   │   ├── roles/             # Role assignment
│   │   │   └── approvals/         # Approval schema
│   │   ├── config/                # DB & env config
│   │   ├── constants/             # Roles, statuses
│   │   ├── db/                    # Seed scripts
│   │   ├── logger/                # Winston logger
│   │   ├── middlewares/           # Auth, validation, error
│   │   ├── utils/                 # Helpers
│   │   ├── app.js                 # Express app factory
│   │   └── server.js              # Entry point
│   ├── migrations/                # SQL migrations
│   ├── drizzle.config.js
│   └── package.json
│
├── Frontend/
│   ├── index.html                 # Main page
│   ├── styles.css                 # Styling
│   └── app.js                     # API calls & DOM logic
│
└── README.md
```

## Scripts (Backend)

| Command                | Description                     |
|------------------------|---------------------------------|
| `npm run dev`          | Start development server        |
| `npm run db:generate`  | Generate Drizzle migrations     |
| `npm run db:migrate`   | Run database migrations         |
| `npm run db:seed-data` | Seed database with CFO user     |
