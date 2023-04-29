const {CustomAPIError} = require('../errors/customError')

const errorHandler = (err, req, res, next) => {
    if (err instanceof CustomAPIError){
        console.error('apierror')
        return res.status(err.statusCode).json({msg:err.message})
    }
    console.log('error handler')
    console.log('other error')
    return res.status(500).json({msg:`Something went wrong, please try again`})
}
module.exports = errorHandler