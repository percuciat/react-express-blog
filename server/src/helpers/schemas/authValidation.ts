import { body, check } from "express-validator";

export const checkRegistration = [
  body("user_name")
    .isLength({ min: 3 })
    .withMessage("Username must contains more than 3 letters"),
  body("user_email")
    .isEmail()
    .withMessage("Email must be like 'example@yahoo.com'"),
  body("user_password")
    .isLength({ min: 5 })
    .withMessage("Password must contains more than 5 letters"),
  body("password_confirm")
    .custom(async (confirmPassword, { req }) => {
      const password = req.body.user_password;
      if (password !== confirmPassword) {
        throw new Error("Passwords must be the same");
      }
    })
];

export const checkLogin = [
  body("user_name")
    .isLength({ min: 3 })
    .withMessage("User name must contains more than 3 letters"),
  body("user_password")
    .isLength({ min: 5 })
    .withMessage("Password must contains more than 5 letters"),
];