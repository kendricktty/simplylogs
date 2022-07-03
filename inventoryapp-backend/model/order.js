const mongoose = require('mongoose')
const {productSchema} = require('./product')

const orderSchema = mongoose.Schema({
    invoiceNo: {
        type: Number,
        required: [true, "ProductId must be provided"]
    },
    products: {
        type: [productSchema],
        default: undefined
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    } 
})



module.exports = mongoose.model('Order', orderSchema)