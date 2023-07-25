require("dotenv").config();
const express = require("express");

const { errorHandler } = require("./middleware/errorMiddleware");
const { connectDB } = require("./config/db");

// app
const app = express();

connectDB();

// middleware
app.use(express.urlencoded({extended: false})); // allow destructuring of req.body

// routes
app.use("/api/items", require("./routes/itemRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// error handler middleware
app.use(errorHandler);

// run server
app.listen(process.env.PORT, () => {
    console.log("Server now running!");
});