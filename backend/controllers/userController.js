const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// @desc register user
// @route POST /api/users
// @access Public
exports.registerUser = asyncHandler(async(req, res) => {
    const { username, password, email } = req.body;

    if( !username || !password || !email ) {
        res.status(400);
        throw new Error("Incomplete input");
    };

    const emailTaken = await User.find({ email: email });
    if(emailTaken) {
        res.status(400);
        throw new Error("Email already taken");
    }

    // encrypt password
    const salt = await bcrypt.genSalt(10);
    const encryptedPass = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        username: username,
        email: email,
        password: encryptedPass
    });

    if(newUser) {
        res.status(201).json({
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            token: generateToken(newUser._id)
        });
    } else {
        res.status(400);
        throw new Error("Unable to register user");
    };
});

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    });
};