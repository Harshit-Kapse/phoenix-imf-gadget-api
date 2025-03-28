const express = require("express");
const router = express.Router();

const { registerUser, loginUser, logoutUser } = require("../controllers/authController");

router.post("/signup", registerUser)
    .post("/login", loginUser)
    .post("/logout", logoutUser);

module.exports = router;