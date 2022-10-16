const CustomError = require("../errors/customError");

const errorHandlerMiddleWare = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }
  return res.status(500).json({
    success: false,
    message: err.message,
  });
};

module.exports = errorHandlerMiddleWare;
