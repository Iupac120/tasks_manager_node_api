const Products = require('../models/Product')

const getAllProductStatic = async(req,res) =>{
    try {
        const products = await Products.find({feature: true, nbHits: products.length})
        res.status(200).json({products})
    }catch(err){
        res.status(500).json({msg:err})
    }
}

const getAllProducts = async(req,res) =>{
    try{
        const {name, product, company} = req.query
        const queryObject = {}
        if (name){
            const namep = await Products.find({name})
        }
        const products = await Products.find({})
        res.status(200).json({products, nbHits:products.length})
    }catch(err){
        res.status(500).json({msg:err})
    }
}


module.exports = {
    getAllProductStatic,
    getAllProducts
}