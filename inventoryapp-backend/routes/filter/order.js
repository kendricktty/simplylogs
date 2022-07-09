const express = require('express')
const filterBy = require('../../controllers/filter/product')
const orderFilterRouter = express.Router();

orderFilterRouter.route('/').get(filterBy);

module.exports = orderFilterRouter;