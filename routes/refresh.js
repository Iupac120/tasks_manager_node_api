const express = require('express')
const router = express.Router()

const {refreshHandler} = require('../controllers/rereshHandler')

router.get('/refresh', refreshHandler)

module.exports = router