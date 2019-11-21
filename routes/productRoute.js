const express = require("express")
const router = express.Router()
const authUser = require('../config/authentication')

const { index, show, display, store, upload, update, destroy, deleteAll } = require('../controllers/productController')

router.get('/', index)
router.get('/:_id', show)
router.get('/user/:_id', display)
router.post('/', authUser, store)
router.post('/upload/:_id', authUser, upload)
router.put('/:_id', authUser, update)
router.delete('/:_id', authUser, destroy)
router.delete('/', deleteAll)

module.exports = router