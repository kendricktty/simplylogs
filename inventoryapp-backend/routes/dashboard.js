const express = require('express')
const getOrdersFromPastNMonths = require('../controllers/dashboard')
const dashboardRouter = express.Router();

dashboardRouter.route('/').get(getOrdersFromPastNMonths);

module.exports = dashboardRouter