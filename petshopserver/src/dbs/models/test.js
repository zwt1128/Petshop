const mongoose = require('mongoose')

/* Schema: 表的描述 */
const Schema = mongoose.Schema
const TestSchema = new Schema({
   id: Number,
   type: String,
   type1: String,
   type2: String,
   type3: String,
   type4: String,
   title: String,
   price: String,
   src1: String,
   src2: String,
   classify: Array,
   tuijian: Array,
   taste: Array,
   brand: String,
   color: Array,
})

/* model 建模型 */
module.exports = mongoose.model('Goodslist', TestSchema)