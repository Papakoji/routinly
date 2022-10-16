const express = require("express")
const router = express.Router()
const jwtVerifier = require("../middleware/jwtVerifier");

const {
  authLogin,
  authRegistration,
  authForgotPass
} = require("../controllers/authController");

router.route("/login").post(authLogin);
router.route("/registration").post(authRegistration);
router.route("/forgot-pass").post(authForgotPass);

module.exports = router;