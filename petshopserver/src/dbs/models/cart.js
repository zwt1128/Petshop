const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    taste: {
        type: String,
        default: ''
    },
    price: {
        type: Number
    },
    count: {
        type: Number,
        default: 1
    },
    userNo: {
        type: String,
        require: true
    },
    img: {
        type: String,
        default: ''
    },
    goodsNo: {
        type: String,
        require: true
    }
})
module.exports = mongoose.model('Cart', userSchema)