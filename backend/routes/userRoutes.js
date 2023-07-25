const router = require("express").Router();
const { protect } = require("../middleware/authMiddleware");
const { 
    registerUser,
} = require("../controllers/userController");

router.route("/").post(protect, registerUser);

module.exports = router;