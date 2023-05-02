const exprees = require('express')
const router = exprees.Router()

const {} = require('../controllers/jobs')

router.route('/').get().post()
router.route('/:jobID').get().patch().delete()

module.exports = router