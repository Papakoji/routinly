const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  id: {
    type: mongoose.ObjectId,
    trim: true,
    required: [true, "Id is required"],
  },
  username: {
    type: String,
    required: [true, "username is a required field"],
    unique: true,
    trim: true,
  },
  Tasks: [
    {
      type: String,
      required: [true, "This routine field is requires the name property"],
      trim: true,
      minlength: [1, "Length should be greater than 1"],
    },
  ],
  TaskTime: {
    type: Date,
    required: [true, "This time field is mandatory"],
  },
});

module.exports = taskSchema;
