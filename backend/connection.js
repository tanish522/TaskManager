const mongoose = require("mongoose");

const uri =
    "mongodb+srv://tanish522:0502%40Tps@todolist.uxhq9.mongodb.net/?retryWrites=true&w=majority&appName=ToDoList";

const connect = async () => {
    try {
        mongoose.connect(uri);
        console.log("Database connected");
    } catch (error) {
        console.log(error);
    }
};
connect();
