const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
});

// creating user model
const User = new mongoose.model("User", userSchema);
module.exports = User;
