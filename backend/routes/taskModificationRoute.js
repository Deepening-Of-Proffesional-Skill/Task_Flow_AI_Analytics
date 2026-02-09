// backend/routes/tasks.js
import express from 'express';
import taskController from '../controllers/taskModificationController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes are protected - authentication required

// GET /tasks - Get all tasks for authenticated user
router.get('/', authenticateToken, taskController.getAllTasks);

// GET /tasks/stats - Get task statistics for authenticated user
router.get('/stats', authenticateToken, taskController.getTaskStats);

// GET /tasks/:id - Get specific task
router.get('/:id', authenticateToken, taskController.getTaskById);

// POST /tasks - Create new task
router.post('/', authenticateToken, taskController.createTask);

// PUT /tasks/:id - Update task
router.put('/:id', authenticateToken, taskController.updateTask);

// DELETE /tasks/:id - Delete task
router.delete('/:id', authenticateToken, taskController.deleteTask);

export default router;
