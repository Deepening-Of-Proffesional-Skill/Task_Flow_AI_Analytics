import taskController from '../controllers/taskModificationController.js';
import taskService from '../services/taskModificationService.js';

// Mock the task service
jest.mock('../services/taskModificationService.js');

describe('Task Controller - CRUD Operations', () => {
  let req, res;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    
    // Mock request object with authenticated user
    req = {
      user: { id: 'test-user-123' },
      body: {},
      params: {}
    };
    
    // Mock response object
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  // ==================== CREATE TASK TESTS ====================
  describe('CREATE - createTask', () => {
    it('should create a task successfully with valid data', async () => {
      const mockTaskData = {
        title: 'Test Task',
        description: 'Test Description',
        priority: 'high',
        status: 'pending',
        category: 'work',
        deadline: '2026-03-01T00:00:00.000Z'
      };

      const mockCreatedTask = {
        id: 'task-123',
        user_id: 'test-user-123',
        ...mockTaskData,
        created_at: '2026-02-16T00:00:00.000Z',
        updated_at: '2026-02-16T00:00:00.000Z'
      };

      req.body = mockTaskData;
      taskService.createTask.mockResolvedValue(mockCreatedTask);

      await taskController.createTask(req, res);

      expect(taskService.createTask).toHaveBeenCalledWith(mockTaskData, 'test-user-123');
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Task created successfully',
        task: mockCreatedTask
      });
    });

    it('should return 400 error when validation fails', async () => {
      req.body = { title: '' }; // Invalid data
      taskService.createTask.mockRejectedValue(new Error('Validation failed: Title is required'));

      await taskController.createTask(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: 'Validation failed',
        message: 'Validation failed: Title is required'
      });
    });

    it('should return 500 error when database error occurs', async () => {
      req.body = { title: 'Test Task', priority: 'high' };
      taskService.createTask.mockRejectedValue(new Error('Database connection failed'));

      await taskController.createTask(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: 'Internal server error',
        message: 'Database connection failed'
      });
    });
  });

});