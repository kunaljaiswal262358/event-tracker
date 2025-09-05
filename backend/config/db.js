const mongoose = require('mongoose')

const MONGO_URI = process.env.MONGO_URI;

const connectDB = () => {
    mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("Mongo db connected successfully.");
    })
    .catch(() => {
        console.log("Mongo db connection failed.");
    })
}

module.exports = connectDB;