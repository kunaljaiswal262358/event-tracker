A simple full-stack web application where users can create, manage, and share personal events.  
Built as part of a **48-hour full-stack challenge**.

---

## 🚀 Tech Stack

- **Frontend:** React, TailwindCSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (NoSQL)  
- **Auth:** JWT (JSON Web Tokens)  
- **Other:** REST API, bcrypt for password hashing

---

## 📌 Features

### 🔐 Authentication & Authorization
- User signup & login (email + password)  
- JWT-based authentication  

### 📅 Event Management
- Create new events with:
  - Title
  - Date & Time
  - Location
  - Optional description  
- View only your own events  
- Filter events: **Upcoming / Past**  
- Shareable public link (view event without login)  

### 💻 Frontend
- Signup / Login forms  
- Event creation form  
- Responsive layout (mobile + desktop)  
- Event list with filters  
- Consumes backend API  

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (>=16)  
- MongoDB (local or cloud, e.g., MongoDB Atlas)  
- Git  

### 1️⃣ Clone the repository
```bash
git https://github.com/kunaljaiswal262358/event-tracker.git
cd event-tracker
```
### 2️⃣ Backend Setup
```bash
cd backend
npm install
```

### Create a .env file in /backend:
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_secret_key
```

### Run the backend:
```bash
node index.js
```

### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
npm start
```

💡 Why MongoDB?

I chose MongoDB because:

Flexible document structure (events vary in description length).

Easy to model user–event relationships.

Fast prototyping for hackathon/challenge projects.