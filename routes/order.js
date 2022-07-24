const express = require('express')
const {getAllOrders, createOrder} = require('../controllers/orders')
const orderRouter = express.Router();

orderRouter.route('/').get(getAllOrders).post(createOrder) 

module.exports = orderRouter