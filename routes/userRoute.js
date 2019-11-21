const express = require('express')
const router = express.Router()
const authUser = require('../config/authentication')

const { index, show, profile ,store, auth, upload, upProfile, update, destroy } = require('../controllers/userController')

router.get('/', index)
router.get('/profile', authUser, profile)
router.get('/:_id', show)
router.post('/', store)
router.post('/login', auth)
router.post('/upload', authUser, upload)
router.put('/profile', authUser, upProfile)
router.put('/:_id', update)
router.delete('/:_id', destroy)

module.exports = router
