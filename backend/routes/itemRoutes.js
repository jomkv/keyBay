const router = require("express").Router();
const {
    getAllItems,
    addItem,
    updateItem,
    deleteItem
} = require("../controllers/itemControllers");

router.route("/").get(getAllItems).post(addItem);
router.route("/:id").put(updateItem).delete(deleteItem);

module.exports = router;