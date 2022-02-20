const mongoose = require('mongoose')

const Schema = mongoose.Schema
const CityScheme = new Schema({
    id: {
        type: String,
        require: true
    },
    type: {
        type: String
    },
    type1: {
        type: String
    },
    type2: {
        type: String
    },
    type3: {
        type: String
    },
    type4: {
        type: String
    },
    classify: {
        type: Array
    },
    title: {
        type: String
    },
    brand: {
        type: String
    },
    price: {
        type: String,
    },
    color: {
        type: Array
    },
    number: {
        type: String
    },
    src1: {
        type: String,
    },
    src2: {
        type: String,
    },
    tuijian: {
        type: Array
    }
})

module.exports = mongoose.model('City', CityScheme)