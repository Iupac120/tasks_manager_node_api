require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.static('./public'))
const connectDB = require('./db/connectDB')
const notFound = require('./middleware/not-Found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const PORT = process.env.PORT || 3000
//routes
const tasks = require('./routes/task')
const products = require('./routes/product')

app.use(express.json())
app.use('/api/v1/tasks', tasks)
app.use('/api/v1/products', products)
app.get('/', (req,res) =>{
    res.send('Task manager')
})
app.use(notFound)
app.use(errorHandlerMiddleware)


const start = async() =>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, () =>{
        console.log(`server listens to port ${PORT}`)
    })
    }catch(err){
        console.log(err)
    }
    
}
start()