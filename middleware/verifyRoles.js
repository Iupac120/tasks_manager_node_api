const verifyRoles = (...allowedRole) => {
    return (req,res,next) => {
        if (!req?.roles){
            return res.status(401).json({msg:'Not authorised'})
        }
        const roleArray = [...allowedRole]
        console.log(roleArray)
        console.log(req.roles)
        const result = req.roles.map(role => roleArray.includes(role)).find(role => role === allowedRole)
        console.log(result)
        if (!result){
            return res.status(401).json({msg:'Access denied'})
        }
        next()
    }
}

module.exports = {verifyRoles}