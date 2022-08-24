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

export const checkCreatePostCategory = [
  body("category_name")
    .isLength({ min: 3 })
    .withMessage("Category name must contains more than 3 letters"),
  body("authorId").isUUID().withMessage("Author must be contained uuid"),
];
