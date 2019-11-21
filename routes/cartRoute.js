const express = require("express")
const router = express.Router()
const authUser = require('../config/authentication')

const { index, store, destroy, destruction } = require('../controllers/cartController')

router.use(authUser)
router.get('/', index)
router.post('/:_id', store)
router.delete('/:_id', destroy)
router.delete('/', destruction)

module.exports = router