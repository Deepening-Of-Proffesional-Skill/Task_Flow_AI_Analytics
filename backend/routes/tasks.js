// backend/routes/tasks.js
import express from 'express';
import taskController from '../controllers/taskController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// GET /api/tasks - Get all tasks for authenticated user
router.get('/', taskController.getAllTasks);

// GET /api/tasks/stats - Get task statistics for authenticated user
router.get('/stats', taskController.getTaskStats);

// GET /api/tasks/:id - Get specific task
router.get('/:id', taskController.getTaskById);

// POST /api/tasks - Create new task
router.post('/', taskController.createTask);

// PUT /api/tasks/:id - Update task
router.put('/:id', taskController.updateTask);

// DELETE /api/tasks/:id - Delete task
router.delete('/:id', taskController.deleteTask);

export default router;
