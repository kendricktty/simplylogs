import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    productId: {
        type: Number,
        required: [true, "ProductId must be provided"]
    },
    productName: {
        type: String,
        required: [true, "ProductName must be provided"]
    },
    Supplier: {
        type: String,
        required: [true, "Supplier must be specified"]
    },
    Quantity: {
        type: Number,
        required: [true, "Quantity must be specified"]
    },
    Price: {
        type: Number,
        required: [true, "Price must be specified"]
    },
    Category: {
        type: String,
        required: [true, "Category must be specified"]
    }

})



export default mongoose.model('product', productSchema)