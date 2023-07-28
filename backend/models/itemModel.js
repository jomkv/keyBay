const mongoose = require("mongoose");

const itemSchema = mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User", // reference to user collection
            required: true
        },
        name:{
            type: String,
            required: [true, "Please enter name"]
        },
        price:{
            type: Number,
            required: [true, "Please enter price"]
        },
        description: {
            type: String,
            required: [true, "Please enter description"]
        }
        // TO ADD: SELLER (OBJECT ID REF)
    },
    { 
        timestamps: true 
    }
);

module.exports = mongoose.model('Item', itemSchema);