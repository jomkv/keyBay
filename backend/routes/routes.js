const express = require('express')
const router = express.Router()

const multer = require("multer")
const upload = multer()

const { getHome, getSearch } = require('../controllers/controllers')
const { getItem, getCart, postHome, postCart, deleteItem, removeCartItem } = require("../controllers/itemControllers")
const { getLogin, getSignup, getLogout, postSignup, postLogin } = require("../controllers/userControllers")

router.route('/').get(getHome).post(upload.single('image') ,postHome)
router.route('/search').get(getSearch)

router.route('/login').get(getLogin).post(postLogin)
router.route('/signup').get(getSignup).post(postSignup)
router.route('/logout').get(getLogout)

// Items
router.route('/item/:id').get(getItem)
router.route('/item/:id/removeItem').post(deleteItem)
router.route('/item/:id/addToCart').post(postCart)

// Cart
router.route('/cart').get(getCart)
router.route('/cart/:id/removeItem').post(removeCartItem)

module.exports = router