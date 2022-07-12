const User = require('../model/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')



const register = async (req, res) => {

    // const user = await User.create({ ...req.body })
    // const token = user.createJWT()
    // res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
    const { name, email, password, company } = req.body

    if (!name || !email || !password || !company) {
        throw new BadRequestError('please provide all values')
    }
    const userAlreadyExists = await User.findOne({ email })
    if (userAlreadyExists) {
        throw new BadRequestError('Email already in use')
    }
    const user = await User.create({ name, email, password, company })

    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({
        user: {
            email: user.email,
            company: user.company,
            name: user.name,
        },
        token
    })

}

const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw new BadRequestError('Please provide email and password')
    }

    const user = await User.findOne({ email })
    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials')
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials')
    }
    //compare password

    const token = user.createJWT()
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token })


}

module.exports = { register, login }