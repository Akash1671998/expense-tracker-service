const express = require("express");
const router = express.Router();
const {
  getAllUser,
  updateUser,
  deleteUser,
} = require("../Controllers/UserController");

router.get("/list", getAllUser);
router.post("/update/:userId", updateUser);
router.delete("/delete/:userId", deleteUser);

module.exports = router;
