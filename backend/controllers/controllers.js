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
        const itemObj = await Item.findOne({_id: itemId})
        const itemData = {
            name: itemObj.name,
            description: itemObj.description,
            price: itemObj.price,
            seller: itemObj.seller
        }

        res.render('item.ejs', { isLoggedIn, itemData, itemId })
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

const getCart = (req, res) => {
    let isLoggedIn = req.session.isLoggedIn || false;
    if(!req.session.isLoggedIn) {
        let errorMessage;
        return res.render("login.ejs", {errorMessage})
    }

    res.render("cart.ejs", { isLoggedIn })
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

    Item.findByIdAndRemove(itemIdToRemove)
        .then((removedItem) => {
            if(removedItem) {
                console.log(`Item ${itemIdToRemove} removed successfuly`);
            } else {
                console.log('Item not found');
            }
            return res.redirect('/')
        }) 
        .catch((error) => {
            console.log('Item not found')
        })
}

// const postMenu = async (req, res) => {

// }

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
    deleteItem
}