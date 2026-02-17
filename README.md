# Task Flow AI Analytics 📊

A full-stack task management application with AI-powered insights, built with React and Express. Manage your tasks efficiently with intelligent categorization, priority management, and real-time analytics.

## ✨ Features

- **User Authentication**: Secure JWT-based authentication with signup, login, and logout
- **Task Management**: Full CRUD operations for tasks with validation
- **Smart Categorization**: Organize tasks by categories (Work, Personal, Shopping, etc.)
- **Priority System**: Set task priorities (Low, Medium, High, Urgent)
- **AI Insights**: Get intelligent task insights powered by Cohere AI
- **Search & Filter**: Advanced search and filtering capabilities
- **Progress Tracking**: Daily, weekly, and summary progress analytics
- **Task Statistics**: Real-time stats dashboard for task completion
- **User Profiles**: Personalized user profiles with task history
- **Deadline Management**: Track task due dates and deadlines
- **Responsive Design**: Mobile-friendly UI with Bootstrap and TailwindCSS

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0** - UI library
- **Vite 7.2.4** - Build tool and dev server
- **React Router 7.13.0** - Client-side routing
- **Axios 1.13.3** - HTTP client
- **Bootstrap 5.3.8** - UI framework
- **TailwindCSS** - Utility-first CSS framework
- **React Icons** - Icon library

### Backend
- **Node.js 20+** - Runtime environment
- **Express 5.2.1** - Web framework
- **Supabase 2.91.1** - PostgreSQL database
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Cohere AI 7.20.0** - AI-powered insights
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management

### Testing
- **Jest 30.2.0** - Testing framework
- **React Testing Library** - Component testing
- **Supertest** - API endpoint testing
- **47 Backend Tests** - Comprehensive test coverage
- **16 Frontend Tests** - UI component testing

## 📁 Project Structure

```
Task_Flow_AI_Analytics/
├── backend/
│   ├── config/
│   │   └── supabaseClient.js        # Supabase connection config
│   ├── controllers/
│   │   ├── taskModificationController.js
│   │   ├── cohereAIInsightsController.js
│   │   └── ...
│   ├── middleware/
│   │   ├── authMiddleware.js        # JWT authentication
│   │   └── verifyToken.js
│   ├── routes/
│   │   ├── taskModificationRoute.js
│   │   ├── user.js
│   │   ├── searchTasks.js
│   │   ├── fetchTasks.js
│   │   ├── progressRoute.js
│   │   └── cohereAIInsightsRoute.js
│   ├── services/
│   │   ├── taskService.js
│   │   └── cohereAIInsightsService.js
│   ├── tests/                       # Test suites (47 tests)
│   ├── utils/
│   ├── validations/
│   ├── index.js                     # Server entry point
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   ├── SignIn.jsx
│   │   │   ├── LogOut.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── TaskModForm.jsx
│   │   │   ├── TaskModList.jsx
│   │   │   ├── TaskModItem.jsx
│   │   │   ├── PriorityModSelector.jsx
│   │   │   ├── AIInsights.jsx
│   │   │   └── CohereInsights.jsx
│   │   ├── context/
│   │   │   └── TaskContext.jsx      # Global state management
│   │   ├── hooks/
│   │   │   ├── useTasks.js
│   │   │   └── useTaskOperations.js
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   ├── services/
│   │   │   └── apiService.js        # API integration
│   │   ├── tests/                   # Test suites (16 tests)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
└── README.md
```

## 🚀 Prerequisites

Before running this project, make sure you have:

- **Node.js 20.19+** (or 22.12+)
- **npm** or **yarn**
- **Supabase Account** - [Sign up here](https://supabase.com)
- **Cohere AI API Key** (optional) - [Get one here](https://cohere.ai)

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Deepening-Of-Proffesional-Skill/Task_Flow_AI_Analytics.git
cd Task_Flow_AI_Analytics
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

## 🔧 Environment Variables

### Backend (.env)

Create a `.env` file in the `backend` folder:

```env
# Server Configuration
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here

# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# Cohere AI (Optional)
COHERE_API_KEY=your_cohere_api_key
```

### How to Get Supabase Credentials:

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Create a new project or select existing one
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** → `SUPABASE_URL`
   - **anon public** key → `SUPABASE_ANON_KEY`

### Database Setup

Create a `tasks` table in your Supabase database:

```sql
CREATE TABLE tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  priority TEXT DEFAULT 'medium',
  status TEXT DEFAULT 'pending',
  deadline TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## 🏃 Running the Application

### Development Mode

**Backend:**
```bash
cd backend
npm run dev
# Server runs on http://localhost:3000
```

**Frontend:**
```bash
cd frontend
npm run dev
# App runs on http://localhost:5173
```

### Production Mode

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

## 🧪 Testing

### Run All Tests

**Backend Tests (47 tests):**
```bash
cd backend
npm test
```

Test Coverage:
- Task Controller (16 tests)
- Fetch Tasks Controller (12 tests)
- Search Tasks Controller (10 tests)
- Cohere AI Insights (4 tests)
- Token Verification (3 tests)
- Middleware (1 test)
- User Controller (1 test)

**Frontend Tests (16 tests):**
```bash
cd frontend
npm test
```

Test Coverage:
- Login Component (4 tests)
- Logout Component (6 tests)
- Sign Up Component (2 tests)
- Profile Page (4 tests)

### Linting

**Backend:**
```bash
cd backend
npm run lint
```

**Frontend:**
```bash
cd frontend
npm run lint
```

## 🔌 API Endpoints

### Authentication
- `POST /api/users/signup` - Register new user
- `POST /api/users/login` - Login user
- `POST /api/users/logout` - Logout user
- `GET /api/users/profile` - Get user profile

### Task Management
- `GET /api/tasks` - Get all tasks (authenticated)
- `GET /api/tasks/:id` - Get task by ID
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/tasks/stats` - Get task statistics

### Analytics & Insights
- `GET /api/progress/summary` - Get progress summary
- `GET /api/progress/weekly` - Get weekly progress
- `GET /api/progress/daily` - Get daily progress
- `GET /api/ai-insights` - Get AI-powered task insights

### Search & Filter
- `POST /api/search` - Search and filter tasks
- `GET /api/fetch` - Fetch filtered tasks

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Write meaningful commit messages
- Add tests for new features
- Ensure all tests pass before submitting PR
- Follow existing code style (ESLint configuration)
- Update documentation as needed

## 📝 License

This project is licensed under the ISC License.

## 👥 Authors

- **Glory Ozo** - Core Features & CRUD Operations
- **Upeksha** - Testing Infrastructure
- **Team Contributors** - Profile Features, AI Integration

## 🙏 Acknowledgments

- [Supabase](https://supabase.com) - Database and authentication infrastructure
- [Cohere AI](https://cohere.ai) - AI-powered insights
- [Vite](https://vitejs.dev) - Lightning-fast build tool
- [React](https://react.dev) - UI library
- [Express](https://expressjs.com) - Backend framework

## 📧 Support

For support, email your team or open an issue in the repository.

---

**Built with ❤️ by the Task Flow AI Analytics Team**