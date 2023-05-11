const express = require('express')
const router = express.Router()
const {getHome, getLogin, getSignup, postSignup, postLogin} = require('../controllers/controllers')

router.get('/',getHome)

router.route('/login').get(getLogin).post(postLogin)

router.route('/signup').get(getSignup).post(postSignup)

module.exports = router