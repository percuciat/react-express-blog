import { body, check } from "express-validator";

export const checkCreatePost = [
  body("title")
    .isLength({ min: 3 })
    .withMessage("Title must contains more than 3 letters"),
  body("content")
    .isLength({ min: 5 })
    .withMessage("Content must contains more than 5 letters"),
  body("status").notEmpty().withMessage("Enter the post's status"),
  body("authorId").isUUID().withMessage("Enter the post's author"),
  body("categoryId").isUUID().withMessage("Enter the post's category"),
];

export const checkUpdatePost = [
  body("title")
    .isLength({ min: 3 })
    .withMessage("New title must contains more than 3 letters"),
  body("content")
    .isLength({ min: 5 })
    .withMessage("Content must contains more than 5 letters"),
  body("status").notEmpty().withMessage("Enter the post's status"),
  body("updatedby").isUUID().withMessage("Enter the post's updater"),
  body("categoryId").isUUID().withMessage("Enter the post's category"),
];

export const checkGetById = [
  check("id").notEmpty().withMessage("id must be completed in request"),
];

export const checkCreateCategory = [
  body("category_name")
    .isLength({ min: 3 })
    .withMessage("Category must contains more than 3 letters"),
  body("authorId").isUUID().withMessage("Author must be contained uuid"),
];

export const authRegister = [
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
    .isLength({ min: 5 })
    .custom(async (confirmPassword, { req }) => {
      const password = req.body.user_password;
      if (password !== confirmPassword) {
        throw new Error("Passwords must be same");
      }
    })
    .withMessage("Passwords must be matched"),
];

export const authLogin = [
  body("user_name")
    .isLength({ min: 3 })
    .withMessage("User name must contains more than 3 letters"),
  body("user_password")
    .isLength({ min: 5 })
    .withMessage("Password must contains more than 5 letters"),
];

/* body('category')
.isLength({ min: 3 })
.withMessage('Category must contains more than 3 letters'), */
