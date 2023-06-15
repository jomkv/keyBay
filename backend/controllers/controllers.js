const Item = require("../models/itemModel")  

const getHome = async (req, res) => {
    let isLoggedIn = req.session.isLoggedIn || false;
    try {
        const items = await Item.find().exec();
        res.render('home.ejs', {isLoggedIn, items});
    } catch (error) {
        console.log("Error retrieving items", error);
        res.status(500).send
    }
}

module.exports = {
    getHome
}