const router = require('express').Router();
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

module.exports = router;
