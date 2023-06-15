const express = require('express')
const router = express.Router()

const multer = require("multer")
const upload = multer()

const { getHome } = require('../controllers/controllers')
const { getItem, getCart, postHome, postCart, deleteItem, removeCartItem } = require("../controllers/itemControllers")
const { getLogin, getSignup, getLogout, postSignup, postLogin } = require("../controllers/userControllers")

router.route('/').get(getHome).post(upload.single('image') ,postHome)

router.route('/cart').get(getCart)

router.route('/cart/:id/removeItem').post(removeCartItem)

router.route('/item/:id').get(getItem)

router.route('/item/:id/removeItem').post(deleteItem)

router.route('/item/:id/addToCart').post(postCart)

router.route('/logout').get(getLogout)

router.route('/login').get(getLogin).post(postLogin)

router.route('/signup').get(getSignup).post(postSignup)

module.exports = router