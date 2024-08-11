const mongoDbURL = 'mongodb://localhost:27017/ecommerce'
const mongoose = require('mongoose')

const connectDb = () => {
    return mongoose.connect(mongoDbURL);
}

module.exports = {connectDb};
