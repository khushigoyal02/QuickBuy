const express = require("express");
const { registerUser, loginUser, fetchUser, displayUsers, deleteUser, editUser } = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", displayUsers);
router.route("/user/:userId").get(fetchUser).delete(deleteUser).put(editUser);

module.exports = router;
