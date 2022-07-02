const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    productId: {
        type: Number,
        required: [true, "ProductId must be provided"]
    },
    productName: {
        type: String,
        required: [true, "ProductName must be provided"]
    },
    supplier: {
        type: String,
        required: [true, "Supplier must be specified"]
    },
    quantity: {
        type: Number,
        required: [true, "Quantity must be specified"]
    },
    price: {
        type: Number,
        required: [true, "Price must be specified"]
    },
    category: {
        type: String,
        required: [true, "Category must be specified"]
    }

})



module.exports = mongoose.model('Product', productSchema)