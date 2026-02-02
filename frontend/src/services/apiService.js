// frontend/src/services/apiService.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add auth token (disabled until auth is implemented)
// apiService.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// Response interceptor for better error handling
apiService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle specific error statuses
      switch (error.response.status) {
        case 401:
          console.error('Unauthorized - Please login');
          // Optionally redirect to login or clear token
          localStorage.removeItem('authToken');
          break;
        case 403:
          console.error('Forbidden - Invalid token');
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Server error');
          break;
      }
    }
    return Promise.reject(error);
  }
);

export const taskApi = {
  getTasks: () => apiService.get('/tasks'),
  
  createTask: (taskData) => apiService.post('/tasks', taskData),
  
  updateTask: (id, taskData) => apiService.put(`/tasks/${id}`, taskData),
  
  deleteTask: (id) => apiService.delete(`/tasks/${id}`),
  
  getTaskById: (id) => apiService.get(`/tasks/${id}`),

  getTaskStats: () => apiService.get('/tasks/stats')
};

export default apiService;
