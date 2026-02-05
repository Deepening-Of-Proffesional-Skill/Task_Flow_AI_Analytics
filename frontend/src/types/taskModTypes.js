
// frontend/src/types/taskTypes.js
export const PRIORITY_LEVELS = {
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3
};

export const STATUS_TYPES = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed'
};

export const CATEGORY_TYPES = [
  { value: 'work', label: 'Work', color: 'bg-blue-100 text-blue-800' },
  { value: 'personal', label: 'Personal', color: 'bg-purple-100 text-purple-800' },
  { value: 'shopping', label: 'Shopping', color: 'bg-green-100 text-green-800' },
  { value: 'study', label: 'Study', color: 'bg-orange-100 text-orange-800' },
  { value: 'others', label: 'Others', color: 'bg-gray-100 text-gray-800' }
];

