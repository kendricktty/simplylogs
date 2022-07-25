const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
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
    },createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
    },
    company: {
        type: String,
        required: [true, 'Please provide company name']
    }
}, { timestamps: true }
)

module.exports = mongoose.model('Product', productSchema)

