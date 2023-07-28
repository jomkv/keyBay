const router = require("express").Router();
const { protect } = require("../middleware/authMiddleware");
const { 
    registerUser,
    loginUser
} = require("../controllers/userController");

router.route("/").post(registerUser);
router.route("/login").post(loginUser);

module.exports = router;