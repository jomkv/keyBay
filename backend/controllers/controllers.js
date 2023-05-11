const userSchema = require("../db")

const getHome = (req, res) => {
    res.redirect('/login')
}

const getLogin = (req, res) => {
    let errorMessage;

    if(req.query.error === "invalid_email") {
        errorMessage = "Invalid Email"
    } else if(req.query.error === "invalid_pass") {
        errorMessage = "Wrong Password"
    }

    res.render('login.ejs', {errorMessage})
}

const getSignup = (req, res) => {
    let errorMessage;

    if(req.query.error === 'email_taken') {
        errorMessage = "Email has already been taken"
    }

    res.render('signup.ejs', {errorMessage})
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
            res.render("index.ejs")
        } else 
        {
            res.redirect('/login?error=invalid_pass')
        }
    }
    catch {
        // invalid email and/or password
    }
}

module.exports = {
    getHome,
    getLogin,
    getSignup,
    postSignup,
    postLogin
}