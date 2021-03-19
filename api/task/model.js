// build your `Task` model here
const db = require('../../data/dbConfig')

const getTasks = () => {
    return db('tasks')
}

const postATask = (task) => {
    return db('task').insert(task)
}

module.exports = {
    getTasks,
    postATask,
}