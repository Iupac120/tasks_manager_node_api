const express = require('express')
const router = express.Router()

const {getAllProductStatic, getAllProducts} = require('../controllers/products')
router.get('/static', getAllProductStatic)
router.route('/').get(getAllProducts).post()

router.route('/:id').get().patch().delete()

module.exports = router