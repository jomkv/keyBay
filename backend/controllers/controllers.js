const mongoose = require("mongoose");
const { mongoClient } = require("mongodb");
const User = require("../models/userModel")
const Item = require("../models/itemModel")  
const Cart = require("../models/cartModel")

const getHome = async (req, res) => {
    let isLoggedIn = req.session.isLoggedIn || false;
    try {
        const items = await Item.find().exec();
        res.render('home.ejs', {isLoggedIn, items});
    } catch (error) {
        console.log("Error retrieving items", error);
        res.status(500).send
    }
}

const getLogin = (req, res) => {
    if(req.session.isLoggedIn) {
        return res.redirect('/')
    }

    let errorMessage;

    if(req.query.error === "invalid_email") {
        errorMessage = "Invalid Email"
    } else if(req.query.error === "invalid_pass") {
        errorMessage = "Wrong Password"
    }

    res.render('login.ejs', {errorMessage})
}

const getSignup = (req, res) => {
    if(req.session.isLoggedIn) {
        return res.redirect('/')
    }

    let errorMessage;

    if(req.query.error === 'email_taken') {
        errorMessage = "Email has already been taken"
    } else if (req.query.error === 'username_taken') {
        errorMessage = "Username has already been taken"
    }

    res.render('signup.ejs', {errorMessage})
}

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

const getLogout = (req, res) => {
    console.log(`${req.session.username} Logged out`)
    req.session.isLoggedIn = false
    req.session.destroy();
    res.redirect('/')
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


const postSignup = async (req, res) => {
    const data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }

    try {
        const emailTaken = await User.findOne({email: data.email})
        const usernameTaken = await User.findOne({username: data.username})

        if(emailTaken) // if email is taken
        {
            console.log("email is taken")
            return res.redirect('/signup?error=email_taken')
        }
        else if (usernameTaken) // if username is taken
        {
            console.log("username is taken")
            return res.redirect('/signup?error=username_taken')
        }
        else {
            console.log('signup successful')
            await User.insertMany([data])

            res.redirect('/login')
        }
    }
    catch (err) {
        console.log("Error 500")
        res.status(500).send()
    }
}

const postLogin = async (req, res) => {
    try {
        const checkEmail = await User.findOne({email: req.body.email})

        if(!checkEmail) // if invalid email 
        {
            res.redirect('/login?error=invalid_email')
        } 
        else if(checkEmail.password===req.body.password) // if login success
        {
            req.session.username = checkEmail.username
            console.log(req.session.username)
            req.session.isLoggedIn = true
            res.redirect("/")
        } else 
        {
            res.redirect('/login?error=invalid_pass')
        }
    }
    catch (err) {
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

module.exports = {
    getHome,
    getLogin,
    getSignup,
    getItem,
    getLogout,
    getCart,
    postHome,
    postSignup,
    postLogin,
    postCart,
    deleteItem,
    removeCartItem
}