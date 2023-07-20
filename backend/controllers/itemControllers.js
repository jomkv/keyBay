const asyncHandler = require("express-async-handler");

// @desc Get ALL items
// @route GET /api/items
// @access Public
exports.getAllItems = (req, res) => {
    res.status(200).json({
        message: "get all items"
    });
};

// @desc Add an item 
// @route POST /api/items
// @access Private
exports.addItem = (req, res) => {
    res.status(201).json({
        message: "add item"
    });
};

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