const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors')

const auth = async (req, res, next) => {
    //checkheader

    const authHeader = req.headers.authorization


    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new UnauthenticatedError("Authentication Invalid")
    }

    const token = authHeader.split(" ")[1]

    try {
        const payload = await jwt.verify(token,process.env.JWT_SECRET)
        req.user = {userId:payload.userId, company:payload.company}
        next()
    } catch (error) {
        throw new UnauthenticatedError("Authentication Invalid")
    }
    
}

module.exports = auth