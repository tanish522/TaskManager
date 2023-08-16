const User = require("../models/User");

const insertUser = async (req, res) => {
    try {
        const newUser = User(req.body);
        const result = await newUser.save();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
};

const getUser = async (req, res) => {
    try {
        const result = await User.find();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    insertUser,
    getUser,
};
