const User = require("../models/userModel")
const Item = require("../models/itemModel")
const Cart = require("../models/cartModel")

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

const getLogout = async (req, res) => {
    console.log(`${req.session.username} Logged out`)
    req.session.isLoggedIn = false
    await req.session.destroy();
    res.redirect('/')
}

const getProfile = async (req, res) => {
    try {
        if(!req.session.isLoggedIn)
        {
            return res.redirect('/')
        }

        const user = await User.findOne({username: req.session.username})
        const query = ""

        res.render('profile.ejs', {user, query})
    } catch (error) {
        console.log("Problem fetching profile")
        res.status(500).send()
    }
}

const getMyItems = async (req, res) => {
    if(!req.session.isLoggedIn) {
        return res.redirect("/login")
    }

    try {
        const myItems = await Item.find({seller: req.session.username})
        const query = ""

        res.render("myItems.ejs", { myItems, query })
    } catch (error) {
        console.log("Problem getting user's item menu")
        res.status(500).send()
    }
}

const postRemoveMyItem = async (req, res) => {
    const itemIdToRemove = req.params.id

    try {
        // result for removing item
        const result1 = await Item.findByIdAndRemove(itemIdToRemove)
        // result for removing item at the carts of users
        const result2 = await Cart.deleteMany({itemId: itemIdToRemove})

        if(result1) {
            console.log(`Item ${itemIdToRemove} removed from myItem successfuly`);
        } else {
            console.log('Item not found');
        }

        if(result2.deletedCount > 0) {
            console.log(`Items ${itemIdToRemove} removed from user's carts`)
        } else {
            console.log(`No items ${itemIdToRemove} were found in any cart`)
        }
        
        return res.redirect('/myItems')
    }
    catch (error) {
        console.log('Item not found')
        res.status(500).send()
    }
}

const postSignup = async (req, res) => {
    const data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        itemsBought: {
            total: 0,
            count: 0
        },
        itemsSold: {
            total: 0,
            count: 0
        }
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

module.exports = { getLogin, getSignup, getLogout, getProfile, getMyItems, postRemoveMyItem, postSignup, postLogin }