const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HistorySchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    buyer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    totalProduct: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 },
    payment: { type: Number, required: true },
    change: { type: Number, default: 0 },
    time: { type : Date, default: Date.now }
})

module.exports = mongoose.model('History', HistorySchema)