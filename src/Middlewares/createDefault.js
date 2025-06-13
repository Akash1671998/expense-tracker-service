const bcrypt = require("bcryptjs");
const UserModel = require("../Models/User");

const createDefaultAdmin = async () => {
  try {
    const adminExists = await UserModel.findOne({ role: "ROLE_ADMIN" });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("12345", 10);
      const adminUser = new UserModel({
        name: "Admin",
        email: "admin@gmail.com",
        role: "ROLE_ADMIN",
        password: hashedPassword,
      });

      await adminUser.save();
      console.log("🔐 System check: Admin user initialized.");
    } else {
      console.log("🔐 System check: Admin user exists.");
    }
  } catch (error) {
    console.error("⚠️ System initialization warning.");
  }
};

module.exports = createDefaultAdmin;
