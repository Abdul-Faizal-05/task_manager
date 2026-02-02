# Task Manager

A full-stack task management application built with React and Node.js, featuring real-time collaboration, team-based task organization, and user authentication.

## 📋 About the Application

Task Manager is a collaborative project management tool that helps teams organize, track, and complete tasks efficiently. The application supports:

- **User Authentication**: Secure registration and login with password hashing (bcrypt)
- **Task Management**: Create, view, update, and delete tasks with rich details
- **Team Collaboration**: Assign tasks to team members and track progress
- **Real-time Updates**: Live updates using Socket.io for instant collaboration
- **Priority & Status Tracking**: Organize tasks by priority (low/medium/high) and status (pending/completed)
- **Progress Monitoring**: Track task completion percentage
- **Role-based Access**: Employee and admin roles for different permission levels

## 🛠️ Tech Stack

### Frontend

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Socket.io Client** - Real-time communication
- **Recharts** - Data visualization
- **Anime.js** - Animations

### Backend

- **Node.js & Express 5** - Server framework
- **MongoDB & Mongoose** - Database and ODM
- **Socket.io** - Real-time bidirectional communication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📁 Project Structure

```
task_manager/
├── backend/
│   ├── server.js          # Express server with Socket.io
│   ├── models/
│   │   ├── Task.js        # Task schema (title, description, priority, etc.)
│   │   └── User.js        # User schema with authentication
│   └── routes/
│       ├── auth.js        # Authentication endpoints
│       └── tasks.js       # Task CRUD endpoints
├── frontend/
│   ├── src/
│   │   ├── App.jsx        # Main app with routing
│   │   ├── Login.jsx      # Login page
│   │   ├── Register.jsx   # Registration page
│   │   ├── Home.jsx       # Dashboard
│   │   └── TaskDetail.jsx # Individual task view
│   ├── Tasks.jsx          # Task list view
│   ├── CreateTask.jsx     # Task creation form
│   └── Home2.jsx          # Alternative dashboard
└── README.md
```

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** - Local installation or [MongoDB Atlas](https://www.mongodb.com/atlas) cloud account

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd task_manager
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
# Create a .env file in the backend folder with:
```

Create a `.env` file in the `backend/` directory:

```env
mongo_db_url=mongodb://localhost:27017/
NODE_ENV=development
PORT=5000
```

> **Note**: Replace `mongodb://localhost:27017/` with your MongoDB Atlas connection string if using cloud database.

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install
```

### 4. Start the Application

#### Terminal 1 - Start Backend Server:

```bash
cd backend
npm start
```

The backend will run on `http://localhost:5000`

#### Terminal 2 - Start Frontend Dev Server:

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

### 5. Access the Application

Open your browser and navigate to `http://localhost:5173`

1. **Register** a new account at `/register`
2. **Login** with your credentials at `/`
3. **Create tasks** and start managing your projects!

## 📝 Available Scripts

### Backend

| Command       | Description                  |
| ------------- | ---------------------------- |
| `npm start`   | Start the production server  |
| `npm run dev` | Start the development server |

### Frontend

| Command                 | Description                    |
| ----------------------- | ------------------------------ |
| `npm run dev`           | Start Vite dev server          |
| `npm run build`         | Build for production           |
| `npm run preview`       | Preview production build       |
| `npm run lint`          | Run ESLint                     |
| `npm test`              | Run tests with Vitest          |
| `npm run test:coverage` | Run tests with coverage report |

## 🔌 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Tasks

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `GET /api/tasks/:id` - Get task by ID
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.
