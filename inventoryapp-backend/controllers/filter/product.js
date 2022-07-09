const { Product } = require('../../model/product')

const filterBy = async (req, res, next) => {
    const searchQuery = req.query;

    const filteredProduct = await Product.find(searchQuery)
    res.status(200).json({ filter: filteredProduct })
    console.log(`Found product: ${filteredProduct}`);
}

module.exports = filterBy;