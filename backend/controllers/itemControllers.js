const Item = require("../models/itemModel")  
const Cart = require("../models/cartModel")

const getItem = async (req, res) => {
    let isLoggedIn = req.session.isLoggedIn
    const itemId = req.params.id

    try {
        // Get item info
        const itemObj = await Item.findOne({_id: itemId})

        let owner = false
        // Check if curr user is the owner 
        if(isLoggedIn)
        {
            if (itemObj.seller == req.session.username)
            {
                owner = true
            }
        }
        
        const itemData = {
            name: itemObj.name,
            description: itemObj.description,
            price: itemObj.price,
            seller: itemObj.seller
        }

        res.render('item.ejs', { isLoggedIn, itemData, itemId, owner })
    } catch {
        console.log("Error 500, problem getting item")
        res.status(500).send()
    }
}

const getCart = async (req, res) => {

    // If not logged in: redirect to login page
    let isLoggedIn = req.session.isLoggedIn || false;
    if(!req.session.isLoggedIn) {
        let errorMessage;
        return res.render("login.ejs", {errorMessage})
    }

    // If logged in, render cart menu with items in your cart
    try {
        // Get username of curr session
        const un = req.session.username

        // Get item's information (owner and itemID) that match the session's username
        const items = await Cart.find({username: un}).populate('itemId')

        res.render("cart.ejs", { isLoggedIn , items })
    }
    catch (err) {
        console.log("Error getting items for cart")
        res.status(500).send();
    }
}

// add item
const postHome = async (req, res) => {
    const username = req.session.username
    const data = {
        name: req.body.itemName,
        price: req.body.itemPrice,
        description: req.body.itemDesc,
        seller: username
    }
    
    try {
        await Item.insertMany([data])
        res.redirect("/")
    } catch(err) {
        console.log("Error 500")
        res.status(500).send()
    }
}

// add to cart
const postCart = async (req, res) => {
    const itemIdToAdd = req.params.id
    
    const data = {
        username: req.session.username,
        itemId: itemIdToAdd
    }

    try {
        await Cart.create(data)
        console.log("here")
        return res.redirect('/')
    } catch (err) {
        console.log(`Cant add ${data.itemId} to cart`)
        res.status(500).send()
    }
}

const deleteItem = async (req, res) => {
    const itemIdToRemove = req.params.id

    try {
        // result for removing item
        const result1 = await Item.findByIdAndRemove(itemIdToRemove)
        // result for removing item at the carts of users
        const result2 = await Cart.deleteMany({itemId: itemIdToRemove})

        if(result1) {
            console.log(`Item ${itemIdToRemove} removed successfuly`);
        } else {
            console.log('Item not found');
        }

        if(result2.deletedCount > 0) {
            console.log(`Items ${itemIdToRemove} removed from user's carts`)
        } else {
            console.log(`No items ${itemIdToRemove} were found in any cart`)
        }
    }
    catch (error) {
        console.log('Item not found')
    }

    return res.redirect('/')
}

const removeCartItem = async (req,res) => {
    const cartItemIdToRemove = req.params.id

    try {
        // result for removing cart item
        const result = await Cart.findByIdAndRemove(cartItemIdToRemove)

        if(result) {
            console.log(`Item ${cartItemIdToRemove} removed from cart successfuly`);
        } else {
            console.log('Item not found');
        }
    }
    catch (error) {
        console.log('Problem removing cart Item')
    }

    return res.redirect('/cart')
}

module.exports = { getItem, getCart, postHome, postCart, deleteItem, removeCartItem }