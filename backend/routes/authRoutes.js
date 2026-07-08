const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const router = express.Router();
const {
  registerValidation,
  loginValidation,
} = require("../validators/authValidation");
const authLimiter = require("../middleware/rateLimiter");
const passport = require("passport");
router.post(
  "/register",
  authLimiter,
  registerValidation,
  registerUser
);

router.post(
  "/login",
  authLimiter,
  loginValidation,
  loginUser
);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL}/login?error=oauth_failed`,
    session: false,
  }),
  (req, res) => {
    const { token } = req.user;
    res.redirect(`${process.env.CLIENT_URL}/auth-success?token=${token}`);
  }
);


module.exports = router;