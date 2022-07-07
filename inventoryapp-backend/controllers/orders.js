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


module.exports = { getAllOrders, addOrder }