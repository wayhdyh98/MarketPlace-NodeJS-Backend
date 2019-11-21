const History = require('../models/history')

module.exports = {
    index: async (req, res) => {
        res.json(await History.find({ buyer: req.user._id }).populate('productId').populate('buyer'))
    },
    store: async (req, res) => {
        let history = req.body
        history.buyer = req.user._id
        res.json(await History.create(history))
    },
    deleteAll: async (req, res) => {
        res.json(await History.remove())
    }
}