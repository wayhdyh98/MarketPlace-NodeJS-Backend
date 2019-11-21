const Product = require('../models/product')
const multer = require('multer')
const path = require('path')

//Storage Engine
const storage = multer.diskStorage({
    destination: './upload/product',
    filename: (req, file, res) => {
        res(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ 
    storage: storage,
    filefilter: (req, file, res) => { 
        checkFileType(file, res) 
    }
}).single('productIMG')

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

module.exports = {
    index: async (req, res) => {
        res.json(await Product.find({ stock: { $gt: 0 } }).populate('seller'))
    },
    show: async (req, res) => {
        res.json(await Product.findById(req.params._id).populate('seller'))
    },
    display: async (req, res) => {
        res.json(await Product.find({ seller: req.params._id}).populate('seller'))
    },
    store: async (req, res) => {
        let product = req.body
        product.seller = req.user._id
        res.json(await Product.create(product))
    },
    upload: (req, res) => {
        upload(req, res, (err) => {
            if (err) { console.log(err) }
            else {
                var url = req.protocol + '://' + req.get('host') + req.originalUrl + '/' + req.file.filename
                Product.findOneAndUpdate(
                    { _id: req.params._id }, { $set: { photo: url } }
                ).then(user => res.json(user)
                ).catch(err => console.log(err))
            }
        })
    },
    update: async (req, res) => {
        res.json(await Product.findOneAndUpdate({ _id: req.params._id }, { $set: req.body }, { new: true }))
    },
    destroy: async (req, res) => {
        res.json(await Product.findOneAndDelete({ _id: req.params._id }))
    },
    deleteAll: async (req, res) => {
        res.json(await Product.remove())
    }
}