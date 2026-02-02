// backend/validations/taskValidation.js
export const validateTaskInput = (data) => {
  const errors = {};

  // Validate title
  if (!data.title || typeof data.title !== 'string') {
    errors.title = 'Title is required and must be a string';
  } else if (data.title.trim().length === 0) {
    errors.title = 'Title cannot be empty';
  } else if (data.title.length > 255) {
    errors.title = 'Title must be less than 255 characters';
  }

  // Validate description (optional)
  if (data.description && typeof data.description !== 'string') {
    errors.description = 'Description must be a string';
  }

  // Validate priority
  const validPriorities = [1, 2, 3];
  if (typeof data.priority !== 'number' || !validPriorities.includes(data.priority)) {
    errors.priority = 'Priority must be 1 (Low), 2 (Medium), or 3 (High)';
  }

  // Validate deadline
  if (data.deadline) {
    const isValidDate = !isNaN(Date.parse(data.deadline));
    if (!isValidDate) {
      errors.deadline = 'Invalid date format';
    } else if (new Date(data.deadline) < new Date()) {
      errors.deadline = 'Deadline cannot be in the past';
    }
  }

  // Validate status (optional, defaults to 'pending')
  if (data.status && !['pending', 'in_progress', 'completed'].includes(data.status)) {
    errors.status = 'Status must be pending, in_progress, or completed';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
