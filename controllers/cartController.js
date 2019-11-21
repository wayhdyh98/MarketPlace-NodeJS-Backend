const Cart = require('../models/cart')

module.exports = {
    index: async (req, res) => {
        res.json(await Cart.find({ buyer: req.user._id}).populate('productId').populate('buyer'))
    },
    store: async (req, res) => {
        let cart = req.body
        cart.buyer = req.user._id
        cart.productId = req.params._id
        checkProduct = await Cart.findOne({ $and: [{ productId: cart.productId }, { buyer: cart.buyer }] })
        if (checkProduct) {
            if (checkProduct.totalProduct == null) {
                checkProduct.totalProduct = 0
            }
            data = checkProduct.totalProduct + parseInt(cart.totalProduct)
            data2 = checkProduct.totalPrice + cart.totalPrice
            res.json(await Cart.findOneAndUpdate(
                { _id: checkProduct._id }, { $set: {totalProduct: data, totalPrice: data2} }, { new: true }))
        } else {
            res.json(await Cart.create(cart))
        }
    },
    destroy: async (req, res) => {
        res.json(await Cart.findOneAndRemove({ _id: req.params._id }))
    },
    destruction: async (req, res) => {
        res.json(await Cart.remove({ buyer: req.user._id }))
    }
}