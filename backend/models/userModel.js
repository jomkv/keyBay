const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
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
        },
        itemsBought:{
            total:{
                type: Number,
                required: true
            },
            count:{
                type: Number,
                required: true
            }
        },
        itemsSold:{
            total:{
                type: Number,
                required: true
            },
            count:{
                type: Number,
                required: true
            }
        }
    },
    {collection: "users"}
)

const User = new mongoose.model('User', userSchema)

module.exports = User