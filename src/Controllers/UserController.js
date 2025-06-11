const express = require("express");
const UserModel = require("../Models/User");
const getAllUser = async (req, res) => {
    const loggedInUserId = req.user._id;
    const userRole = req.user.role;
    try {
      if (userRole === 'ROLE_ADMIN') {
        const users = await UserModel.find({
          _id: { $ne: loggedInUserId } // admin user id !== all user of _id
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
module.exports={
    getAllUser
}