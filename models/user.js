const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: { type: String, required: true},
    email: { type: String, required: true },
    password: { type: String, required: true },
    photo: { type: String, default: 'http://localhost:1998/api/users/upload/l60Hf.png' },
    address: { type: String, default: null },
    phone: { type: Number, defaul: null },
    gender: { type: String, default: 'Man' },
    active: { type: Boolean, default: true }
})

module.exports = mongoose.model('User', UserSchema)