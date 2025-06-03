const express = require("express");
const UserModel = require("../Models/User");
const sendEmail = require("../Email");

const fetchExpenses = async (req, res) => {
  const body = req.body;
  const LogUser = req.user._id;
  try {
    const userData = await UserModel.findById(LogUser).select("expense");
    return res.status(200).json({
      message: "Get All Expenses Successfully",
      success: true,
      data: userData?.expense,
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

module.exports = { fetchExpenses, addExpenses, updateExpenses, deleteExpenses };
