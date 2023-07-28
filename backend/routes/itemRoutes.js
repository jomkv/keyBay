const router = require("express").Router();
const {
    getAllItems,
    addItem,
    updateItem,
    deleteItem
} = require("../controllers/itemControllers");
const { protect } = require("../middleware/authMiddleware")

router.route("/").get(getAllItems).post(protect, addItem);
router.route("/:id").put(protect, updateItem).delete(protect, deleteItem);

module.exports = router;