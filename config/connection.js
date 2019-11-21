const mongoose = require('mongoose')

// Map Global Promise
mongoose.Promise = global.Promise

// Disable DeprecationWarn
mongoose.set('useCreateIndex', true);

// Connect to Mongoose
mongoose.connect(`${process.env.MONGO_DB}`, { useNewUrlParser: true }).then(
    () => { console.log('Database is connected') },
    err => { console.log('Can not connect to the database' + err) }
);
