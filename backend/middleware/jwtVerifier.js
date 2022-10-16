const jwt = require("jsonwebtoken");
const CustomError = require("../errors/customError");

const jwtVerifier = async (req, res, next) => {
  try {
    await jwt.verify(req.get("JWT_TOKEN"), process.env.JWT_SECRET);
    next();
  } catch (error) {
    console.log(error);
    return next(
      new CustomError(
        "User must be logged in to create a user and to create, delete or update a blog",
        403
      )
    );
  }
};

module.exports = jwtVerifier;