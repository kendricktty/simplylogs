const express = require('express')
const {getAllOrders, addOrder} = require('../controllers/orders')
const orderRouter = express.Router();

orderRouter.route('/').get(getAllOrders).post(addOrder)

module.exports = orderRouter