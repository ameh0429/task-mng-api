import { Task, VALID_STATUSES } from '../models/Task.js';

class TaskService {
  constructor() {
    this.tasks = new Map();
    this.initializeWithSampleData();
  }

  initializeWithSampleData() {
    const sampleTasks = [
      new Task({ title: 'Complete project setup', status: 'completed' }),
      new Task({ title: 'Write API documentation', description: 'Create comprehensive API docs', status: 'in-progress' }),
      new Task({ title: 'Test all endpoints', description: 'Test CRUD operations', status: 'pending' }),
    ];

    sampleTasks.forEach(task => this.tasks.set(task.id, task));
  }

  getAllTasks(filters = {}) {
    let tasks = Array.from(this.tasks.values());

    // Apply status filter
    if (filters.status && VALID_STATUSES.includes(filters.status)) {
      tasks = tasks.filter(task => task.status === filters.status);
    }

    // Sort by creation date (newest first)
    tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Apply pagination
    const page = Math.max(1, parseInt(filters.page) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(filters.limit) || 10));
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedTasks = tasks.slice(startIndex, endIndex);

    return {
      tasks: paginatedTasks,
      pagination: {
        page,
        limit,
        total: tasks.length,
        totalPages: Math.ceil(tasks.length / limit),
        hasNext: endIndex < tasks.length,
        hasPrev: page > 1
      }
    };
  }

  getTaskById(id) {
    const task = this.tasks.get(id);
    if (!task) {
      const error = new Error('Task not found');
      error.status = 404;
      error.code = 'TASK_NOT_FOUND';
      throw error;
    }
    return task;
  }

  createTask(taskData) {
    if (!taskData.title || taskData.title.trim() === '') {
      const error = new Error('Title is required');
      error.status = 400;
      error.code = 'VALIDATION_ERROR';
      throw error;
    }

    if (taskData.status && !VALID_STATUSES.includes(taskData.status)) {
      const error = new Error(`Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`);
      error.status = 400;
      error.code = 'VALIDATION_ERROR';
      throw error;
    }

    const task = new Task({
      title: taskData.title.trim(),
      description: taskData.description?.trim() || '',
      status: taskData.status
    });

    this.tasks.set(task.id, task);
    return task;
  }

  updateTask(id, updates) {
    const task = this.getTaskById(id);

    if (updates.title !== undefined) {
      if (!updates.title || updates.title.trim() === '') {
        const error = new Error('Title cannot be empty');
        error.status = 400;
        error.code = 'VALIDATION_ERROR';
        throw error;
      }
      updates.title = updates.title.trim();
    }

    if (updates.description !== undefined) {
      updates.description = updates.description?.trim() || '';
    }

    if (updates.status && !VALID_STATUSES.includes(updates.status)) {
      const error = new Error(`Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`);
      error.status = 400;
      error.code = 'VALIDATION_ERROR';
      throw error;
    }

    task.update(updates);
    return task;
  }

  deleteTask(id) {
    const task = this.getTaskById(id);
    this.tasks.delete(id);
    return task;
  }

  getStats() {
    const tasks = Array.from(this.tasks.values());
    const stats = {
      total: tasks.length,
      pending: tasks.filter(t => t.status === 'pending').length,
      inProgress: tasks.filter(t => t.status === 'in-progress').length,
      completed: tasks.filter(t => t.status === 'completed').length
    };
    return stats;
  }
}

// Export singleton instance
export default new TaskService();