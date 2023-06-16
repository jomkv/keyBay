const Item = require("../models/itemModel")  

const getHome = async (req, res) => {
    let isLoggedIn = req.session.isLoggedIn || false;
    const query = ""
    try {
        const items = await Item.find().exec();
        res.render('home.ejs', {isLoggedIn, items, query});
    } catch (error) {
        console.log("Error retrieving items", error);
        res.status(500).send
    }
}

const getSearch = async (req, res) => {
    let isLoggedIn = req.session.isLoggedIn || false;
    const query = req.query.query
    try {
        const items = await Item.find( {name: { $regex: query,  $options: 'i'}}).exec()

        res.render('home.ejs', {isLoggedIn, items, query})
    } catch(error) {
        console.log("Error searching for item")
        res.status(500).send
    }
}

module.exports = { getHome, getSearch }