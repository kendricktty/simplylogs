const { Order } = require('../model/order');

const getOrdersFromPastNMonths = async (req, res, next) => {
    const returnSalesValues = {};
    const today = new Date();

    for (let i = 0; i <= 12; i++) {
        const orderList = await Order.aggregate({});
        today.setMonth(today.getMonth() - i);
    }
    res.status(200).json({ returnSalesValues });
}

module.exports = getOrdersFromPastNMonths;