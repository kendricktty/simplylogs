const mongoose = require('mongoose')
const {productSchema} = require('./product')

const orderSchema = mongoose.Schema({
    invoiceNo: {
        type: Number,
        required: [true, "ProductId must be provided"],
        unique:true
    },
    products: {
        type: [productSchema]
    },createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
    },
}, { timestamps: true })



module.exports = mongoose.model('Order', orderSchema)