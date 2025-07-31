import taskService from "../services/taskService.js";
import { validateUUID } from "../utils/validation.js";

export const getAllTasks = async (req, res, next) => {
  try {
    const { status, page, limit } = req.query;
    const result = taskService.getAllTasks({ status, page, limit });

    res.json({
      success: true,
      data: result.tasks,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!validateUUID(id)) {
      return res.status(400).json({
        error: {
          message: "Invalid task ID format",
          code: "INVALID_ID",
        },
      });
    }

    const task = taskService.getTaskById(id);

    res.json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const taskData = req.body;
    const task = taskService.createTask(taskData);

    res.status(201).json({
      success: true,
      data: task,
      message: "Task created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!validateUUID(id)) {
      return res.status(400).json({
        error: {
          message: "Invalid task ID format",
          code: "INVALID_ID",
        },
      });
    }

    const task = taskService.updateTask(id, updates);

    res.json({
      success: true,
      data: task,
      message: "Task updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!validateUUID(id)) {
      return res.status(400).json({
        error: {
          message: "Invalid task ID format",
          code: "INVALID_ID",
        },
      });
    }

    taskService.deleteTask(id);

    res.status(204).send("Task deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const getTaskStats = async (req, res, next) => {
  try {
    const stats = taskService.getStats();

    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};
