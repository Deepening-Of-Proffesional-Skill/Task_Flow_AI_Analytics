// frontend/src/hooks/useTasks.js
import { useState, useEffect } from 'react';
import { taskApi } from '../services/apiService';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await taskApi.getTasks();
      setTasks(response.data.tasks || response.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, loading, error, refetch: fetchTasks };
};
