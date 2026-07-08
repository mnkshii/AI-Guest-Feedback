const { body } = require("express-validator");

const registerValidation = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email address"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

const loginValidation = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email address"),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),
];

module.exports = {
  registerValidation,
  loginValidation,
};