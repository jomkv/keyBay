const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { generateToken } = require("../helpers/userHelpers");

// @desc register user
// @route POST /api/users
// @access Public
exports.registerUser = asyncHandler(async(req, res) => {
    const { username, password, email } = req.body;

    if( !username || !password || !email ) {
        res.status(400);
        throw new Error("Incomplete input");
    };

    // TODO: Add verification for email

    const emailTaken = await User.findOne({ email: email });
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

// @desc login user
// @route POST /api/users/login
// @access Public
exports.loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if( !email || !password ) {
        res.status(400);
        throw new Error("Incomplete input");
    };

    const user = await User.findOne({email: email});

    // validate input
    if(user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            id: user._id,
            username: user.username, 
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error("Wrong email and/or password");
    }
});