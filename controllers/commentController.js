const Comment = require('../models/comment')

module.exports = {
    index: async (req, res) => {
        res.json(await Comment.find({ onProduct: req.params._id }).populate('onProduct').populate('user'))
    },
    store: async (req, res) => {
        let comment = req.body
        comment.user = req.user._id
        comment.onProduct = req.params._id
        res.json(await Comment.create(comment))
    },
    destroy: async (req, res) => {
        res.json(await Comment.findOneAndDelete({ _id: req.params._id }))
    },
    deleteAll: async (req, res) => {
        res.json(await Comment.remove())
    }
}