const mongoose = require("mongoose")
const uri = process.env.URI

mongoose.connect(uri).then(() => {
console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    }, 
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

const itemSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    seller:{
        type: String,
        required: true
    }
})

const User = new mongoose.model('User', userSchema)
const Item = new mongoose.model('Item', itemSchema)

module.exports = User

