const Item = require("../models/itemModel")  
const User = require("../models/userModel")

// Updates the profiles of buyer & seller 
// During checkout
async function updateProfile(buyerUsername, itemId, shippingFee) {

    const item = await Item.findOne({_id: itemId})
    const buyer = await User.findOne({username: buyerUsername})
    const seller = await User.findOne({username: item.seller})
    
    // Updates for buyer
    const newTotalSpent = buyer.itemsBought.total + (item.price + shippingFee)
    const newBoughtCount = buyer.itemsBought.count + 1

    await User.updateOne({username: buyerUsername}, 
        { $set: 
            {'itemsBought.total': newTotalSpent, 
            'itemsBought.count': newBoughtCount}
        }
    )

    // Updates for seller
    const newTotalEarned = seller.itemsSold.total + item.price
    const newSoldCount = seller.itemsSold.count + 1

    await User.updateOne({username: item.seller}, 
        { $set: 
            {'itemsSold.total': newTotalEarned, 
            'itemsSold.count': newSoldCount}
        }
    )
}

// Applies shipping fee and updates buyer's total spent
// After checking out ALL
async function updateBuyerShipping(buyerUsername, shippingFee) {
    const buyer = await User.findOne({username: buyerUsername})

    // Updates for buyer
    const newTotalSpent = buyer.itemsBought.total + shippingFee

    await User.updateOne({username: buyerUsername}, 
        { $set: 
            {'itemsBought.total': newTotalSpent}
        }
    )
}

module.exports = { updateProfile, updateBuyerShipping }