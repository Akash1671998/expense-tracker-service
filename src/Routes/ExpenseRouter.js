    const express = require("express");
    const router = express.Router();

    const { fetchExpenses, addExpenses, updateExpenses, deleteExpenses, exportExpensesToCSV } = require("../Controllers/ExpenseController");

    router.get("/list", fetchExpenses);
    router.post("/create", addExpenses);
    router.put("/update/:expenseId", updateExpenses);
    router.delete("/delete/:expenseId", deleteExpenses);
    router.get("/csv/export",exportExpensesToCSV);

    module.exports = router;
