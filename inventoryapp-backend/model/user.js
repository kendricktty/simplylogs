const mongoose = require('mongoose')
const {productSchema} = require('./product')

const userSchema = mongoose.Schema({
    userid: {
        type: String,
        required: [true, "Please enter a memorable user ID"]
    },
    fullName: {
        type: String,
        required: [true, "Enter your full name"]
    },
    emailAddress: {
        type: String,
        required: [true, "Enter an email address"]
    },
    passwordSalt: {
        type: String
    },
    inventory: [productSchema],
    orders: []
});


module.exports = mongoose.model('user', userSchema)