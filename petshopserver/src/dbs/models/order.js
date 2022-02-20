const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
    address: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    userNo: {
        type: String,
        require: true
    },
    goods: {
        type: Array,
        require: true
    },
    orderNo: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Number,
        default: 0
    }
})
module.exports = mongoose.model('Order', orderSchema)