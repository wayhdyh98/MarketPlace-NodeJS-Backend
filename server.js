const cors = require('cors')
const express = require('express')
const app = express()
const path = require('path')

//Environtment Variables
require('dotenv').config()

//Connect to Database
require('./config/connection')

//CORS Middleware
app.use(cors())

//Express Middleware
app.use(express.json())

//Static Folder
app.use('/api/users/upload', express.static(path.join(__dirname, '/upload/profile')))
app.use('/api/products/upload', express.static(path.join(__dirname, '/upload/product')))
app.use('/api/products/upload/:id', express.static(path.join(__dirname, '/upload/product')))

//Index Route
app.get('/', (req, res) => {
	res.send('Please use /api/users or /api/products or /api/carts');
});

app.use('/api/users', require('./routes/userRoute'))
app.use('/api/products', require('./routes/productRoute'))
app.use('/api/comments', require('./routes/commentRoute'))
app.use('/api/carts', require('./routes/cartRoute'))
app.use('/api/histories', require('./routes/historyRoute'))


const port = process.env.PORT || 1998

//Start Server
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})