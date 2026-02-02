// frontend/src/hooks/useTaskOperations.js
import { useState } from 'react';
import { taskApi } from '../services/apiService';

export const useTaskOperations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createTask = async (taskData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await taskApi.createTask(taskData);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create task');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await taskApi.updateTask(id, taskData);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update task');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    try {
      setLoading(true);
      setError(null);
      await taskApi.deleteTask(id);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete task');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createTask, updateTask, deleteTask, loading, error };
};
