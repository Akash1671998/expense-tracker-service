const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  role: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  expense: [
    {
      text: {
        type: String,
        require: true,
      },
      amount: {
        type: Number,
        require: true,
      },
      createAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const UserModel = mongoose.model("m_user", UserSchema);
module.exports = UserModel;
