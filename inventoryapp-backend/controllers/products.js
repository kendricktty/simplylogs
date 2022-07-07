const { Product } = require('../model/product')

const getAllProducts = async (req, res, next) => {
    const inventory = await Product.find({})
    res.status(200).json({ inventory })
    console.log('Get all products');
}

const getProduct = async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findOne({ __id: id });
    if (!product) {
        const err = new Error(`No product with id ${id}`);
        err.status = 404;
        next(err);
    }
    res.status(200).json({
        product
    })
    console.log('Get product');
}

const addProduct = async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({ product });
    console.log('Add product');
}

const editProduct = async (req, res, next) => {
    const { id } = req.params
    // console.log(id)

    const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
        runValidators: true
    })


    if (!product) {
        const err = new Error(`No product with id ${id}`);
        err.status = 404;
        next(err);
    }

    res.status(200).json({ product })
}

module.exports = { getAllProducts, addProduct, editProduct, getProduct}