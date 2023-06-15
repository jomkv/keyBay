const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        price:{
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        seller:{
            type: String,
            required: true
        },
        image: {
            data: {
                type: Buffer,
                required: true
            },
            contentType: {
                type: String,
                required: true
            }
        }
    },
    { collection: "items" }
)

const Item = new mongoose.model('Item', itemSchema)

module.exports = Item