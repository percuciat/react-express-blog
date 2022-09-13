import { body, check } from "express-validator";

export const checkCreatePost = [
  body("title")
    .isLength({ min: 3 })
    .withMessage("Title must contains more than 3 letters"),
  body("content")
    .isLength({ min: 5 })
    .withMessage("Content must contains more than 5 letters"),
  body("status")
    .trim()
    .isIn(["No published", "Published"])
    .withMessage("Select the correct post's status (published or not)"),
  body("author_id").isNumeric().withMessage("Enter the post's author"),
  body("category_id").isNumeric().withMessage("Enter the post's category"),
];

export const checkUpdatePost = [
  body("title")
    .isLength({ min: 3 })
    .withMessage("New title must contains more than 3 letters"),
  body("content")
    .isLength({ min: 5 })
    .withMessage("Content must contains more than 5 letters"),
  body("status")
    .trim()
    .isIn(["No published", "Published"])
    .withMessage("Select the correct post's status (published or not)"),
  body("updatedby")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Post updater must be longer than 3 letters")
    .isAlpha()
    .withMessage("Enter the post's updater without spaces"),
  body("category_id").isNumeric().withMessage("Enter the post's category"),
  body("author_id").isNumeric().withMessage("Enter the post's author"),
];

export const checkGetById = [
  check("id").notEmpty().withMessage("id must be completed in request"),
];

export const checkCreatePostCategory = [
  body("category_name")
    .isLength({ min: 3 })
    .withMessage("Category name must contains more than 3 letters"),
  body("author_id").isNumeric().withMessage("Author must be contained id"),
];
