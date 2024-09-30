const express = require('express');
const router = express.Router();
const { createTask, getAllTasks, updateTask, deleteTask } = require('../controllers/taskController');
const { userAuth } = require('../helper/middleware');

router.post('/createTask/', userAuth, createTask);
router.get('/getTasks/', userAuth, getAllTasks);
router.put('/updateTask/:id', userAuth, updateTask);
router.delete('/deleteTask/:id', userAuth, deleteTask);

module.exports = router;