const Item = require("../models/itemModel")  
const Cart = require("../models/cartModel")
const User = require("../models/userModel")
const multer = require("multer")
const { updateProfile, updateBuyerShipping } = require("../helpers/updateProfiles")
const { isImgValid, cropImage } = require("../helpers/imageHelpers")
const query = ""

const getItem = async (req, res) => {
    let isLoggedIn = req.session.isLoggedIn
    const itemId = req.params.id

    try {
        // Get item info
        const itemData = await Item.findOne({_id: itemId})

        let owner = false
        // Check if curr user is the owner 
        if(isLoggedIn)
        {
            if (itemData.seller == req.session.username)
            {
                owner = true
            }
        }

        const cartResult = await Cart.findOne({username: req.session.username, itemId: itemId})

        let inCart = cartResult ? true : false

        res.render('item.ejs', { isLoggedIn, itemData, itemId, owner, query, inCart })
    } catch {
        console.log("Error 500, problem getting item")
        res.status(500).send()
    }
}

const getCart = async (req, res) => {
    let isLoggedIn = req.session.isLoggedIn || false;

    // If not logged in: redirect to login page
    if(!req.session.isLoggedIn) {
        let errorMessage;
        return res.render("login.ejs", {errorMessage})
    }

    // If logged in
    try {
        const un = req.session.username

        // Get item's information (owner and itemID) that match the session's username
        const items = await Cart.find({username: un}).populate('itemId')
        let total = 0
        items.forEach((item) => {
            total += item.itemId.price
        })

        res.render("cart.ejs", { isLoggedIn , items, query, total })
    }
    catch (err) {
        console.log("Error getting items for cart")
        res.status(500).send();
    }
}

// add item
const postHome = async (req, res) => {
    try {
        const username = req.session.username
        let originalname, buffer, mimetype;
        if(req.file) {
            // Check if image meets minimum requirements
            if(await isImgValid(req.file, 500, 500)){
                // Crop image to square (500, 500)
                const croppedBuffer = await cropImage(req.file.buffer)

                originalname = req.file.originalname
                buffer = croppedBuffer
                mimetype = req.file.mimetype
            }
            else 
            {
                console.log("Image does not meet minimum resolution requirements")
                return res.redirect('/')
            }

            const newItem = new Item({
                name: req.body.itemName,
                price: req.body.itemPrice,
                description: req.body.itemDesc,
                seller: username,
                image: {
                    data: buffer,
                    contentType: mimetype
                }
            })
            await newItem.save()
            console.log("Item successfuly added")
            res.redirect("/")
        } else {
            console.log("No image detected")
            return res.redirect('/')
        }
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

        // redirect to current item
        return res.redirect(`/item/${itemIdToAdd}`)
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
        res.status(500).send()
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
        res.status(500).send()
    }

    return res.redirect('/cart')
}

const getCheckout = async (req, res) => {
    if(!req.session.isLoggedIn) 
    {
        return res.redirect('/')
    }
    
    try {
        const itemId = req.params.id
        const isLoggedIn = req.session.isLoggedIn
        const item = await Item.findOne({_id: itemId})

        res.render('checkout.ejs', { isLoggedIn, item, itemId, query} )
    } 
    catch (error) {
        console.log('Problem getting checking out')
        res.status(500).send()
    }
}

const postCheckout = async (req, res) => {
    try {
        const username = req.session.username
        const itemId = req.params.id
        const shippingFee = parseInt(req.body.region, 10)

        await updateProfile(username, itemId, shippingFee)

        // Remove item from listing and carts
        await Item.findByIdAndRemove(itemId)
        await Cart.deleteMany({itemId: itemId})

        res.redirect('/')
    } 
    catch (error) {
        console.log('Problem checking out')
        res.status(500).send()
    }
}

const postCheckoutAll = async (req, res) => {
    try {
        const username = req.session.username
        const shippingFee = parseInt(req.body.region, 10)
        const itemsToCheckout = await Cart.find({username: username}).populate('itemId')

        // checkout items one by one, shipping not applied yet
        for(item of itemsToCheckout) {
            await updateProfile(username, item.itemId._id, 0)
            await Item.findByIdAndRemove(item.itemId._id)
            await Cart.deleteMany({itemId: item.itemId})
        }

        // apply shipping fee for buyer
        await updateBuyerShipping(username, shippingFee)

        res.redirect("/")
    } catch (error) {
        console.log("Problem checking out ALL")
        res.status(500).send()
    }
}

module.exports = { getItem, getCart, postHome, postCart, deleteItem, removeCartItem, getCheckout, postCheckout, postCheckoutAll }