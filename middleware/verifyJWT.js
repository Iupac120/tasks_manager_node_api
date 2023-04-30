
const jwt = require('jsonwebtoken')
const {createCustomError} = require('../errors/customError')

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer')){
        return next(createCustomError('Incorrect header token', 401))
    }
    const authToken = authHeader.split(' ')[1]
    try{
        const decoded = jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET)
        const {lastname} = decoded
        next()
    }catch(err){
        res.status(500).json({msg: err.message})
    }
}

module.exports = {verifyJWT}