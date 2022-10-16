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

const authForgotPass = async (req, res, next) => {
  const { email } = req.body;
  try {
    const oldUser = await User.findOne({
      email,
    });
    if (!oldUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const secret = process.env.JWT_SECRET + oldUser.password;
    const token = jwt.sign(
      {
        email: oldUser.email,
        id: oldUser._id,
      },
      secret,
      {
        expiresIn: "5m",
      }
    );
    const link = `http://localhost:3000/api/v1/auth/reset-pass/${oldUser._id}/${token}`;
    console.log(link);
  } catch (error) {}
};

const authResetPass = async (req, res, next) => {
  console.log(req.method);
  if (req.method === "GET") {
    const { id, token } = req.params;
    const oldUser = await User.findOne({
      _id: id,
    });
    if (!oldUser) {
      return res.json({
        success: false,
        message: "User does not exist",
      });
    }
    const secret = process.env.JWT_SECRET + oldUser.password;
    try {
      const verify = jwt.verify(token, secret);
      res.render("index", {
        email: verify.email,
        verified: "",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "User is not verified",
      });
    }
  } else {
    const { id, token } = req.params;
    const { password } = req.body;
    console.log(password);
    const oldUser = await User.findOne({
      _id: id,
    });

    if (!oldUser) {
      return res.status(404).json({
        success: true,
        status: "User does not exists",
      });
    }
    const secret = process.env.JWT_SECRET + oldUser.password;
    try {
      const verify = jwt.verify(token, secret);
      const encryptedPassword = await bcrypt.hash(password, 10);
      console.log(encryptedPassword);
      await User.updateOne(
        {
          _id: id,
        },
        {
          $set: {
            password: encryptedPassword,
          },
        }
      );
      res.render("index", {
        email: verify.email,
        verified: "true",
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: "Something went wrong",
      });
    }
  }
};

module.exports = { authLogin, authRegistration, authForgotPass, authResetPass };