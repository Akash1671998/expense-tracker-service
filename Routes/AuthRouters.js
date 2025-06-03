const express = require("express");
const { signup, login, changePassword } = require("../Controllers/AuthController");
const { signupValidation } = require("../Middlewares/AuthValidation");
const router = express.Router();
router.post("/login",login);
router.post("/register",signupValidation, signup);
router.post("/changePassword", changePassword);
module.exports = router;
