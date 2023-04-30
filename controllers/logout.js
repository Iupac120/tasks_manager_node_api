const Auth = require('../models/Auth')
const jwt = require('jsonwebtoken')
const {createCustomError} = require('../errors/customError')

const logout = async(req,res,next) => {
    const cookies = req.cookies
    if (!cookies?.jwt){
        return next(createCustomError('Access denied', 401))
    }
    const refreshToken = cookies.jwt
    const user = await Auth.findOne({refreshToken: refreshToken})
    if (!user){
        res.clearcookie('jwt',{httpOnly: true})
        return next(createCustomError('logout out',204))
    }
    user.refreshToken = ''
    await user.save()
    res.clearcookie('jwt',{httpOnly: true})
    res.status(201).json({msg:'Successfully logout'})
}

module.exports = {logout}