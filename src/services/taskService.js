// services/taskService.js
const Task = require('../models/taskModel');

// Service to create a task
const createTaskService = async (userId, title, description, status) => {
  try {
    let task = await Task.create({ title, description, status, user_id: userId });
    task = await getAllTasksService(userId);
    return task;
  } catch (error) {
    console.error('Error creating task:', error.message);
    throw new Error('Unable to create task');
  }
};

// Service to fetch all tasks for a user
const getAllTasksService = async (userId) => {
  try {
    const tasks = await Task.findAllByUser(userId);
    return tasks;
  } catch (error) {
    console.error('Error fetching tasks:', error.message);
    throw new Error('Unable to fetch tasks');
  }
};

// Service to update a task by ID
const updateTaskService = async (id, taskData) => {
  try {
    const task = await Task.findById(id);
    console.log(task, " found by Id")
    if (!task) throw new Error('Task not found');

    await Task.update(id, taskData);
    return 'Task updated successfully';
  } catch (error) {
    console.error('Error updating task:', error.message);
    throw new Error('Unable to update task');
  }
};

// Service to delete a task by ID
const deleteTaskService = async (id) => {
  try {
    const task = await Task.findById(id);
    if (!task) throw new Error('Task not found');

    await Task.delete(id);
    return 'Task deleted successfully';
  } catch (error) {
    console.error('Error deleting task:', error.message);
    throw new Error('Unable to delete task');
  }
};

module.exports = {
  createTaskService,
  getAllTasksService,
  updateTaskService,
  deleteTaskService,
};
