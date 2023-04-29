require('dotenv').config()

const connectDB = require('./db/connectDB')
const Product = require('./models/Product')

const jsonProduct = require('./products.json')

const start = async() =>{
    try{
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany()
        await Product.create(jsonProduct)
        console.log('success')
        process.exit(0)
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}
start()