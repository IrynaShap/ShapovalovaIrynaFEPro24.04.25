const express = require('express');
const TaskController = require('../controllers/taskController');

const router = express.Router();
const taskController = new TaskController();

// Get all tasks
router.get('/', async (req, res) => {
  await taskController.getAllTasks(req, res);
});

// Create a new task
router.post('/', async (req, res) => {
  await taskController.createTask(req, res);
});

// Update a task
router.put('/:id', async (req, res) => {
  await taskController.updateTask(req, res);
});

// Delete a task
router.delete('/:id', async (req, res) => {
  await taskController.deleteTask(req, res);
});

module.exports = router;
