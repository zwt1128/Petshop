const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    nickname: {
        type: String,
        unique: true,
        require: true
    },
    phone: {
        type: Number,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    photo: {
        type: String,
        default: ''
    },
    address: {
        type: Object,
        default: {}
    },
    no: {
        type: String,
        require: true
    }
})
module.exports = mongoose.model('User', userSchema)