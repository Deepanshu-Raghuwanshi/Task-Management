Task Management Application

Project Setup

1. Clone the Repository

git clone https://github.com/Deepanshu-Raghuwanshi/Task-Management.git
cd Task-Management

---

2. Install Dependencies

Frontend (FE)

cd fe
npm install # or yarn install

Backend (BE)

cd be
npm install # or yarn install

---

3. Environment Variables

Frontend (fe/.env)

BE_BASE_URL=http://localhost:5000/api

Backend (be/.env)

MONGO_URI=mongodb+srv://<your_mongodb_connection>
JWT_SECRET=<your_secure_jwt_secret>
PORT=5000

## Note: Replace <your_mongodb_connection> with your actual MongoDB connection string and <your_secure_jwt_secret> with a strong, randomly generated secret.

Why use JWT_SECRET from .env?

Security: Keeps the JWT secret key private, preventing unauthorized access.

Environment Flexibility: Different keys can be used for development, staging, and production.

Best Practices: Follows industry standards for secure application development.

## This application follows the 12-Factor App principles for better maintainability and security.

4. Run the Application

Start Frontend

npm run dev

Start Backend

# With nodemon (auto-restart on changes)

npm run dev

# Without nodemon

## npm start

Project Description

This is a Task Management Application where users can create, update, view, and delete tasks. It includes authentication, filtering, and sorting features.

Features

User Authentication (Register & Login with JWT-based authentication)

Task Management (CRUD operations for tasks)

Filtering & Sorting (Filter tasks by status and due date)

Responsive UI (Styled with CSS/Tailwind)

## Deployment Ready

API Endpoints

Task Routes (/api/tasks)

GET /api/tasks - Fetch all tasks (with filtering by status and due date)

GET /api/tasks/:id - Fetch a single task

POST /api/tasks - Create a new task

PUT /api/tasks/:id - Update an existing task

DELETE /api/tasks/:id - Delete a task

Authentication Routes (/api/auth)

POST /api/auth/register - User registration

POST /api/auth/login - User login

---

Developed by Deepanshu Raghuwanshi 🚀
