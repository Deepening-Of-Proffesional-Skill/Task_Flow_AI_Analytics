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
// ==================== READ TASKS TESTS ====================
  describe('READ - getAllTasks', () => {
    it('should get all tasks for authenticated user successfully', async () => {
      const mockTasks = [
        {
          id: 'task-1',
          user_id: 'test-user-123',
          title: 'Task 1',
          description: 'Description 1',
          priority: 'high',
          status: 'pending',
          category: 'work'
        },
        {
          id: 'task-2',
          user_id: 'test-user-123',
          title: 'Task 2',
          description: 'Description 2',
          priority: 'medium',
          status: 'completed',
          category: 'study'
        }
      ];

      taskService.getAllTasks.mockResolvedValue(mockTasks);

      await taskController.getAllTasks(req, res);

      expect(taskService.getAllTasks).toHaveBeenCalledWith('test-user-123');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        tasks: mockTasks,
        count: 2
      });
    });

    it('should return empty array when user has no tasks', async () => {
      taskService.getAllTasks.mockResolvedValue([]);

      await taskController.getAllTasks(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        tasks: [],
        count: 0
      });
    });

    it('should return 500 error when service fails', async () => {
      taskService.getAllTasks.mockRejectedValue(new Error('Database error'));

      await taskController.getAllTasks(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: 'Internal server error',
        message: 'Database error'
      });
    });
  });

  describe('READ - getTaskById', () => {
    it('should get a specific task by id successfully', async () => {
      const mockTask = {
        id: 'task-123',
        user_id: 'test-user-123',
        title: 'Specific Task',
        description: 'Specific Description',
        priority: 'high',
        status: 'pending',
        category: 'work'
      };

      req.params.id = 'task-123';
      taskService.getTaskById.mockResolvedValue(mockTask);

      await taskController.getTaskById(req, res);

      expect(taskService.getTaskById).toHaveBeenCalledWith('task-123', 'test-user-123');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        task: mockTask
      });
    });

    it('should return 404 error when task not found', async () => {
      req.params.id = 'non-existent-task';
      taskService.getTaskById.mockRejectedValue(new Error('Task not found'));

      await taskController.getTaskById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: 'Task not found',
        message: 'Task not found'
      });
    });
  });

  // ==================== UPDATE TASK TESTS ====================
  describe('UPDATE - updateTask', () => {
    it('should update a task successfully with valid data', async () => {
      const mockUpdateData = {
        title: 'Updated Task',
        description: 'Updated Description',
        priority: 'medium',
        status: 'in-progress',
        category: 'study'
      };

      const mockUpdatedTask = {
        id: 'task-123',
        user_id: 'test-user-123',
        ...mockUpdateData,
        updated_at: '2026-02-16T01:00:00.000Z'
      };

      req.params.id = 'task-123';
      req.body = mockUpdateData;
      taskService.updateTask.mockResolvedValue(mockUpdatedTask);

      await taskController.updateTask(req, res);

      expect(taskService.updateTask).toHaveBeenCalledWith('task-123', mockUpdateData, 'test-user-123');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Task updated successfully',
        task: mockUpdatedTask
      });
    });

    it('should return 404 error when updating non-existent task', async () => {
      req.params.id = 'non-existent-task';
      req.body = { title: 'Updated Task', priority: 'high' };
      taskService.updateTask.mockRejectedValue(new Error('Task not found'));

      await taskController.updateTask(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: 'Task not found',
        message: 'Task not found'
      });
    });

    it('should return 400 error when update validation fails', async () => {
      req.params.id = 'task-123';
      req.body = { title: '' }; // Invalid data
      taskService.updateTask.mockRejectedValue(new Error('Validation failed: Title is required'));

      await taskController.updateTask(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: 'Validation failed',
        message: 'Validation failed: Title is required'
      });
    });

    it('should return 500 error when database error occurs during update', async () => {
      req.params.id = 'task-123';
      req.body = { title: 'Updated Task', priority: 'high' };
      taskService.updateTask.mockRejectedValue(new Error('Database connection failed'));

      await taskController.updateTask(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: 'Internal server error',
        message: 'Database connection failed'
      });
    });
  });
// ==================== DELETE TASK TESTS ====================
  describe('DELETE - deleteTask', () => {
    it('should delete a task successfully', async () => {
      req.params.id = 'task-123';
      taskService.deleteTask.mockResolvedValue(true);

      await taskController.deleteTask(req, res);

      expect(taskService.deleteTask).toHaveBeenCalledWith('task-123', 'test-user-123');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Task deleted successfully'
      });
    });

    it('should return 404 error when deleting non-existent task', async () => {
      req.params.id = 'non-existent-task';
      taskService.deleteTask.mockRejectedValue(new Error('Task not found'));

      await taskController.deleteTask(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: 'Task not found',
        message: 'Task not found'
      });
    });

    it('should return 500 error when database error occurs during deletion', async () => {
      req.params.id = 'task-123';
      taskService.deleteTask.mockRejectedValue(new Error('Database connection failed'));

      await taskController.deleteTask(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: 'Internal server error',
        message: 'Database connection failed'
      });
    });
  });

  // ==================== EDGE CASES & SECURITY TESTS ====================
  describe('Security & Edge Cases', () => {
    it('should ensure user can only access their own tasks', async () => {
      const mockTasks = [
        { id: 'task-1', user_id: 'test-user-123', title: 'User Task' }
      ];

      taskService.getAllTasks.mockResolvedValue(mockTasks);
      await taskController.getAllTasks(req, res);

      // Verify that the service was called with the authenticated user's ID
      expect(taskService.getAllTasks).toHaveBeenCalledWith('test-user-123');
      
      // Verify that all returned tasks belong to the authenticated user
      const returnedTasks = res.json.mock.calls[0][0].tasks;
      returnedTasks.forEach(task => {
        expect(task.user_id).toBe('test-user-123');
      });
    });
  });
});
