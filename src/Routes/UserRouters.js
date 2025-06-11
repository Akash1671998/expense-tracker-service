const express = require("express");
const router = express.Router();

//const { fetchExpenses, addExpenses, updateExpenses, deleteExpenses, exportExpensesToCSV } = require("../Controllers/ExpenseController");
const { getAllUser } = require("../Controllers/UserController");

router.get("/list", getAllUser);
// router.post("/create", addExpenses);
// router.put("/update/:expenseId", updateExpenses);
// router.delete("/delete/:expenseId", deleteExpenses);
// router.get("/csv/export",exportExpensesToCSV);

module.exports = router;