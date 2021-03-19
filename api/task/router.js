// build your `/api/tasks` router here
const express = require('express');
const Task = require('./model')
const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const data = await Task.getTasks()
        res.status(200).json(data)
    } catch (e) {
        next()
    }
})

router.post('/', async (req, res, next) => {
    const { task_description, task_completed, project_id } = req.body
    try {
        if (!task_description || !task_completed || !project_id) {
            res.status(404).json({
                message: 'Task description, completed and project ID required',
            })
        } else {
            const data = await Task.postATask(req.body)
            res.status(200).json(data)
        }
    } catch (e) {
        next()
    }
})

router.use((err, req, res, next) => {
    res.status(500).json({ message: err.message, stack: err.stack })
})

module.exports = router