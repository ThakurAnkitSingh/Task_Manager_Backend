// const taskService = require('../services/taskService');

// const createTask = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const { title, description, status } = req.body;
//     const task = await taskService.createTask(userId, title, description, status);
//     return res.status(201).json({ message: 'Task created', task });
//   } catch (error) {
//     return res.status(400).json({ message: error.message });
//   }
// };

// const getAllTasks = async (req, res) => {
//   try {
//     const userId = req.user;
//     console.log(userId, "Userdetaisl on task")
//     const tasks = await taskService.getAllTasks(userId);
//     return res.status(200).json(tasks);
//   } catch (error) {
//     return res.status(400).json({ message: error.message });
//   }
// };

// const updateTask = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const taskData = req.body;
//     const message = await taskService.updateTask(id, taskData);
//     return res.status(200).json({ message });
//   } catch (error) {
//     return res.status(400).json({ message: error.message });
//   }
// };

// const deleteTask = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const message = await taskService.deleteTask(id);
//     return res.status(200).json({ message });
//   } catch (error) {
//     return res.status(400).json({ message: error.message });
//   }
// };

// module.exports = {
//   createTask,
//   getAllTasks,
//   updateTask,
//   deleteTask,
// };


// controllers/taskController.js
const {createTaskService, getAllTasksService, updateTaskService, deleteTaskService} = require('../services/taskService');

// Controller function to create a task
const createTask = async (req, res) => {
  try {
    const userId = req?.user?.userId;
    const { title, description, status } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title and status are required' });
    }
    const task = await createTaskService(userId, title, description, status);
    return res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    console.error('Error creating task:', error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller function to get all tasks for a user
const getAllTasks = async (req, res) => {
  try {
    const userId = req?.user?.userId; // Extract userId from the middleware

    const tasks = await getAllTasksService(userId);
    return res.status(200).json({ tasks });
  } catch (error) {
    console.error('Error fetching tasks:', error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller function to update a task
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const taskData = req.body;

    const message = await updateTaskService(id, taskData);
    return res.status(200).json({ message });
  } catch (error) {
    console.error('Error updating task:', error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller function to delete a task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await deleteTaskService(id);
    return res.status(200).json({ message });
  } catch (error) {
    console.error('Error deleting task:', error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
};
