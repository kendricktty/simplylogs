const express = require('express')
const {getAllOrders, addOrder, getOrder, editOrder, deleteOrder} = require('../controllers/orders')
const orderRouter = express.Router();

orderRouter.route('/').get(getAllOrders).post(addOrder)
orderRouter.route('/:id').get(getOrder).patch(editOrder).delete(deleteOrder);

module.exports = orderRouter