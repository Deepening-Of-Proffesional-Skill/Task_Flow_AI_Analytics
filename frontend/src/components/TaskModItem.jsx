// frontend/src/components/TaskItem.jsx
import React, { useState } from 'react';
import { useTaskOperations } from '../hooks/useTaskOperationsMod';
import { useTaskContext } from '../context/TaskContext';

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

  const getCategoryColor = (category) => {
    const categories = {
      work: 'bg-blue-100 text-blue-800',
      personal: 'bg-purple-100 text-purple-800',
      shopping: 'bg-green-100 text-green-800',
      study: 'bg-orange-100 text-orange-800',
      others: 'bg-gray-100 text-gray-800'
    };
    return categories[category] || 'bg-gray-100 text-gray-800';
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

  if (isEditing) {
    return (
      <div className="border rounded-lg p-4 bg-white shadow-sm">
        <form onSubmit={handleUpdate} className="space-y-3">
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData({...editData, title: e.target.value})}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
          <textarea
            value={editData.description}
            onChange={(e) => setEditData({...editData, description: e.target.value})}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Description (optional)"
          />

          <select
            value={editData.category}
            onChange={(e) => setEditData({...editData, category: e.target.value})}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="shopping">Shopping</option>
            <option value="study">Study</option>
            <option value="others">Others</option>
          </select>
          
          <div className="flex items-center space-x-4">
            <select
              value={editData.priority}
              onChange={(e) => setEditData({...editData, priority: parseInt(e.target.value)})}
              className="px-3 py-2 border rounded-md"
            >
              <option value={1}>Low</option>
              <option value={2}>Medium</option>
              <option value={3}>High</option>
            </select>
            
            <input
              type="date"
              value={editData.deadline}
              onChange={(e) => setEditData({...editData, deadline: e.target.value})}
              className="px-3 py-2 border rounded-md"
            />
          </div>
          
          <div className="flex space-x-2">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-bold text-xl text-gray-900 mb-2">{task.title}</h3>
          {task.description && (
            <p className="text-gray-600 mt-1 text-sm">{task.description}</p>
          )}
          
          {/* Status Selector */}
          <div className="flex items-center gap-2 mt-3 mb-2">
            <span className="text-sm text-gray-600 font-medium">Status:</span>
            <select
              value={task.status || 'pending'}
              onChange={(e) => handleStatusChange(e.target.value)}
              className={`px-3 py-1 rounded-md text-xs font-medium border-2 cursor-pointer transition-colors ${
                task.status === 'completed' ? 'bg-green-100 text-green-800 border-green-300' :
                task.status === 'in_progress' ? 'bg-blue-100 text-blue-800 border-blue-300' :
                'bg-yellow-100 text-yellow-800 border-yellow-300'
              }`}
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          
          {/* Category and Priority Display */}
          <div className="flex items-center space-x-3 mt-3 mb-2 flex-wrap gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(task.category)}`}>
              {getCategoryLabel(task.category)}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              task.priority === 1 ? 'text-blue-600 bg-blue-100' :
              task.priority === 2 ? 'text-yellow-600 bg-yellow-100' :
              'text-red-600 bg-red-100'
            }`}>
              {getPriorityLabel(task.priority)}
            </span>
          </div>
          {task.deadline && (
            <p className="text-sm text-gray-500 mt-1">
              Deadline: {new Date(task.deadline).toLocaleDateString()}
            </p>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
            title="Edit task"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
            title="Delete task"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
