const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is a required field"],
    unique: true,
    trim: true,
  },
  firstname: {
    type: String,
    required: [true, "firstname is a required field"],
    trim: true,
  },
  secondname: {
    type: String,
    required: [true, "secondname is a required field"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "password is a required field"],
  },
  age: {
    type: Number,
    required: [true, "age is a required field"],
  },
  email: {
    type: String,
    required: [true, "email is a required field"],
    unique: true,
  },
  number: {
    type: Number,
    required: [true, "number is a required field"],
  },
});
// email
// phone number

module.exports = mongoose.model("User", UserSchema);