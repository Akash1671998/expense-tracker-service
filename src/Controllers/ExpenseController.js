const express = require("express");
const UserModel = require("../Models/User");
const sendEmail = require("../Email");

const { Parser } = require("json2csv");
const fs = require("fs");
const path = require("path");

const fetchExpenses = async (req, res) => {
  const body = req.body;
  const { text, amount, fromDate, toDate } = req.query;
  const LogUser = req.user._id;
  try {
    const userData = await UserModel.findById(LogUser).select("expense");
    if (!userData) {
      return res.status(500).json({
        message: "User not found",
        success: false,
      });
    }
    let filteredExpenses = userData.expense;
    if (text) {
      const regex = new RegExp(text, "i");
      filteredExpenses = filteredExpenses.filter((exp) => regex.test(exp.text));
    }

    if (amount) {
      filteredExpenses = filteredExpenses.filter((exp) => exp.amount == amount);
    }
    if (fromDate && toDate) {
      const start = new Date(fromDate);
      const end = new Date(toDate);
      end.setHours(23, 59, 59, 999);

      filteredExpenses = filteredExpenses.filter((exp) => {
        const createdAt = new Date(exp.createAt);
        return createdAt >= start && createdAt <= end;
      });
    }
    if (filteredExpenses.length === 0) {
      return res.status(200).json({
        message: "No Expenses Found",
        success: false,
        data: [],
      });
    }
    return res.status(200).json({
      message: "Get All Expenses Successfully",
      success: true,
      data: filteredExpenses,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something Went wrong",
      error: error,
      success: false,
    });
  }
};
const addExpenses = async (req, res) => {
  const body = req.body;
  const LogUser = req.user._id;
  const LogEmail = req.user.email;
  const LogUserName = req.user.email;

  try {
    const newExpense = {
      ...body,
      createdBy: LogUserName,
    };

    const userData = await UserModel.findByIdAndUpdate(
      LogUser,
      {
        $push: { expense: newExpense },
      },
      { new: true }
    );
    res.status(200).json({
      message: "Expense Add Successfully",
      success: true,
      data: userData?.expense,
    });
    sendEmail(
      LogEmail,
      "New Expense Added",
      `You have successfully added a new expense to your account:\n\nAmount: ₹${body.amount}\nDescription: ${body.text}\nExpense Add By: ${LogUserName}`
    ).catch((err) => console.error("Email send failed", err));
  } catch (error) {
    res.status(500).json({
      message: "Something Went wrong",
      error: error,
      success: false,
    });
  }
};

const updateExpenses = (req, res) => {
  res.send("updateExpenses");
};

const deleteExpenses = async (req, res) => {
  const body = req.body;
  const { _id } = req.user;
  const { expenseId } = req.params;
  try {
    const userData = await UserModel.findByIdAndUpdate(
      _id,
      {
        $pull: { expense: { _id: expenseId } },
      },
      { new: true }
    );
    return res.status(200).json({
      message: "Expense Delete Successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something Went wrong",
      error: error,
      success: false,
    });
  }
};

// CSV File Download

const exportExpensesToCSV = async (req, res) => {
  const { text, amount, fromDate, toDate } = req.query;
  const LogUser = req.user._id;

  try {
    const userData = await UserModel.findById(LogUser).select("expense");
    if (!userData) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    let filteredExpenses = userData.expense;

    if (text) {
      const regex = new RegExp(text, "i");
      filteredExpenses = filteredExpenses.filter((exp) => regex.test(exp.text));
    }

    if (amount) {
      filteredExpenses = filteredExpenses.filter((exp) => exp.amount == amount);
    }

    if (fromDate && toDate) {
      const start = new Date(fromDate);
      const end = new Date(toDate);
      end.setHours(23, 59, 59, 999);
      filteredExpenses = filteredExpenses.filter((exp) => {
        const createdAt = new Date(exp.createAt);
        return createdAt >= start && createdAt <= end;
      });
    }

    if (filteredExpenses.length === 0) {
      return res.status(200).json({
        message: "No expenses found to export",
        success: false,
      });
    }

    // Fields you want in CSV
    const fields = ["_id", "text", "amount", "createAt", "createdBy"];
    const opts = { fields };
    const parser = new Parser(opts);
    const csv = parser.parse(filteredExpenses);

    res.header("Content-Type", "text/csv");
    res.attachment("expenses.csv");
    return res.send(csv);
  } catch (error) {
    return res.status(500).json({
      message: `Something went wrong while exporting CSV${error}`,
      error: error,
      success: false,
    });
  }
};

module.exports = {
  fetchExpenses,
  addExpenses,
  updateExpenses,
  deleteExpenses,
  exportExpensesToCSV,
};
