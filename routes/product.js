const express = require('express')
const router = express.Router()
const {verifyJWT} = require('../middleware/verifyJWT')
const {roleList} = require('../config/roles_list')
const {verifyRoles} = require('../middleware/verifyRoles')
const {getAllProductStatic, getAllProducts, getSingleProduct,
createProduct, updateProduct, deleteProduct} = require('../controllers/products')
router.get('/static', getAllProductStatic)
router.route('/').get(getAllProducts).post(verifyJWT,verifyRoles(roleList.Admin,roleList.Editor),createProduct)

router.route('/:id').get(getSingleProduct).patch(verifyRoles(roleList.Editor,roleList.Admin),updateProduct).delete(verifyRoles(roleList.Admin),deleteProduct)

module.exports = router