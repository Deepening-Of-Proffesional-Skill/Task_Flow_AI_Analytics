import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import progressRoute from "./routes/progressRoute.js";


//import the user router
import userRouter from './routes/user.js';
//import the fetchTasks router
import fetchTasksRouter from './routes/fetchTasks.js';
import authRoutes from "./middleware/auth.js";
// Import task modification router
import tasksRouter from './routes/taskModificationRoute.js';
//import the searchTasks router
import searchTasksRouter from './routes/searchTasks.js';
// import progressRouter router
//import progressRouter from "./routes/progressRoute.js"
// import cohere AI insights router
import cohereAIInsightsRouter from './routes/cohereAIInsightsRoute.js';

//configure environment variables
dotenv.config();

//create an Express app
const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

//middleware to parse JSON requests
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

//register the user router
app.use('/user', userRouter);
//register the fetchTasks router
app.use('/fetchAllTasks', fetchTasksRouter);
//use the auth routes
app.use("/auth", authRoutes);
// Register task modification routes
app.use('/tasks', tasksRouter);
//register the searchTasks router
app.use('/searchTasks', searchTasksRouter);
// get progress reports
app.use("/api/progress", progressRoute);
// generate AI insights using cohere API
app.use('/ai-insights-cohere', cohereAIInsightsRouter);


app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Error handling middleware
app.use((err, res) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler - must be last
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

const PORT = process.env.PORT || 3000;

//start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
