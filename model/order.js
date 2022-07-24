const mongoose = require('mongoose')
const Product = require('./Products')


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
    }, productRef: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Please provide product'],
    },
})

const orderSchema = new mongoose.Schema({
    invoiceNo: {
        type: Number,
        required: [true, "ProductId must be provided"]
    },
    products: {
        type: [productSchema]
    }
    , createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
    },
    company: {
        type: String,
        required: [true, 'Please provide company name']
    },
    grossTotal: {
        type: Number
    }
}, { timestamps: true })


//creates a method to update the inventory quantity
orderSchema.methods.updateInventory = async function () {
    this.products.map(async (e) => {
        const productRef = e.productRef
        const inventoryProduct = await Product.findOne({ _id: productRef })
        inventoryProduct.quantity -= e.quantity
        await Product.findOneAndUpdate({ _id: productRef },
            inventoryProduct, {
            new: true,
            runValidators: true
        })
    })
}

//middlewar that calculates the total order price before saving
orderSchema.pre('save', function (next) {
    let total = 0
    for (let index = 0; index < this.products.length; index++) {
        total += this.products[index].price * this.products[index].quantity
    }
    this.grossTotal = total
    next()
})


//creates a method to validate if there is sufficient quantity
orderSchema.methods.validateQuantity = async function() {
    for (let index = 0; index < this.products.length; index++) {
        const productRef = this.products[index].productRef
        const inventoryProduct = await Product.findOne({ _id: productRef })
        if(inventoryProduct.quantity < this.products[index].quantity) {
            return false
        }
    }
    return true
}


module.exports = mongoose.model('Order', orderSchema)