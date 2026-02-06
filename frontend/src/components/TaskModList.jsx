// frontend/src/components/TaskList.jsx
import React from 'react';
import PropTypes from 'prop-types';
import TaskItem from './TaskModItem';
import '../css/ModifyDashboard.css';

const TaskList = ({ tasks, loading, error }) => {
  if (loading) {
    return (
      <div className="no-tasks">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500" style={{margin: '0 auto'}}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        background: 'rgba(255, 107, 107, 0.1)',
        border: '1px solid #ff6b6b',
        color: '#ff6b6b',
        padding: '1rem',
        borderRadius: '12px'
      }}>
        <strong style={{fontWeight: 'bold'}}>Error: </strong>
        <span>{error}</span>
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="no-tasks">
        <p>No tasks found. Create your first task!</p>
      </div>
    );
  }

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    category: PropTypes.string,
    priority: PropTypes.number.isRequired,
    deadline: PropTypes.string,
    status: PropTypes.string.isRequired
  })),
  loading: PropTypes.bool,
  error: PropTypes.string
};

export default TaskList;
