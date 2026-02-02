// frontend/src/components/PrioritySelector.jsx
import React from 'react';

const PrioritySelector = ({ value, onChange, disabled = false }) => {
  const priorities = [
    { value: 1, label: 'Low', color: 'text-blue-600 bg-blue-100' },
    { value: 2, label: 'Medium', color: 'text-yellow-600 bg-yellow-100' },
    { value: 3, label: 'High', color: 'text-red-600 bg-red-100' }
  ];

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Priority
      </label>
      <div className="flex space-x-4">
        {priorities.map((priority) => (
          <button
            key={priority.value}
            type="button"
            onClick={() => !disabled && onChange(priority.value)}
            disabled={disabled}
            className={`px-4 py-2 rounded-lg border-2 transition-all font-medium ${
              value === priority.value
                ? `${priority.color} border-current`
                : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {priority.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PrioritySelector;
