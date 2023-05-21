const express = require('express')
const router = express.Router()
const {getHome, getLogin, getSignup, getItem, getLogout, getCart, postHome, postSignup, postLogin} = require('../controllers/controllers')

router.route('/').get(getHome).post(postHome)

router.route('/cart').get(getCart)

router.route('/item').get(getItem)

router.route('/logout').get(getLogout)

router.route('/login').get(getLogin).post(postLogin)

router.route('/signup').get(getSignup).post(postSignup)

module.exports = router