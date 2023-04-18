const router = require('express').Router();
const mongoose = require('mongoose');
// const mongoose = require("mongoose");

const Task = require('../models/Task.model');
const Project = require('../models/Project.model');

router.post('/tasks', async (req, res, next) => {
        const { title, description, projectId } = req.body;

        console.log(req.body);

        try {
                const newTask = await Task.create({ title, description, projectId });

                const update = await Project.findByIdAndUpdate(projectId, { $push: { tasks: newTask._id } });

                res.json(update);
        } catch (error) {
                res.json(error);
        }
});

router.get('/tasks/:taskId', async (req, res, next) => {
        const { taskId } = req.params;

        try {
                if (!mongoose.Types.ObjectId.isValid(taskId)) {
                        res.status(400).json({ message: 'Specified id is not valid' });
                        return;
                }

                const findTask = await Task.findById(taskId);
                res.status(200).json(findTask);
        } catch (error) {
                res.json(error);
        }
});

router.put('/tasks/:taskId', async (req, res, next) => {
        const { taskId } = req.params;

        try {
                if (!mongoose.Types.ObjectId.isValid(taskId)) {
                        res.status(400).json({ message: 'Specified id is not valid' });
                        return;
                }

                const updateTask = await Task.findByIdAndUpdate(taskId, req.body, { new: true });
                res.json(updateTask);
        } catch (error) {
                res.json(error);
        }
});

router.delete('/tasks/:taskId', async (req, res, next) => {
        const { taskId } = req.params;

        try {
                if (!mongoose.Types.ObjectId.isValid(taskId)) {
                        res.status(400).json({ message: 'Specified id is not valid' });
                        return;
                }

                await Task.findByIdAndRemove(taskId);
                res.json({ message: `Task with ${taskId} is removed successfully.` });
        } catch (error) {
                res.json(error);
        }
});

module.exports = router;
