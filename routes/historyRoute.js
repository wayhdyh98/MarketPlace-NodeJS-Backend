const express = require("express")
const router = express.Router()
const authUser = require('../config/authentication')

const { index, store, deleteAll } = require('../controllers/historyController')

router.get('/', authUser, index)
router.post('/', authUser, store)
router.delete('/', deleteAll)

module.exports = router