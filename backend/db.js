const mongoose = require("mongoose")
const userSchema = require("./models/userModel")
const itemSchema = require("./models/itemModel")
const uri = process.env.URI

mongoose.connect(uri).then(() => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});

const User = new mongoose.model('User', userSchema)
const Item = new mongoose.model('Item', itemSchema)

module.exports = {User}

