const express = require("express")
const router = express.Router()
const authUser = require('../config/authentication')

const { index, store, destroy, deleteAll } = require('../controllers/commentController')

router.get('/:_id', index)
router.post('/:_id', authUser, store)
router.delete('/:_id', authUser, destroy)
router.delete('/', deleteAll)

module.exports = router