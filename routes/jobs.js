const exprees = require('express')
const router = exprees.Router()

const {} = require('../controllers/jobs')

router.route('/').get().post()
router.route('/:id').get().patch().delete()

module.exports = router