const {Product} = require('../model/product')

const getAllProducts = async (req, res) => {
    const inventory = await Product.find({})
    res.status(200).json({ inventory })
}

const addProduct = async (req, res) => {
    const product = await Product.create(req.body)
    res.status(201).json({ product })
}

module.exports = { getAllProducts, addProduct }