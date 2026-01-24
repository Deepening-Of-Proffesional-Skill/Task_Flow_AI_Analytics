// frontend/src/pages/Dashboard.jsx
import React from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { useTaskContext } from '../context/TaskContext';

const Dashboard = () => {
  const { tasks, loading, error, refetch } = useTaskContext();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">TaskFlow AI Analytics</h1>
        <p className="text-gray-600">Manage your tasks efficiently</p>
      </div>

      <TaskForm />
      
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Your Tasks</h2>
        <button
          onClick={refetch}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
        >
          Refresh
        </button>
      </div>

      <TaskList tasks={tasks} loading={loading} error={error} />
    </div>
  );
};

export default Dashboard;
