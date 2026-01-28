// backend/services/taskService.js
import supabase from '../config/supabaseClient.js';
import { validateTaskInput } from '../validations/taskValidation.js';
import { formatDateForDatabase, formatDateForResponse } from '../utils/dateHelper.js';

class TaskService {
  async getAllTasks(userId) {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(`Database error: ${error.message}`);
      }

      // Format dates for response
      const formattedTasks = data.map(task => ({
        ...task,
        deadline: formatDateForResponse(task.deadline),
        created_at: formatDateForResponse(task.created_at),
        updated_at: formatDateForResponse(task.updated_at)
      }));

      return formattedTasks;
    } catch (error) {
      throw new Error(`Failed to fetch tasks: ${error.message}`);
    }
  }

  async getTaskById(taskId, userId) {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('id', taskId)
        .eq('user_id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          throw new Error('Task not found');
        }
        throw new Error(`Database error: ${error.message}`);
      }

      // Format dates for response
      return {
        ...data,
        deadline: formatDateForResponse(data.deadline),
        created_at: formatDateForResponse(data.created_at),
        updated_at: formatDateForResponse(data.updated_at)
      };
    } catch (error) {
      throw new Error(`Failed to fetch task: ${error.message}`);
    }
  }

  async createTask(taskData, userId) {
    // Validate input
    const validation = validateTaskInput(taskData);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${JSON.stringify(validation.errors)}`);
    }

    try {
      const newTask = {
        user_id: userId,
        title: taskData.title.trim(),
        description: taskData.description ? taskData.description.trim() : null,
        priority: taskData.priority,
        deadline: taskData.deadline ? new Date(taskData.deadline).toISOString() : null,
        status: taskData.status || 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('tasks')
        .insert([newTask])
        .select()
        .single();

      if (error) {
        throw new Error(`Database error: ${error.message}`);
      }

      // Format dates for response
      return {
        ...data,
        deadline: formatDateForResponse(data.deadline),
        created_at: formatDateForResponse(data.created_at),
        updated_at: formatDateForResponse(data.updated_at)
      };
    } catch (error) {
      throw new Error(`Failed to create task: ${error.message}`);
    }
  }

  async updateTask(taskId, taskData, userId) {
    // Validate input
    const validation = validateTaskInput(taskData);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${JSON.stringify(validation.errors)}`);
    }

    try {
      const updateData = {
        title: taskData.title.trim(),
        description: taskData.description ? taskData.description.trim() : null,
        priority: taskData.priority,
        deadline: taskData.deadline ? new Date(taskData.deadline).toISOString() : null,
        status: taskData.status || 'pending',
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('tasks')
        .update(updateData)
        .eq('id', taskId)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          throw new Error('Task not found');
        }
        throw new Error(`Database error: ${error.message}`);
      }

      // Format dates for response
      return {
        ...data,
        deadline: formatDateForResponse(data.deadline),
        created_at: formatDateForResponse(data.created_at),
        updated_at: formatDateForResponse(data.updated_at)
      };
    } catch (error) {
      throw new Error(`Failed to update task: ${error.message}`);
    }
  }

  async deleteTask(taskId, userId) {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId)
        .eq('user_id', userId);

      if (error) {
        if (error.code === 'PGRST116') {
          throw new Error('Task not found');
        }
        throw new Error(`Database error: ${error.message}`);
      }

      return { success: true, message: 'Task deleted successfully' };
    } catch (error) {
      throw new Error(`Failed to delete task: ${error.message}`);
    }
  }

  async getTaskStats(userId) {
    try {
      // Get all tasks for user
      const tasks = await this.getAllTasks(userId);
      
      const stats = {
        total: tasks.length,
        completed: tasks.filter(t => t.status === 'completed').length,
        pending: tasks.filter(t => t.status === 'pending').length,
        inProgress: tasks.filter(t => t.status === 'in_progress').length,
        highPriority: tasks.filter(t => t.priority === 3).length,
        overdue: tasks.filter(t => t.deadline && new Date(t.deadline) < new Date() && t.status !== 'completed').length
      };

      return stats;
    } catch (error) {
      throw new Error(`Failed to get task stats: ${error.message}`);
    }
  }
}

export default new TaskService();
