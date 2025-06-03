const express = require("express");
const UserModel = require("../Models/User");

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
  console.log("LogUser", LogUser);
  try {
    const userData = await UserModel.findByIdAndUpdate(
      LogUser,
      {
        $push: { expense: body },
      },
      { new: true }
    );
    return res.status(200).json({
      message: "Expense Add Successfully",
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
