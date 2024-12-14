const express = require('express');
const router = express.Router();
const Todo = require('../models/todo'); // Import model

// Display all tasks
router.get('/', async (req, res) => {
    const tasks = await Todo.find({});
    res.render('index', { tasks });
});

// Add new task
router.post('/add', async (req, res) => {
    const { title, user } = req.body;
    await Todo.create({ title, user });
    res.redirect('/');
});

// Mark task as done
router.post('/done/:id', async (req, res) => {
    await Todo.findByIdAndUpdate(req.params.id, { isDone: true });
    res.redirect('/');
});

// Delete task (optional)
router.post('/delete/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

module.exports = router;
