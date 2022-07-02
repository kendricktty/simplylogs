const mongoose = require('mongoose')

const inventorySchema = mongoose.Schema({
    inventory:
        [{
            productId: Number,
            productName: String,
            supplier: String,
            quantity: Number,
            price: Number,
            category: String
        }]
})



module.exports = mongoose.model('inventory', inventorySchema)