const Order = require('../model/order')

const getAllOrders = async (req, res) => {
    const orders = await Order.find({})
    res.status(200).json({ orders })
}

const addOrder = async (req, res) => {
    const order = await Order.create(req.body)
    res.status(201).json({ order })
}

module.exports = { getAllOrders, addOrder }