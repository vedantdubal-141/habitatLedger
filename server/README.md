# RentTrack Server

The backend REST API for RentTrack, built with Express and MongoDB. It provides endpoints for creating, retrieving, updating, and managing rental issues, along with a category-based media upload system.

## Directory Structure

```text
server/
├── src/
│   ├── config/
│   │   └── db.js                    # Database connection logic
│   ├── controllers/
│   │   └── issue.controller.js      # Request handling and business logic
│   ├── middlewares/
│   │   └── upload.js                # Multer config (category routing, 10MB limit)
│   ├── models/
│   │   └── issue.model.js           # Mongoose schemas and data models
│   ├── routes/
│   │   ├── issue.routes.js          # Issue CRUD endpoints
│   │   └── upload.routes.js         # File upload endpoint
│   ├── app.js                       # Express setup + CORS + static serving
│   └── index.js                     # Server entry point
├── uploads/                         # Physical file storage (category subfolders)
│   ├── water/                       # Water damage / leak photos
│   ├── electrical/                  # Wiring and electrical hazard photos
│   ├── hvac/                        # HVAC system failure photos
│   ├── pest/                        # Pest infestation photos
│   ├── structural/                  # Foundation / wall crack photos
│   ├── appliances/                  # Broken appliance photos
│   ├── security/                    # Fire alarm / security system photos
│   └── maintenance/                 # General maintenance issue photos
├── seed.js                          # Database seeding with sourced data
├── .env                             # Environment configuration
├── package.json                     # Dependencies and scripts
└── README.md                        # Server documentation
```

## API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Check API health status |
| `GET` | `/api/issues` | Retrieve all issues (supports filtering) |
| `GET` | `/api/issues/stats` | Retrieve aggregated statistics |
| `GET` | `/api/issues/:id` | Retrieve a specific issue by ID |
| `POST` | `/api/issues` | Create a new issue |
| `PATCH` | `/api/issues/:id` | Update issue details |
| `PATCH` | `/api/issues/:id/status`| Update issue workflow status |
| `PATCH` | `/api/issues/:id/close` | Close an issue (requires resolution note) |
| `PATCH` | `/api/issues/:id/pin` | Toggle pinned status |
| `DELETE`| `/api/issues/:id` | Delete an issue |
| `POST` | `/api/upload?category=` | Upload files to a category subfolder |

## Media Handling & File Uploads (Multer Setup)

To prevent the MongoDB database from being overloaded with massive Base64 strings, RentTrack handles binary files (images, videos, PDF documents) by saving them to a local physical directory organized by category.

### 1. The `uploads/` Directory

All user-uploaded physical files are saved into the `server/uploads/` folder, organized into 8 category-specific subfolders: `water/`, `electrical/`, `hvac/`, `pest/`, `structural/`, `appliances/`, `security/`, and `maintenance/`.

This folder is served statically to the public via Express within `app.js` (`app.use('/uploads', express.static(...))`), allowing the frontend to load images via simple URLs like `http://localhost:5000/uploads/water/filename.jpg`.

### 2. Multer Middleware (`upload.js`)

The server uses **Multer** (`src/middlewares/upload.js`) to parse incoming `multipart/form-data` requests.
* **Category Routing:** The `destination` function reads `req.body.category` or `req.query.category` and routes the file into the matching subfolder automatically. Invalid categories default to `maintenance/`.
* **Security:** Filenames are automatically randomized using `crypto.randomBytes(6)` appended to a timestamp to prevent file collision, overwrites, and directory traversal vulnerabilities.
* **Limits:** File sizes are strictly capped at 10MB per file to prevent abuse and out-of-memory errors.
* **Auto-creation:** Subdirectories are created on-the-fly via `fs.mkdirSync({ recursive: true })` if they don't already exist.

### 3. Dedicated Endpoint (`POST /api/upload`)

Instead of embedding file buffers into standard API JSON requests, file uploads are handled entirely by an isolated endpoint:
* The frontend transmits an array of raw binary files to `/api/upload?category=water`.
* The server intercepts the request, streams the files safely into the correct `uploads/<category>/` subfolder via Multer, and evaluates their MIME types.
* The endpoint responds with an array of structured JSON objects containing the **permanent static URLs** which the frontend then attaches to the final Issue document.

---

## Database Seeding (`seed.js`)

**Why is `seed.js` needed?**
When setting up the project initially or clearing the database for testing, the database starts perfectly empty. An empty database makes it difficult to test UI layouts, filters, charts, and general application flow.

The `seed.js` script connects to the database, wipes any existing issue records, and inserts 8 realistic issues (one per category) with sourced descriptions and real photos. This ensures every developer has a consistent, high-fidelity state to start with.

### Seed Data Sources

Each issue description is backed by real construction defect data from:

| Source | Coverage |
| :--- | :--- |
| [housing.com](https://housing.com/news/common-construction-defects-in-buildings/) | Foundation damage, plumbing, electrical, waterproofing, maintenance |
| [Elite Inspections](https://eliteinspections.com/10-common-construction-defects-found-during-inspections/) | Foundation cracks, HVAC errors, electrical hazards, pest entry |
| [Owner Inspections AU](https://ownerinspections.com.au/articles/australias-top-10-most-common-building-defects) | Water leaks, cracking, fire safety, electrical, building movement |
| [Realtors Kenya](https://realtors.co.ke/signs-of-poor-construction-in-apartments/) | Pest entry, substandard materials, fixture quality |
| [Builder Connect NZ](https://builderconnect.co.nz/blog/10-warning-signs-of-poor-quality-construction-work/) | Finishing quality, HVAC defects, structural framing |
| [Home Inspection Insider](https://homeinspectioninsider.com/home-inspection-structural-issues/) | Differential settlement, diagonal cracking |
| [Shreepad Group](https://shreepadgroup.com/blogs/signs-of-poor-construction-property-visit/) | Fixture quality, pest gaps, poor finishing |
| [Zac Rios (2025)](https://www.youtube.com/watch?v=w4Rr8tLHrpo) | New US construction quality crisis — rushed builds, skipped inspections |

To execute the seed script:
```bash
node seed.js
```

## Available Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| `start` | `node src/index.js` | Starts the server for production. |
| `dev` | `node --watch src/index.js` | Starts the server with live reload. |

