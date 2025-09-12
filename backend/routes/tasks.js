const express = require('express');
const TaskController = require('../controllers/taskController');

const router = express.Router();
const taskController = new TaskController();

router.get('/', async (req, res) => {
  await taskController.getAllTasks(req, res);
});

router.post('/', async (req, res) => {
  await taskController.createTask(req, res);
});

router.put('/:id', async (req, res) => {
  await taskController.updateTask(req, res);
});

router.delete('/:id', async (req, res) => {
  await taskController.deleteTask(req, res);
});

module.exports = router;
