// frontend/src/pages/Dashboard.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskModForm';
import TaskList from '../components/TaskModList';
import { useTaskContext } from '../context/TaskContext';
import '../css/ModifyDashboard.css';

const Dashboard = () => {
  const { tasks, loading, error, refetch } = useTaskContext();
  const navigate = useNavigate();

  // Authentication check
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/'); // Redirect to login if no token is found
    }
  }, [navigate]);

  return (
    <div className="modify-dashboard">
      <div className="modify-dashboard-content">
        {/* Left side - Task Form */}
        <div className="task-form-section">
          <TaskForm />
        </div>

        {/* Right side - Task List */}
        <div className="task-list-section">
          <div className="task-list-header">
            <h2 className="task-list-title">Your Tasks</h2>
            <button onClick={refetch} className="refresh-btn">
              Refresh
            </button>
          </div>
          <TaskList tasks={tasks} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
