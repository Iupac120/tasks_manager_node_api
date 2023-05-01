const Auth = require('../models/Auth')
const jwt = require('jsonwebtoken')
const {createCustomError} = require('../errors/customError')

const refreshHandler = async(req, res, next) => {
    const cookies = req.cookies
    console.log('cookies')
    if (!cookies?.jwt){
        return next(createCustomError('Access denied', 401))
    }
    const refreshToken = cookies.jwt
    const user = await Auth.findOne({refreshToken: refreshToken})
    console.log(user)
    if (!user){
        return next(createCustomError('Access denied', 403))
    }
    const decoded = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET)
    if (!decoded){
        return next(createCustomError('Access denied', 403))
    }
    const accessToken = jwt.sign(
        {userInfo:{
            id:foundUser._id,
            lastname:foundUser.lastname,
            roles:foundUser.roles
        }},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '30d'}
    )
    res.status(200).json({accessToken})
}

module.exports = {refreshHandler}