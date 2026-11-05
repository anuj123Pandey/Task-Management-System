# Task Management System

A full-stack Task Management Web Application that helps users organize, manage, and track their daily tasks. Users can create an account, securely log in, and manage their personal tasks through a clean and responsive dashboard.

## Features

- **User Registration:** Create a new account using name, email, and password.
- **Secure Login:** Authenticate users using JSON Web Tokens (JWT).
- **Password Encryption:** Passwords are securely hashed using bcrypt.
- **Task Creation:** Add new tasks with a title and description.
- **View Tasks:** Display all personal tasks in the dashboard.
- **Update Tasks:** Edit existing task details.
- **Delete Tasks:** Remove tasks when they are no longer needed.
- **Task Completion:** Mark tasks as completed or pending.
- **Dashboard Statistics:** Track total, completed, and pending tasks.
- **Protected Routes:** Secure access to authenticated user operations.
- **Responsive UI:** User-friendly interface for different screen sizes.

## Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Frontend structure |
| CSS3 | Styling and responsive design |
| JavaScript | Frontend functionality |
| Node.js | Backend runtime |
| Express.js | REST API development |
| MongoDB Atlas | Cloud database |
| Mongoose | MongoDB object modeling |
| JWT | User authentication |
| bcryptjs | Password hashing |
| CORS | Cross-origin resource sharing |
| dotenv | Environment variable management |

## Project Structure

```text
TaskApp/
│
├── backend/
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   │
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── css/
│   │   └── style.css
│   │
│   ├── js/
│   │   ├── login.js
│   │   ├── register.js
│   │   └── dashboard.js
│   │
│   ├── index.html
│   ├── register.html
│   └── dashboard.html
│
├── .gitignore
└── README.md
```

## Getting Started

Follow these instructions to run the project locally.

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Navigate to the project directory:

```bash
cd TaskApp
```

### 2. Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file inside the `backend` folder.

Add the following variables:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Replace the placeholder values with your own MongoDB Atlas connection string and a strong JWT secret.

**Important:** Never upload your `.env` file or expose your database credentials and JWT secret publicly.

### 4. Start the Backend Server

```bash
npm start
```

The backend server will run at:

```text
http://localhost:3000
```

### 5. Run the Frontend

Open the `frontend` folder in Visual Studio Code.

Run `index.html` using the Live Server extension.

The application will open in your browser.

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login an existing user |
| GET | `/api/auth/profile` | Get authenticated user profile |

### Task Management

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/tasks` | Create a new task |
| GET | `/api/tasks` | Get user's tasks |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

**Note:** Task endpoints require JWT authentication through the Authorization header.

```text
Authorization: Bearer YOUR_JWT_TOKEN
```


<!-- Add screenshots after deployment -->

## Future Improvements

- Search and filter tasks.
- Task priority management.
- Task due dates and reminders.
- Improved dashboard analytics.
- Production deployment and performance improvements.

## Learning Outcomes

Through this project, I am gaining practical experience with:

- Full-stack web development.
- Building RESTful APIs using Express.js.
- Database integration using MongoDB Atlas.
- User authentication and authorization using JWT.
- Password hashing and application security.
- Connecting frontend applications with backend APIs.
- Managing environment variables and Git version control.

## Author

**Anuj Kumar Pandey**

B.Tech Student | Aspiring Software Developer

---

If you find this project useful, feel free to explore the repository and share your feedback!