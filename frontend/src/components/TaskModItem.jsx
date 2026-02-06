// frontend/src/components/TaskItem.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTaskOperations } from '../hooks/useTaskOperationsMod';
import { useTaskContext } from '../context/TaskContext';
import '../css/ModifyDashboard.css';

const TaskItem = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description || '',
    category: task.category || 'work',
    priority: task.priority,
    deadline: task.deadline ? new Date(task.deadline).toISOString().split('T')[0] : ''
  });
  
  const { updateTask, deleteTask, loading } = useTaskOperations();
  const { dispatch } = useTaskContext();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(task.id);
        dispatch({ type: 'DELETE_TASK', payload: task.id });
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleStatusChange = async (newStatus) => {
    // Optimistically update status
    const updatedTask = { ...task, status: newStatus };
    dispatch({ type: 'UPDATE_TASK', payload: updatedTask });

    // Sync with backend
    try {
      const response = await updateTask(task.id, { ...task, status: newStatus });
      const serverTask = response.task || response;
      dispatch({ type: 'UPDATE_TASK', payload: serverTask });
    } catch (error) {
      console.error('Error updating status:', error);
      // Revert on error
      dispatch({ type: 'UPDATE_TASK', payload: task });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    // Optimistically update UI immediately
    const optimisticTask = {
      ...task,
      ...editData,
      updated_at: new Date().toISOString()
    };
    
    dispatch({ type: 'UPDATE_TASK', payload: optimisticTask });
    setIsEditing(false);
    
    // Then sync with backend
    try {
      const response = await updateTask(task.id, editData);
      const updatedTask = response.task || response;
      dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
    } catch (error) {
      console.error('Error updating task:', error);
      // Revert on error
      dispatch({ type: 'UPDATE_TASK', payload: task });
      setIsEditing(true);
    }
  };

  const getPriorityLabel = (priority) => {
    const labels = { 1: 'Low', 2: 'Medium', 3: 'High' };
    return labels[priority];
  };

  const getPriorityClass = (priority) => {
    const classes = { 
      1: 'badge-priority-low', 
      2: 'badge-priority-medium', 
      3: 'badge-priority-high' 
    };
    return classes[priority];
  };

  const getCategoryLabel = (category) => {
    const labels = {
      work: 'Work',
      personal: 'Personal',
      shopping: 'Shopping',
      study: 'Study',
      others: 'Others'
    };
    return labels[category] || category;
  };

  const getStatusClass = (status) => {
    const classes = {
      'pending': 'task-status-pending',
      'in_progress': 'task-status-in_progress',
      'completed': 'task-status-completed'
    };
    return classes[status] || 'task-status-pending';
  };

  if (isEditing) {
    return (
      <div className="task-edit-form">
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <input
              type="text"
              value={editData.title}
              onChange={(e) => setEditData({...editData, title: e.target.value})}
              className="form-input"
              required
              placeholder="Task title"
            />
          </div>
          <div className="form-group">
            <textarea
              value={editData.description}
              onChange={(e) => setEditData({...editData, description: e.target.value})}
              className="form-textarea"
              placeholder="Description (optional)"
              rows="2"
            />
          </div>

          <div className="form-group">
            <select
              value={editData.category}
              onChange={(e) => setEditData({...editData, category: e.target.value})}
              className="form-select"
            >
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="shopping">Shopping</option>
              <option value="study">Study</option>
              <option value="others">Others</option>
            </select>
          </div>
          
          <div style={{display: 'flex', gap: '1rem'}}>
            <div style={{flex: 1}}>
              <select
                value={editData.priority}
                onChange={(e) => setEditData({...editData, priority: parseInt(e.target.value)})}
                className="form-select"
              >
                <option value={1}>Low</option>
                <option value={2}>Medium</option>
                <option value={3}>High</option>
              </select>
            </div>
            
            <div style={{flex: 1}}>
              <input
                type="date"
                value={editData.deadline}
                onChange={(e) => setEditData({...editData, deadline: e.target.value})}
                className="form-input"
              />
            </div>
          </div>
          
          <div className="task-edit-actions">
            <button
              type="submit"
              disabled={loading}
              className="btn-save"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="btn-cancel"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="task-card">
      <div className="task-card-header">
        <div className="task-card-content">
          <h3 className="task-card-title">{task.title}</h3>
          {task.description && (
            <p className="task-card-description">{task.description}</p>
          )}
          
          {/* Status Selector */}
          <div className="task-card-status">
            <span className="task-card-status-label">Status:</span>
            <select
              value={task.status || 'pending'}
              onChange={(e) => handleStatusChange(e.target.value)}
              className={`task-status-select ${getStatusClass(task.status)}`}
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          
          {/* Category and Priority Display */}
          <div className="task-card-badges">
            <span className="task-badge badge-category">
              {getCategoryLabel(task.category)}
            </span>
            <span className={`task-badge ${getPriorityClass(task.priority)}`}>
              {getPriorityLabel(task.priority)}
            </span>
          </div>
          {task.deadline && (
            <p className="task-card-deadline">
              Deadline: {new Date(task.deadline).toLocaleDateString()}
            </p>
          )}
        </div>
        <div className="task-card-actions">
          <button
            onClick={() => setIsEditing(true)}
            className="task-action-btn edit"
            title="Edit task"
          >
            <svg style={{width: '20px', height: '20px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="task-action-btn delete"
            title="Delete task"
          >
            <svg style={{width: '20px', height: '20px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    category: PropTypes.string,
    priority: PropTypes.number.isRequired,
    deadline: PropTypes.string,
    status: PropTypes.string.isRequired
  }).isRequired
};

export default TaskItem;
