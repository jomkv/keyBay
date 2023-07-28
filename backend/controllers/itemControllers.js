const asyncHandler = require("express-async-handler");
const Item = require("../models/itemModel");
const { validateInput } = require("../helpers/itemHelpers");

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

    // validate input
    const errorMessage = validateInput(name, price, description);
    if(errorMessage) {
        res.status(400);
        throw new Error(errorMessage);
    };
    
    // if fail to make new item, errorHandler middleware will go to work :D
    const newItem = await Item.create({
        owner: req.user._id,
        name: name,
        price: price,
        description: description
    });

    res.status(201).json(newItem);
});

// @desc Update an item
// @route PUT /api/items/:id
// @access Private
exports.updateItem = asyncHandler(async (req, res) => {
    const { name, price, description } = req.body;
    const item = await Item.findById(req.params.id);
    
    // validate id
    if(!item) {
        res.status(400);
        throw new Error("Item not found");
    };
    
    // validate input
    const errorMessage = validateInput(name, price, description);
    if(errorMessage) {
        res.status(400);
        throw new Error(errorMessage);
    };

    // update item
    const updatedItem = await Item.findByIdAndUpdate(
        item._id,
        { name: name, price: price, description: description },
        { new: true } // ensure that this will return updated version
    );

    res.status(200).json(updatedItem);
});

// @desc Delete an item
// @route DELETE /api/items/:id
// @access Private
exports.deleteItem = asyncHandler(async (req, res) => {
    const item = await Item.findById(req.params.id);

    // validate id
    if(!item) {
        res.status(400);
        throw new Error("Item not found");
    };

    await Item.deleteOne({ _id: req.params.id });
    res.status(200).json({ id: req.params.id });
});