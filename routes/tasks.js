const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.get('/:categoryId', async (req, res) => {
  const tasks = await Task.find({ category: req.params.categoryId });
  res.render('tasks', { tasks });
});

router.post('/:categoryId', async (req, res) => {
  const task = new Task({
    title: req.body.title,
    completed: false,
    category: req.params.categoryId
  });
  await task.save();
  res.redirect(`/tasks/${req.params.categoryId}`);
});

router.post('/:taskId/completion', async (req, res) => {
  const taskId = req.body.taskId;
  const completed = req.body.completed ? true : false;

  try {
      await Task.findByIdAndUpdate(taskId, { completed: completed });
      res.redirect('back'); // This will send the user back to the page they came from
  } catch (error) {
      res.status(500).send(error.toString());
  }
});


router.get('/:taskId/delete', async (req, res) => {
  try {
    await Task.findOneAndDelete({_id: req.params.taskId});
    res.redirect('back'); // Or redirect to another appropriate route
  } catch (error) {
    res.status(500).send("Error deleting task: " + error.message);
  }
});

module.exports = router;

