const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CartSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    buyer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    totalProduct: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 }
})

module.exports = mongoose.model('Cart', CartSchema)