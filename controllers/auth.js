const Auth = require('../models/Auth')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {createCustomError} = require('../errors/customError')

const register = async(req,res, next) => {
    const {firstname, lastname, password, email} = req.body
    if (!firstname || !lastname){
        return res.status(400).json({msg:`Must provide firstname and lastname`})
    }
    const alreadyRegister = await Auth.findOne({email})
    if (alreadyRegister){
        return next(createCustomError('Email already already', 401))
    }
    try{
        const salt = await bcrypt.genSalt(10)
        console.log('create')
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser =  await Auth.create({
            firstname,
            lastname,
            password: hashedPassword,
            email
        })
        await newUser.save()
        res.status(200).json({msg:`You are registered, ${firstname}`})
    }catch(err){
        res.status(500).json({'message':err.message})
    }
}

const login = async(req,res,next) => {
    const {password, email} = req.body
    if (!password || !email){
        return res.status(402).json({msg:`Must provide password and email`})
    }
    const foundUser = await Auth.findOne({email})
    console.log(foundUser.lastname)
    if (!foundUser){
        return next(createCustomError('Email does not exist', 401))
    }
    const matchPassword = await bcrypt.compare(password, foundUser.password)
    const rolevalue = Object.values(foundUser.roles)
    console.log(rolevalue)
    if (!matchPassword){
        return next(createCustomError('Incorrect password', 401))
    }
    const accessToken = jwt.sign(
        {userInfo:{
            id:foundUser._id,
            lastname:foundUser.lastname,
            roles:foundUser.roles
        }},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '20d'}
    )
    const refreshToken = jwt.sign(
        {lastname:foundUser.lastname},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:'90d'}
    )
    //refresh token is save in the database
    foundUser.refreshToken = refreshToken
    await foundUser.save()
    console.log(foundUser.refreshToken)
    //refresh token is send to frontend as a cookie best secured with httponly
    res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24*60*60*1000})
    res.status(200).json({accessToken,"message":"welcome to to my website"})
}


module.exports = {
    register,
    login
}