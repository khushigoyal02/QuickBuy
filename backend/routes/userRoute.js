const express = require("express");
const { registerUser, loginUser, fetchUser, displayUsers, deleteUser } = require("../controllers/userController");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route('/user-data/:userId').get(fetchUser);
router.route("/users").get(displayUsers);
router.delete("/deluser/:id", deleteUser);

module.exports = router;
