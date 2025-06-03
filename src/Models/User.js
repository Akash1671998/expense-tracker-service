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
    default: "user",
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
      createdBy:{
        type:String,
      },
      createAt: {
        type: Date,
        default: Date.now,
      }
     
    },
  ],
},
{ timestamps: true });

const UserModel = mongoose.model("m_user", UserSchema);
module.exports = UserModel;
