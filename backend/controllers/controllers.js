const mongoose = require("mongoose");
const { mongoClient } = require("mongodb");
const {userSchema} = require("../db");
const itemSchema = require("../models/itemModel")

const getHome = async (req, res) => {
    let isLoggedIn = req.session.isLoggedIn || false;
    try {
        const Item = mongoose.model('Item', itemSchema)
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
    }

    res.render('signup.ejs', {errorMessage})
}

const getItem = (req, res) => {
    let isLoggedIn = req.session.isLoggedIn
    res.render('item.ejs', { isLoggedIn })
}

const getLogout = (req, res) => {
    console.log(`${req.session.username} Logged out`)
    req.session.isLoggedIn = false
    req.session.destroy();
    res.redirect('/')
}

const getCart = (req, res) => {
    if(!req.session.isLoggedIn) {
        let errorMessage;
        return res.render("login.ejs", {errorMessage})
    }

    res.render("cart.ejs")
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
    
    const Item = mongoose.model('Item', itemSchema)
    
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

    const User = mongoose.model('User', userSchema)

    try {
        const emailTaken = await User.findOne({email: data.email})

        if(emailTaken) // if email is taken
        {
            console.log("email is taken")
            return res.redirect('/signup?error=email_taken')
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
    const User = mongoose.model('User', userSchema)
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
    postLogin
}