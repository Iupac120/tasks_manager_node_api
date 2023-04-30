require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.static('./public'))
const connectDB = require('./db/connectDB')
const notFound = require('./middleware/not-Found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const PORT = process.env.PORT || 3000
app.use(express.urlencoded({extended: false}))
app.use(express.static('/public'))
app.use(express.json())
app.use(cors())
app.use(cookieParser())
//routes
const tasks = require('./routes/task')
const products = require('./routes/product')
const auth = require('./routes/auth')
const refresh = require('./routes/refresh')
const jobs = require('./routes/jobs')
const logout = require('./routes/logout')
app.use(express.json())
app.use('/api/v1/tasks', tasks)
app.use('/api/v1/products', products)
app.use('/api/v1', auth)
app.use('/api/v1', refresh)
app.use('/api/v1', logout)
app.use('/api/v1/jobs', jobs)
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