const express = require('express')
const { getAllProducts, addProduct, editProduct, getProduct, deleteProduct } = require('../controllers/products')
const inventoryRouter = express.Router();


inventoryRouter.route('/').get(getAllProducts).post(addProduct)
inventoryRouter.route('/:id').patch(editProduct).get(getProduct).delete(deleteProduct)

module.exports = inventoryRouter