const express = require('express')
const filterBy = require('../../controllers/filter/product')
const productFilterRouter = express.Router();

productFilterRouter.route('/').get(filterBy);

module.exports = productFilterRouter;