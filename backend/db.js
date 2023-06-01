const mongoose = require("mongoose")
const uri = process.env.URI

const connectDB = () => {
    try {
        mongoose.connect(uri)
        console.log("Connected to Database");
    } 
    catch(err) {
        console.log("Not Connected to Database ERROR! ", err);
    }
}

module.exports = connectDB

