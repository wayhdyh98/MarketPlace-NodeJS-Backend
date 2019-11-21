const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    productName: { type: String, required: true },
    detail: { type: String, required: true, default: 'There is no desc1ription yet!' },
    category: { type: String, required: true },
    price: { type: Number, default: 0, required: true },
    photo: { type: String, default: 'http://localhost:1998/api/products/upload/default.jpg' },
    stock: { type: Number, default: 0, required: true }
})

module.exports = mongoose.model('Product', ProductSchema)