# RentTrack Client

The frontend application for RentTrack, designed with a focus on an empathetic, calming user experience using a green and white visual theme.

## Directory Structure

```text
client/
├── public/                # Static assets (background images, icons)
├── src/
│   ├── api/               # Axios client and API function wrappers
│   ├── components/        # Reusable UI components
│   ├── data/              # Constants and predefined classifications
│   ├── pages/             # Page-level components
│   ├── store/             # Zustand global state management
│   ├── App.jsx            # Main routing configuration
│   ├── index.css          # Global styles and design system variables
│   └── main.jsx           # React application entry point
├── package.json           # Frontend dependencies and scripts
└── README.md              # Client documentation
```

## Key Components

| Component | Description |
| :--- | :--- |
| `Dashboard` | The main landing page with summary statistics and the issue explorer. |
| `IssueExplorer` | A tree-directory style view to navigate issues by status and category. |
| `IssueForm` | Handles both creation of new issues and editing existing ones. |
| `IssueDetailPage` | Displays full issue context, history timeline, and action buttons. |
| `Timeline` | Visual sequence of events detailing the lifecycle of an issue. |
| `InsightsPanel` | Visualizes issue breakdown using CSS-based bar charts. |

## Media Handling & File Uploads (FormData Protocol)

RentTrack features drag-and-drop media uploading across both the "New Issue" forms and the "Close Issue" modal. To ensure optimal performance, the frontend avoids embedding heavy Base64 strings directly into state. 

### 1. Instant Lightweight Previews
When a user drops an image onto the uploader (`react-dropzone`), the application immediately intercepts the physical `File` object. Instead of reading the entire file buffer, it generates a fast, temporary local pointer using `URL.createObjectURL(file)`. This allows the UI to render immediate image previews with zero server communication and virtually zero memory cost.

### 2. Two-Step Submission Protocol
To securely transmit binaries alongside complex JSON data schemas, the frontend employs an asynchronous, hidden two-step save mechanism on form submission:

* **Step A (Binary Transmission):** The form script gathers all raw `File` objects into a standard `FormData` object and `POST`s them via Axios to the backend's `/api/upload` endpoint. 
* **Step B (JSON Finalization):** The backend catches the physical files and returns an array containing the permanent server-hosted URLs. The frontend swaps out its temporary local preview URLs for the permanent server URLs, incorporates them into the final structured JSON payload, and shoots the data over to the primary `/api/issues` CRUD endpoints to finalize the ticket.

---

## State Management
0
The application uses Zustand for state management (`src/store/useIssueStore.js`). State operations directly interface with the backend API via Axios. The store manages the main issue list, loading indicators, and error states, ensuring the UI stays synchronized with the database.

## Available Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| `dev` | `vite` | Starts the development server with HMR. |
| `build` | `vite build` | Builds the app for production to the `dist` folder. |
| `lint` | `eslint .` | Runs ESLint to check for code quality issues. |
| `preview` | `vite preview` | Previews the production build locally. |
