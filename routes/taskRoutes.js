import express from 'express';
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats
} from '../controllers/taskController.js';

const router = express.Router();

// GET /tasks - List all tasks (with filtering and pagination)
router.get('/', getAllTasks);

// GET /tasks/stats - Get task statistics (must be before /:id route)
router.get('/stats', getTaskStats);

// GET /tasks/:id - Get specific task by ID
router.get('/:id', getTaskById);

// POST /tasks - Create new task
router.post('/', createTask);

// PUT /tasks/:id - Update task
router.put('/:id', updateTask);

// DELETE /tasks/:id - Delete task
router.delete('/:id', deleteTask);

export default router;