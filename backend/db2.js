// const mongoose = require("mongoose")
// const uri = process.env.URI

// const connectDB = async (req, res) => {
//     try {
//         mongoose.connect(uri)
//         console.log("Data base connected")
//     } catch {
//         res.status(500).send()
//         console.log("Data base not connected")
//     }
// }

// const userSchema = new mongoose.Schema({
//     username:{
//         type: String,
//         required: true
//     }, 
//     email:{
//         type: String,
//         required: true
//     },
//     password:{
//         type: String,
//         required: true
//     }
// })

// const User = new mongoose.model('User', userSchema)

// module.exports = { connectDB, User }

