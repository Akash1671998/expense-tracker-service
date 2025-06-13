const express = require("express");
const UserModel = require("../Models/User");
const getAllUser = async (req, res) => {
  const loggedInUserId = req.user._id;
  const userRole = req.user.role;
  try {
    if (userRole === "ROLE_ADMIN") {
      const users = await UserModel.find({
        _id: { $ne: loggedInUserId },
      }).select("name email role _id");

      return res.status(200).json({
        message: "All users except the current admin fetched successfully",
        success: true,
        data: users,
      });
    } else {
      return res.status(403).json({
        message: "Access denied: Only admins can access user list",
        success: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error,
      success: false,
    });
  }
};

const updateUser = async (req, res) => {
  const userRole = req.user.role;

  if (userRole !== "ROLE_ADMIN") {
    return res.status(403).json({
      message: "Access denied: Only admins can update users",
      success: false,
    });
  }
  const { userId } = req.params;
  const { name, email, role } = req.body;
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { name, email, role },
      { new: true, runValidators: true }
    ).select("name email role _id");

    if (!updatedUser) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "User updated successfully",
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error,
      success: false,
    });
  }
};

const deleteUser = async (req, res) => {
  const userRole = req.user.role;
  const { userId } = req.params;
  try {
    const deletedUser = await UserModel.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "User deleted successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error,
      success: false,
    });
  }
};

module.exports = {
  getAllUser,
  updateUser,
  deleteUser,
};
