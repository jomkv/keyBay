const express = require('express')
const app = express()
require('dotenv').config();
const path = require('path')
const port = process.env.PORT 


app.use(express.urlencoded({extended: false}))

app.use('/', require('./backend/routes/routes'))

app.use(express.static(path.join(__dirname, 'public')))

app.listen(port)