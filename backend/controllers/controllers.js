const Item = require("../models/itemModel")  

const getHome = async (req, res) => {
    let isLoggedIn = req.session.isLoggedIn || false;
    const query = ""
    let bought = false

    if(req.query.bought === "yes") {
        bought = true
    }

    try {
        const items = await Item.find().exec();
        res.render('home.ejs', {isLoggedIn, items, query, bought});
    } catch (error) {
        console.log("Error retrieving items", error);
        res.status(500).send
    }
}

const getSearch = async (req, res) => {
    let isLoggedIn = req.session.isLoggedIn || false;
    const query = req.query.query
    const bought = false
    try {
        const items = await Item.find( {name: { $regex: query,  $options: 'i'}}).exec()

        res.render('home.ejs', {isLoggedIn, items, query, bought})
    } catch(error) {
        console.log("Error searching for item")
        res.status(500).send
    }
}

const getHomeSort = async (req, res) => {
    let isLoggedIn = req.session.isLoggedIn || false;
    const query = ""
    const bought = false
    try {
        const items = await Item.find().sort({price: 'asc'}).exec()

        res.render('home.ejs', {isLoggedIn, items, query, bought})
    } catch(error) {
        console.log("Error searching for item")
        res.status(500).send
    }
}

module.exports = { getHome, getSearch, getHomeSort }