const express = require('express')
const router = express.Router()

const multer = require("multer")
const upload = multer()

const { getHome, getSearch, getHomeSort } = require('../controllers/controllers')
const { getItem, getCart, postHome, postCart, deleteItem, removeCartItem, getCheckout, postCheckout, postCheckoutAll } = require("../controllers/itemControllers")
const { getLogin, getSignup, getLogout, getProfile, getMyItems, postRemoveMyItem, postSignup, postLogin } = require("../controllers/userControllers")

router.route('/').get(getHome).post(upload.single('image') ,postHome)
router.route('/search').get(getSearch)
router.route('/sort').get(getHomeSort)

// Session
router.route('/login').get(getLogin).post(postLogin)
router.route('/signup').get(getSignup).post(postSignup)
router.route('/logout').get(getLogout)

// User
router.route('/profile').get(getProfile)
router.route('/myItems').get(getMyItems)
router.route('/myItems/:id').post(postRemoveMyItem)

// Items
router.route('/item/:id').get(getItem)
router.route('/item/:id/removeItem').post(deleteItem)
router.route('/item/:id/addToCart').post(postCart)

// Checkout 
router.route('/checkout/:id').get(getCheckout).post(postCheckout)
router.route('/checkoutAll').post(postCheckoutAll)

// Cart
router.route('/cart').get(getCart)
router.route('/cart/:id/removeItem').post(removeCartItem)

module.exports = router