require('dotenv').config();

const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_DB_URI;

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("connected to MongoDb successfully");
    }
    catch (err) {
        console.error("error", err)
    }
}

module.exports = connectToMongo;