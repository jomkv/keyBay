const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

exports.protect = asyncHandler(async (req, res) => {
    let token;

    // Token is located at header.authorization
    // Token format at the header.authorization is "Bearer <token>"

    if(req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            // if verification fails or verification denied this will throw an error
            const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User
                .findById(verifyToken.id)
                .select("-password"); // exclude password

            next();
        } catch (error) {
            console.log(error);

            res.status(401); // 401 = not authorized
            throw new Error("Token not authorized");
        };
    };
    
    if(!token) {
        res.status(400);
        throw new Error("Not authorized, no token")
    };
});