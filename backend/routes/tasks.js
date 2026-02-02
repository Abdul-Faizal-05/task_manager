const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Create a new task
router.post('/create', async (req, res) => {
    try {
        const { teamName, title, description, priority, startDate, endDate, duration, members } = req.body;

        // Validate input
        if (!teamName || !title || !description || !startDate || !endDate || !members || members.length === 0) {
            return res.status(400).json({
                message: 'Please provide all required fields'
            });
        }

        // Create new task
        const task = new Task({
            teamName,
            title,
            description,
            priority: priority || 'medium',
            status: 'todo',
            startDate,
            endDate,
            duration,
            members,
            progress: 0
        });

        await task.save();

        // Populate members data before sending response
        await task.populate('members', 'username email');

        res.status(201).json({
            message: 'Task created successfully',
            task: task
        });

    } catch (error) {
        console.error('Task creation error:', error);

        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: Object.values(error.errors).map(e => e.message).join(', ')
            });
        }

        res.status(500).json({
            message: 'Server error during task creation'
        });
    }
});

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find()
            .populate('members', 'username email role')
            .populate('createdBy', 'username email')
            .sort({ createdAt: -1 });

        res.json({
            message: 'Tasks retrieved successfully',
            tasks: tasks
        });

    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({
            message: 'Server error while fetching tasks'
        });
    }
});

// Get task by ID
router.get('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
            .populate('members', 'username email role')
            .populate('createdBy', 'username email');

        if (!task) {
            return res.status(404).json({
                message: 'Task not found'
            });
        }

        res.json({
            message: 'Task retrieved successfully',
            task: task
        });

    } catch (error) {
        console.error('Error fetching task:', error);
        res.status(500).json({
            message: 'Server error while fetching task'
        });
    }
});

// Update task
router.put('/:id', async (req, res) => {
    try {
        const { title, description, priority, status, startDate, endDate, duration, members, progress } = req.body;

        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: 'Task not found'
            });
        }

        // Update fields if provided
        if (title) task.title = title;
        if (description) task.description = description;
        if (priority) task.priority = priority;
        if (status) task.status = status;
        if (startDate) task.startDate = startDate;
        if (endDate) task.endDate = endDate;
        if (duration) task.duration = duration;
        if (members) task.members = members;
        if (progress !== undefined) task.progress = progress;

        await task.save();
        await task.populate('members', 'username email role');

        res.json({
            message: 'Task updated successfully',
            task: task
        });

    } catch (error) {
        console.error('Error updating task:', error);

        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: Object.values(error.errors).map(e => e.message).join(', ')
            });
        }

        res.status(500).json({
            message: 'Server error while updating task'
        });
    }
});

// Delete task
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: 'Task not found'
            });
        }

        res.json({
            message: 'Task deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({
            message: 'Server error while deleting task'
        });
    }
});

// Get tasks by member ID
router.get('/member/:memberId', async (req, res) => {
    try {
        const tasks = await Task.find({ members: req.params.memberId })
            .populate('members', 'username email role')
            .sort({ createdAt: -1 });

        res.json({
            message: 'Tasks retrieved successfully',
            tasks: tasks
        });

    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({
            message: 'Server error while fetching tasks'
        });
    }
});

module.exports = router;
