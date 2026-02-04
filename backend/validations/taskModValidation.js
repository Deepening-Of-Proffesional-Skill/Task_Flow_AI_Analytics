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
    }
    // Note: Allow past deadlines for completed tasks
  }

  // Validate status (optional, defaults to 'pending')
  if (data.status && !['pending', 'in_progress', 'completed'].includes(data.status)) {
    errors.status = 'Status must be pending, in_progress, or completed';
  }

  // Validate category (optional)
  const validCategories = ['work', 'personal', 'shopping', 'study', 'others'];
  if (data.category && !validCategories.includes(data.category)) {
    errors.category = 'Category must be one of: work, personal, shopping, study, others';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
