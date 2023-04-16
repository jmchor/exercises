// routes/project.routes.js

const router = require('express').Router();

// const mongoose = require("mongoose");

const Project = require('../models/Project.model');
const Task = require('../models/Task.model');

//  POST /api/projects  -  Creates a new project
router.post('/projects', async (req, res, next) => {
        const { title, description } = req.body;

        try {
                const newProject = await Project.create({ title, description, tasks: [] });
                res.json(newProject);
        } catch (error) {
                res.json(error);
        }
});
module.exports = router;
