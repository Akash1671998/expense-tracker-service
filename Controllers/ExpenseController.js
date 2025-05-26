const express = require("express");
const UserModel = require("../Models/User");

const fetchExpenses = (req, res) => {
  res.send("Success");
};

const addExpenses = async (req, res) => {
  const body = req.body;
  const { _id } = req.user;
  try {
    const userData = await UserModel.findByIdAndUpdate(
      _id, // user Id
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

const deleteExpenses = (req, res) => {
  res.send("deleteExpenses");
};

module.exports = { fetchExpenses, addExpenses, updateExpenses, deleteExpenses };
