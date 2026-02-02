// backend/controllers/taskController.js
import taskService from '../services/taskService.js';

class TaskController {
  async getAllTasks(req, res) {
    try {
      const userId = req.user.id;
      const tasks = await taskService.getAllTasks(userId);
      
      res.status(200).json({
        success: true,
        tasks: tasks,
        count: tasks.length
      });
    } catch (error) {
      console.error('Get all tasks error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: error.message
      });
    }
  }

  async getTaskById(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      
      const task = await taskService.getTaskById(id, userId);
      
      res.status(200).json({
        success: true,
        task: task
      });
    } catch (error) {
      console.error('Get task by ID error:', error);
      res.status(404).json({
        success: false,
        error: 'Task not found',
        message: error.message
      });
    }
  }

  async createTask(req, res) {
    try {
      const userId = req.user.id;
      const taskData = req.body;
      
      // Ensure user can only create tasks for themselves
      const task = await taskService.createTask(taskData, userId);
      
      res.status(201).json({
        success: true,
        message: 'Task created successfully',
        task: task
      });
    } catch (error) {
      console.error('Create task error:', error);
      if (error.message.includes('Validation failed')) {
        res.status(400).json({
          success: false,
          error: 'Validation failed',
          message: error.message
        });
      } else {
        res.status(500).json({
          success: false,
          error: 'Internal server error',
          message: error.message
        });
      }
    }
  }

  async updateTask(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const taskData = req.body;
      
      const task = await taskService.updateTask(id, taskData, userId);
      
      res.status(200).json({
        success: true,
        message: 'Task updated successfully',
        task: task
      });
    } catch (error) {
      console.error('Update task error:', error);
      if (error.message.includes('Task not found')) {
        res.status(404).json({
          success: false,
          error: 'Task not found',
          message: error.message
        });
      } else if (error.message.includes('Validation failed')) {
        res.status(400).json({
          success: false,
          error: 'Validation failed',
          message: error.message
        });
      } else {
        res.status(500).json({
          success: false,
          error: 'Internal server error',
          message: error.message
        });
      }
    }
  }

  async deleteTask(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      
      await taskService.deleteTask(id, userId);
      
      res.status(200).json({
        success: true,
        message: 'Task deleted successfully'
      });
    } catch (error) {
      console.error('Delete task error:', error);
      if (error.message.includes('Task not found')) {
        res.status(404).json({
          success: false,
          error: 'Task not found',
          message: error.message
        });
      } else {
        res.status(500).json({
          success: false,
          error: 'Internal server error',
          message: error.message
        });
      }
    }
  }

  async getTaskStats(req, res) {
    try {
      const userId = req.user.id;
      const stats = await taskService.getTaskStats(userId);
      
      res.status(200).json({
        success: true,
        stats: stats
      });
    } catch (error) {
      console.error('Get task stats error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: error.message
      });
    }
  }
}

export default new TaskController();
