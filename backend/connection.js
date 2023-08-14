const mongoose = require("mongoose");

const uri =
    "mongodb+srv://tanish522:0502%40Tps@todolist.64fy7ry.mongodb.net/?retryWrites=true&w=majority";

const connect = async () => {
    try {
        mongoose.connect(uri);
        console.log("Database connected");
    } catch (error) {
        console.log(error);
    }
};
connect();
