const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const taskSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    status: {
        type: String,
        enum: ["pending", "in-progress", "completed"],
        default: "pending",
        require: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

// creating user model
const Task = new mongoose.model("Task", taskSchema);
module.exports = Task;
