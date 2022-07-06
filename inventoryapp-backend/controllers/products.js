const { convertLegacyProps } = require('antd/lib/button/button')
const {Product} = require('../model/product')

const getAllProducts = async (req, res) => {
    const inventory = await Product.find({})
    res.status(200).json({ inventory })
}

const addProduct = async (req, res) => {
    const product = await Product.create(req.body)
    res.status(201).json({ product })
}

const editProduct = async (req, res) => {
    const { id } = req.params
    // console.log(id)

    const product = await Product.findOneAndUpdate({_id: id}, req.body, {
        new: true,
        runValidators: true
    })


    if (!product) {
        throw new Error(`no product id with ${id}`)
    }
    
    res.status(200).json({ product })
}

module.exports = { getAllProducts, addProduct, editProduct }