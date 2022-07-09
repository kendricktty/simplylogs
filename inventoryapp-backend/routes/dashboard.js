const express = require('express')
const getOrdersFromPast12Months = require('../controllers/dashboard')
const dashboardRouter = express.Router();

dashboardRouter.route('/sales_analytics').get(getOrdersFromPast12Months);

module.exports = dashboardRouter