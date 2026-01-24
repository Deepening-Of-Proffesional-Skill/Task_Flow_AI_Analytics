// frontend/src/services/apiService.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add auth token
apiService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const taskApi = {
  getTasks: () => apiService.get('/tasks'),
  
  createTask: (taskData) => apiService.post('/tasks', taskData),
  
  updateTask: (id, taskData) => apiService.put(`/tasks/${id}`, taskData),
  
  deleteTask: (id) => apiService.delete(`/tasks/${id}`),
  
  getTaskById: (id) => apiService.get(`/tasks/${id}`)
};
