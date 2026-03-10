const router = require('express').Router();
const Task = require('../models/Task');

// GET all tasks
router.get('/', async (req, res) => {
    const userId = req.query.userId;
    try {
        const tasks = userId 
            ? await Task.find({ userId }).sort({ order: 1, createdAt: -1 })
            : await Task.find().sort({ order: 1, createdAt: -1 });
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json(err);
    }
});

// CREATE a task
router.post('/', async (req, res) => {
    const newTask = new Task(req.body);
    try {
        const savedTask = await newTask.save();
        res.status(200).json(savedTask);
    } catch (err) {
        res.status(500).json(err);
    }
});

// REORDER tasks
router.put('/reorder', async (req, res) => {
    try {
        const { tasks } = req.body; // Expecting array of { id, order }
        
        if (!tasks || !Array.isArray(tasks)) {
            return res.status(400).json("Invalid tasks data");
        }

        const updatePromises = tasks.map(task => 
            Task.findByIdAndUpdate(task.id, { order: task.order })
        );
        
        await Promise.all(updatePromises);
        res.status(200).json("Tasks reordered successfully");
    } catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE a task
router.put('/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE a task
router.delete('/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(200).json("Task has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
