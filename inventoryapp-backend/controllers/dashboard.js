const Order = require('../model/order');

const getOrdersFromPast12Months = async (req, res, next) => {

    // Returns all sales data from the past 12 months from today's date to be processed by the Dashboard front-end.
    const returnSalesValues = {};
    const now = new Date();

    let firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    let lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    for (let i = 1; i <= 12; i++) {
        const monthsOrders = await Order.find({
            createdAt: {
                $gte: firstDay,
                $lte: lastDay
            }
        });
         // The size of the object returned from the query represents the number of sales (orders) for that month
        returnSalesValues[lastDay.toLocaleString('default', { month : 'long'})] = Object.keys(monthsOrders).length;
        
        firstDay = new Date(now.getFullYear(), now.getMonth() - i, 1);
        lastDay = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
    }
    console.log('Dashboard refreshed');
    res.status(200).json(returnSalesValues);
}

module.exports = getOrdersFromPast12Months;