// frontend/src/components/TaskForm.jsx
import React, { useState } from 'react';
import { useTaskOperations } from '../hooks/useTaskOperationsMod';
import { useTaskContext } from '../context/TaskContext';
import PrioritySelector from './PriorityModSelector';
import '../css/ModifyDashboard.css';

const TaskForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'work',
    priority: 1,
    deadline: '',
    status: 'pending'
  });
  
  const [errors, setErrors] = useState({});
  const { createTask, loading } = useTaskOperations();
  const { dispatch } = useTaskContext();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (formData.title.length > 255) {
      newErrors.title = 'Title must be less than 255 characters';
    }
    
    if (formData.deadline) {
      const deadlineDate = new Date(formData.deadline);
      const today = new Date();
      // Set both to start of day for fair comparison
      deadlineDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);
      
      if (deadlineDate < today) {
        newErrors.deadline = 'Deadline cannot be in the past';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const response = await createTask(formData);
      // Backend returns { success, message, task }
      console.log('Create task response:', response);
      const newTask = response.task;
      
      if (newTask) {
        dispatch({ type: 'ADD_TASK', payload: newTask });
        console.log('Task added to state:', newTask);
        setFormData({
          title: '',
          description: '',
          category: 'work',
          priority: 1,
          deadline: '',
          status: 'pending'
        });
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="task-form-container">
      <h2 className="task-form-title">Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">
            Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className={`form-input ${
              errors.title ? 'form-input-error' : ''
            }`}
            placeholder="Enter task title"
          />
          {errors.title && (
            <p className="form-error">{errors.title}</p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className="form-textarea"
            rows="3"
            placeholder="Enter task description (optional)"
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className="form-select"
          >
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="shopping">Shopping</option>
            <option value="study">Study</option>
            <option value="others">Others</option>
          </select>
        </div>

        <PrioritySelector
          value={formData.priority}
          onChange={(value) => handleChange('priority', value)}
        />

        <div className="form-group">
          <label className="form-label">
            Deadline
          </label>
          <input
            type="date"
            value={formData.deadline}
            onChange={(e) => handleChange('deadline', e.target.value)}
            className={`form-input ${
              errors.deadline ? 'form-input-error' : ''
            }`}
          />
          {errors.deadline && (
            <p className="form-error">{errors.deadline}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="submit-btn"
        >
          {loading ? 'Creating...' : 'Create Task'}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
