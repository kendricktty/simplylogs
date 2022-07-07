const Order = require('../model/order')

const getAllOrders = async (req, res, next) => {
    const orders = await Order.find({})
    res.status(200).json({ orders })
    console.log('Get all orders')
}

const addOrder = async (req, res, next) => {
    const order = await Order.create(req.body)
    res.status(201).json({ order })
    console.log('Add order')
}

const getOrder = async (req, res, next) => {
    const { id } = req.params;
    const order = await Order.findOne({ _id: id });
    if (!order) {
        const err = new Error(`No order with id ${id}`);
        err.status = 404;
        return next(err);
    }
    res.status(200).json({
        order
    })
    console.log('Get order');
}

const editOrder = async (req, res, next) => {
    const { id } = req.params;
    const order = await Order.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
        runValidators: true
    });

    if (!order) {
        const err = new Error(`No order with id ${id}`);
        err.status = 404;
        return next(err);
    }
    res.status(200).json({
        order
    })
    console.log('Edit order');
}

const deleteOrder = async (req, res, next) => {
    const { id } = req.params
    // console.log(id)

    const order = await Order.findOneAndDelete({ _id: id })

    if (!product) {
        const err = new Error(`No product with id ${id}`);
        err.status = 404;
        return next(err);
    }

    res.status(200).json({ order })
    console.log('Deleted order');
    console.log(product);
}

module.exports = { getAllOrders, addOrder, getOrder, editOrder, deleteOrder }