require('dotenv').config();

const express = require('express')
const app = express()
const path = require('path')
const methodOverride = require("method-override")
const port = process.env.PORT || 4000
const {sessionMiddleware, initIsLoggedIn }= require('./backend/middleware/sessionMiddleware')

app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: false}))
app.use(sessionMiddleware)
app.use(initIsLoggedIn)
app.use('/', require('./backend/routes/routes'))
app.use(express.static(path.join(__dirname, 'public')))

app.listen(port, () => {
    console.log(`Server successfuly hosted at ${port}`)
})