# CodeTrack – Coding Practice Tracker

## Problem statement

Record coding problems, languages, difficulty levels, and completion status.

CodeTrack is a full-stack academic project for tracking coding practice. Users can register, keep a private list of problems, update their progress, and review summaries of their practice.

## Objectives and features

- Store problem title, language, difficulty, platform, completion status, URL, and notes.
- Search, filter, sort, add, edit, and delete problem records.
- Show dashboard totals, completion rate, recent problems, and charts.
- Review language, difficulty, status, and platform analytics.
- Maintain a user profile and protect each user's records with authentication.
- Provide a responsive React interface for desktop and mobile screens.

## Technology stack

- Frontend: React 18, Vite, React Router, Axios, Recharts, Lucide React, HTML5, and CSS3.
- Backend: Node.js, Express, Mongoose, JSON Web Tokens, and bcryptjs.
- Database: MongoDB.

## Architecture

The client is organized into pages, reusable components, authentication context, and API services under `client/src`. The Express server separates routes, controllers, middleware, models, and database configuration under `server`. MongoDB stores user accounts and per-user coding problem documents. Private API routes use a bearer token and scope problem queries to the authenticated user.

## Requirements

- Node.js 18 or newer and npm.
- A MongoDB instance, local or hosted.

## Installation and environment

Install dependencies in both app folders:

```bash
cd server
npm install
cd ../client
npm install
```

Copy `server/.env.example` to `server/.env`, set `MONGODB_URI` to your MongoDB connection string, and replace `JWT_SECRET` with a long random value. `PORT` defaults to 5000. Copy `client/.env.example` to `client/.env` if the API is not at `http://localhost:5000/api`; set `VITE_API_URL` to the API base URL.

Do not commit `.env` files or real credentials.

## Run the application

In one terminal:

```bash
cd server
npm run dev
```

In another terminal:

```bash
cd client
npm run dev
```

Open the Vite URL printed in the client terminal (normally `http://localhost:5173`). To create the optional demo account and sample problems, configure the backend environment and run `npm run seed` from `server`.

## API overview

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Sign in |
| GET | `/api/auth/me` | Read current account |
| GET, POST | `/api/problems` | List or create problems |
| GET, PUT, DELETE | `/api/problems/:id` | Read, update, or delete a problem |
| GET | `/api/dashboard/stats` | Read dashboard and analytics data |
| GET, PUT | `/api/users/profile` | Read or update profile name |
| GET | `/api/health` | API health check |

## Project structure

```text
client/
  src/components/  Shared forms, tables, navigation, and UI
  src/context/     Authentication state
  src/pages/       Landing, login, register, dashboard, problems, analytics, profile
  src/services/    HTTP client and API calls
server/
  config/          MongoDB connection
  controllers/     Request handling and calculations
  middleware/      Authentication and error handling
  models/          User and coding problem schemas
  routes/          API endpoints
```

## Demonstration workflow

Register an account, sign in, add problems with different languages and statuses, then search and filter the list. Edit or delete a record and revisit Dashboard or Analytics to see the database-backed totals. Update the profile name, log out, and sign back in to confirm the data persists.

## Future scope

Possible future improvements include exporting a personal practice log and adding more detailed time-based progress summaries.
