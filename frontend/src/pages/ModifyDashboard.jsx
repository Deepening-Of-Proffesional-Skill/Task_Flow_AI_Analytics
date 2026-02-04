// frontend/src/pages/Dashboard.jsx
import React from 'react';
import TaskForm from '../components/TaskModForm';
import TaskList from '../components/TaskModList';
import { useTaskContext } from '../context/TaskContext';

const Dashboard = () => {
  const { tasks, loading, error, refetch } = useTaskContext();

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">TaskFlow AI Analytics</h1>
          <p className="text-gray-600">Manage your tasks efficiently</p>
        </div>
      </div>

      {/* Main content - Two columns covering full screen */}
      <div className="flex flex-1 w-screen overflow-hidden">
        {/* Left side - Task Form (1/3 width) */}
        <div className="w-1/3 bg-white overflow-auto border-r border-gray-200">
          <div className="p-6">
            <TaskForm />
          </div>
        </div>

        {/* Right side - Task List (2/3 width) */}
        <div className="w-2/3 bg-gray-50 overflow-auto">
          <div className="p-6">
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
