const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is a required field"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "password is a required field"],
  },
  age: {
    type: Number,
    required: [true, "age is a required field"]
  },
  gender: {
    type: String,
    required: [true, "gender is a required field"]
  }
});

module.exports = mongoose.model("User", UserSchema);