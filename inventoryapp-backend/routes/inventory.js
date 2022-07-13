const express = require('express')
const { getAllProducts, addProduct, editProduct } = require('../controllers/products')
const inventoryRouter = express.Router();

inventoryRouter.route('/').get(getAllProducts).post(addProduct)
inventoryRouter.route('/:id').patch(editProduct)

module.exports = inventoryRouter