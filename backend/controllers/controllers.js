const userSchema = require("../db")

const getHome = (req, res) => {
    let isLoggedIn = req.session.isLoggedIn || false;
    res.render('home.ejs', { isLoggedIn });
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

const postSignup = async (req, res) => {
    const data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }

    try {
        const emailTaken = await userSchema.findOne({email: data.email})

        if(emailTaken) // if email is taken
        {
            console.log("email is taken")
            return res.redirect('/signup?error=email_taken')
        }
        else {
            console.log('signup successful')
            await userSchema.insertMany([data])

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
        const checkEmail = await userSchema.findOne({email: req.body.email})

        if(!checkEmail) // if invalid email 
        {
            res.redirect('/login?error=invalid_email')
        } 
        else if(checkEmail.password===req.body.password) 
        {
            req.session.isLoggedIn = true;
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

const postMenu = async (req, res) => {

}

module.exports = {
    getHome,
    getLogin,
    getSignup,
    getItem,
    getLogout,
    getCart,
    postSignup,
    postLogin
}