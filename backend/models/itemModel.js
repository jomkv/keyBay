const mongoose = require("mongoose");

const itemSchema = mongoose.Schema(
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
        }
        // TO ADD: SELLER (OBJECT ID REF)
    },
    { 
        timestamps: true 
    }
);

module.exports = mongoose.model('Item', itemSchema);