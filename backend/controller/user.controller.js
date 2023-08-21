const User = require("../models/User");
const generateToken = require("../utils/generateToken,js");

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

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordMatch = await user.matchPassword(password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }
        // Passwords match, login successful
        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                userName: user.userName,
                email: user.email,
                token: generateToken(user._id),
            },
        });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Login failed: " + error.message });
    }
};

const signup = async (req, res) => {
    try {
        const { userName, email, password } = req.body; // Assuming you're sending data in the request body

        // Check if user with the given email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        // Hash the password before saving it
        // const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            userName,
            email,
            password,
        });

        // Save the user to the database
        await newUser.save();

        // Send a success response
        return res.status(201).json({
            message: "Signup successful",
        });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Signup failed: " + error.message });
    }
};

module.exports = {
    insertUser,
    getUser,
    login,
    signup,
};
