// imports
const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 3000;
const { errorHandler } = require("./middleware/errorMiddleware");
const { connectDB } = require("./config/db");

connectDB();

// app
const app = express();

// middleware
app.use(express.urlencoded({extended: false})); // allow destructuring of req.body

// routes
app.use("/api/items", require("./routes/itemRoutes"));

// error handler middleware
app.use(errorHandler);

// run server
app.listen(port, () => {
    console.log("Server now running!");
});