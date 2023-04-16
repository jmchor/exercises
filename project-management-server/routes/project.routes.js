// routes/project.routes.js
const mongoose = require('mongoose');
const router = require('express').Router();

// const mongoose = require("mongoose");

const Project = require('../models/Project.model');
const Task = require('../models/Task.model');

// routes/project.routes.js
// ...

// GET /api/projects -  Retrieves all of the projects
router.get('/projects', async (req, res, next) => {
        try {
                const allProjects = await Project.find().populate('tasks');
                res.json(allProjects);
        } catch (error) {
                res.json(error);
        }
});

// ...

//  POST /api/projects  -  Creates a new project
router.post('/projects', async (req, res, next) => {
        const { title, description } = req.body;

        console.log(req.body);

        try {
                const newProject = await Project.create({ title, description, tasks: [] });
                res.json(newProject);
        } catch (error) {
                res.json(error);
        }
});

router.get('/projects/:projectId', async (req, res, next) => {
        const { projectId } = req.params;

        try {
                if (!mongoose.Types.ObjectId.isValid(projectId)) {
                        res.status(400).json({ message: 'Specified id is not valid' });
                        return;
                }

                const findProject = await Project.findById(projectId).populate('tasks');
                res.status(200).json(findProject);
        } catch (error) {
                res.json(error);
        }
});

// PUT  /api/projects/:projectId  -  Updates a specific project by id
router.put('/projects/:projectId', async (req, res, next) => {
        const { projectId } = req.params;

        try {
                if (!mongoose.Types.ObjectId.isValid(projectId)) {
                        res.status(400).json({ message: 'Specified id is not valid' });
                        return;
                }
                const updatedProject = await Project.findByIdAndUpdate(projectId, req.body, { new: true });
                res.json(updatedProject);
        } catch (error) {
                res.json(error);
        }
});

router.delete('/projects/:projectId', async (req, res, next) => {
        const { projectId } = req.params;

        try {
                if (!mongoose.Types.ObjectId.isValid(projectId)) {
                        res.status(400).json({ message: 'Specified id is not valid' });
                        return;
                }

                await Project.findByIdAndRemove(projectId);
                res.json({ message: `Project with ${projectId} is removed successfully.` });
        } catch (error) {
                res.json(error);
        }
});

module.exports = router;
