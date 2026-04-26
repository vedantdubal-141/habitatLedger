
# RentTrack

RentTrack is a full-stack web application for tracking and managing rental property issues. It provides a structured way to log, categorize, monitor, and resolve issues with supporting media and lifecycle tracking.

The system is designed as a **personal tracking tool**, focusing on clarity, organization, and completeness rather than external validation or automation.

---

## Architecture Overview

The project is organized into three main parts:

* **client** – React frontend (Vite + Material UI)
* **server** – Express + MongoDB backend API
* **neo** – auxiliary workspace for project planning, summaries, and generated outputs

---

## Project Structure

```text
.
├── client/                    # Frontend application (React + Vite)
│   ├── public/               # Static assets (images, icons)
│   ├── src/
│   │   ├── api/              # API layer (Axios configuration and calls)
│   │   ├── components/       # Reusable UI components
│   │   ├── data/             # Static data and predefined categories
│   │   ├── pages/            # Page-level views (Dashboard, Details, Form)
│   │   ├── store/            # Zustand state management
│   │   ├── assets/           # Local media assets
│   │   ├── App.jsx           # Routing configuration
│   │   ├── main.jsx          # Application entry point
│   │   └── index.css         # Global styles and design tokens
│   ├── index.html            # Root HTML template
│   ├── vite.config.js        # Vite configuration
│   ├── package.json          # Frontend dependencies
│   └── README.md             # Frontend documentation
│
├── server/                   # Backend API (Express + MongoDB)
│   ├── src/
│   │   ├── config/           # Configuration (database connection)
│   │   ├── controllers/      # Request handlers and business logic
│   │   ├── middlewares/      # Custom Express middlewares
│   │   ├── models/           # Mongoose schemas
│   │   ├── routes/           # API route definitions
│   │   ├── app.js            # Express app setup
│   │   └── index.js          # Server entry point
│   ├── uploads/              # Stored media files (images, videos, docs)
│   ├── seed.js               # Database seeding script
│   ├── package.json          # Backend dependencies
│   └── README.md             # Backend documentation
│
├── neo/                      # Supporting workspace (non-runtime)
│   ├── input/                # Project specifications / prompts
│   ├── output/               # Generated outputs
│   ├── logs/                 # Execution logs
│   └── summery/              # Summaries and notes
│
├── README.md                 # Root project documentation
```

---

## Key Features

* Issue creation with category and severity
* Media attachments (image, video, document)
* Issue lifecycle tracking (open → in progress → closed)
* Closure with notes and supporting proof
* Timeline/history tracking for each issue
* Filtering and search
* Basic insights and statistics
* Structured and consistent UI

---

## Technology Stack

### Frontend

* React (Vite)
* Material UI
* Zustand (state management)
* React Router
* Recharts (data visualization)

### Backend

* Node.js
* Express
* MongoDB (Mongoose)
* Multer (file uploads)

---

## Getting Started

### 1. Install dependencies

From project root:

```bash
cd client
pnpm install

cd ../server
pnpm install
```

---

### 2. Configure environment

Create a `.env` file in `server/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

---

### 3. Run backend

```bash
cd server
pnpm run dev
```

---

### 4. Run frontend

```bash
cd client
pnpm dev
```

---

### 5. Seed database (optional)

```bash
cd server
node seed.js
```

This populates the database with sample issues for testing and UI development.

---

## API Overview

Base URL:

```
http://localhost:5000/api
```

Core endpoints:

* `GET /issues` – list issues
* `GET /issues/:id` – get single issue
* `POST /issues` – create issue
* `PATCH /issues/:id` – update issue
* `PATCH /issues/:id/status` – update status
* `PATCH /issues/:id/close` – close issue
* `DELETE /issues/:id` – delete issue

---

## Design Principles

* Structured data over unorganized input
* Clear separation of concerns (frontend vs backend)
* Minimal external dependencies
* No assumptions of authority or verification
* Focus on usability and readability

---

## Notes

* The application does not integrate with external systems
* All data is user-provided and not verified
* Media files are stored locally on the server

---

## Development Scope

This project is designed as:

* a demonstration of full-stack architecture
* a structured data management system
* a UI-focused dashboard application

It is not intended to:

* enforce legal processes
* provide verified or certified data
* integrate with third-party platforms

---
