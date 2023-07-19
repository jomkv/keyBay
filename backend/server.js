const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 3000;
const { errorHandler } = require("./middleware/errorMiddleware");
const { connectDB } = require("./config/db");

connectDB();

const app = express();

// ROUTES TODO

app.use(errorHandler);

app.listen(port, () => {
    console.log("Server now running!");
});