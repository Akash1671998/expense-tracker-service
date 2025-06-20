const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/User");

const signup = async (req, res) => {
  try {
    const { name, email, password,role } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User is already exist, you can login",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const token = jwt.sign({ email, name }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    const userModel = new UserModel({
      name,
      email,
      password: hashedPassword,
      token,
      role: role || "",
    });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    res.status(201).json({
      message: "Signup successfully",
      success: true,
    });
  } catch (error) {
    console.log("???????????/",error)
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    debugger
    const { email, password } = req.body;
     const user = await UserModel.findOne({
      $or: [{ email }, { name: email }],
    });
    const errorMsg = "Auth failed: email or password is wrong";
    if (!user) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    const token = jwt.sign(
      { email: user.email, _id: user._id,role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    debugger

    res.status(200).json({
      message: "Login successful",
      success: true,
      data: {
        token,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};


const changePassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const isOldPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordCorrect) {
      return res.status(403).json({ message: "Old password is incorrect", success: false });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({
      message: "Password changed successfully",
      success: true,
    });
  } catch (err) {
    console.error("Change password error:", err);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports = {
  signup,
  login,
  changePassword
};
