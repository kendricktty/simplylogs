const Product = require('../model/Products')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllProducts = async (req, res) => {
    const company = req.user.company
    const inventory = await Product.find({ company: company }).sort("createdAt")
    res.status(StatusCodes.OK).json({ inventory, count: inventory.length })
}

const addProduct = async (req, res) => {
    req.body.createdBy = req.user.userId
    req.body.company = req.user.company
    const product = await Product.create(req.body)
    res.status(StatusCodes.CREATED).json({ product })
}

const editProduct = async (req, res) => {
    const { id } = req.params


    const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
        runValidators: true
    })


    if (!product) {
        throw new NotFoundError(`No product with _id ${id}`)
    }

    res.status(StatusCodes.OK).json({ product })
}

module.exports = { getAllProducts, addProduct, editProduct }