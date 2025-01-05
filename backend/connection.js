const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.MONGODB_URI;

const connect = async () => {
    try {
        mongoose.connect(uri);
        console.log("Database connected");
    } catch (error) {
        console.log(error);
    }
};
connect();
