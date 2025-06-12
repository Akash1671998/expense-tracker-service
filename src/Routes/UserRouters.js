const express = require("express");
const router = express.Router();
const {
  getAllUser,
  updateUser,
  deleteUser,
} = require("../Controllers/UserController");

router.get("/list", getAllUser);
router.post("/update", updateUser);
router.put("/delete/:userId", deleteUser);

module.exports = router;
