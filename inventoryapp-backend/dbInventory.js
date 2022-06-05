
import mongoose from "mongoose";

const inventorySchema = mongoose.Schema({
    inventory:
        [{
            productId: Number,
            productName: String,
            supplier: String,
            quantity: Number,
            price: String,
            category: String
        }]
})

export default mongoose.model('inventory', inventorySchema)