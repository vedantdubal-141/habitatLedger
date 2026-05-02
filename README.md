# HabitatLedger (formerly RentTrack)

HabitatLedger is a full-stack web application designed to empower tenants by providing a structured way to log, categorize, monitor, and resolve rental property issues with supporting media, lifecycle tracking, and integrated legal rights awareness.

---

## 🔗 Important Links

* **Figma Design:** [View on Figma](https://www.figma.com/design/mYVmO4pvqrD2Kz3WqUeJLL/Untitled?node-id=1-757&t=0WtgMXsgxGMLtN7b-0)
* **Live Deployed Project:** [https://habitatledger.vercel.app](https://habitatledger.vercel.app)
* **Backend Deployed API:** [https://habitatledger-api.onrender.com](https://habitatledger-api.onrender.com)
* **Postman Documentation:** [https://documenter.getpostman.com/view/50839360/2sBXqKofTh](https://documenter.getpostman.com/view/50839360/2sBXqKofTh)
* **YouTube Demo:** [Watch on YouTube](https://youtu.be/9H7uuvsDRLk)
* **GitHub Repository:** [vedantdubal-141/habitatLedger](https://github.com/vedantdubal-141/habitatLedger)
* **Official PRs:** [CodingGita Project PRs](https://github.com/codinggita/habitatLedger/pulls?q=is%3Apr+is%3Aclosed)
---

## ⚠️ Problem Statement

Millions of tenants deal with unresolved construction defects, maintenance negligence, and structural hazards in their rental units. Reporting these issues often leads to fragmented communication (texts, emails, verbal complaints), making it difficult to hold property management accountable. Furthermore, many renters are unaware of their legal rights under federal and state housing laws, leaving them vulnerable to unsafe living conditions and wrongful eviction.

## 💡 Solution

**HabitatLedger** bridges this gap by providing an organized, immutable ledger for tenants to document housing issues. It moves complaints from chaotic text messages into a structured dashboard where users can upload proof (photos/documents), categorize severity, and track the lifecycle of a complaint from "Open" to "Resolved". Crucially, it incorporates an educational layer—directly citing construction defect literature and housing laws (like the Fair Housing Act and state-specific tenant rights)—empowering users with the knowledge to advocate for themselves effectively.

## ✨ Features

* **Issue Management Dashboard:** A centralized kanban-style and list-style view of all property issues.
* **Evidence Uploads:** Attach multiple photos and documents (powered by Multer) to build a solid paper trail.
* **Issue Lifecycle Tracking:** Track status changes with a detailed, timestamped event timeline.
* **Resolution Proof:** Force users to upload proof of resolution and closing notes before an issue can be marked "Closed".
* **Legal Knowledge Base:** Expandable federal housing laws (Title X, FHA, HMDA) and state-by-state tenant right comparisons.
* **Defect Awareness:** Educational cards explaining systemic structural defects, pest risks, and HVAC failures with sourced severity levels.
* **Mobile-First Responsive Design:** Bottom navigation bar for mobile users and clean top navigation for desktop.
* **Tree-Directory Issue Explorer:** Terminal-inspired visual hierarchy to filter issues by status and category.

## 🛠️ Tech Stack

* **Frontend:** React 19, Vite, Material UI (MUI Icons), Zustand (State Management), React-Dropzone
* **Backend:** Node.js, Express.js, MongoDB, Mongoose
* **Middleware & Tools:** Multer (File Uploads), CORS, dotenv
* **Architecture:** RESTful API, MVC Pattern

## 📂 Proper Folder Structure

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
