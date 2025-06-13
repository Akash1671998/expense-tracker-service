require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/m_users", {
      dbName: "expense",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("🟢 Database connection successful.");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
