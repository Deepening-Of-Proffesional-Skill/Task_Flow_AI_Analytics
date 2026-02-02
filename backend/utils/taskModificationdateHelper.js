// backend/utils/dateHelper.js
export const formatDateForDatabase = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return date.toISOString();
};

export const validateDate = (dateString) => {
  if (!dateString) return true; // Allow null dates
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

export const isPastDate = (dateString) => {
  if (!dateString) return false;
  const date = new Date(dateString);
  const now = new Date();
  return date < now;
};

export const formatDateForResponse = (date) => {
  if (!date) return null;
  return new Date(date).toISOString();
};
