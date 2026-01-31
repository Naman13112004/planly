# Planly: Requirement Posting Flow

A full-stack web application built to facilitate the posting of event requirements. This project demonstrates a modular, type-safe architecture using **Next.js** for the frontend and **Node.js/Express** for the backend, integrated with **MongoDB**.

## 🚀 Tech Stack

### Frontend (Client)
* **Framework:** Next.js (React)
* **Styling:** Tailwind CSS + ShadcnUI (for accessible, reusable components)
* **State Management:** Zustand (Global store for multi-step form data)
* **Form Handling:** React Hook Form
* **Validation:** Zod (Schema-based validation)
* **HTTP Client:** Axios
* **Icons:** Lucide React

### Backend (Server)
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (via Mongoose ODM)
* **Language:** TypeScript (Strict typing)
* **Validation:** Zod (Middleware validation)
* **Tools:** Dotenv, Cors, Helmet

---

## 🏗 Project Structure & Best Practices

This project follows a **Monorepo-style** structure separating `client` and `server` to ensure distinct responsibilities.

### Key Architectural Decisions:
1.  **Separation of Concerns:**
    * **Backend:** Follows MVC pattern (Controllers, Models, Routes) with a dedicated `validators` layer using Zod to sanitize inputs before they reach business logic.
    * **Frontend:** Separates UI (Components), Logic (Hooks/Zustand), and Data Fetching (Services).
2.  **Type Safety:** Both frontend and backend are written in TypeScript to reduce runtime errors and ensure strict contract adherence between API and Client.
3.  **Modular State Management:** Using **Zustand** allows for a clean, hook-based global state to manage the multi-step form flow without prop-drilling or complex Context API boilerplate.
4.  **Reusable UI:** Leveraging **ShadcnUI** provides a consistent design system while allowing full control over the component code.

### Folder Hierarchy
```bash
planly/
├── client/                 # Next.js Frontend
│   ├── src/
│   │   ├── app/            # App Router (Pages)
│   │   ├── components/     # Reusable UI components & Form Steps
│   │   ├── lib/            # Utilities & Zod Schemas
│   │   ├── services/       # API integration layer (Axios)
│   │   └── store/          # Zustand State Store
│   └── ...
└── server/                 # Express Backend
    ├── src/
    │   ├── config/         # DB Connection logic
    │   ├── controllers/    # Request handlers
    │   ├── models/         # Mongoose Schemas
    │   ├── routes/         # API Endpoint definitions
    │   └── validators/     # Zod validation schemas
    └── ...
```

---

## 🛠 Getting Started

Follow these steps to run the application locally.

### Prerequisites

* Node.js (v18+ recommended)
* MongoDB Connection String (Atlas or Local)

### 1. Backend Setup (Server)

Navigate to the server directory.

Install dependencies.

Create a `.env` file in the `server/` root:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
```

Start the development server.

*The server will run on `http://localhost:5000`*

### 2. Frontend Setup (Client)

Open a new terminal and navigate to the client directory.

Install dependencies.

Create a `.env.local` file in the `client/` root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start the Next.js application.

The application will run on `http://localhost:3000`

## 🧪 Testing the Flow

1.  Open `http://localhost:3000` in your browser.
2.  **Step 1:** Enter basic event details (Name, Date, Location).
3.  **Step 2:** Select a Hiring Category (Planner, Performer, Crew). Note how the specific questions change based on your selection.
4.  **Step 3:** Review the data and submit.
5.  Check the **Network Tab** to see the API call or verify the data in your **MongoDB Collection**.

---

## 📄 API Reference

### POST `/api/requirements`

Creates a new requirement posting.

**Payload:**

```json
{
  "eventName": "Summer Jazz Fest",
  "eventType": "Concert",
  "eventDate": "2024-12-25T10:00:00.000Z",
  "location": "New York, NY",
  "hiringCategory": "Performer",
  "specificDetails": {
    "duration": "2",
    "genre": "Jazz"
  }
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Requirement created successfully",
  "data": { ... }
}
```
