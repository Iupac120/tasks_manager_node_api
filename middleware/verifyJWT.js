
const jwt = require('jsonwebtoken')
const {createCustomError} = require('../errors/customError')

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.header.Authorization
    if (!authHeader || !authHeader.startsWith('Bearer')){
        return next(createCustomError('Incorrect header token', 401))
    }
    const authToken = authHeader.split(' ')[1]
    try{
        const decoded = jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET)
        req.user = {id:decoded.userInfo.id,lastname:decoded.userInfo.lastname,roles:decoded.userInfo.roles}
        //req.user = {id:id, lastname:lastname, roles: roles}
        console.log(req.user)
        //console.log(id)
        
        //console.log(req.user)
        next()
    }catch(err){
        res.status(500).json({msg: err.message})
    }
}

module.exports = {verifyJWT}