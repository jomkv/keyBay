const express = require('express')
const router = express.Router()
const {getHome, 
    getLogin, 
    getSignup, 
    getItem, 
    getLogout, 
    getCart, 
    postHome, 
    postSignup, 
    postLogin, 
    postCart,
    deleteItem} 
    = require('../controllers/controllers')

router.route('/').get(getHome).post(postHome, () => {
    console.log("here")
})

router.route('/cart').get(getCart)

router.route('/item/:id').get(getItem)

router.route('/item/:id/removeItem').post(deleteItem)

router.route('/item/:id/addToCart').post(postCart)

router.route('/logout').get(getLogout)

router.route('/login').get(getLogin).post(postLogin)

router.route('/signup').get(getSignup).post(postSignup)

module.exports = router