const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    onProduct: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    comment: { type: String, required: true }
})

module.exports = mongoose.model('Comment', CommentSchema)