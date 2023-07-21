const asyncHandler = require("express-async-handler");
const Item = require("../models/itemModel");

// @desc Get ALL items
// @route GET /api/items
// @access Public
exports.getAllItems = asyncHandler(async(req, res) => {
    const items = await Item.find();
    
    res.status(200).json(items);
});

// @desc Add an item 
// @route POST /api/items
// @access Private
exports.addItem = asyncHandler(async (req, res) => {
    const { name, price, description } = req.body;

    // check for invalid inputs
    if(!name || !price || !description) {
        res.status(400);
        throw new Error("Incomplete Input");
    } else if (!isDigitsOnly(price)) {
        res.status(400);
        throw new Error("Invalid Input. Price must contain digits only");
    } else if(description.length > 300) {
        res.status(400);
        throw new Error("Invalid Input. Description too long");
    };
    
    // if fail to make new item, errorHandler middleware will go to work :D
    const newItem = await Item.create({
        name,
        price,
        description
    });

    res.status(201).json(newItem);
});

// @desc Update an item
// @route PUT /api/items/:id
// @access Private
exports.updateItem = (req, res) => {
    res.status(200).json({
        message: `updated item ${req.params.id}`
    });
};

// @desc Delete an item
// @route DELETE /api/items/:id
// @access Private
exports.deleteItem = (req, res) => {
    res.status(200).json({
        message: `deleted item ${req.params.id}`
    });
};

function isDigitsOnly(str) {
    for(let i = 0; i < str.length; i++) {
        let result = parseInt(str[i]);
        if(isNaN(result)) { return false; };
    }
    return true;
}