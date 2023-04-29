const Products = require('../models/Product')
const {createCustomError} = require('../errors/customError')
const Product = require('../models/Product')
const getAllProductStatic = async(req,res) =>{
    try {
        const products = await Products.find({}).sort('-name price')
        res.status(200).json({products, nbHits: products.length})
    }catch(err){
        res.status(500).json({msg:err})
    }
}

const getAllProducts = async(req,res) =>{
    try{
        const {name, featured, company, sortProduct, filterProduct} = req.query
        const queryObject = {}
        if (name){
            queryObject.name = {$regex: name, $option: 'i'}
        }
        if (company){
            queryObject.company = company
        }
        if (featured){
            queryObject.featured = 'true'? true : false
        }
        let queryResult = Products.find({queryObject})
        if (sortProduct){
            const result = sort.split(',').join(' ')
            const queryResult = queryResult.sort(result)
        }
        if (filterProduct){
            const filterList = queryResult.split(',').join(' ')
            queryResult = queryResult.select(filterList)
        }
        const page = req.query.page || 1
        const limit = req.query.limit || 8
        const skip = (page-1)*limit
        queryResult = queryResult.skip(skip).limit(limit)
        const product = await queryResult
        res.status(200).json({product, nbHits:product.length})
    }catch(err){
        res.status(500).json({msg:err})
    }
}
const getSingleProduct = async(req,res,next) => {
    try{
        const {id: taskID} = req.params
        const product = await Product.find({_id: taskID})
        if (!product){
            return next(createCustomError('Product not found', 401))
        }
        res.status(200).json({product})
    }catch(err){
        return next(createCustomError('Server error', 500))
    }
}

const createProduct = async(req,res, next) => {
    try{
        const product = await Products.create(req.body)
        res.status(200).json({product})
    }catch(err){
        return next(createCustomError(`Server error`, 500))
    }
}
const updateProduct = async(req, res, next) =>{
    try{
        const {id:taskID} = req.params
        const product = await Products.findOneAndUpdate({_id:taskID}, req.body,{
            new: true,
            runValidators: true
        })
        if (!product){
            return next(createCustomError(`product cannot be found`,401))
        }
        res.status(200).json({product})
    }catch(err){
        return next(createCustomError(`Server error`,500))
    }
}
const deleteProduct = async(req,res,next) =>{
    try{
        const {id: taskID} = req.params
        const product = await Product.findOneAndDelete({_id: taskID})
        if (!product){
            return next(createCustomError(`Product not found`, 401))
        }
        res.status(200).json({product})
    }catch(err){
        return next(createCustomError('Server error', 500))
    }
}

module.exports = {
    getAllProductStatic,
    getAllProducts,
    createProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct
}