const mongoose = require('mongoose')

/* Schema: 表的描述 */
const Schema = mongoose.Schema
const ProfeSchema = new Schema({
    img: String,
    title:String,
    cont1:String,
    cont2:String,
    cont3:String,
    cont4:String,
})

/* model 建模型 */
module.exports = mongoose.model('Profe', ProfeSchema)