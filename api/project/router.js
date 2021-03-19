// build your `/api/projects` router here
const express = require('express');
const Project = require('./model')
const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const data = await Project.getAllProjects()
        res.render('200').json(data)
    } catch (e) {
        next(e)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const { project_name, project_completed } = req.body
        if (!project_name || !project_completed) {
            res
                .status(404)
                .json({ message: 'project name and project completed required' })
        } else {
            const data = await Project.postProject(req.body)
            res.status(201).json(data)
        }
    } catch (e) {
        next(e)
    }
})

router.use((err, req, res, next) => {
    res.status(500).json({ error: err.message, stack: err.stack })
})

module.exports = router