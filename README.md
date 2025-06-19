# 📋 Workasana

Welcome to **Workasana** — a powerful **task management and team collaboration tool**. Whether you're leading a team or managing your own tasks, Workasana helps you stay organized with robust reporting, and visual tracking. It’s built with a modern MERN stack setup and includes dynamic task views, analytics, and secure authentication.

---

## 🚀 Features

### 🔐 Authentication
- **Login**
  - Validates credentials and stores JWT in localStorage
  - Displays errors for invalid login
- **Signup**
  - Registers a user and shows success/error feedback
- **Auth Handling**
  - JWT-based route protection
  - Redirects unauthorized users to login
  - Logout clears token and redirects

### 📝 Task Form
- Create new tasks with fields:
  - Task Name
  - Project Name (Dropdown)
  - Owners (Multi-select dropdown)
  - Team (Dropdown – Sales, Marketing, Development, Finance)
  - Tags (Multi-select, e.g., "Urgent", "Bug")
  - Time to Complete (days)
  - Status: To Do, In Progress, Completed, Blocked

### 📋 Task List
- View all tasks with filters:
  - Owner, Tags
- Sort by:
  - Completion dates
  - Priority

### 📁 Project View
- Group tasks by project
- View project name and related tasks
- Filter tasks within a project by status

### 📊 Reports & Visualization
- **Total Work Done Last Week** (Line Chart)
- **Total Work Pending** (Doughnut Chart)
- **Task Completion Stats**:
  - Closed tasks by Team, Owner
- Built with **Chart.js**

### 🔍 Task Details
- View task details:
  - Project, Team, Owners, Tags, Time, Status
- Update status or modify task details from this view
  
---

## 🔧 Tech Stack

Here’s what powers this project:

### 🖥️ Frontend
- ⚛️ **React (Vite)** – For blazing-fast development
- 🧭 **React Router** – SPA routing
- 💨 **Tailwind CSS** – Utility-first styling
- 📊 **Chart.js** – For visual reports
- 🌐 **Axios** – API requests

### 🗄️ Backend
- 🟢 **Node.js + Express** – REST APIs for tasks, users, and filters
- 🛢️ **MongoDB** – NoSQL DB to store all user, task, and project data
- 📦 **Mongoose** – ODM layer for MongoDB
- 🔐 **JWT** – Auth & route protection

---

## 🗂️ Project Structure (For the curious)

### 🔷 Frontend (React + Vite)

```
Workasana-App/
├── public/
└── src/
    ├── assets/      # Images and icons
    ├── components/  # Reusable UI pieces
    ├── context/     # App-wide state management (Login, Authentication)
    ├── hooks/       # Custom API calls and logic using React hooks
    ├── pages/       
    ├── services/
    ├── utils/
    ├── api.js      # Axios Instance
    ├── App.jsx
    └── main.jsx
```

### 🟩 Backend (Node.js + Express)

```
Workasana-API/
├── db/
├── models/
├── routes/
├── controllers/
├── middleware/
├── .env
├── server.js
└── package.json
```

---

## 🚀 Getting Started

To run the frontend locally:

```bash
# Clone the frontend repo
git clone https://github.com/SherlockValer/Workasana-App.git
cd Workasana-App

# Install dependencies
npm install

# Start the dev server
npm run dev
```

---

## 🌍 Environment Setup

Create a `.env` file with the backend URL:

```
VITE_API_BASE_URL=https://workasana-api.vercel.app
```

---

## 🧩 Backend Repository

To run the backend locally or deploy:

🔗 [Workasana Backend GitHub Repo](https://github.com/SherlockValer/Workasana-API)

---

## 📸 Try it Out

Live demo available here:  
👉 [https://workasana-app.vercel.app](https://workasana-app.vercel.app)

### Login 
```
email : arjun@example.org
password : arjun@1234

email : krishna@example.org
password : krishna@1234
```

Explore how projects, tasks, teams, and analytics come together beautifully.

---

## 🤝 Contributions

Have suggestions or found bugs?  
Create an issue, send a PR, or connect with me!

---

## 👋 About the Creator

Hey! I’m **Vaibhav Chopde**, a full-stack developer focused on building fast, scalable, and clean web applications.

- 🌐 Portfolio: [vaibhav-chopde-pvla.vercel.app](https://vaibhav-chopde-pvla.vercel.app/)
- 🧑‍💻 GitHub: [@SherlockValer](https://github.com/SherlockValer)
- ✨ Project: [workasana-app.vercel.app](https://workasana-app.vercel.app)

---

Thanks for checking out **Workasana**. I hope it helps your team work better, together! 🚀
