const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        itemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item',
            required: true
        }
    },
    { collection: 'cart'}
)

const Cart = new mongoose.model('Cart', cartSchema)

module.exports = Cart