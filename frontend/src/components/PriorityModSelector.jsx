// frontend/src/components/PrioritySelector.jsx
import React from 'react';
import PropTypes from 'prop-types';
import '../css/ModifyDashboard.css';

const PrioritySelector = ({ value, onChange, disabled = false }) => {
  const priorities = [
    { value: 1, label: 'Low' },
    { value: 2, label: 'Medium' },
    { value: 3, label: 'High' }
  ];

  return (
    <div className="form-group">
      <label className="form-label">
        Priority
      </label>
      <div className="priority-buttons">
        {priorities.map((priority) => (
          <button
            key={priority.value}
            type="button"
            onClick={() => !disabled && onChange(priority.value)}
            disabled={disabled}
            className={`priority-btn ${
              value === priority.value ? 'active' : ''
            }`}
          >
            {priority.label}
          </button>
        ))}
      </div>
    </div>
  );
};

PrioritySelector.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

export default PrioritySelector;
