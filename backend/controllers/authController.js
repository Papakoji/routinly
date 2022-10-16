const User = require("../models/userModel");
const asyncWrapper = require("../middleware/asyncWrapper");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CustomError = require("../errors/customError");

const authRegistration = asyncWrapper(async (req, res, next) => {
  req.body.password = await bcrypt.hash(req.body.password, 10);
  await User.create(req.body);
  res.status(200).json({
    success: true,
    data: "User was successfully registered",
  });
})

const authLogin = asyncWrapper(async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).lean();
  if (!user) {
    return next(new CustomError("Invalid Username/Password", 403));
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      {
        id: user._id,
        username: username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({
      success: true,
      message: "User successfully logged in",
      token,
    });
  } else {
    return next(new CustomError("Invalid Username/Password", 403));
  }
})

const authForgotPass = (req, res, next) => {
  res.json({
    msg: true
  })
}

module.exports = {authLogin, authRegistration, authForgotPass}