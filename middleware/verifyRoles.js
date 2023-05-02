const verifyRoles = (...allowedRole) => {
    return (req,res,next) => {
        const roleArray = [...allowedRole]
        console.log(req.user)
        if (!req?.user ){
            return res.status(401).json({msg:'Not authorised'})
        }
        //const roleArray = [...allowedRole]
        console.log(roleArray)
        console.log(req.user.roles)  
        const result = req.user.roles.map(role => roleArray.includes(role)).find(role => role === allowedRole)
        console.log(result)
        if (!result){
            return res.status(401).json({msg:'Access denied'})
        }
        next()
    }
}

module.exports = {verifyRoles}