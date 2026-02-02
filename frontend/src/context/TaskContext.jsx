// frontend/src/context/TaskContext.jsx
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useTasks } from '../hooks/useTasksMod';

export const TaskContext = createContext();

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TASKS':
      return { ...state, tasks: action.payload };
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        )
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  const { tasks: fetchedTasks, loading, error, refetch } = useTasks();
  const [state, dispatch] = useReducer(taskReducer, {
    tasks: [],
    loading: true,
    error: null
  });

  // Sync fetched tasks with state once
  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  }, [loading]);

  useEffect(() => {
    if (error) {
      dispatch({ type: 'SET_ERROR', payload: error });
    }
  }, [error]);

  // Only sync tasks when fetchedTasks changes (prevent duplicates)
  useEffect(() => {
    if (fetchedTasks && Array.isArray(fetchedTasks) && fetchedTasks.length > 0) {
      dispatch({ type: 'SET_TASKS', payload: fetchedTasks });
    }
  }, [fetchedTasks]);

  const value = {
    tasks: state.tasks,
    loading: state.loading,
    error: state.error,
    dispatch,
    refetch
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

