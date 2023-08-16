const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const taskSchema = mongoose.Schema({
    taskName: {
        type: String,
        require: true,
    },
    user: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

// creating user model
const Task = new mongoose.model("Task", taskSchema);
module.exports = Task;
