const mongoose = require("mongoose")
const uri = process.env.URI

mongoose.connect(uri)

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

const User = new mongoose.model('User', userSchema)

module.exports = User

