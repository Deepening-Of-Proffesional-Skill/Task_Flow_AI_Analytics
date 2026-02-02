// frontend/src/pages/Dashboard.jsx
import React from 'react';
import TaskForm from '../components/TaskModForm';
import TaskList from '../components/TaskModList';
import { useTaskContext } from '../context/TaskContext';

const Dashboard = () => {
  const { tasks, loading, error, refetch } = useTaskContext();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">TaskFlow AI Analytics</h1>
          <p className="text-gray-600">Manage your tasks efficiently</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left side - Task Form */}
          <div>
            <TaskForm />
          </div>

          {/* Right side - Task List */}
          <div>
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Your Tasks</h2>
              <button
                onClick={refetch}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                Refresh
              </button>
            </div>
            <TaskList tasks={tasks} loading={loading} error={error} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
