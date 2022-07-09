const { Order } = require('../../model/order')

const filterBy = async (req, res, next) => {
    const searchQuery = req.query;

    const filteredOrder = await Order.find(searchQuery);
    res.status(200).json({ filter: filteredOrder })
    console.log(`Found product: ${filteredOrder}`);
}

module.exports = filterBy;