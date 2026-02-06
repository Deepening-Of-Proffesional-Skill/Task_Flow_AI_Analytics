// backend/routes/tasks.js
import express from 'express';
import taskController from '../controllers/taskModificationController.js';

const router = express.Router();

// Note: Authentication will be added by my team member

// GET /tasks - Get all tasks for authenticated user
router.get('/', taskController.getAllTasks);

// GET /tasks/stats - Get task statistics for authenticated user
router.get('/stats', taskController.getTaskStats);

// GET /tasks/:id - Get specific task
router.get('/:id', taskController.getTaskById);

// POST /tasks - Create new task
router.post('/', taskController.createTask);

// PUT /tasks/:id - Update task
router.put('/:id', taskController.updateTask);

// DELETE /tasks/:id - Delete task
router.delete('/:id', taskController.deleteTask);

export default router;
