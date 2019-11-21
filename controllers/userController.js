const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const multer = require('multer')
const path = require('path')

//Storage Engine
const storage = multer.diskStorage({
    destination: './upload/profile',
    filename: (req, file, res) => {
        res(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ 
    storage: storage,
    filefilter: (req, file, res) => { 
        checkFileType(file, res) 
    }
}).single('pImage')

function checkFileType(file, cb){
    const filetypes = /jpeg|jpg|png|gif/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)
    if (mimetype && extname) {
        return cb(null, true)
    } else {
        cb('Error: Images Only')
    }
}

function createHash(password) {
    return new Promise(async (resolve, reject) => {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        resolve(hash)
    }) 
}

function checkPassword(password, hashPassword) {
    return new Promise(async (resolve, reject) => {
        let check = await bcrypt.compare(password, hashPassword)
        resolve(check)
    })
}

function signJWT(Userdata) {
    return new Promise(async (resolve, reject) => {
        token = await jwt.sign({ data: Userdata }, `${process.env.JWT_SECRET}`, { expiresIn: '1d' })
        resolve(token)
    })
}

module.exports = {
    index: async (req, res) => {
        res.json(await User.find())
    },
    show: async (req, res) => {
        res.json(await User.findById(req.params._id))
    },
    profile: async (req, res) => {
        res.json(await User.findById(req.user._id))
    },
    store: async (req, res) => {
        let user = req.body
        user.password = await createHash(user.password)
        res.json(await User.create( user ))
    },
    auth: async (req, res) => {
        let user = req.body
        findUser = await User.findOne({ username: user.username })
        let checkPass = await checkPassword(user.password, findUser.password) ? true : false
        if (checkPass) {
            let token = await signJWT(findUser)
            res.json({ token, login: 'Success' })
        } else {
            res.json({ login: 'Failed' })
        }
    },
    upload: (req, res) => {
        upload(req, res, (err) => {
            if (err) { console.log(err) } 
            else {
                var url = req.protocol + '://' + req.get('host') + req.originalUrl + '/' + req.file.filename
                User.findOneAndUpdate(
                    { _id: req.user._id }, { $set: { photo: url } }
                    ).then(user => res.json(user)
                    ).catch(err => console.log(err))
            }
        })
    },
    upProfile: async (req, res) => {
        res.json(await User.findOneAndUpdate({ _id: req.user._id }, { $set: req.body }, { new: true }))
    },
    update: async (req, res) => {
        res.json(await User.findOneAndUpdate({ _id: req.params._id }, { $set: req.body }, { new: true }))
    },
    destroy: async (req, res) => {
        res.json(await User.findOneAndDelete({ _id: req.params._id }))
    }
}
