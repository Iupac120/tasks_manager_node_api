const express = require('express')
const router = express.Router()
const {getAllTask, getTask ,createTask, updateTask, deleteTask} = require('../controllers/tasks')
const {verifyJWT} = require('../middleware/verifyJWT')
router.route('/').get(verifyJWT,getAllTask).post(createTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)

module.exports = router